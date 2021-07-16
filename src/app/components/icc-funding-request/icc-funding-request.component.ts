
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccFundingServices } from './icc-funding-service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-icc-funding-request',
  templateUrl: './icc-funding-request.component.html',
  styleUrls: ['./icc-funding-request.component.scss']
})
export class IccFundingRequestComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  displayedColumns: string[] = ['invoiceRef', 'invId', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc', 'discAmt', 'discRate', 'offerExpPeriod'];
  dataSource;
  dataSourceOne;
  dataSourceTwo;
  dataSourceThree;
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
  displayedColumnsload: string[] = ['TopBar']
  displayedColumnsearch: string[] = ['Search']
  displayedColumnFilter: string[] = ['Filter']
  SearchModel = {
    'invoiceRef': String,
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
  constructor(private fb: FormBuilder, public router: Router, private modalService: BsModalService, private IccFundingServices: IccFundingServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }
  ngOnInit() {
    this.buildform()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    /** Getting the list to display all funding list **/
    this.IccFundingServices.getAllFundingList().subscribe(resp => {
      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });
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
    this.IccFundingServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  /** To reset the searched value and get back the list  **/
  resetApi() {
    this.Searchform.reset();
    this.buildform()
    this.IccFundingServices.getAllFundingList().subscribe(resp => {
      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });
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
  /** Model to view all funding requests **/
  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.IccFundingServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);
      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
    })

  }
}
