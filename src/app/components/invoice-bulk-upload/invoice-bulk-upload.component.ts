import { Component, OnInit } from '@angular/core';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from "xlsx";
import * as Papa from 'papaparse';
import { InvoiceRequestServices } from '../invoice-request/invoice-service';
import * as moment from 'moment';

import { ToastrService } from 'ngx-toastr';

export interface invoiceData {
  invref: any;
  invDueDate: any;
  invId: any;
  id: String;
  RefNo: String;
  invoiceId: String;
  invoiceDate: String;
  buyerName: String;
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

  constructor(private toastr: ToastrService,private invoiceRequestServices: InvoiceRequestServices) { }

  ngOnInit(): void {
    this.getInvDetailsLists()
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
    if(file.type === "text/csv"){
     this.onChangess(file)
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
 
 
}
