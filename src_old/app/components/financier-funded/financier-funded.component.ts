

import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { FinancierFundedServices } from './financier-funded-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options,LabelType } from '@angular-slider/ngx-slider';
import {MatSort} from '@angular/material/sort';

export interface financeForBiddingData {
  invoiceRef: String;
  invoiceAmt: Number;
  smeId: String;
  buyerName: String;
  invoiceDate: String;
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

export interface paymentDetails {
  paymentRef: String;
  paymentType: String;
  paymentDate : String;
  paymentAmount: String;
  benName: String;
  benAccount: String;
  benIfsc: String;     
  netAmount: String;
}
const PAYMENT_DATA: paymentDetails[] = [];




export interface invoiceDetails {'invId': String,'invDate': String,'buyerName': String,'invAmt': String,'status': String}
const INVOICE_DATA: invoiceDetails[] = [];


export interface biddingDetails {
  'financeOfferAmt' : String, 'ccy' : String, 'fxRate' : String, 'margin' : String, 'netAmtDisc' : String,'discAmt' : String,'discRate' : String,'offerExpPeriod' : String}
const BIDDING_DATA: biddingDetails[] = [];

// @Component({
//   selector: 'app-sme-financefor-bidding',
//   templateUrl: './sme-financefor-bidding.component.html',
//   styleUrls: ['./sme-financefor-bidding.component.scss']
// })

// export class SmeFinanceforBiddingComponent implements OnInit {

 @Component({
  selector: 'app-financier-funded',
  templateUrl: './financier-funded.component.html',
  styleUrls: ['./financier-funded.component.scss']
})
export class FinancierFundedComponent implements OnInit {

  displayedColumns: string[] = ['invoiceRef', 'invoiceAmt', 'smeId', 'buyerName', 'invoiceDate', 'invDueDate', 'status','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); 
 

  displayedColumnsOne: string[] = ['descGoods', 'quantity','taxRate','amt','rate','total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data



  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree = new MatTableDataSource(BIDDING_DATA); //data
  displayedColumnsThree: string[] = [
    'id','finId','invoiceId','fxRate','baseCcyAmt' ,'fundablePercent' ,'baseCcyFundingAmt' ,'repaymentDate' ,
    'baseCcyNetAmtPayable', 'annualYeild' ]
  // ['financierRef', 'financier', 'invoiceAmt',  'marginPercent',   'financierAmt',   'discRate', 'discAmt',  'netAmtDisc',    'fundedAmt', 'fxRate', 'dateOfFunding', 'tenorDays', 
  //   'dueDate', 'paymentDate', 'relInvRef',  'relBidRef'];
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

  displayedColumnsPayment: string[] = [  
     "paymentRef",
  "paymentType",
  "paymentDate" ,
  "paymentAmount",
  "benName",
  "benAccount",
  "benIfsc",     
  "netAmount",

    // 'descGoods', 'quantity','taxRate','amt','rate','total'
  ];
  dataSourcePayment = new MatTableDataSource(PAYMENT_DATA); //data


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
  moment: any = moment;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
   filterDivOpen: boolean;
   searchDivOpen: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService, private FinancierFundedServices: FinancierFundedServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource = new MatTableDataSource([{​​​​​​​​
        "id": 1,
        "smeId": "SME101",
        "invoiceRef": "INV202100010",
        "invoiceNo": "111",
        "invoiceAmt": 1000.0,
        "invoiceCcy": "SGD",
        "buyerName": "sds",
        "invoiceDate": "2021-04-08T00:00:00.000+00:00",
        "invDueDate": "2021-04-23T00:00:00.000+00:00",
        "invoiceId": "10",
        "buyerAddr": "chennai",
        "dispDate": "2021-04-22T00:00:00.000+00:00",
        "baseAmt": null,
        "baseCcy": null,
        "fxRate": null,
        "transactionRating": 0,
        "smeRating": 0,
        "source": null,
        "status": "A"
    }​​​​​​​​]);

    this.FinancierFundedServices.getFinanceForBiddingLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;

    })

  }
  SearchAPI(){
    this.FinancierFundedServices.searchFinanceFunded(this.SearchModel).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI(){
    this.SearchModel={};
    this.FinancierFundedServices.getFinanceForBiddingLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator

    })
  }

  searchDiv(){
    if(this.filterDivOpen === true){
    this.searchDivOpen = !this.searchDivOpen
    this.filterDivOpen = !this.filterDivOpen
    }else{
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv(){
    if(this.searchDivOpen === true){
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    }else{
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  public scrollRight(): void {
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: 'smooth',
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
  }

  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
   
    this.FinancierFundedServices.getInvoiceRequestLists(data.id).subscribe(resp => {
      let status = "";
      if (resp.status == "I") {
        status = "Initiated"
      }
      else if (resp.status == "A") {
        status = "Waiting for bid"
      }
      else if (resp.status == "B") {
        status = "Bid Created"
      }
      else {
        status = "Financed Successfully"
      }
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
      
    })


   
    this.dataSourcePayment = new MatTableDataSource( [{
      "paymentRef": "PAY123",
      "paymentType": "online",
      "paymentDate": "1-4-2021" ,
      "paymentAmount": "2000",
      "benName": "test",
      "benAccount":"AC1234" ,
      "benIfsc":"123TY132",     
      "netAmount": "200"
  }])
   

    // this.FinancierFundedServices.getInvoiceRequestLists(data.id).subscribe(resp => {

    //   this.dataSourcePayment = new MatTableDataSource(resp.goodsDetails);
      
    // })


    

    this.FinancierFundedServices.getAcceptedFinanceDetails(data.invoiceId).subscribe(resp => {
      if(resp){
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })

    // this.dataSourceThree = new MatTableDataSource([{'financeOfferAmt' : 'test', 'ccy' : 'test', 'fxRate' : 'test', 'margin' : 'test', 'netAmtDisc' : 'test','discAmt' : 'test','discRate' : 'test','offerExpPeriod' : 'test','offerExpPeriod1' : 'test','offerExpPeriod2' : 'test','offerExpPeriod3' : 'test','offerExpPeriod4' : 'test','offerExpPeriod5' : 'test','offerExpPeriod6' : 'test','offerExpPeriod7' : 'test','offerExpPeriod8' : 'test','offerExpPeriod9' : 'test','offerExpPeriod10' : 'test'}])

  }

  handleToggle(e, status) {
    this.modalDialogService.confirm("Confirm Delete", "Do you really want to change the status ?", "Ok", "Cancel").subscribe(result => {
    })

  }

  goHome() {
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout() {
    this.authenticationService.logout()
  }
}



