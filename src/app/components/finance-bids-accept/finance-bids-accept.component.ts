import { Component, OnInit, ElementRef, HostListener, ViewChild,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FinancebidsRequestServices} from './finance-bids-accept'
import { FINANCIERDASHBOARDCONSTANTS} from '../../shared/constants/constants';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Options,LabelType } from '@angular-slider/ngx-slider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SmeBiddingServices } from '../sme-bidding/sme-bidding-services';

@Component({
  selector: 'app-finance-bids-accept',
  templateUrl: './finance-bids-accept.component.html',
  styleUrls: ['./finance-bids-accept.component.scss']
})
export class FinanceBiddingAcceptsComponent implements OnInit {

  dataSource ;//data
  displayedColumns: string[] = [
    'invoiceRef',
    'invoiceNo',
    'id',
    'invoiceAmt',
    'baseCcyNetAmtPayable', 
    'offerExpDateTime',
    'action'
  ];
  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  datafinancier: any;
  canceldiv: boolean;
  constructor(private smeBiddingServices : SmeBiddingServices,private toastr: ToastrService,private fb: FormBuilder,public router: Router, public authenticationService:AuthenticationService,
  private modalService: BsModalService,private FinanceRequestServices : FinancebidsRequestServices) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('window:resize', ['$event'])
  @ViewChild('accountList', { read: ElementRef })
 
  
  // SearchModel = {
  //   'invoiceRef': String,
  //   'invoiceAmt': Number,
  //   'smeId': String
  // }
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
  modalRef: BsModalRef;
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  bidpanelOpenState = false;
  id = ""
  public accountList: ElementRef<any>;
  dashboardTooltip=FINANCIERDASHBOARDCONSTANTS;
  isHover: boolean = false;
  Rejectform: FormGroup;
  rejectQustionOne = {
    subrejectQustionOne: [
      { name: 'Inv Discount Rate High',labelPosition:'before',formControlName:'Inv_Discount_Low'},
      { name: 'Annual Yield (Basis a360) Too High',labelPosition:'before',formControlName:'Annual_Yield'},
      { name: 'Fundable percentage Less',labelPosition:'before',formControlName:'Fundable_percentage_low'},
      { name: 'Funding Amount Less',labelPosition:'before',formControlName:'Funding_Amount_High' },
    ]
};
rejectQustionTwo = {
  subrejectQustionTwo: [
    { name: 'Net Amt payable (Base CCY) Low',labelPosition:'before',formControlName:'Net_payable'},
    { name: 'Repayment Date Less',labelPosition:'before',formControlName:'Repayment_Date'},
    { name: 'Off Exp date /time Less',labelPosition:'before',formControlName:'Off_date'},
    { name: 'Others',labelPosition:'before',formControlName:'Others'},
  ]
}
TextAreaDiv: boolean;
Searchform: FormGroup;
public issubmitTrue: boolean = false;
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    // this.dataSource = new MatTableDataSource([
    //   {
    //   'invoiceRef' : 'INV101',
    // 'invoiceNo' : '2','id' : '2',
    // 'invoiceAmt' : '5',
    // 'baseCcyNetAmtPayable' : '2', 
    // 'offerExpDateTime' : ''}]);
    //   this.dataSource.paginator = this.paginator
    //   this.dataSource.sort = this.sort;

   this.FinanceRequestServices.getBidingAcceptDetails().subscribe(resp => {
     if(resp){
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
     }
    })
  }
  buildsearchform() {
    this.Searchform = this.fb.group({
      BidId: [''],
      invoiceAmount:[''],
      BiddingAmt: [''],
    })
  }
  SearchAPI() {
    this.FinanceRequestServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.buildsearchform();
  
    this.FinanceRequestServices.getBidingAcceptDetails().subscribe(resp => {
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
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
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

  isOpenHandle(isTrue){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
  }
  navigateFinanceBidding(){
      this.router.navigateByUrl('/finance-bidding');
  }
  logout(){
  this.authenticationService.logout()
  }
  goHome(){
    this.router.navigateByUrl('/financier-dashboard');
  }
  navigateFinanceDetails(id,type){
    this.router.navigateByUrl('/financier-bids-accept-Details/'+type+'/'+id);
  }
  backtolist(){
    this.canceldiv = false
    this.ngOnInit()
  }
  openModal(event,index,financier) {
    // console.log(template,"template")
    // console.log(financier,"financier")
    // console.log(index,"index")
    // console.log(event,"event")
    if(index === 'reject'){
      this.TextAreaDiv = true
      this.canceldiv = true
      this.buildform()
      event.preventDefault();
      this.Rejectform.get('OthersRemarks').setValidators([Validators.required]);
      this.Rejectform.get('OthersRemarks').updateValueAndValidity();
      this.datafinancier = financier
      // this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }
  }
  buildform() {
    this.Rejectform = this.fb.group({
      Inv_Discount_Low: [false],
      Annual_Yield: [false],
      Fundable_percentage_low: [false],
      Funding_Amount_High: [false],
      Net_payable: [false],
      Base_Amount: [false],
      invoiceAmt: [false],
      Repayment_Date: [false],
      Funding_CCY: [false],
      Off_date:[false],
      Others:[false],
      OthersRemarks:['']
    })
  }
  updateAllComplete(text){
    console.log(text,"text")
    if(text === 'Others'){
      this.Rejectform.get('OthersRemarks').setValidators([Validators.required]);
      this.Rejectform.get('OthersRemarks').updateValueAndValidity();
      this.TextAreaDiv = !this.TextAreaDiv
    }
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.Rejectform.controls[controlName].hasError(errorName);
  }
  rejectBid(){
    console.log(this.datafinancier.id,"usus")
    console.log(this.Rejectform.value,"this.finBidform.value")
    console.log(this.Rejectform,"this.Rejectform")
    // if (this.Rejectform.invalid) {
    //   alert("Please fill Mandatory fields")
    //   return;
    // }
    // if (this.Rejectform.status === "INVALID"){
    //   throw { "mes": "Please fill mendatory  fields" }
    // }
    let obj = {
      Remarks : this.Rejectform.value
    }
    if (this.Rejectform.valid){
    this.FinanceRequestServices.CancelBidingAccept(this.datafinancier.id,'').subscribe(resp => {
      this.toastr.success("Cancel successfully")
        // this.modalRef.hide()
        this.Rejectform.reset();
        this.canceldiv = false
        this.ngOnInit()
        this.router.navigateByUrl('/financier-bids-accept');
      })
 
  }else{
    this.toastr.error("Please Fill Remark and Submit")
  }
}
}
