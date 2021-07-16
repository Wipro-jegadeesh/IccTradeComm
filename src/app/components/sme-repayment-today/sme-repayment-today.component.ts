
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { Repayment_todayServices } from './sme-repayment-today-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface financeForBiddingData {
  invoiceRef: String;
  invId: String;
  invAmt: String;
  smeId: String;
  buyerName: String;
  invDate: String;
  invDueDate: String;
  status: String;
}
const ELEMENT_DATA: financeForBiddingData[] = [];

export interface goodsDetails {
  descGoods: String;
  idNo: String;
  dateOfInvoice: String;
  quantity: String;
  rate: String;
  amt: String;
  discAmt: String;
  netAmtPay: String;
  taxRate: String;
  taxAmount: String;
  total: String;
}
const GOODS_DATA: goodsDetails[] = [];


export interface invoiceDetails { 'invId': String, 'invDate': String, 'buyerName': String, 'invAmt': String, 'status': String }
const INVOICE_DATA: invoiceDetails[] = [];


export interface biddingDetails {
  'financeOfferAmt': String, 'ccy': String, 'fxRate': String, 'margin': String, 'netAmtDisc': String, 'discAmt': String, 'discRate': String, 'offerExpPeriod': String
}
const BIDDING_DATA: biddingDetails[] = [];

@Component({
  selector: 'sme-repayment-today.',
  templateUrl: './sme-repayment-today.component.html',
  styleUrls: ['./sme-repayment-today.component.scss']
})
export class Repayment_todayComponent implements OnInit {

  repaymentTableHeaders: Array<string> = ['invoiceRef', 'invId', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  repaymentDataList = new MatTableDataSource(ELEMENT_DATA);


  goodsTableHeaders: Array<string> = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  goodsDetailsTableData = new MatTableDataSource(GOODS_DATA); //data

  invoiceTableData = new MatTableDataSource(INVOICE_DATA); //data
  invoiceTableHeaders: Array<string> = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  biddingTableData = new MatTableDataSource(BIDDING_DATA); //data
  displayedColumnsThree: Array<string> = [
    'id', 'finId', 'invoiceId', 'fxRate', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'repaymentDate',
    'baseCcyNetAmtPayable', 'annualYeild']


  mobileScreen = false;
  modalRef: BsModalRef;
  bidPanelOpenState = false;
  moment: any = moment;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @HostListener('window:resize', [])
  displayedColumnsload: Array<string> = [
    'TopBar',
  ]
  displayedColumnsearch: Array<string> = [
    'Search',
  ]
  displayedColumnFilter: Array<string> = [
    'Filter',
  ]
  SearchModel = {}
  value: number = 0;
  highValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min</b> $" + value;
        case LabelType.High:
          return "<b>Max</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  searchForm: FormGroup;
  public getSmeName: any = []

  constructor(private fb: FormBuilder,public router: Router,
     private modalService: BsModalService,
      private AcceptedFinanceServices: Repayment_todayServices) { }

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getRepaymentDueDatas()
  }
  //get repayment due data list
  getRepaymentDueDatas(){
    this.repaymentDataList = new MatTableDataSource([]);
    this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {
      if(resp && resp.length){
      this.repaymentDataList = new MatTableDataSource(resp);
      this.repaymentDataList.paginator = this.paginator
    }
    })
  }
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  //function to build search filter form
  buildSearchForm() {
    this.searchForm = this.fb.group({
      invoiceRef: [''],
      invoiceId: [''],
      smeId:[''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  //search click function
  onSearch() {
    this.AcceptedFinanceServices.searchFinanceFunded(this.searchForm.value).subscribe(resp => {
      this.repaymentDataList = new MatTableDataSource(resp);
      this.repaymentDataList.paginator = this.paginator
    })
  }
  //reset filter/search function
  onFilterReset() {
    this.buildSearchForm();
    this.AcceptedFinanceServices.searchFinanceFunded('').subscribe(resp => {
      this.repaymentDataList = new MatTableDataSource(resp);
      this.repaymentDataList.paginator = this.paginator

    })
  }
  //show /hide search section
  enableSearchSection() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  //show /hide filter section
  enableFilterSection() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  //popup function show invoice & good details for particular invoice
  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.getInvoiceDetails(data.id)
    this.getFinancingDetails(data.invoiceId)
  }
  //get invoice details
  getInvoiceDetails(invoiceId){
    this.AcceptedFinanceServices.getInvoiceRequestLists(invoiceId).subscribe(resp => {
      this.invoiceTableData = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);
      this.goodsDetailsTableData = new MatTableDataSource(resp.goodsDetails);

    })
  }
  //get financing details
  getFinancingDetails(financeId){
    this.AcceptedFinanceServices.getAcceptedFinanceDetails(financeId).subscribe(resp => {
      if (resp) {
        this.biddingTableData = new MatTableDataSource(resp);
      }
    })
  }
}