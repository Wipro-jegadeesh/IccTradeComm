import { Component, OnInit, ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FinanceRequestServices } from './finance-service'
import { FINANCIERDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { MatPaginator } from '@angular/material/paginator';
import { Options,LabelType } from '@angular-slider/ngx-slider';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-finance-bidding',
  templateUrl: './finance-bidding.component.html',
  styleUrls: ['./finance-bidding.component.scss']
})
export class FinanceBiddingComponent implements OnInit {
  @Input() InvoiceDetailsComponent: InvoiceDetailsComponent;
  constructor(private fb: FormBuilder,public router: Router, public authenticationService: AuthenticationService,private FinanceRequestServices: FinanceRequestServices,private SmeFinancierForBiddingServices:SmeFinancierForBiddingServices) { }

  dataSource;//data
  displayedColumns: string[] = [
    'invoiceRef',
    'invId',
    'invoiceAmt',
    'smeId',
    'buyerName',
    'invDate',
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  @HostListener('window:resize', ['$event'])
  SearchModel = {
    invoiceId : '',
    invoiceAmt : '',
    smeId : '',
    buyerName : '' 
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
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  id = ""
  modalRef: BsModalRef;
  isHover: boolean = false;
  public accountList: ElementRef<any>;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  public getSmeName: any = []
  Searchform: FormGroup;

  ngOnInit() {
    console.log(this.SearchModel,"SearchModel")
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildform()
    // this.dataSource = new MatTableDataSource([{ 'invoiceRef' : "12",
    // 'invId' : "21",
    // 'invoiceAmt' : "21",
    // 'smeId' : "ui",
    // 'buyerName' : "ioio",
    // 'invDate' : "22/3/2333",}]);
    // this.dataSource.paginator = this.paginator

    this.getsmeNameId();
    this.FinanceRequestServices.getInvoiceDetails().subscribe(resp => {
      resp.forEach(element1 => {
        this.getSmeName.forEach(element2 => {
        if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
        element1.smeId = element2.smeName
        }
        });
        });
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
    this.getSmeName = resp;
    })
    }
    buildform() {
      this.Searchform = this.fb.group({
        invoiceRef: [''],
        invoiceAmount:[''],
        smeId: [''],
        buyerName: ['']
      })
    }
    SearchAPI() {
      this.FinanceRequestServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator
      })
    }
    ResetAPI() {
      this.Searchform.reset();
      this.buildform();
      this.FinanceRequestServices.getInvoiceDetails().subscribe(resp => {
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
      this.accountList.nativeElement.scrollWidth - this.accountList.nativeElement.clientWidth;
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

  navigateInvoiceDetails(id) {
    this.router.navigateByUrl('/finance-bidding/' + id);
  }
}
