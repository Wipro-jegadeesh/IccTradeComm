import { Component, OnInit, ElementRef, HostListener, ViewChild,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FinancebidsRequestServices} from './finance-bids-accept'
import {FinanceBiddingService} from '../../service/finance_bidding/finance-bidding.service';
import { FINANCIERDASHBOARDCONSTANTS} from '../../shared/constants/constants';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Options,LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-finance-bids-accept',
  templateUrl: './finance-bids-accept.component.html',
  styleUrls: ['./finance-bids-accept.component.scss']
})
export class FinanceBiddingAcceptsComponent implements OnInit {


  constructor(public router: Router, public authenticationService:AuthenticationService,
  private modalService: BsModalService,private FinanceRequestServices : FinancebidsRequestServices,private FinanceBiddingService:FinanceBiddingService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('window:resize', ['$event'])
  @ViewChild('accountList', { read: ElementRef })
  dataSource ;//data
  displayedColumns: string[] = [
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
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
   this.FinanceBiddingService.getBidingAcceptDetails().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }
  SearchAPI(){
    console.log(this.SearchModel,"SearchModel")
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
}
