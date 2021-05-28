import { Component, OnInit } from '@angular/core';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from "xlsx";
import * as Papa from 'papaparse';
import { InvoiceRequestServices } from '../invoice-request/invoice-service';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { IccCountryServices } from '../icc-country/icc-country.services'

export interface invoiceData {
  invref: any;
  invDueDate: any;
  invId: any;
  id: String;
  RefNo: String;
  invoiceId: String;
  invoiceDate: String;
  buyerName: String;
  buyerUEN:string;
  InvoiceAmount: String;

}
const INVOICE_ARRAY: invoiceData[] = [];

@Component({
  selector: 'app-invoice-bulk-upload',
  templateUrl: './invoice-bulk-upload.component.html',
  styleUrls: ['./invoice-bulk-upload.component.scss']
})
export class InvoiceBulkUploadComponent implements OnInit {

  tooltipPosition= "below";
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  displayedColumns: string[] = ['select', 'DateTime','InvoiceRefNo', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount','Ccy','Status'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource(INVOICE_ARRAY);
  fileNames=[]
  isOpen=''
  name = "This is XLSX TO JSON CONVERTER";
  willDownload = false;
  fileReaded: any;
  invoicedata: any;
  pdfSrc
  pdfDivEnable: boolean;
  modalRef: BsModalRef;
  invoiceForm: FormGroup;
  invoiceID: any;
  currencyName:any;
  InvoiceFdate:any
  moment: any = moment;
  disableSelect = new FormControl(false);
  dataSourceTwo = new MatTableDataSource(); //data
  displayedColumnsTwo: string[] = [
    'ID',
    'DescGoods',
    'Quantity',
    'Rate',
    'Amt',
    'Ccy',
    'DiscAmt',
    'NetAmtPay',
    'TaxRate',
    'TaxAmount',
    'Total',
  ];
  invoiceDetails: any;
  optionDatas: any;
  userDeatils: any;
  UpdateInvoiceLable: boolean;
  constructor(private IccCountryServices:IccCountryServices,private datePipe: DatePipe,public translate: TranslateService,private fb: FormBuilder,private modalService: BsModalService,private toastr: ToastrService,private invoiceRequestServices: InvoiceRequestServices) { 
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userDeatils= JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : 'obj' 
    this.getInvDetailsLists()
    this.addRow();
    this.getAllCountry()

  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
      this.selection.selected.forEach(s => console.log(s.name));
    }
    isOpenHandle(isTrue) {
      this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }
  
    onChange(event){
      this.fileNames.push(<File>event.target.files[0].name)
      // for(let i = 0; i < event.target.files.length; i++) {
      //     var reader = new FileReader();
      //     reader.readAsDataURL(<File>event.target.files[i]);
      //     reader.onload =function () {
      //         baseData.push(reader.result)
      //     };
      //     this.fileNames.push(<File>event.target.files[i].name)
      // }
  }  
  
  onFileRemove(index){
    this.fileNames.splice(index,1)
  }
  authoriseInvoice() {
    let invoiceIds = []
    this.selection.selected.forEach(s =>
      invoiceIds.push(s.id)
    );
    this.updateInvoice(invoiceIds)
    console.log("invoiceIds", invoiceIds);
  }
  updateInvoice(invoiceIds) {
    let invIdparams = {
      "invoiceIds": invoiceIds,
    }

    this.toastr.success("Selected Invoices has been Authorized !");
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
    }, error => {
    })

    let reqParams=[]
    this.dataSource.data.map((item)=>{
      if(invoiceIds.includes(item.id)){
        console.log(item,'tem');
        let obj={
          "invoiceId":item.id,
          "invoiceNo":item.invId,
          "invoiceRef":item.invref,
          "invoiceDate":item['invDate'],
          "smeId":item['smeId'],
          "invoiceAmt":item['invAmt'],
          "invoiceCcy":item['invCcy'],
          "status" : "A", 
          "buyerName": item.buyerName,
          "buyerUEN":item.buyerUEN,
          "buyerAddr":item['buyerAddr'],
          "dispDate":item['dispDate'],
           "invDueDate":item.invDueDate
        }
        reqParams.push(obj)
      }
    })
    this.invoiceRequestServices.updateInvoiceDetails(reqParams).subscribe(resp =>{
      this.getInvDetailsLists();
    })
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file,"file")
    console.log(file.type,"file")
    if(file.type === "text/csv"){
     this.onChangess(file)
    }else if(file.type === "application/pdf"){
        this.getBase64(<File>ev.target.files[0]).then((data) => {
            this.pdfDivEnable = true
            let flName=ev.target.files[0].name
            console.log(flName,"flName")
            console.log(ev.target.files,"ev.target.files")
            this.pdfSrc = data
            let fileName={
                'fileName':ev.target.files[0].name,
                'data':data,
                'extension':flName.substring(flName.lastIndexOf('.') + 1, flName.length) || flName
            }
        this.fileNames.push(fileName)
        console.log(fileName,"fileName.fileName")
        console.log(this.fileNames,"this.fileNames")
        this.pdfApi()
        });
        
    }else{
      reader.onload = event => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: "binary" });
        console.log(workBook);
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          console.log(name)
          const sheet = workBook.Sheets[name];
          console.log(sheet,"sheet")
          initial['invoice'] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        console.log(jsonData,"jsonData")
        this.invoicedata = jsonData.invoice
        this.InvoiceAPI()
      };
      reader.readAsBinaryString(file);
    }
  }
  getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
  }
  openModal(event, template) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  InvoiceAPI(){
    let invoiceDetailss
    let goodsDetails = []
    this.invoicedata.forEach(element => {
      goodsDetails.push({
        ID:element.Invoicenumber,
        amtCcy:element.Currency,
        descGoods:element.Descriptiongoods,
        dateOfInvoice:element.Fundingreqdate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
        discAmt:element.Discountamount,
        goodsId:"GD101",
        amt:Number(element.Quality)*Number(element.Rate),
        netAmtPay:Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount) , //discountamount
        quantity:element.Quality,
        rate:element.Rate,
        taxAmt: (Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) * Number(element.Taxrate) /100 ,
        taxRate:Number(element.Taxrate),
        total:(Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) + ((Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) * Number(element.Taxrate) /100)
      })
    });
    invoiceDetailss = {
        invId : this.invoicedata[0].Invoicenumber,
        invAmt:this.invoicedata[0].Fundingamount,
        invCcy:this.invoicedata[0].Currency,
        invDate:this.invoicedata[0].Fundingreqdate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
        invDueDate:this.invoicedata[0].Fundingreqduedate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
        smeId: "SME",
        invoiceDetailsSequenceNumber: {},
        dispDate:this.invoicedata[0].Datedispatch = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
        buyerName:this.invoicedata[0].Buyername,
        buyerUEN:this.invoicedata[0].buyerUEN,
        buyerAddr:this.invoicedata[0].Buyerlocation,
        billNo:this.invoicedata[0].Billingnumber,
        goodsDetails:goodsDetails
    }
    // let invoiceDetails = {
    //   invId : this.invoicedata.Invoicenumber,
    //   invAmt:this.invoicedata.Fundingamount,
    //   invCcy:this.invoicedata.Currency,
    //   invDate:this.invoicedata.Fundingreqdate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
    //   invDueDate:this.invoicedata.Fundingreqduedate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
    //   smeId: "SME",
    //   invoiceDetailsSequenceNumber: {},
    //   dispDate:this.invoicedata.Datedispatch = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
    //   buyerName:this.invoicedata.Buyername,
    //   buyerAddr:this.invoicedata.Buyerlocation,
    //   billNo:this.invoicedata.Billingnumber,
    //   goodsDetails:[{
    //     ID:this.invoicedata.Invoicenumber,
    //     amtCcy:this.invoicedata.Currency,
    //     descGoods:this.invoicedata.Descriptiongoods,
    //     dateOfInvoice:this.invoicedata.Fundingreqdate = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z",
        
    //     discAmt:this.invoicedata.Discountamount,
    //     goodsId:"GD101",
    //     amt:Number(this.invoicedata.Quality)*Number(this.invoicedata.Rate),
    //     netAmtPay:Number(this.invoicedata.Quality) * Number(this.invoicedata.Rate) - Number(this.invoicedata.Discountamount) , //discountamount
    //     quantity:this.invoicedata.Quality,
    //     rate:this.invoicedata.Rate,
    //     taxAmt: (Number(this.invoicedata.Quality) * Number(this.invoicedata.Rate) - Number(this.invoicedata.Discountamount)) * Number(this.invoicedata.Taxrate) /100 ,
    //     taxRate:Number(this.invoicedata.Taxrate),
    //     total: Number(this.invoicedata.Quality) * Number(this.invoicedata.Rate) 
    //   }]
    // }
    let json = {
      invoiceDetails : invoiceDetailss
    }
    console.log(invoiceDetailss,"invoiceDetailss")
    console.log(json,"json")
    this.invoiceRequestServices.invoiceRequestSave(json).subscribe(resp => {
      this.getInvDetailsLists()
    }, error => {
    })
  }
  pdfApi(){
    console.log(this.fileNames)
    // this.invoiceRequestServices.invoicePDFSave(this.fileNames).subscribe(resp => {
    //   this.getInvDetailsLists()
    // }, error => {
    // })
    this.invoiceForm.patchValue({
      buyerName: 'Misys International Financial Systems Pte Ltd',
      invDueDate: '21/05/2014'.toString(),
    });
  }
  getInvDetailsLists() {
  let tempInvArray;
  this.invoiceRequestServices.getInvDetailsLists().subscribe(resp => {
    const INVOICE_ARRAY: invoiceData[] = resp;
    this.dataSource = new MatTableDataSource(INVOICE_ARRAY);
  }, error => {
  })
  }
  sampleDown(){
    let link = document.createElement("a");
    link.download = "FundingInvoice";
    link.href = "assets/sampleinvoiceexecl.xlsx";
    link.click();
  }
  samplecsvDown(){
    let link = document.createElement("a");
    link.download = "FundingInvoiceCSV";
    link.href = "assets/sampleinovoicecsv.csv";
    link.click();
  }
  onChangess(files: File[]){
    console.log(files,"files")
    if(files){
      console.log(files);
      Papa.parse(files, {
        header: true,
        skipEmptyLines: true,
        complete: (result,file) => {
          console.log(result,"sksksk");
          this.invoicedata = result.data[0]
          this.InvoiceAPI()
          // this.dataSource = new MatTableDataSource(result);
          // this.dataList = result.data;
        }
      });
    }
  }
  onSubmitInvoiceForm() {
    let grandtotal = 0;
    this.invoiceForm.value.goodsDetails.forEach(element => {
       grandtotal += Number(element.total)
    });
    if(grandtotal != this.invoiceForm.value.invAmt){
      return this.toastr.error(this.translate.instant('Please check Good Details !! Grant Total Should Be Equal to Funding Request Amount'));
    }
    try {
      if (this.invoiceForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
      this.invoiceForm.value['invoiceDetailsSequenceNumber']={}     
      this.invoiceForm.value.smeProfileId = this.userDeatils['smeProfileId']

      let params = {
        "invoiceDetails": this.invoiceForm.value,
        // "smeProfileId" :  userData['smeProfileId']
      }
      console.log(params,"params");
      if(this.UpdateInvoiceLable === true){
        this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id,params).subscribe(resp => {
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.UpdateInvoiceLable = false
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
        })

      }else{
        this.invoiceRequestServices.invoiceRequestSave(params).subscribe(resp => {
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
        })
      }
    } catch (err) {
    }
  
  }
  UpdateInvoice(data){
    console.log(data,"testtt")
    this.invoiceDetails = data
    this.invoiceForm.patchValue({
      buyerName: data.buyerName,
      invDueDate: data.invDueDate.toString(),
      invId: data.invId,
      buyerAddr: data.buyerAddr,
      buyerUEN:data.buyerUEN,
      billNo: data.billNo,
      invAmt: data.invAmt,
      invDate: data.invDate.toString(),
      dispDate: data.dispDate.toString(),
      smeId: localStorage.getItem("userId"),
      invCcy:data.invCcy
    });
    this.invoiceID = data.invId;
    this.currencyName=data.invCcy
    this.InvoiceFdate=data.invDueDate
    // console.log(this.dateFormArray,"this.dateFormArray")
    // this.dateFormArray.controls.splice(0,0);

   
    this.dataSourceTwo.data = []
    data.goodsDetails.forEach(element => {
      const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: element.descGoods,
      dateOfInvoice:this.datePipe.transform(this.InvoiceFdate,"dd/MM/yyyy"),
      quantity: element.quantity,
      rate:element.rate,
      amt: element.amt,
      amtCcy: this.currencyName,
      discAmt: element.discAmt, 
      netAmtPay: element.netAmtPay,
      taxRate: element.taxRate,
      taxAmt: element.taxAmt,
      total: element.total,
      goodsId: "GD101"
      })
      this.dateFormArray.push(row);
    });
    this.delete(0)
    this.dataSourceTwo.data = this.dateFormArray.controls;
    this.UpdateInvoiceLable = true
  }
  delete(index){
    this.dateFormArray.removeAt(index)
}
  addRow() {
    console.log(this.invoiceForm, "adasdasd")
    this.dataSourceTwo.filter = "";
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      // idNo: [""],
      dateOfInvoice:this.datePipe.transform(this.InvoiceFdate,"dd/MM/yyyy"),
      quantity: [""],
      rate: [""],
      amt: [""],
      amtCcy: this.currencyName,
      discAmt: [""],
      netAmtPay: [""],
      taxRate: [""],
      taxAmt: [""],
      total: [""],
      goodsId: "GD101",
    })
    this.dateFormArray.push(row);
    this.dataSourceTwo.data = this.dateFormArray.controls;
  }
  updateInvoiceId(event) {
    console.log(event.target.value)
    this.invoiceID = event.target.value;
    // this.invoiceForm.value.goodsDetails.findIndex((obj => obj.ID == 1));
  }
  updateCurrency(event){
    this.currencyName=event.target.value
  }
  updateInvoicedate(event){
    this.InvoiceFdate = event.target.value;
  }
  invoiceFormBuild() {
    this.invoiceForm = this.fb.group({
      buyerName: ['Misys International Financial Systems Pte Ltd', Validators.required],
      invDueDate: ['', Validators.required],
      invId: ['1400002432', Validators.required],
      buyerAddr: ['', Validators.required],
      buyerUEN: ['', Validators.required],
      billNo: ['', Validators.required],
      invAmt: ['', Validators.required],
      invDate: ['21/05/2014', Validators.required], 
      dispDate: ['', Validators.required],
      smeId: localStorage.getItem("userId"),
      // invCcy: "",
      goodsDetails: this.fb.array([]),
      invCcy:['',Validators.required]
    });
    this.invoiceID = '1400002432'
  }
  get dateFormArray(): FormArray {
    return this.invoiceForm.get('goodsDetails') as FormArray;
  }
  changeRowgrid(index){
    this.invoiceForm.value.goodsDetails.forEach(element => { element.ID=this.invoiceID });
    this.invoiceForm.value.goodsDetails[index]["amt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["rate"])*parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["rate"])*parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) : "0" 
    this.invoiceForm.value.goodsDetails[index]["netAmtPay"] = parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) :'0'
    this.invoiceForm.value.goodsDetails[index]["taxAmt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 ?parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100  :"0" 
    this.invoiceForm.value.goodsDetails[index]["total"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) ?  parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]):'0'
    this.invoiceForm.value.goodsDetails[index]["amtCcy"]=this.currencyName
    this.dateFormArray.patchValue(this.invoiceForm.value.goodsDetails);
}
onKey(value) { 
  this.optionDatas = this.search(value);
  }
  
  search(value: string) { 
    let filter = value.toLowerCase();
    return this.optionDatas.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  getAllCountry(){
    this.IccCountryServices.getAllcountry().subscribe(resp => {    
      let countryArray = []
      resp && resp.map(item =>{
        let obj =  { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
      this.optionDatas = countryArray
    })
  //   this.optionDatas = [{
  //     "id": "AFG",
  //     "itemName": "Afghanistan"
  // },
  // {
  //     "id": "ALB",
  //     "itemName": "Albania"
  // }]
  }
}
