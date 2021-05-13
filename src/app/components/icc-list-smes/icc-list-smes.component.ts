import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params,NavigationExtras,NavigationStart } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccListSmeServices } from './icc-list-smes.service';
import { BIDDINGCONSTANTS} from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { map,filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  invoiceRef : String;
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
  selector: 'app-icc-list-smes',
  templateUrl: './icc-list-smes.component.html',
  styleUrls: ['./icc-list-smes.component.scss']
})

export class IccListSmesComponent implements OnInit {
  // appstate$: Observable<object>;

  displayedColumns: string[] = ['smeprofileID','registrationNumber','companyId','cmpName', 'smeRating','status','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
 

  displayedColumnsOne: string[] = ['descGoods', 'quantity','taxRate','amt','rate','total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data

  @ViewChild(MatPaginator) paginator: MatPaginator;


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
  // displayedColumnsload: string[] = [
  //   'TopBar',
  // ]
  // displayedColumnsearch: string[] = [
  //   'Search',
  // ]
  // displayedColumnFilter: string[] = [
  //   'Filter',
  // ]
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
  
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  message: string;
  userValue: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService, private iccListSmeServices: IccListSmeServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    // this.appstate$ = this.router.events.pipe(
    //   filter(e => e instanceof NavigationStart),
    //   map(() => {
    //   const currentState = this.router.getCurrentNavigation();
    //   return currentState.extras.state;
    //   })
    //   );

    this.dataSource = new MatTableDataSource([{
      invoiceRef : 'TR123',
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

    this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })

  }

 displayMessage(e,template,regNumb){
  console.log(e,"uii")
 if(e.checked){
   this.message = 'A'
 }
 else{
   this.message = 'R'
 }
 // nationalId
 this.openModal(e,template,regNumb)
 // let obj={
 //   status : this.message
 // }

 // this.IccUserCreationsService.statusChange(regNumb,obj).subscribe(resp => {
 //     this.IccUserCreationsService.getAllFundingList().subscribe(resp => {
 //       this.dataSource = new MatTableDataSource(resp);
 //       this.dataSource.paginator = this.paginator
 //     })
 // })
  
}
openModal(event, template, data) {
 this.userValue = data
 this.modalRef = this.modalService.show(template, { class: 'modal-md' });
}
ActiveuserNo(){
 this.modalRef.hide();
 this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
  const ELEMENT_DATA: financeForBiddingData[] = resp;
  this.dataSource = new MatTableDataSource(resp);
  this.dataSource.paginator = this.paginator
 })
}
Activeuser(data){
 let obj={
   status : this.message
 }
 console.log(this.userValue,"this.userValue")
 this.modalRef.hide();
 this.iccListSmeServices.statusChange(this.userValue.registrationNumber,obj).subscribe(resp => {
  this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
    const ELEMENT_DATA: financeForBiddingData[] = resp;
    this.dataSource = new MatTableDataSource(resp);
    this.dataSource.paginator = this.paginator
   })
 })
}
  SearchAPI(){
    // this.IccInvoiceMasterServices.searchFinanceFunded(this.SearchModel).subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator
    // })
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
  navigateToSmeDetails(path,smeData){
    let data: NavigationExtras = {
      queryParams: {
      "companyId":smeData.registrationNumber, 
      "companyName":smeData.name,
      "country": "SGP"
      }
    }
    this.router.navigate([path], { state: { smeData: data } });
  }

}


