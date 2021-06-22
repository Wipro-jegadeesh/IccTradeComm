
import { Component, OnInit, ElementRef, HostListener, ViewChild, Input} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { InvoiceDetailsExpiredComponent } from "./invoice-details-expired/invoice-details-expired.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FinanceBiddingExpiryServices } from "./finance-bidding-expiry-service";
import { FINANCIERDASHBOARDCONSTANTS } from "../../shared/constants/constants";
import { MatPaginator } from "@angular/material/paginator";
import { Options,LabelType } from '@angular-slider/ngx-slider';
import {MatSort} from '@angular/material/sort';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';

@Component({
  selector: "app-finance-bidding-expired",
  templateUrl: "./finance-bidding-expired.component.html",
  styleUrls: ["./finance-bidding-expired.component.scss"],
})
export class FinanceBiddingExpiredComponent implements OnInit {
  @Input() InvoiceDetailsExpiredComponent: InvoiceDetailsExpiredComponent;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authenticationService: AuthenticationService,
    private modalService: BsModalService,
    private FinanceBiddingExpiryServices: FinanceBiddingExpiryServices,
  ) { }

  dataSource; //data
  displayedColumns: string[] = [
    "BIDID",
    "Invoice Amount",
    "BIDing Amount",
    "offer Expires",
    'status',
    "action",
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
  modalRef: BsModalRef;
  isHover: boolean = false;
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = "";
  bidpanelOpenState = false;
  id = "";
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("accountList", { read: ElementRef })
  @HostListener("window:resize", ["$event"])
  public accountList: ElementRef<any>;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  Searchform: FormGroup;

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    let obj = {
      finId: localStorage.getItem("userId"),
    };
    this.FinanceBiddingExpiryServices.getInvoiceDetails(obj).subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  buildform() {
    this.Searchform = this.fb.group({
      BidId: [''],
      invoiceAmount:[''],
      BiddingAmt: [''],
      BuyerName:['']
    })
  }
  SearchAPI() {
    this.FinanceBiddingExpiryServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.buildform();
    let obj = {
      finId: localStorage.getItem("userId"),
    };
    this.FinanceBiddingExpiryServices.getInvoiceDetails(obj).subscribe(resp => {
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
        behavior: "smooth",
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
      behavior: "smooth",
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue === "inActive" ? "active" : "inActive";
  }
  navigateFinanceBidding() {
    this.router.navigateByUrl("/finance-bidding");
  }
  logout() {
    this.authenticationService.logout();
  }
  goHome() {
    this.router.navigateByUrl("/financier-dashboard");
  }
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl(
      "/finance-bidding-expired-details/" + type + "/" + id
    );
  }
}
