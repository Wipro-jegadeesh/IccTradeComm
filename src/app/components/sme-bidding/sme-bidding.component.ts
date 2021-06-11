import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { SMEDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { SmeBiddingServices } from './sme-bidding-services';
import { INVOICEDETAILSCONSTANTS } from '../../shared/constants/constants';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatSort } from '@angular/material/sort';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sme-bidding',
  templateUrl: './sme-bidding.component.html',
  styleUrls: ['./sme-bidding.component.scss']
})

export class SmeBiddingComponent implements OnInit {



  displayedColumns: string[] = ['invoiceRef', 'invoiceId', 'invoiceAmt', 'invDate', 'invDueDate', 'buyer', 'financiercount', 'action'];
  dataSource;
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

  constructor(public router: Router,private fb: FormBuilder, private smeBiddingServices: SmeBiddingServices) { }
  dataSourceInvoiceDetails; //data
  invoiceReference: string;
  invoiceId: string;
  buyerName: string;
  amount: Number;

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
  Searchform: FormGroup;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.smeBiddingServices.getInvoiceDetails().subscribe(resp => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
    this.buildform()
  }
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      invoiceId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  SearchAPI() {
    this.smeBiddingServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI() {
    this.buildform();
    this.smeBiddingServices.searchFinanceFunded('').subscribe(resp => {
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
  navigateSmeDetails(id) {
    this.router.navigateByUrl('/sme-bidding/' + id);
  }

}
