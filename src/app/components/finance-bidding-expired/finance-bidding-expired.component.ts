
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { InvoiceDetailsExpiredComponent } from "./invoice-details-expired/invoice-details-expired.component";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FinanceBiddingExpiryServices } from "./finance-bidding-expiry-service";
import { FINANCIERDASHBOARDCONSTANTS } from "../../shared/constants/constants";
import { MatPaginator } from "@angular/material/paginator";
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private FinanceBiddingExpiryServices: FinanceBiddingExpiryServices,
  ) { }

  dataSource; //Bidding Table Showing 
  displayedColumns: Array<string> = [
    "BIDID",
    "Invoice Amount",
    "BIDing Amount",
    "offer Expires",
    'status',
    "action",
  ];
  displayedColumnsload: Array<string> = [
    'TopBar',
  ]
  displayedColumnsearch: Array<string> = [
    'Search',
  ]
  displayedColumnFilter: Array<string> = [
    'Filter',
  ]
  value = 0;
  highValue = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value, label: LabelType): string => {
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
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = "";
  bidpanelOpenState = false;
  id = "";
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  Searchform: FormGroup;

  ngOnInit() {
    this.buildform()//Search Form 
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
  //Search Form 
  buildform() {
    this.Searchform = this.fb.group({
      BidId: [''],
      invoiceAmount: [''],
      BiddingAmt: [''],
    })
  }
  //search API hitting 
  searchApi() {
    this.FinanceBiddingExpiryServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  //Rest API Hitting 
  resetApi() {
    this.Searchform.reset();
    this.buildform();
    let obj = {
      finId: localStorage.getItem("userId"),
    };
    this.FinanceBiddingExpiryServices.getInvoiceDetails(obj).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator

    })
  }
  //Search Hitting 
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
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl(
      "/finance-bidding-expired-details/" + type + "/" + id
    );
  }
}
