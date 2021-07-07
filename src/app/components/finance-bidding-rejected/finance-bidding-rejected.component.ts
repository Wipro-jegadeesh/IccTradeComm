import { Component, OnInit, ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { InvoiceDetailsRejectedComponent } from './invoice-details-rejected/invoice-details-rejected.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FinanceBiddingRejectedServices } from './finance-bidding-rejected-service'
import { FINANCIERDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options,LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-finance-bidding-rejected',
  templateUrl: './finance-bidding-rejected.component.html',
  styleUrls: ['./finance-bidding-rejected.component.scss']
})
export class FinanceBiddingRejectedComponent implements OnInit {
  @Input() InvoiceDetailsRejectedComponent: InvoiceDetailsRejectedComponent;
 
  constructor(private fb: FormBuilder,public router: Router, public authenticationService: AuthenticationService,
    private modalService: BsModalService, private FinanceBiddingRejectedServices: FinanceBiddingRejectedServices) { }

  dataSource;//data
  displayedColumns: string[] = [
    'BIDID',
    'Invoice Amount',
    'BIDing Amount',
    'offer Expires',
    'remark',
    'action'
  ]
  TextAreaDiv: boolean;
  FinancebiddingDetails: any;
  searchDivOpen: boolean;
  filterDivOpen: boolean;
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  bidpanelOpenState = false;
  id = ""
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  @HostListener('window:resize', ['$event'])
  modalRef: BsModalRef;
  isHover: boolean = false;
  Rejectform: FormGroup;
  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  Searchform: FormGroup;
  SearchModel = {
    'invoiceRef': String,
    'invoiceAmt': Number,
    'smeId': String,
    

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
  rejectQustionOne = {
    subrejectQustionOne: [
      { name: 'Inv Discount Rate High',labelPosition:'before',formControlName:'invDiscountLow'},
      { name: 'Annual Yield (Basis a360) Too High',labelPosition:'before',formControlName:'annualYield'},
      { name: 'Fundable percentage Less',labelPosition:'before',formControlName:'fundablepercentagelow'},
      { name: 'Funding Amount Less',labelPosition:'before',formControlName:'fundingAmountHigh' },
    ]
};
rejectQustionTwo = {
  subrejectQustionTwo: [
    { name: 'Net Amt payable (Base CCY) Low',labelPosition:'before',formControlName:'netPayable'},
    { name: 'Repayment Date Less',labelPosition:'before',formControlName:'repaymentDate'},
    { name: 'Off Exp date /time Less',labelPosition:'before',formControlName:'offDate'},
    { name: 'others',labelPosition:'before',formControlName:'others'},
  ]
}

submit(){

}

updateAllComplete(text){
  console.log(text,"text")
  if(text === 'others'){
    console.log(text,"text")

    
  }
}

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildfromReload()
    this.buildsearchform()
    this.FinanceBiddingRejectedServices.getInvoiceDetails().subscribe(resp => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }
 
  buildsearchform() {
    this.Searchform = this.fb.group({
      BidId: [''],
      invoiceAmount:[''],
      BiddingAmt: [''],
    })
  }
  searchApi() {
    this.FinanceBiddingRejectedServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  resetApi() {
    this.Searchform.reset();
    this.buildsearchform();
  
    this.FinanceBiddingRejectedServices.getInvoiceDetails().subscribe(resp => {
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

  isOpenHandle(isTrue) {
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
  }
  navigateFinanceBidding() {
    this.router.navigateByUrl('/finance-bidding');
  }
  logout() {
    this.authenticationService.logout()
  }
  goHome() {
    this.router.navigateByUrl('/financier-dashboard');
  }
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl('/finance-bidding-rejected/' + type + '/' + id);
  }
  openModal(event,template,id) {
    this.FinanceBiddingRejectedServices.getRemarkFinanceBidding(id).subscribe(resp => {
      if(resp){
        let response = resp ? resp[0].remarkValue : ''
        let response2 = JSON.parse(response)
        this.FinancebiddingDetails = response2[0]
        this.TextAreaDiv = true;
        this.buildform()
      }
    })
    event.preventDefault();
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  buildform() {
    // console.log(this.FinancebiddingDetails.remarks[0],"this.FinancebiddingDetails.remarks[0]")
    this.Rejectform = this.fb.group({
      invDiscountLow: [this.FinancebiddingDetails ? this.FinancebiddingDetails.invDiscountLow : false],
      annualYield: [this.FinancebiddingDetails ? this.FinancebiddingDetails.annualYield : false],
      fundablepercentagelow: [this.FinancebiddingDetails ? this.FinancebiddingDetails.fundablepercentagelow : false],
      fundingAmountHigh: [this.FinancebiddingDetails ? this.FinancebiddingDetails.fundingAmountHigh : false],
      netPayable: [this.FinancebiddingDetails ? this.FinancebiddingDetails.netPayable : false],
      baseAmount: [this.FinancebiddingDetails ? this.FinancebiddingDetails.baseAmount : false],
      invoiceAmt: [this.FinancebiddingDetails ? this.FinancebiddingDetails.invoiceAmt : false],
      repaymentDate: [this.FinancebiddingDetails ? this.FinancebiddingDetails.repaymentDate : false],
      fundingCCY: [this.FinancebiddingDetails ? this.FinancebiddingDetails.fundingCCY : false],
      offDate:[this.FinancebiddingDetails ? this.FinancebiddingDetails.offDate : false],
      others:[this.FinancebiddingDetails ? this.FinancebiddingDetails.others : false],
      othersRemarks:[this.FinancebiddingDetails ? this.FinancebiddingDetails.othersRemarks : '']
    })
  }
  buildfromReload(){
    this.Rejectform = this.fb.group({
      invDiscountLow: [false],
      annualYield: [false],
      fundablepercentagelow: [false],
      fundingAmountHigh: [false],
      netPayable: [false],
      baseAmount: [false],
      invoiceAmt: [false],
      repaymentDate: [false],
      fundingCCY: [false],
      offDate:[false],
      others:[false],
      othersRemarks:['']
    })
  }
}


