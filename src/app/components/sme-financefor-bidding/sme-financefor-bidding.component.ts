import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SmeFinancierForBiddingServices } from './sme-financefor-bidding-service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var require: any
const moment = require('moment');

export interface goodsDetails {
  descGoods: String;
  idNo: String;
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

@Component({
  selector: 'app-sme-financefor-bidding',
  templateUrl: './sme-financefor-bidding.component.html',
  styleUrls: ['./sme-financefor-bidding.component.scss']
})

export class SmeFinanceforBiddingComponent implements OnInit {

  financeReqHeaders: string[] = ['invoiceRef', 'invoiceNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  financeRequestDatas;
  goodsTableHeaders: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  goodsDetailDatas = new MatTableDataSource(GOODS_DATA); //data
  invoiceDetailDatas = new MatTableDataSource(INVOICE_DATA); //data
  invoiceTableHeaders: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];
  dataSourceThree; //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc', 'discAmt', 'discRate', 'offerExpPeriod'];
  mobileScreen = false;
  modalRef: BsModalRef;
  bidpanelOpenState = false;
  biddingTooltip = BIDDINGCONSTANTS;
  moment: any = moment;
  public getSmeName: any = []

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  @HostListener('window:resize', ['$event'])
  public accountList: ElementRef<any>;


  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  SearchModel = {
    'invoiceRef': String,
    'smeId': String,
    'buyerName': String,
    'invoiceDate': String,
    'invoiceDueDate': String

  }
  searchForm: FormGroup;
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
  constructor(public router: Router, private modalService: BsModalService,
    private fb: FormBuilder, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getFinanceReqData()
    this.searchFormBuild()
  }
  //get open funding request table datas
  getFinanceReqData() {
    this.financeRequestDatas = new MatTableDataSource([{ 'invoiceRef': "22", 'invoiceNo': "22", 'invAmt': "22", 'smeId': "22", 'buyerName': "22", 'invDate': "2021-07-24T05:30:00.000+0000", 'invDueDate': "2021-07-24T05:30:00.000+0000", 'status': "A" }]);
    this.financeRequestDatas.paginator = this.paginator
    // this.getsmeNameId();
    this.SmeFinancierForBiddingServices.getFinanceForBiddingLists().subscribe(resp => {
      if (resp && resp.length) {
        this.financeRequestDatas = new MatTableDataSource(resp);
        this.financeRequestDatas.paginator = this.paginator
        this.financeRequestDatas.sort = this.sort;
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
  //search filter form build function
  searchFormBuild() {
    this.searchForm = this.fb.group({
      invoiceRef: [''],
      smeId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  //Search api call
  onSearch() {
    this.SmeFinancierForBiddingServices.searchFinanceFunded(this.searchForm.value).subscribe(resp => {
      this.financeRequestDatas = new MatTableDataSource(resp);
      this.financeRequestDatas.paginator = this.paginator
      this.financeRequestDatas.sort = this.sort;
    })
  }
  //Reset search /filter datas
  onReset() {
    this.searchForm.reset();
    this.searchFormBuild();
    this.getFinanceReqData();
  }
  //function to show /hide search section
  onEnableSearch() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  //function to show /hide filter section
  onEnableFilter() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  //Currently not in use (****future purpose****)
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
      this.getSmeName = resp;
    })
  }
  //popup function to show a invoice & goods details
  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg sme-fin-modal' });
    this.getInvoiceDetails(data)
    this.SmeFinancierForBiddingServices.getFinanceBiddingLists(data.invoiceNo).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })
  }
  //get invoice & goods details for particular invoice request
  getInvoiceDetails(data) {
    this.SmeFinancierForBiddingServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {
      if (resp) {
        this.invoiceDetailDatas = new MatTableDataSource([
          { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'invCcy': resp.invCcy, 'status': resp.status }
        ]);
        this.goodsDetailDatas = new MatTableDataSource(resp.goodsDetails);
      }
    })
  }
}