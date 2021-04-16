import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SmeFinancierForBiddingServices } from './sme-financefor-bidding-service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {MatSort} from '@angular/material/sort';

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


@Component({
  selector: 'app-sme-financefor-bidding',
  templateUrl: './sme-financefor-bidding.component.html',
  styleUrls: ['./sme-financefor-bidding.component.scss']
})

export class SmeFinanceforBiddingComponent implements OnInit {

  displayedColumns: string[] = ['invoiceRef','invoiceNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];
  dataSource;


  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  dataSourceOne = new MatTableDataSource(GOODS_DATA); //data



  dataSourceTwo = new MatTableDataSource(INVOICE_DATA); //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree; //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc', 'discAmt', 'discRate', 'offerExpPeriod'];


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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  @HostListener('window:resize', ['$event'])
  public accountList: ElementRef<any>;


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
  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    this.SmeFinancierForBiddingServices.getFinanceForBiddingLists().subscribe(resp => { 
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })

  }
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  SearchAPI() {
    console.log(this.SearchModel, "SearchModel")
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
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
  }

  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg sme-fin-modal' });

    this.SmeFinancierForBiddingServices.getInvoiceRequestLists(data.invoiceId).subscribe(resp => {
      let status = "";
      if (resp.status == "I") {
        status = "Initiated"
      }
      else if (resp.status == "A") {
        status = "Waiting for bid"
      }
      else if (resp.status == "B") {
        status = "Bid Created"
      }
      else {
        status = "Financed Successfully"
      }
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'invCcy': resp.invCcy, 'status': status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);

    })
    this.SmeFinancierForBiddingServices.getFinanceBiddingLists(data.invoiceNo).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
      }
    })
  }

  handleToggle(e, status) {
    this.modalDialogService.confirm("Confirm Delete", "Do you really want to change the status ?", "Ok", "Cancel").subscribe(result => {
    })

  }

  goHome() {
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout() {
    this.authenticationService.logout()
  }
}

