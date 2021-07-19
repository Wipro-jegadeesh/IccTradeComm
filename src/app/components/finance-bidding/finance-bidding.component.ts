import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FinanceRequestServices } from './finance-service'
import { FINANCIERDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-finance-bidding',
  templateUrl: './finance-bidding.component.html',
  styleUrls: ['./finance-bidding.component.scss']
})
export class FinanceBiddingComponent implements OnInit {
  @Input() InvoiceDetailsComponent: InvoiceDetailsComponent;
  constructor(private fb: FormBuilder, public router: Router, public authenticationService: AuthenticationService, private FinanceRequestServices: FinanceRequestServices) { }

  dataSource;//Bidding Finanince
  displayedColumns: Array<string> = [
    'invoiceRef',
    'invId',
    'invoiceAmt',
    'smeId',
    'buyerName',
    'invDate',
    'action'
  ];
  displayedColumnsload: Array<string> = [
    'TopBar',
  ]
  displayedColumnsearch: Array<string> = [
    'Search',
  ]
  displayedColumnFilter: Array<string> = [
    'Filter',
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  id = ""
  modalRef: BsModalRef;
  isHover: boolean = false;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  Searchform: FormGroup;

  ngOnInit() {
    this.buildform()
    this.FinanceRequestServices.getInvoiceDetails().subscribe(resp => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  buildform() {
    this.Searchform = this.fb.group({
      iccrefer: [''],
      invoiceRef: [''],
      invoiceAmount: [''],
      smeId: [''],
      buyerName: ['']
    })
  }
  searchApi() {
    this.FinanceRequestServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  resetApi() {
    this.Searchform.reset();
    this.buildform();
    this.FinanceRequestServices.getInvoiceDetails().subscribe(resp => {
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
    this.router.navigateByUrl('/finance-bidding/' + id);
  }
}
