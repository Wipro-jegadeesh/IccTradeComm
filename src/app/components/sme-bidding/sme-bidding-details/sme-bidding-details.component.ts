import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { Financier } from '../../../model/financier-bidding/financier';
import { FinancierService } from '../../../service/financier/financier.service';
import { Observable } from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { SMEDASHBOARDCONSTANTS } from '../../../shared/constants/constants';
import { SmeBiddingServices } from '../sme-bidding-services';
import {INVOICEDETAILSCONSTANTS} from '../../../shared/constants/constants';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

const ELEMENT_DATA: any[] = [
  {
    Name: '',
    Position: '',
    Address: '',
    TelephoneNo: '',
    Email: ''
  },
  {
    Name: '',
    Position: '',
    Address: '',
    TelephoneNo: '',
    Email: ''
  },
];
const DATA_ONE: any[] = [
  {
    SNo: 1,
    DescGoods: 'Steel Rod',
    IdNo: 'a456',
    Qty: '100t',
    Rate: '678.0',
    Amt: 67800,
    DiscAmt: '-',
    NetAmt: 67800,
    TaxRate: 2,
    TaxAmt: 1356,
    Total: 63156
  },
  {
    SNo: 2,
    DescGoods: 'Nuts',
    IdNo: 'D435',
    Qty: '25t',
    Rate: '876.0',
    Amt: 21900,
    DiscAmt: 900,
    NetAmt: 21000,
    TaxRate: 2,
    TaxAmt: 420,
    Total: 21420
  }
];
const DATA_TWO: any[] = [
  {
    BidID: 'BID03456',
    FinOffAmt: 102700,
    Ccy: 'SGD',
    FxRateDiff: '1.35',
    Margin: 10,
    DiscRate: 3,
    DiscAmt: 760,
    NetAmtPay: 101940,
    DueDate: '90D/10Mar21',
    OffExpPrd: '4 PM',
    Status: 'A',
  },
  {
    BidID: 'BID03456',
    FinOffAmt: 102700,
    Ccy: 'SGD',
    FxRateDiff: '1.35',
    Margin: 10,
    DiscRate: 3,
    DiscAmt: 760,
    NetAmtPay: 101940,
    DueDate: '90D/10Mar21',
    OffExpPrd: '4 PM',
    Status: 'A'
  }
];
const DATA_INV_DETAILS: any[] = [
  {
    InvoiceDate: "13/12/2025",
    InvoiceID: 'SGD01',
    Buyer: "Jega",
    Amount: 300,
    Seller:'jega'
  }
];
@Component({
  selector: 'app-sme-bidding',
  templateUrl: './sme-bidding-details.component.html',
  styleUrls: ['./sme-bidding-details.component.scss']  
})

export class SmeBiddingDetailsComponent implements OnInit {

  displayedColumns: string[] = ['refNo', 'invoiceId', 'invoiceAmt','invDate','invDueDate', 'buyer', 'financiercount'];
  tabledataSource = new MatTableDataSource(ELEMENT_DATA);

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','position1','name1'];
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
  financierProfileId;

  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  id: any;
  smeDetails: any;
  TextAreaDiv: boolean;
  public issubmitTrue: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  panelOpenState = false;
  financierTooltip=SMEDASHBOARDCONSTANTS;
  Rejectform: FormGroup;

  
  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,public router: Router,private modalService: BsModalService,private modalDialogService:ModalDialogService,private authenticationService: AuthenticationService
    ,private financierService: FinancierService,private smeBiddingServices : SmeBiddingServices,private toastr: ToastrService) { }
  dataSourceOne = new MatTableDataSource(DATA_ONE); //data
  dataSourceTwo; //data
  dataBIDDetails;
  dataSourceInvoiceDetails = new MatTableDataSource(DATA_INV_DETAILS); //data

  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate','amt','rate','total'];
  displayedsmeOne: string[] = [
    'Funding CCY',
    'FX rate Base CCY',
    'Base CCY Amount',
    'Fundable percentage',
    // 'Funding Amount / Repay Amount (Base CCY)',
    'Funding Amount / Repay Amount (Inv CCY)',
    'Repayment Date'
  ];
  displayedsmeTwo: string[] = [
    'Inv Discount  Rate',
    'Disc Amt (Base CCY)',
    'Disc Amt (Inv CCY)',
    'Annual Yield (Basis a360)',
    'Net Amt payable (Base CCY)',
    'Net Amt payable (Inv CCY)',
    'Offer Exp period',
    'Off Exp date /time'
  ];
  displayedColumnsTwo: string[] = [
    // 'Funding CCY',
    'Bid ID',
    'Financier Name',
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
    // 'Status'
  ];
  displayedInvDetailsColumns: string[] = [
    'InvoiceID',
    'InvoiceDate',
    'smeId',
    'Buyer',
    'Amount',
  ];
 
  rejectQustionOne = {
    subrejectQustionOne: [
      { name: 'Inv Discount Rate High',labelPosition:'before',formControlName:'invDiscountLow'},
      { name: 'Annual Yield (Basis a360) Too High',labelPosition:'before',formControlName:'annualYield'},
      { name: 'Fundable percentage Less',labelPosition:'before',formControlName:'fundablepercentagelow'},
      { name: 'Funding Amount Less',labelPosition:'before',formControlName:'fundingAmountHigh' },
    ]
};
rejectQustionTwo = {
  subrejectQustionTwo: [
    { name: 'Net Amt payable (Base CCY) Low',labelPosition:'before',formControlName:'netPayable'},
    { name: 'Repayment Date Less',labelPosition:'before',formControlName:'repaymentDate'},
    { name: 'Off Exp date /time Less',labelPosition:'before',formControlName:'offDate'},
    { name: 'Others',labelPosition:'before',formControlName:'others'},
  ]
}
 
  goods_array : object [];
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.smeBiddingServices.getBiddingDetails(this.id).subscribe(resp => {
      console.log(resp,"resp")
      if(resp){
        this.financierProfileId = resp[0] && resp[0].financierProfileId
        this.smeBiddingServices.getInvoiceGoodsDetails(resp[0] && resp[0].invoiceId).subscribe(resp => {
          this.dataSourceOne = new MatTableDataSource(resp.goodsDetails)
          this.dataSourceInvoiceDetails = new MatTableDataSource([
            { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': status ,'smeId' : resp.smeId}
          ]);
         })
        this.dataSourceTwo = new MatTableDataSource(resp);
       this.bidDetails = resp;
      }
    }) 
  }
  buildform() {
    this.Rejectform = this.fb.group({
      invDiscountLow: [false],
      annualYield: [false],
      fundablepercentagelow: [false],
      fundingAmountHigh: [false],
      netPayable: [false],
      baseAmount: [false],
      invoiceAmt: [false],
      repaymentDate: [false],
      fundingCCY: [false],
      offDate:[false],
      others:[false],
      othersRemarks:['']
    })
  }
  updateAllComplete(text){
    console.log(text,"text")
    if(text === 'Others'){
      this.Rejectform.get('othersRemarks').setValidators([Validators.required]);
      this.Rejectform.get('othersRemarks').updateValueAndValidity();
      this.TextAreaDiv = !this.TextAreaDiv
    }
  }
  submit(){

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
  openModal(event, template,index,financier) {
    console.log(template,"template")
    console.log(financier,"financier")
    console.log(index,"index")
    console.log(event,"event")
    if(index === 'reject'){
      this.modalRef.hide()
      this.TextAreaDiv = false
      this.buildform()
      event.preventDefault();
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }else{
    let array = []
    array.push(financier)
    this.dataBIDDetails = new MatTableDataSource(array);
    event.preventDefault();
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }
  }
  public errorHandling = (control: string, error: string) => {
    return this.Rejectform.controls[control].hasError(error);
  }
  isOpenHandle(isTrue){
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }

    saveFinBid(data){

      let userData = JSON.parse(localStorage.getItem('userCred'))

      data.filteredData[0]['smeId'] = localStorage.getItem("userId")
      data.filteredData[0]['status'] = 'FIN'
      data.filteredData[0]['invoiceId'] = data.filteredData[0].invoiceId
      data.filteredData[0]['invoiceNo'] = data.filteredData[0].invNo

      data.filteredData[0]['financierProfileId'] = this.financierProfileId
      data.filteredData[0]['smeProfileId'] = userData['smeProfileId']
      var element =  data.filteredData[0];
      this.smeBiddingServices.saveFinBid(element).subscribe(resp => {
        console.log(resp,"resp")
        if(resp){
          // this.smeBiddingServices.updateFinBid(data.filteredData[0].id).subscribe(resp => {
          // })
let userData = JSON.parse(localStorage.getItem('userCred'))
          let obj = {
            "smeProfileId" : userData['smeProfileId'] 
          }

          this.smeBiddingServices.updateFinStatusBid(data.filteredData[0].id,obj).subscribe(resp => {
          })
          this.toastr.success("Accepted successfully")
        this.modalRef.hide()
        this.router.navigateByUrl('/sme-dashboard');
        }
      })
    }
    
    rejectBid(data){
      console.log(data,"usus")
      console.log(this.Rejectform.value,"this.finBidform.value")
      console.log(this.Rejectform,"this.Rejectform")
      this.issubmitTrue = true;
      if (this.Rejectform.invalid) {
        alert("Please fill Mandatory fields")
        return;
      }
      // let params = this.Rejectform.value
      // params.invoiceId = data.filteredData[0].invoiceId,
      // params.invNo = data.filteredData[0].invNo,
      // params.bidId = data.filteredData[0].bidId,
      // params.finId = data.filteredData[0].finId
      var ddatae = new Date();
      let array = []
      array.push(this.Rejectform.value)
      let obj = {
        remarkValue : JSON.stringify(array),
        invoiceId : data.filteredData[0].invoiceId,
        invNo :data.filteredData[0].invNo,
        bidId :data.filteredData[0].bidId,
        updatedTime:ddatae.setDate(ddatae.getDate() + 1)
      }
      if (this.Rejectform.valid){
      this.smeBiddingServices.rejectFinBid(data.filteredData[0].id,obj).subscribe(resp => {
        this.toastr.success("Rejected successfully")
          this.issubmitTrue = false;
          this.modalRef.hide()
          this.Rejectform.reset();
          this.router.navigateByUrl('/sme-dashboard');
        })
   
    }
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
