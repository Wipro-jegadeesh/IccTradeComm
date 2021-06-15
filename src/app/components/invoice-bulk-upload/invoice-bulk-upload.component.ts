import { Component, OnInit,Input } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { IccCountryServices } from '../icc-country/icc-country.services'
import { Router } from "@angular/router";


export interface invoiceData {
  invref: any;
  invDueDate: any;
  invId: any;
  id: String;
  RefNo: String;
  invoiceId: String;
  invoiceDate: String;
  buyerName: String;
  buyerUEN: string;
  InvoiceAmount: String;

}
const INVOICE_ARRAY: invoiceData[] = [];

@Component({
  selector: 'app-invoice-bulk-upload',
  templateUrl: './invoice-bulk-upload.component.html',
  styleUrls: ['./invoice-bulk-upload.component.scss']
})
export class InvoiceBulkUploadComponent implements OnInit {

  tooltipPosition = "below";
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  displayedColumns: string[] = ['select', 'InvoiceRefNo','DateTime', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount', 'Ccy','Score', 'Status'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource(INVOICE_ARRAY);
  fileNames
  isOpen = ''
  name = "This is XLSX TO JSON CONVERTER";
  willDownload = false;
  fileReaded: any;
  invoicedata: any;
  pdfSrc
  pdfDivEnable: boolean;
  modalRef: BsModalRef;
  invoiceForm: FormGroup;
  invoiceID: any;
  currencyName: any;
  InvoiceFdate: any
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
  message:string;
  FileData:any;
  score;
  invoiceRefNo;

  constructor(public router: Router,private IccCountryServices: IccCountryServices, private datePipe: DatePipe, public translate: TranslateService, private fb: FormBuilder, private modalService: BsModalService, private toastr: ToastrService, private invoiceRequestServices: InvoiceRequestServices) {
    this.FileData = this.router.getCurrentNavigation().extras.state;
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userDeatils = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : 'obj'
    this.getInvDetailsLists()
    this.addRow();
    this.getAllCountry()

    console.log(this.FileData,"this.FileData")
    if(this.FileData.FileData.queryParams.uploadType === "text/csv"){
      this.invoicedata = this.FileData.FileData.queryParams.invoicedata
      console.log(this.invoicedata,"this.invoicedata")
      this.InvoiceAPI()
    }else if(this.FileData.FileData.queryParams.uploadType === "application/pdf"){
      this.pdfDivEnable = true
      this.pdfSrc = this.FileData.FileData.queryParams.PDFData
      this.fileNames = this.FileData.FileData.queryParams.invoicedata
      this.pdfApi()
    }else{
      this.invoicedata =  this.FileData.FileData.queryParams.invoicedata
      this.InvoiceAPI()
    }
  
  }

  public setTwoNumberDecimal($event,name) {
    if(this.chkDecimalLength($event.target.value) >= 2){
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.invoiceForm.patchValue({ [name] : parseFloat($event.target.value).toFixed(2) })
    }
  }
  
  chkDecimalLength (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
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

  authoriseInvoice() {
      let invoiceIds = []
      let scoreCheck = false
      // this.selection.selected.forEach((item) => {
      //   // invoiceIds.push(s.id)
      //   if(item.buyerScore >= 500){
  
      //   }
      // });
      for(let i=0;i < this.selection.selected.length;i++){
        if(this.selection.selected[i].buyerScore >= 500){
          //  && this.selection.selected[i].id){
          invoiceIds.push(this.selection.selected[i].id)
          scoreCheck = true
        }
        else{
          scoreCheck = false
          break;
        }
      }
      if(scoreCheck){
      if(invoiceIds.length > 0){
        this.updateInvoice(invoiceIds)
      }else{
        return this.toastr.error(this.translate.instant('Please select invoice details'));
      }
    }
    else{
     this.selection.selected.length ? this.toastr.error('Your score is less to authorize') : this.toastr.error(this.translate.instant('Please select invoice details'))
    }
      console.log("invoiceIds", invoiceIds);
    }
  updateInvoice(invoiceIds) {
    this.toastr.success("Selected Invoices has been Authorized !");
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
    }, error => {
    })

    let reqParams = []
    this.dataSource.data.map((item) => {
      if (invoiceIds.includes(item.id)) {
        console.log(item, 'tem');
        let obj = {
          "invoiceId": item.id,
          "invoiceNo": item.invId,
          "invoiceRef": item.invref,
          "invoiceDate": item['invDate'],
          "smeId": item['smeId'],
          "invoiceAmt": item['invAmt'],
          "invoiceCcy": item['invCcy'],
          "status": "A",
          "buyerName": item.buyerName,
          "buyerUEN": item.buyerUEN,
          "buyerAddr": item['buyerAddr'],
          "dispDate": item['dispDate'],
          "invDueDate": item.invDueDate
        }
        reqParams.push(obj)
      }
    })
    this.invoiceRequestServices.updateInvoiceDetails(reqParams).subscribe(resp => {
      this.getInvDetailsLists();
    })
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file, "file")
    console.log(file.type, "file")
    if (file.type === "text/csv") {
      this.onChangess(file)
    } else if (file.type === "application/pdf") {
      this.getBase64(<File>ev.target.files[0]).then((data) => {
        this.pdfDivEnable = true
        let flName = ev.target.files[0].name
        console.log(flName, "flName")
        console.log(ev.target.files, "ev.target.files")
        this.pdfSrc = data
        let fileName = {
          'fileName': ev.target.files[0].name,
          'data': (<string>data).split(',')[1],
          'extension': flName.substring(flName.lastIndexOf('.') + 1, flName.length) || flName
        }
        this.fileNames = fileName
        console.log(fileName, "fileName.fileName")
        console.log(this.fileNames, "this.fileNames")
        this.pdfApi()
      });

    } else {
      reader.onload = event => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: "binary" });
        console.log(workBook);
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          console.log(name)
          const sheet = workBook.Sheets[name];
          console.log(sheet, "sheet")
          initial['invoice'] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        console.log(jsonData, "jsonData")
        this.invoicedata = jsonData.invoice
        this.InvoiceAPI()
      };
      reader.readAsBinaryString(file);
    }
  }
  getBase64(file) {
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
  onSubmitInvoiceForm() {
    let grandtotal = 0;
    this.invoiceForm.value.goodsDetails.forEach(element => {
      grandtotal += Number(element.total)
    });
    if (grandtotal != this.invoiceForm.value.invAmt) {
      return this.toastr.error(this.translate.instant('Please check Good Details !! Grant Total Should Be Equal to Funding Request Amount'));
    }

    try {
      if (this.invoiceForm.status === "INVALID") {
        throw { "mes": "Please fill mendatory  fields" }
      }
      this.invoiceForm.value['invoiceDetailsSequenceNumber'] = {}
      this.invoiceForm.value.smeProfileId = this.userDeatils['smeProfileId']

      let params = {
        "invoiceDetails": this.invoiceForm.value,
        // "smeProfileId" :  userData['smeProfileId']
      }
      params['invoiceDetails'].goodsDetails[0].netAmtPay = parseInt(params['invoiceDetails'].goodsDetails[0].netAmtPay)
      params['invoiceDetails'].goodsDetails[0].total =   parseInt(params['invoiceDetails'].goodsDetails[0].total)
      
      console.log(params, "params");
      if (this.UpdateInvoiceLable === true) {
        let buyerDetails= this.sendBuyerDetails(this.invoiceRefNo)
        this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
          if(resp){
            this.score=resp.score
           params['invoiceDetails']['buyerScore'] = resp.score
         
        this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id, params).subscribe(resp => {
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          this.invoiceRefNo = "";
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.UpdateInvoiceLable = false
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
        })
      }
    })
      } else {
        this.invoiceRequestServices.invoiceRequestSave(params).subscribe(resp => {
          this.invoiceRefNo=resp
          let buyerDetails= this.sendBuyerDetails(resp)
          this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
            if(resp){
              this.score=resp.score
              let obj={
                'buyerScore':resp.score
              }
              this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
                this.invoiceRefNo=''
              })
            }
          })
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          this.invoiceRefNo = "";
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
          if(error.status != 200){
            let availableData = error.error
            let desiredData = this.replaceCommaLine(availableData);
            this.toastr.error(desiredData, '', {
              timeOut: 4000, progressBar: true, enableHtml: true
            });

            // this.toastr.error(error.error);
          }else{
            this.invoiceRefNo=error.error.text
            let buyerDetails= this.sendBuyerDetails(error.error.text)
            this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
              if(resp){
                this.score=resp.Score
                let obj={
                  'buyerScore':resp.score
                }
                this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
                  this.invoiceRefNo=''
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
                })
            this.toastr.success('Data Added Successfully')
          }
        })
            // (error.error.text);
          }
          
        })
      }
    } catch (err) {
    }
  }

  sendBuyerDetails(invoiceNo){
    let userCred=JSON.parse(localStorage.getItem('userCred'))
    let formValues=this.invoiceForm.value
    // let buyerdetails={
    //   'name':formValues.buyerName,
    //   'city':formValues.city,
    //   'location':formValues.buyerAddr,
    //   'postalCode':formValues.postalCode,
    //   'addr1':formValues.addressLine1,
    //   'addr2':formValues.addressLine2,
    //   'companyName':userCred.companyName,
    //   'uniqueId':formValues.buyerUEN,
    //   'email':formValues.email,
    //   'phoneNo':formValues.phoneNo
    // }
    // localStorage.setItem('buyerDetails',JSON.stringify(buyerdetails))
      let buyerSubmitObj={
        'name':userCred.name,
        'registrationnumber':userCred.companyId,
        'countryCode':'SGP',
        'invoiceid':invoiceNo,
        'invoiceno':this.invoiceForm.value['invId'],
        "sectionList":[{
          "questionResponses":[
            {"type": "QuestionResponseTextDto", "questionAlias": "customer-business-name", "value": formValues.companyName},
            {"type": "QuestionResponseTextDto", "questionAlias": "address-line-1", "value": formValues.addressLine1},
            {"type": "QuestionResponseTextDto", "questionAlias": "address-line-2", "value": formValues.addressLine2},
            {"type": "QuestionResponseTextDto", "questionAlias": "city", "value": formValues.city},
            {"type": "QuestionResponseTextDto", "questionAlias": "postcode", "value": formValues.postalCode},
            {"type": "QuestionResponseMultipleChoiceDto", "questionAlias": "country", "optionAliases": ["SGP"]},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-email", "value": formValues.email},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-telephone", "value": formValues.phoneNo.toString()},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-name", "value": formValues.buyerName},
            {"type": "QuestionResponseTextDto", "questionAlias": "customer-company-registration-number", "value": formValues.buyerUEN}
            ],
        }]
      }
      return buyerSubmitObj;
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  InvoiceAPI() {
    let invoiceDetailss
    let goodsDetails = []
    this.invoicedata.forEach(element => {
      goodsDetails.push({
        ID: element.Invoicenumber,
        amtCcy: element.Currency,
        descGoods: element.Descriptiongoods,
        dateOfInvoice: element.Fundingreqdate = moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
        discAmt: element.Discountamount,
        goodsId: "GD101",
        amt: Number(element.Quality) * Number(element.Rate),
        netAmtPay: Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount), //discountamount
        quantity: element.Quality,
        rate: element.Rate,
        taxAmt: (Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) * Number(element.Taxrate) / 100,
        taxRate: Number(element.Taxrate),
        total: (Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) + ((Number(element.Quality) * Number(element.Rate) - Number(element.Discountamount)) * Number(element.Taxrate) / 100)
      })
    });
    invoiceDetailss = {
      invId: this.invoicedata[0].Invoicenumber,
      invAmt: this.invoicedata[0].Fundingamount,
      invCcy: this.invoicedata[0].Currency,
      invDate: this.invoicedata[0].Fundingreqdate = moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
      invDueDate: this.invoicedata[0].Fundingreqduedate = moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
      smeId: "SME",
      invoiceDetailsSequenceNumber: {},
      dispDate: this.invoicedata[0].Datedispatch = moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
      buyerName: this.invoicedata[0].Buyername,
      buyerUEN: this.invoicedata[0].buyerUEN,
      buyerAddr: this.invoicedata[0].Buyerlocation,
      billNo: this.invoicedata[0].Billingnumber,
      goodsDetails: goodsDetails
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
      invoiceDetails: invoiceDetailss
    }
    console.log(invoiceDetailss, "invoiceDetailss")
    console.log(json, "json")
    this.invoiceRequestServices.invoiceRequestSave(json).subscribe(resp => {
      this.getInvDetailsLists()
    }, error => {
    })
  }
  pdfApi() {
    console.log(this.fileNames)
    this.invoiceRequestServices.invoicePDFSave(this.fileNames).subscribe(resp => {
      console.log(resp,"resp")
     setTimeout(() => {
      this.invoiceForm.patchValue({
        invId: resp.invoiceId === null ? '' : resp.invoiceId,
        buyerName: resp.buyerName  === null ? '' : resp.buyerName,
        invDate: resp.invoiceDate === null ? '' : resp.invoiceDate = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
      });
      this.invoiceID = resp.invoiceId === null ? '' : resp.invoiceDate 
    }, 1000);
    }, error => {
    })
    // let obj = {
    //   invdate: "21/05/2014",
    //   InvoiceId: "1400002432",
    //   BuyerName: "Misys International Financial Systems Pte Ltd",
    //   BuyerAddress: "2 Shenton Way #14-01 SGX Center 1"
    // }
    // let obj1 = '2014/05/01'
    // setTimeout(() => {
    //   this.invoiceForm.patchValue({
    //     invId: "1400002432",
    //     buyerName: 'Misys International Financial Systems Pte Ltd',
    //     invDate: obj1 = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
    //   });
    //   this.invoiceID = '1400002432'
    // }, 1000);
   
  }


  getInvDetailsLists() {
    let tempInvArray;
    this.invoiceRequestServices.getInvDetailsLists().subscribe(resp => {
      const INVOICE_ARRAY: invoiceData[] = resp;
      this.dataSource = new MatTableDataSource(INVOICE_ARRAY);
    }, error => {
    })
  }
  sampleDown() {
    let link = document.createElement("a");
    link.download = "FundingInvoice";
    link.href = "assets/sampleinvoiceexecl.xlsx";
    link.click();
  }
  samplecsvDown() {
    let link = document.createElement("a");
    link.download = "FundingInvoiceCSV";
    link.href = "assets/sampleinovoicecsv.csv";
    link.click();
  }
  onChangess(files: File[]) {
    console.log(files, "files")
    if (files) {
      console.log(files);
      Papa.parse(files, {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.log(result, "sksksk");
          this.invoicedata = result.data[0]
          this.InvoiceAPI()
          // this.dataSource = new MatTableDataSource(result);
          // this.dataList = result.data;
        }
      });
    }
  }
  UpdateInvoice(data) {
    console.log(data, "testtt")
    this.invoiceDetails = data
    this.invoiceForm.patchValue({
      // buyerName: data.buyerName,
      // invDueDate: data.invDueDate.toString(),
      invId: data.invId,
      // buyerAddr: data.buyerAddr,
      // buyerUEN: data.buyerUEN,
      billNo: data.billNo,
      invAmt: data.invAmt,
      // invDate: data.invDate.toString(),
      // dispDate: data.dispDate.toString(),
      smeId: localStorage.getItem("userId"),
      invCcy: data.invCcy,
      invDueDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
  invDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
   dispDate: moment(data.dispDate, 'YYYY - MM - DD HH: mm').toDate(),
   
   email:data.email,
   buyerName:data.buyerName,
   phoneNo:data.phoneNo,
   buyerUEN:data.buyerUEN,
   buyerAddr:data.buyerAddr,
   addressLine1:data.addressLine1,
   addressLine2:data.addressLine2,
   city:data.city,
   postalCode:data.postalCode,
   companyName:data.companyName
    });
    this.invoiceID = data.invId;
    this.currencyName = data.invCcy
    this.invoiceRefNo=data.invref
    this.InvoiceFdate=data.invDueDate
    this.score=data.buyerScore

    this.dataSourceTwo.data = []
    data.goodsDetails.length &&  data.goodsDetails.forEach(element => {
      const row = this.fb.group({
        ID: this.invoiceID,
        descGoods: element.descGoods,
        dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
        quantity: element.quantity,
        rate: element.rate,
        amt: element.amt,
        amtCcy: this.currencyName,
        discAmt: element.discAmt,
        netAmtPay: element.netAmtPay,
        taxRate: element.taxRate,
        taxAmt: element.taxAmt,
        total: element.total,
        goodsId: element.goodsId
      })
      this.dateFormArray.push(row);
    });

   if(!data.goodsDetails.length){
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      // idNo: [""],
      dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
      quantity: [""],
      rate: [""],
      amt: [""],
      amtCcy: this.currencyName,
      discAmt: [""],
      netAmtPay: [""],
      taxRate: [""],
      taxAmt: [""],
      total: [""],
      goodsId: [""],
    })
      this.dateFormArray.push(row);
    }

    this.delete(0)
    this.dataSourceTwo.data = this.dateFormArray.controls;
    this.UpdateInvoiceLable = true
  }
  delete(index) {
    this.dateFormArray.removeAt(index)
  }
  addRow() {
    console.log(this.invoiceForm, "adasdasd")
    this.dataSourceTwo.filter = "";
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      // idNo: [""],
      dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
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
  }
  updateCurrency(event) {
    this.currencyName = event.target.value
  }
  updateInvoicedate(event) {
    this.InvoiceFdate = event.target.value;
  }
  invoiceFormBuild() {
    this.invoiceForm = this.fb.group({
      invDueDate: ['', Validators.required],
      invId: ['', Validators.required],
      // buyerAddr: ['', Validators.required],
      billNo: ['', Validators.required],
      invAmt: ['', Validators.required],
      invDate: ['', Validators.required], 
      dispDate: ['', Validators.required],
      smeId: localStorage.getItem("userId"),
      // invCcy: "",
      goodsDetails: this.fb.array([]),
      invCcy:['',Validators.required],

      // buyer details
      email: [''],
      buyerName: ['', Validators.required],
      buyerUEN: ['', Validators.required],
      phoneNo:[''],
      buyerAddr:[''],
      addressLine1:[''],
      addressLine2:[''],
      city:[''],
      postalCode:[''],
      companyName:['',Validators.required]
    });
  }
  get dateFormArray(): FormArray {
    return this.invoiceForm.get('goodsDetails') as FormArray;
  }
  changeRowgrid(index) {
    this.invoiceForm.value.goodsDetails.forEach(element => { element.ID = this.invoiceID });
    this.invoiceForm.value.goodsDetails[index]["amt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["rate"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["rate"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) : "0"
    this.invoiceForm.value.goodsDetails[index]["netAmtPay"] = parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) : '0'
    this.invoiceForm.value.goodsDetails[index]["taxAmt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 ? parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 : "0"
    this.invoiceForm.value.goodsDetails[index]["total"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) : '0'
    this.invoiceForm.value.goodsDetails[index]["amtCcy"] = this.currencyName
    this.dateFormArray.patchValue(this.invoiceForm.value.goodsDetails);
  }
  onKey(value) {
    this.optionDatas = this.search(value);
  }
  invoiceId(Id) {
    this.invoiceID = Id
  }
  search(value: string) {
    let filter = value.toLowerCase();
    return this.optionDatas.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  getAllCountry() {
    this.IccCountryServices.getAllcountry().subscribe(resp => {
      let countryArray = []
      resp && resp.map(item => {
        let obj = { id: item.countrycode3, itemName: item.country }
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
