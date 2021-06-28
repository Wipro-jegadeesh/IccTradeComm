
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Repayment_overdueServices } from './sme-repayment-overdue-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
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
const INVOICE_DATA: invoiceDetails[] = [];


export interface biddingDetails {
  'financeOfferAmt': String, 'ccy': String, 'fxRate': String, 'margin': String, 'netAmtDisc': String, 'discAmt': String, 'discRate': String, 'offerExpPeriod': String
}
const BIDDING_DATA: biddingDetails[] = [];

@Component({
  selector: 'sme-repayment-overdue.',
  templateUrl: './sme-repayment-overdue.component.html',
  styleUrls: ['./sme-repayment-overdue.component.scss']
})
export class Repayment_overdueComponent implements OnInit {

  displayedColumns: string[] = ['invId', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data

  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree = new MatTableDataSource(BIDDING_DATA); //data
  displayedColumnsThree: string[] = [
    'id', 'finId', 'invoiceId', 'fxRate', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'repaymentDate',
    'baseCcyNetAmtPayable', 'annualYeild']


  isOpen = ""
  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;

  bidpanelOpenState = false;
  moment: any = moment;
  public getSmeName: any = []


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @HostListener('window:resize', ['$event'])
  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
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
  Searchform: FormGroup;

  constructor(private fb: FormBuilder,public router: Router, private modalService: BsModalService, private AcceptedFinanceServices: Repayment_overdueServices,private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    // this.getsmeNameId()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildform()
    this.dataSource = new MatTableDataSource([{
      buyerAddr: "Singapore",
      buyerName: "Tata Steel",
      dispDate: "17/03/2021",
      id: 2,
      invAmt: "10000",
      invCcy: "SGD",
      invDate: "17/03/2021",
      invDueDate: "17/06/2021",
      invId: "INV102",
      smeId: "SME101",
      status: "A"
    }]);

    this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {

      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
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
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      invoiceId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  SearchAPI() {
    this.AcceptedFinanceServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.buildform();
    this.AcceptedFinanceServices.searchFinanceFunded('').subscribe(resp => {
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

    this.AcceptedFinanceServices.getInvoiceRequestLists(data.id).subscribe(resp => {

      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);

    })

    this.AcceptedFinanceServices.getAcceptedFinanceDetails(data.invoiceId).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })
  }
}


