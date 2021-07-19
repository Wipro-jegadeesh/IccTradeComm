
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { Repayment_overdueServices } from './sme-repayment-overdue-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';

export interface financeForBiddingData {
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
const INVOICE_DATA: invoiceDetails[] = [];export interface biddingDetails {
  'financeOfferAmt': String, 'ccy': String, 'fxRate': String, 'margin': String, 'netAmtDisc': String, 'discAmt': String, 'discRate': String, 'offerExpPeriod': String
}
const BIDDING_DATA: biddingDetails[] = [];

@Component({
  selector: 'sme-repayment-overdue.',
  templateUrl: './sme-repayment-overdue.component.html',
  styleUrls: ['./sme-repayment-overdue.component.scss']
})
export class Repayment_overdueComponent implements OnInit {

  overdueTableHeaders: Array<string> = ['invId', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  overdueDatas = new MatTableDataSource(ELEMENT_DATA);


  goodsDetailsHeaders: Array<string> = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  goodsDetailDatas = new MatTableDataSource(GOODS_DATA); //data

  invoiceDatas = new MatTableDataSource(INVOICE_DATA); //data
  invoiceTableHeaders: Array<string> = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  biddingDatas = new MatTableDataSource(BIDDING_DATA); //data
  biddingTableHeaders: Array<string> = [
    'id', 'finId', 'invoiceId', 'fxRate', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'repaymentDate',
    'baseCcyNetAmtPayable', 'annualYeild']


  mobileScreen = false;
  modalRef: BsModalRef;

  bidpanelOpenState = false;
  moment: any = moment;
  public getSmeName: any = []


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
  value = 0;
  highValue = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value, label: LabelType): string => {
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
  Searchform: FormGroup;

  constructor(private fb: FormBuilder, public router: Router,
    private modalService: BsModalService, private AcceptedFinanceServices: Repayment_overdueServices
    , private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }

  ngOnInit() {
    // this.getsmeNameId()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildSearchForm()
    this.getRepaymentOverdueData()
  }
  //get repayment overdue data
  getRepaymentOverdueData() {
    this.overdueDatas = new MatTableDataSource([]);
    this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {
      if (resp) {
        this.overdueDatas = new MatTableDataSource(resp);
        this.overdueDatas.paginator = this.paginator
      }
    })
  }
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
      this.getSmeName = resp;
    })
  }
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  //build form for search filters
  buildSearchForm() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      invoiceId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  //search api call
  onSearch() {
    this.AcceptedFinanceServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      if (resp) {
        this.overdueDatas = new MatTableDataSource(resp);
        this.overdueDatas.paginator = this.paginator;
      }
    })
  }
  //reset search data..
  onResetSearch() {
    this.buildSearchForm();
    this.AcceptedFinanceServices.searchFinanceFunded('').subscribe(resp => {
      this.overdueDatas = new MatTableDataSource(resp);
      this.overdueDatas.paginator = this.paginator

    })
  }
  //function to show /hide a search section
  onEnableSearch() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  //function to show /hide a filter section
  onEnableFilter() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  //modal /popup to show invoice & goods details
  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.getInvoiceDetails(data.id)
    this.getFinancingDetails(data.invoiceId)
  }
  //get invoice details
  getInvoiceDetails(invoiceId) {
    this.AcceptedFinanceServices.getInvoiceRequestLists(invoiceId).subscribe(resp => {
      this.invoiceDatas = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);
      this.goodsDetailDatas = new MatTableDataSource(resp.goodsDetails);

    })
  }
  //get financing details
  getFinancingDetails(financeId) {
    this.AcceptedFinanceServices.getAcceptedFinanceDetails(financeId).subscribe(resp => {
      if (resp) {
        this.biddingDatas = new MatTableDataSource(resp);
      }
    })
  }
}