import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MatTableDataSource } from "@angular/material/table";
import { IccFinanceTodayServices } from "./icc-finance-today-service";
import { BIDDINGCONSTANTS } from "../../shared/constants/constants";
import * as moment from "moment";
import { MatPaginator } from "@angular/material/paginator";
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
@Component({
  selector: "app-icc-finance-today",
  templateUrl: "./icc-finance-today.component.html",
  styleUrls: ["./icc-finance-today.component.scss"],
})
export class IccFinanceTodayComponent implements OnInit {
  displayedColumns: string[] = [
    "invoiceRef",
    "invoiceNo",
    "smeId",
    "baseCcyAmt",
    "fundablePercent",
    "baseCcyFundingAmt",
    "baseCcyNetAmtPayable",
    "action",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    'invoiceRef': String,
    'smeId': String,
    'NetAmt': Number,
    'invoiceDate': String,
    'invoiceDueDate': String

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
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  biddingTooltip = BIDDINGCONSTANTS;
  moment: any = moment;
  Searchform: FormGroup;

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(private fb: FormBuilder,public router: Router,private IccFinanceTodayServices: IccFinanceTodayServices) {}

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildform()
    this.dataSource = new MatTableDataSource([
      {
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
        status: "I",
      },
    ]);

    this.IccFinanceTodayServices.getFinanceTodayLists().subscribe((resp) => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    });
  }
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      iccrefer:[''],
      smeId: ['']
    })
  }
  SearchAPI() {
    this.IccFinanceTodayServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.Searchform.reset();
    this.buildform()
    this.IccFinanceTodayServices.getFinanceTodayLists().subscribe(resp => {
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
  navigateInvoiceDetails(id) {
    this.router.navigateByUrl("/accepted-detail/" + id);
  }
}
