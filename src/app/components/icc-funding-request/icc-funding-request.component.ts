
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

@Component({
  selector: 'app-icc-funding-request',
  templateUrl: './icc-funding-request.component.html',
  styleUrls: ['./icc-funding-request.component.scss']
})

export class IccFundingRequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  @HostListener('window:resize', ['$event'])
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

  constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService, private IccFundingServices: IccFundingServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    this.getsmeNameId()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.IccFundingServices.getAllFundingList().subscribe(resp => {
      resp.forEach(element1 => {
        this.getSmeName.forEach(element2 => {
        if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
        element1.smeId = element2.smeName
        }
        });
        });
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
    this.getSmeName = resp;
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
    this.IccFundingServices.searchFinanceFunded(this.SearchModel).subscribe(resp => {
      resp.forEach(element1 => {
        this.getSmeName.forEach(element2 => {
        if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
        element1.smeId = element2.smeName
        }
        });
        });
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.SearchModel = {
      'invoiceRef': String,
      'invoiceDate': String,
      'invoiceDueDate': String

    };
    this.IccFundingServices.getAllFundingList().subscribe(resp => {
      resp.forEach(element1 => {
        this.getSmeName.forEach(element2 => {
        if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
        element1.smeId = element2.smeName
        }
        });
        });
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
