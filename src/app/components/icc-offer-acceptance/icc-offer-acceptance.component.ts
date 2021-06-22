
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { IccOfferAcceptServices } from './icc-offer-accept-service';
import { BIDDINGCONSTANTS, SMEDASHBOARDCONSTANTS} from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';

     
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

  displayedColumns: string[] = ['invoiceRef','invNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status','action'];
  dataSource;
  displayed2Columns: string[] = ['refNo', 'invoiceId', 'invoiceAmt','invDate','invDueDate', 'buyer', 'financiercount','action'];
  financierTooltip=SMEDASHBOARDCONSTANTS;

  displayedColumnsOne: string[] = ['descGoods', 'quantity','taxRate','amt','rate','total'];
  dataSourceOne; //data

  dataSourceTwo; //data
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];

  dataSourceThree; //data
  displayedColumnsThree: string[] = ['financeOfferAmt', 'ccy', 'fxRate', 'margin', 'netAmtDisc','discAmt','discRate','offerExpPeriod'];


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
  data2Source:any;
  
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

  constructor(public router: Router, private IccOfferAcceptServices: IccOfferAcceptServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    this.getsmeNameId()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.IccOfferAcceptServices.getOfferAcceptanceLists().subscribe(resp => {
      resp.forEach(element1 => {
        this.getSmeName.forEach(element2 => {
        if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
        element1['smeIdValue'] =  element1.smeId
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
  SearchAPI(){
    this.IccOfferAcceptServices.searchFinanceFunded(this.SearchModel).subscribe(resp => {
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
  ResetAPI(){
    this.SearchModel={
      'invoiceRef': String,
      'smeId': String,
      'buyerName': String,
      'invoiceDate': String,
      'invoiceDueDate': String
    };
    this.IccOfferAcceptServices.getOfferAcceptanceLists().subscribe(resp => {
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
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
 
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl('/icc-offer-acceptance-details/' + type + '/' + id);
  }
}



