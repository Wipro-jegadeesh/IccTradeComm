import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceRequestServices } from '../invoice-request/invoice-service';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as XLSX from "xlsx";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-invoice-repository',
  templateUrl: './invoice-repository.component.html',
  styleUrls: ['./invoice-repository.component.scss']
})

export class InvoiceRepositoryComponent implements OnInit {
  invoiceForm: FormGroup;
  tcode: string;
  invoiceID: any;
  currencyName: any;
  InvoiceFdate: any
  moment: any = moment;
  invoicedata = {
    RefNo: "",
    id: "",
    invId: "",
    invoiceId: "",
    invoiceDate: "",
    buyerName: "",
    InvoiceAmount: "",
    invDueDate: "",
    invref: ""
  };

  dataSourceTwo = new MatTableDataSource(); //data
  displayedColumnsTwo: Array<string> = [
    'goodsId',
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
    'status'
  ];

  dataSource
  tooltipPosition = "below";
  modalRef: BsModalRef;
  displayedColumns: Array<string> = ['DocumentNumber', 'RUC', 'AuthorizationDate', 'InvoiceDate', 'IdentificatioNumberBuyer', 'PDF'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userDeatils: any;
  isDisabled: boolean;
  currencyAMT: string;
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  type: any
  FileData: any;
  pdfSrc
  XMLdata
  FileType: any;
  PDFData: any;
  FileXMLType
  constructor(private modalService: BsModalService, private activatedRoute: ActivatedRoute, public translate: TranslateService, public router: Router,
    private invoiceRequestServices: InvoiceRequestServices, private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.FileData = this.router.getCurrentNavigation().extras.state;
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit() { //Initially works after constructor
    this.isDisabled = this.type === 'repository' ? true : this.type === 'manual' ? false : false
    this.userDeatils = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : { role: 'Authorise' }
    if (this.FileData && this.FileData.FileData.queryParams.type === 'updateRepo') {
      this.invoiceFormpatch()
    }
  }
  invoiceFormBuild() {//form build in initial stage
    this.invoiceForm = this.fb.group({
      invId: [''],
      billNo: [''],
      buyerName: [''],
      invFromDate: [''],
      invToDate: ['']
    })
  }
  invoiceFormpatch() {  //set hardcode data using patchValue
    this.invoiceForm.patchValue({
      invId: ['4500'],
      billNo: ['400'],
      buyerName: ['apple'],
      invFromDate: [''],
      invToDate: ['']
    })
    this.SearchInovice()
  }
  openModal(event, template, EncryptedFile, type) { //prview modal popup to view data
    this.pdfSrc = ""
    this.XMLdata = ""
    if (type === 'PDF' && !this.PDFData) {
      this.pdfSrc = 'data:application/pdf;base64,' + EncryptedFile
    }else if(this.PDFData){
      this.pdfSrc = EncryptedFile
    } else {
      this.XMLdata = atob(EncryptedFile)
    }
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  getInvDetailsLists() { //get invoice data
    if (this.invoiceForm && this.invoiceForm.value && this.invoiceForm.value.invId) {
      this.invoiceRequestServices.getInvoice('1790899780001', this.invoiceForm.value.invId).subscribe(resp => {
        let array = []
        array.push(resp)
        this.dataSource = new MatTableDataSource(array);
      })
    } else {
      this.toastr.error('Please fill document number')
    }
  }
  SearchInovice() { //to search invoice details
    this.getInvDetailsLists()
  }
  UploadInovice(){
    if(this.PDFData && this.XMLdata){
      this.dataSource = new MatTableDataSource([{
        "RUC": "1790899780001",
        "DocumentCode": "01",
        "DocumentNumber": "001-019-000098259",
        "DoceStatusID": "5",
        "ClaveAcceso": "1506202101179089978000120010190000982590009825913",
        "AuthorizationNumber": "1506202101179089978000120010190000982590009825913",
        "AuthorizationDate": "2021-06-15T09:00:56",
        "InvoiceDate": "2021-06-15T00:00:00",
        "DoceMessage": "El documento fue recibido y pasó todas las validaciones de autorización. El documento tiene el estatus de AUTORIZADO.",
        "RazonSocialBuyer": "GARCIA BENITEZ ANDREA MARIA",
        "IdentificatioNumberBuyer": "1709155632001",
        "ErrorCode": "0",
        "ErrorMessage": "",
        "EncryptedFilePDF": this.PDFData,
        "EncryptedFileXML": this.XMLdata
      }]);
    }else{
      this.toastr.error('Please Upload PDF and XML Files')
    }
  }
  navigateToSmeDetails(datas) { //get navigate page with data
    let path = '/invoice-request/repository'
    let data: NavigationExtras = {
      queryParams: {
        "invoicedata": datas,
        "Type": "updateRepo",
        "searchfield": this.invoiceForm.value
      }
    }
    this.router.navigate([path], { state: { FileData: data } });
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file, "file")
    console.log(file.type, "file")
    // setTimeout(() => {
    // }, 500);
    if (file.type === "application/pdf") {
      this.FileType = file
      this.getBase64(<File>ev.target.files[0]).then((data) => {
        let flName = file.name
        console.log(flName, "flName")
        // console.log(ev.target.files, "ev.target.files")
        this.PDFData = data
        console.log(data, "data")
        let fileName = {
          'fileName': file.name,
          'data': (<string>data).split(',')[1],
          'extension': flName.substring(flName.lastIndexOf('.') + 1, flName.length) || flName
        }
      });

    } 
    else if(file.type === "text/xml"){
      this.FileXMLType = file
      this.getBase64(<File>ev.target.files[0]).then((data) => {
        let flName = file.name
        console.log(flName, "flName")
        // console.log(ev.target.files, "ev.target.files")
        this.XMLdata = data
        console.log(data, "data")
        let fileName = {
          'fileName': file.name,
          'data': (<string>data).split(',')[1],
          'extension': flName.substring(flName.lastIndexOf('.') + 1, flName.length) || flName
        }
      });
    }
    
    // else {
    //   this.PDFData = ''
    //   reader.onload = event => {
    //     const data = reader.result;
    //     workBook = XLSX.read(data, { type: "binary" });
    //     console.log(workBook);
    //     jsonData = workBook.SheetNames.reduce((initial, name) => {
    //       console.log(name)
    //       const sheet = workBook.Sheets[name];
    //       console.log(sheet, "sheet")
    //       initial['invoice'] = XLSX.utils.sheet_to_json(sheet);
    //       return initial;
    //     }, {});
    //     console.log(jsonData, "jsonData")
    //     this.invoicedata = jsonData.invoice
    //   };
    //   reader.readAsBinaryString(file);
    // }
  }
  // function to change file format
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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
          this.invoicedata = result.data
          // this.dataSource = new MatTableDataSource(result);
          // this.dataList = result.data;
        }
      });
    }
  }
}