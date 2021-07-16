import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { IccListSmeServices } from './icc-list-smes.service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface financeForBiddingData {
  invoiceRef: String;
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
export interface invoiceDetails { 'invId': String, 'invDate': String, 'buyerName': String, 'invAmt': String, 'status': String }
const INVOICE_DATA: invoiceDetails[] = [];
export interface biddingDetails {
  'financeOfferAmt': String, 'ccy': String, 'fxRate': String, 'margin': String, 'netAmtDisc': String, 'discAmt': String, 'discRate': String, 'offerExpPeriod': String
}
const BIDDING_DATA: biddingDetails[] = [];
@Component({
  selector: 'app-icc-list-smes',
  templateUrl: './icc-list-smes.component.html',
  styleUrls: ['./icc-list-smes.component.scss']
})
export class IccListSmesComponent implements OnInit {
  displayedColumns: string[] = ['smeprofileID', 'registrationNumber', 'companyId', 'cmpName', 'smeRating', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumnsload: string[] = ['TopBar']
  displayedColumnsearch: string[] = ['Search']
  displayedColumnFilter: string[] = ['Filter']
  SearchModel = {
    'smeprofileId': String,
    'registrationNumber': String,
    'companyId': String,
    'name': String,
    'smeRating': String,
    'status': String,
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
  Searchform: FormGroup;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  message: string;
  userValue: any;
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(public router: Router, private iccListSmeServices: IccListSmeServices, private fb: FormBuilder, private modalService: BsModalService,) { }
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getList()
    this.buildform()
  }
  /** Getting the list to display all sme profile details **/
  getList() {
    this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  /** Constructing the empty search form ,invoked while performing search**/
  buildform() {
    this.Searchform = this.fb.group({
      smeprofileId: [''],
      registrationNumber: [''],
      companyId: [''],
      name: [''],
      smeRating: [''],
      status: [''],
    })
  }
  /** To display the list after passing search value **/
  getSearchList() {
    this.iccListSmeServices.search_getallSmeProfileDetails(this.Searchform.value).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** Invoking the search function to get the search list  **/
  searchApi() {
    this.getSearchList()
  }
  /** To reset the searched value and get back the list  **/
  resetApi() {
    this.buildform();
    this.getList();
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
  /**To update the status activate and deactivate **/
  displayMessage(e, template, regNumb) {
    if (e.checked) {
      this.message = 'A'
    } else {
      this.message = 'R'
    }
    // nationalId
    this.openModal(e, template, regNumb)
  }
  /**Model open for activate and deactivate **/
  openModal(event, template, data) {
    this.userValue = data
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  /**To get all sme profile details  **/
  ActiveuserNo() {
    this.modalRef.hide();
    this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  /** Api hit to active and deactivate the user  **/
  Activeuser(data) {
    let obj = {
      status: this.message
    }
    this.modalRef.hide();
    this.iccListSmeServices.statusChange(this.userValue.registrationNumber, obj).subscribe(resp => {
      this.iccListSmeServices.getallSmeProfileDetails().subscribe(resp => {
        const ELEMENT_DATA: financeForBiddingData[] = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator
      })
    })
  }
  /** To navigate to the sme  details with state data **/
  navigateToSmeDetails(path, smeData) {
    let data: NavigationExtras = {
      queryParams: {
        "companyId": smeData.registrationNumber,
        "companyName": smeData.name,
        "country": "SGP"
      }
    }
    this.router.navigate([path], { state: { smeData: data } });
  }
}


