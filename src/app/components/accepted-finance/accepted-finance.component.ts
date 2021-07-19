
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { AcceptedFinanceServices } from './accepted-finance-service'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { SmeFinancierForBiddingServices } from '../sme-financefor-bidding/sme-financefor-bidding-service';

@Component({
  selector: 'app-accepted-finance',
  templateUrl: './accepted-finance.component.html',
  styleUrls: ['./accepted-finance.component.scss']
})
export class AcceptedFinanceComponent implements OnInit {

  displayedColumns: Array<string> = ['invoiceRef', 'invoiceNo', 'invAmt', 'smeId', 'buyerName', 'invDate', 'invDueDate', 'status', 'action'];//Accept Finance Table
  dataSource = new MatTableDataSource();//Accept Fianace Table
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  modalRef: BsModalRef;
  moment: any = moment;
  displayedColumnsload: Array<string> = ['TopBar',]
  displayedColumnsearch: Array<string> = ['Search',]
  displayedColumnFilter: Array<string> = ['Filter',]
  value = 0;
  highValue = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value, label: LabelType) => {
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
  Searchform: FormGroup;  //Search From 

  constructor(public router: Router, private fb: FormBuilder, private AcceptedFinanceServices: AcceptedFinanceServices, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices) { }

  ngOnInit() {
    this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
    this.buildform()  //Search From 
  }
  //Search From 
  buildform() {
    this.Searchform = this.fb.group({
      invoiceRef: [''],
      smeId: [''],
      buyerName: [''],
      invoiceDate: [''],
      invoiceDueDate: ['']
    })
  }
  searchApi() {
    this.AcceptedFinanceServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  resetApi() {
    this.Searchform.reset();
    this.buildform();
    this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {
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
    this.router.navigateByUrl('/accepted-detail/' + Number(id));
  }
}
