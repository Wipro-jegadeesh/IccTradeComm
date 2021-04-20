import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Financier } from '../../model/financier-bidding/financier';
import { FinancierService } from '../../service/financier/financier.service';
import { Observable } from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { SMEDASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { SmeBiddingServices } from './sme-bidding-services';
import {INVOICEDETAILSCONSTANTS} from '../../shared/constants/constants';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {MatSort} from '@angular/material/sort';
import { Validators, FormGroup ,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-sme-bidding',
  templateUrl: './sme-bidding.component.html',
  styleUrls: ['./sme-bidding.component.scss']  
})

export class SmeBiddingComponent implements OnInit {
  


  displayedColumns: string[] = ['invoiceRef', 'invoiceId', 'invoiceAmt','invDate','invDueDate', 'buyer', 'financiercount','action'];
  tabledataSource;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','position1','name1'];
  dataSource ;
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
  detailsTooltip=INVOICEDETAILSCONSTANTS
  bidDetails
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
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
  
  financierTooltip=SMEDASHBOARDCONSTANTS;
  
  constructor(public router: Router,private modalService: BsModalService,private modalDialogService:ModalDialogService,private authenticationService: AuthenticationService,
    private fb: FormBuilder,private financierService: FinancierService,private smeBiddingServices : SmeBiddingServices) { }
  dataSourceOne; //data
  dataSourceTwo; //data
  dataSourceInvoiceDetails; //data
  invoiceReference : string;
  invoiceId : string;
  buyerName : string;
  amount: Number;
  

  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate','amt','rate','total'];

  displayedColumnsTwo: string[] = [
    // 'Funding CCY',
    'FX rate Base CCY',
    'Base CCY Amount',
    'Fundable percentage',
    'Funding Amount',
    // 'Funding Amount / Repay Amount (Inv CCY)',
    'Repayment Date',
    // 'Inv Discount  Rate',
    // 'Disc Amt (Base CCY)',
    // 'Disc Amt (Inv CCY)',
    'Annual Yield (Basis a360)',
    'Net Amt payable (Base CCY)',
    // 'Net Amt payable (Inv CCY)',
    // 'Offer Exp period',
    'Off Exp date /time',
    'Status'
  ];
  displayedInvDetailsColumns: string[] = [
    'InvoiceID',
    'InvoiceDate',
    'smeId',
    'Buyer',
    'Amount',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  goods_array : object [];

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
    this.financierService.getInvoiceDetails().subscribe(resp => {
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
  SearchAPI(){
    this.smeBiddingServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
  ResetAPI(){
    this.buildform();
    this.financierService.getInvoiceDetails().subscribe(resp => {
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

  isOpenHandle(isTrue){
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }
  navigateSmeDetails(id){
      this.router.navigateByUrl('/sme-bidding/'+id);
  }
  openModal(event, template,element) {
      event.preventDefault();
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
      this.smeBiddingServices.getBiddingDetails(element.invId).subscribe(resp => {
        console.log(resp,"resp")
       this.dataSourceTwo = new MatTableDataSource(resp);
       this.bidDetails = resp;
      }) 
      this.smeBiddingServices.getInvoiceGoodsDetails(element.invoiceId).subscribe(resp => {
        this.dataSourceOne = new MatTableDataSource(resp.goodsDetails)
        this.dataSourceInvoiceDetails = new MatTableDataSource([
          { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': status ,'smeId' : resp.smeId}
        ]);
       })
    
    }
    saveFinBid(){
      this.bidDetails[0]['smeId'] = localStorage.getItem("userId")
      this.bidDetails[0]['status'] = 'Active'
      this.bidDetails[0]['invoiceId'] = this.bidDetails[0].invNo
      console.log(this.bidDetails[0],"this.bidDetails[0]")
      var element = this.bidDetails[0];
      this.smeBiddingServices.saveFinBid(element).subscribe(resp => {
        console.log(resp,"resp")
        this.modalRef.hide()
        this.router.navigateByUrl('/sme-bidding');
      })
    }
    handleToggle(e,status){
      this.modalDialogService.confirm("Confirm Delete","Do you really want to change the status ?","Ok","Cancel").subscribe(result =>{       
    })
  }
  goHome(){
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout(){
    this.authenticationService.logout()
    }
}

export class UserDataSource extends DataSource<any> {
  constructor(private financierService: FinancierService) {
    super();
    
  }
  connect(): Observable<Financier[]> {
    return this.financierService.getUser();
   
  }
  disconnect() {}
}
