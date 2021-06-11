import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccFinanceMasterServices } from './icc-finance-master-service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';

export interface financeForBiddingData {
  invoiceNo: String;
  baseCcyAmt: String;
  smeId: String;
  fundablePercent: String;
  baseCcyFundingAmt: String;
  baseCcyNetAmtPayable: String;
}
const ELEMENT_DATA: financeForBiddingData[] = [];

export interface goodsDetails {
  descGoods: String;
  idNo: String;
  // dateOfInvoice: String;
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
  selector: 'app-icc-finance-master',
  templateUrl: './icc-finance-master.component.html',
  styleUrls: ['./icc-finance-master.component.scss']
})

export class IccFinanceMasterComponent implements OnInit {

  displayedColumns: string[] = ['invoiceRef', 'invoiceNo', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'baseCcyNetAmtPayable', 'smeId', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data



  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree = new MatTableDataSource(BIDDING_DATA); //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc', 'discAmt', 'discRate', 'offerExpPeriod'];


  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  color: ThemePalette = 'warn';
  ischecked = "true"
  bidpanelOpenState = false;
  biddingTooltip = BIDDINGCONSTANTS;
  moment: any = moment;


  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    'NetAmt': Number,
    'invoiceDate': String,
    'invoiceDueDate': String

  }
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
  constructor(public router: Router, private modalService: BsModalService, private IccFinanceMasterServices: IccFinanceMasterServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource = new MatTableDataSource([{
      invoiceNo: "INV102",
      baseCcyAmt: '1000',
      fundablePercent: "10",
      baseCcyFundingAmt: "1000",
      baseCcyNetAmtPayable: "10",
      smeId: "SME101",
    }]);

    this.IccFinanceMasterServices.getFinanceMasterLists().subscribe(resp => {
      console.log(resp, "resp")
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })

  }
  SearchAPI() {
    this.IccFinanceMasterServices.searchFinanceFunded(this.SearchModel).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.SearchModel = {
      'invoiceRef': String,
      'smeId': String,
      'NetAmt': Number,
      'invoiceDate': String,
      'invoiceDueDate': String
    };
    this.IccFinanceMasterServices.getFinanceMasterLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator

    })
  }
  searchDiv() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }

  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.IccFinanceMasterServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);
      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
    })
    this.IccFinanceMasterServices.getFinanceBiddingLists(data.invId).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })
  }
}

