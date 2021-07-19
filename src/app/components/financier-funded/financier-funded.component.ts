

import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { FinancierFundedServices } from './financier-funded-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface financeForBiddingData {
  invoiceRef: String;
  invoiceAmt;
  smeId: String;
  buyerName: String;
  invoiceDate: String;
  invDueDate: String;
  status: String;
}
const ELEMENT_DATA: financeForBiddingData[] = [];

@Component({
  selector: 'app-financier-funded',
  templateUrl: './financier-funded.component.html',
  styleUrls: ['./financier-funded.component.scss']
})
export class FinancierFundedComponent implements OnInit {

  displayedColumns: Array<string> = ['invoiceRef', 'invoiceAmt', 'smeId', 'buyerName', 'invoiceDate', 'invDueDate', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumnsload: Array<string> = [
    'TopBar',
  ]
  displayedColumnsearch: Array<string> = [
    'Search',
  ]
  displayedColumnFilter: Array<string> = [
    'Filter',
  ]
  SearchModel = {
    'invoiceRef': String,
    'smeId': String,
    'buyerName': String,
    'invoiceDate': String,
    'invDueDate': String,

  }
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

  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  moment: any = moment;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  public getSmeName: any = []
  Searchform: FormGroup;

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(private fb: FormBuilder,public router: Router, private FinancierFundedServices: FinancierFundedServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }


  ngOnInit() {
    this.buildsearchform()
    // this.getsmeNameId()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource = new MatTableDataSource([{
      "id": 1,
      "smeId": "SME101",
      "invoiceRef": "INV202100010",
      "invoiceNo": "111",
      "invoiceAmt": 1000.0,
      "invoiceCcy": "SGD",
      "buyerName": "sds",
      "invoiceDate": "2021-04-08T00:00:00.000+00:00",
      "invDueDate": "2021-04-23T00:00:00.000+00:00",
      "invoiceId": "10",
      "buyerAddr": "chennai",
      "dispDate": "2021-04-22T00:00:00.000+00:00",
      "baseAmt": null,
      "baseCcy": null,
      "fxRate": null,
      "transactionRating": 0,
      "smeRating": 0,
      "source": null,
      "status": "A"
    }]);

    this.FinancierFundedServices.getFinanceForBiddingLists().subscribe(resp => {

      // resp.forEach(element1 => {
      //   this.getSmeName.forEach(element2 => {
      //   if (element1.smeId.toLowerCase() == element2.userId.toLowerCase()) {
      //   element1.smeId = element2.smeName
      //   }
      //   });
      //   });

      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;

    })

  }
  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
    this.getSmeName = resp;
    })
}
buildsearchform() {
  this.Searchform = this.fb.group({
    invoiceRef: [''],
    invoiceDate:[''],
    smeId: [''],
    buyerName: ['']
  })
}
  searchApi() {
    this.FinancierFundedServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {

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
  resetApi() {
    this.Searchform.reset();
    this.buildsearchform()
    this.FinancierFundedServices.getFinanceForBiddingLists().subscribe(resp => {

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
    this.router.navigateByUrl('/accepted-detail/' + id);
  }
}

