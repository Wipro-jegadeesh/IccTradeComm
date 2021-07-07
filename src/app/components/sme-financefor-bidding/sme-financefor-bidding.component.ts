import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SmeFinancierForBiddingServices } from './sme-financefor-bidding-service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
// import * as moment from 'moment';
declare var require: any
const moment = require('moment');

import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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

  displayedColumns: string[] = ['invoiceRef', 'invoiceNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  dataSource;


  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data



  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree; //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc', 'discAmt', 'discRate', 'offerExpPeriod'];


  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  color: ThemePalette = 'warn';
  ischecked = "true"
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
  Searchform: FormGroup;
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
  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private fb: FormBuilder, private authenticationService: AuthenticationService, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    this.dataSource = new MatTableDataSource([{ 'invoiceRef': "22", 'invoiceNo': "22", 'invAmt': "22", 'smeId': "22", 'buyerName': "22", 'invDate': "2021-07-24T05:30:00.000+0000", 'invDueDate': "2021-07-24T05:30:00.000+0000", 'status': "A" }]);
    this.dataSource.paginator = this.paginator

    // this.getsmeNameId();

    this.SmeFinancierForBiddingServices.getFinanceForBiddingLists().subscribe(resp => {

    // resp.forEach(element1 => {
    // this.getSmeName.forEach(element2 => {
    // if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
    // element1.smeId = element2.smeName
    // }
    // });
    // });

    this.dataSource = new MatTableDataSource(resp);
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    })
    this.buildform()
  }
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      smeId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  searchApi() {
    this.SmeFinancierForBiddingServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }
  resetApi() {
      this.Searchform.reset();
    this.buildform();
    this.SmeFinancierForBiddingServices.getFinanceForBiddingLists().subscribe(resp => {

      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });

      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
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
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
    this.getSmeName = resp;
    })
    }
    

  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg sme-fin-modal' });

    this.SmeFinancierForBiddingServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {

      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'invCcy': resp.invCcy, 'status': resp.status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);

    })
    this.SmeFinancierForBiddingServices.getFinanceBiddingLists(data.invoiceNo).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })
  }

}

