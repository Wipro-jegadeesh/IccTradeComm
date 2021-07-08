import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SMEDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { SmeBiddingServices } from './sme-bidding-services';
import { INVOICEDETAILSCONSTANTS } from '../../shared/constants/constants';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sme-bidding',
  templateUrl: './sme-bidding.component.html',
  styleUrls: ['./sme-bidding.component.scss']
})

export class SmeBiddingComponent implements OnInit {

  displayedColumns: string[] = ['invoiceRef', 'invoiceId', 'invoiceAmt', 'invDate',
    'invDueDate', 'buyer', 'financiercount', 'action'];
  smeBiddingList;
  isOpen = ""
  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  detailsTooltip = INVOICEDETAILSCONSTANTS
  bidDetails

  moment: any = moment;

  @ViewChild(MatSort) sort: MatSort;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  panelOpenState = false;
  bidpanelOpenState = false;

  financierTooltip = SMEDASHBOARDCONSTANTS;

  constructor(public router: Router, private fb: FormBuilder, private smeBiddingServices: SmeBiddingServices) { }
  invoiceId: string;
  buyerName: string;
  amount: Number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //filter options &  variables
  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  searchModel = {
    'invoiceRef': String,
    'invoiceId': String,
    'invoiceDate': String,
    'invoiceDueDate': String,
    'buyerName': String
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
  searchForm: FormGroup;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getInvoiceDetails()
    this.buildForm()
  }
  //get Invoice data initiated by sme user
  getInvoiceDetails() {
    this.smeBiddingServices.getInvoiceDetails().subscribe(resp => {
      this.smeBiddingList = new MatTableDataSource(resp);
      this.smeBiddingList.paginator = this.paginator
      this.smeBiddingList.sort = this.sort;
    })
  }
  buildForm() {
    this.searchForm = this.fb.group({
      invoiceId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  //search function
  onSearch() {
    this.smeBiddingServices.searchFinanceFunded(this.searchForm.value).subscribe(resp => {
      this.smeBiddingList = new MatTableDataSource(resp);
      this.smeBiddingList.paginator = this.paginator
    })
  }
  //function to reset a search datas
  onReset() {
    this.searchForm.reset();
    this.buildForm();
    this.smeBiddingServices.searchFinanceFunded('').subscribe(resp => {
      this.smeBiddingList = new MatTableDataSource(resp);
      this.smeBiddingList.paginator = this.paginator

    })
  }
  //function to open/close search section
  searchContainer() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  //function to close/open a filter section
  filterContainer() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  //Edit path (particular invoice router function)
  navigateSmeDetails(id) {
    this.router.navigateByUrl('/sme-bidding/' + id);
  }
}