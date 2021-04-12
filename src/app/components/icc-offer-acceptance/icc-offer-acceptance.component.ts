// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-icc-offer-acceptance',
//   templateUrl: './icc-offer-acceptance.component.html',
//   styleUrls: ['./icc-offer-acceptance.component.scss']
// })
// export class IccOfferAcceptanceComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccOfferAcceptServices } from './icc-offer-accept-service';
import { BIDDINGCONSTANTS, SMEDASHBOARDCONSTANTS} from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';

// const ELEMENT_DATA: any[] = [
//   {
//     Name: '',
//     Position: '',
//     Address: '',
//     TelephoneNo: '',
//     Email: ''
//   }
// ];

export interface financeForBiddingData {
  invNo: String;
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


export interface invoiceDetails {'invId': String,'invDate': String,'buyerName': String,'invAmt': String,'status': String}
const INVOICE_DATA: invoiceDetails[] = [];


export interface biddingDetails {
  'financeOfferAmt' : String, 'ccy' : String, 'fxRate' : String, 'margin' : String, 'netAmtDisc' : String,'discAmt' : String,'discRate' : String,'offerExpPeriod' : String}
const BIDDING_DATA: biddingDetails[] = [];
     
@Component({
  selector: 'app-icc-offer-acceptance',
  templateUrl: './icc-offer-acceptance.component.html',
  styleUrls: ['./icc-offer-acceptance.component.scss']
})

export class IccOfferAcceptanceComponent implements OnInit {

  displayedColumns: string[] = ['invNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayed2Columns: string[] = ['refNo', 'invoiceId', 'invoiceAmt','invDate','invDueDate', 'buyer', 'financiercount','action'];
  financierTooltip=SMEDASHBOARDCONSTANTS;


  displayedColumnsOne: string[] = ['descGoods', 'quantity','taxRate','amt','rate','total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data



  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree = new MatTableDataSource(BIDDING_DATA); //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc','discAmt','discRate','offerExpPeriod'];


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
  isHover: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  AllFundingOpen: boolean;
  data2Source:any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService, private IccOfferAcceptServices: IccOfferAcceptServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource = new MatTableDataSource([{
      buyerAddr: "Singapore",
      buyerName: "Tata Steel",
      dispDate: "17/03/2021",
      id: 2,
      invAmt: "10000",
      invCcy: "SGD",
      invDate: "17/03/2021",
      invDueDate: "17/06/2021",
      invNo: "INV102",
      smeId: "SME101",
      status: "I"
    }]);

    this.IccOfferAcceptServices.getOfferAcceptanceLists().subscribe(resp => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })

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
   
    this.IccOfferAcceptServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {
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
        { 'invId': resp.invId, 'invDate': resp.invDate,'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
      
    })

    // this.dataSourceThree = new MatTableDataSource([
    //   {'financeOfferAmt' : 'financeOfferAmt', 'ccy' : 'ccy', 'fxRate' : 'fxRate', 'margin' : 'margin', 'netAmtDisc' : 'netAmtDisc','discAmt' : 'discAmt','discRate' : 'discRate','offerExpPeriod' : 'offerExpPeriod'}]);

    // this.IccOfferAcceptServices.getFinanceBiddingLists(data.invoiceNo).subscribe(resp => {
    //   if(resp){
    //     this.dataSourceThree = new MatTableDataSource(resp);
    //   }
    // })
  }

  handleToggle(e, status) {
    this.modalDialogService.confirm("Confirm Delete", "Do you really want to change the status ?", "Ok", "Cancel").subscribe(result => {
    })

  }
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl('/icc-offer-acceptance-details/' + type + '/' + id);
  }
  // OpenAllFundingBids(id, type){
  //   this.AllFundingOpen = !this.AllFundingOpen
  //   this.IccOfferAcceptServices.getInvoiceDetails().subscribe(resp => {
  //     console.log(resp);
  //     this.data2Source = new MatTableDataSource(resp);
  //   })
  // }
  goHome() {
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout() {
    this.authenticationService.logout()
  }
}



