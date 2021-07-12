
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { IccOfferAcceptServices } from './icc-offer-accept-service';
import { BIDDINGCONSTANTS, SMEDASHBOARDCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-icc-offer-acceptance',
  templateUrl: './icc-offer-acceptance.component.html',
  styleUrls: ['./icc-offer-acceptance.component.scss']
})
export class IccOfferAcceptanceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  displayedColumns: string[] = ['invoiceRef', 'invNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  dataSource;
  financierTooltip = SMEDASHBOARDCONSTANTS;
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
  AllFundingOpen: boolean;
  data2Source: any;
  displayedColumnsload: string[] = ['TopBar']
  displayedColumnsearch: string[] = ['Search']
  displayedColumnFilter: string[] = ['Filter']
  SearchModel = {
    'invoiceRef': String,
    'smeId': String,
    'buyerName': String,
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
  public getSmeName: any = []
  Searchform: FormGroup;
  constructor(private fb: FormBuilder, public router: Router, private IccOfferAcceptServices: IccOfferAcceptServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }
  ngOnInit() {
    this.buildform()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.IccOfferAcceptServices.getOfferAcceptanceLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  /** Get list to display the sme name in the table **/
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
      this.getSmeName = resp;
    })
  }
  /** Constructing the empty search form ,invoked while performing search**/
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      smeId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  /** Passing search parameter to get the search list  **/
  searchApi() {
    this.IccOfferAcceptServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  /** To reset the searched value and get back the list  **/
  resetApi() {
    this.Searchform.reset();
    this.buildform()
    this.IccOfferAcceptServices.getOfferAcceptanceLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator

    })
  }
  /** To Hide the filter field and display the search field ,while event performed on search icon **/
  searchDiv() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  /** To Hide the search field and display the filter field, while event performed on filter icon **/
  filterDiv() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  /** To navigate to the sme  details with state data **/
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl('/icc-offer-acceptance-details/' + type + '/' + id);
  }
}



