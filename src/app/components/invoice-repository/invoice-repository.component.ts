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
  displayedColumnsTwo: string[] = [
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
  displayedColumns: string[] = ['DocumentNumber', 'RUC', 'AuthorizationDate', 'InvoiceDate', 'IdentificatioNumberBuyer', 'PDF', 'XML'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userDeatils: any;
  isDisabled: boolean;
  currencyAMT: string;
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  type: any
  FileData: any;
  pdfSrc
  XMLdata
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
      invId: ['', Validators.required],
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
    if (type === 'PDF') {
      this.pdfSrc = 'data:application/pdf;base64,' + EncryptedFile
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
}