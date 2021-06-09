import { Pipe, PipeTransform,Component, OnInit, ElementRef, HostListener, ViewChild,Input } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDialogService } from '../../../service/modal-dialog.service';
import { Validators, FormGroup ,FormBuilder} from '@angular/forms';
import {InvoiceRequestServices} from '../../invoice-request/invoice-service';
import {INVOICEDETAILSCONSTANTS} from '../../../shared/constants/constants';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import {FinanceBiddingCancelServices} from '../finance-bidding-cancel-service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

interface Status {
  value: string;
  viewValue: string;
}

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
    Status: 'A'
  }
];
const displayInvDatas: any[] = [
  {
    invRefNumber: 'BID03456',
    invId: 102700,
    invDate: '10/12/2020',
    invDueDate: '10/12/2020',
    invAmt: 1000,
    buyerName: "Test Buyer",
    sellerName: "Test Seller",
    buyerRating: 10,
    sellerRating: '6.1'
  }
];


@Component({
  selector: 'app-invoice-details-cancel',
  templateUrl: './invoice-details-cancel.component.html',
  styleUrls: ['./invoice-details-cancel.component.scss'],
  providers: [DatePipe]
})
export class InvoiceDetailsCancelComponent implements OnInit {
  finBidform: FormGroup;
  modalRef: BsModalRef;

  status: Status[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'R', viewValue: 'R'},
  ];
  detailsTooltip=INVOICEDETAILSCONSTANTS
  TextAreaDiv: boolean;
  FinancebiddingDetailsRemarks: any;
  
  constructor(public translate: TranslateService,private FinanceBiddingRejectedServices:FinanceBiddingCancelServices,private datePipe: DatePipe,private activatedRoute: ActivatedRoute,private modalService: BsModalService,private authenticationService:AuthenticationService,
    private router :Router,private modalDialogService:ModalDialogService,private fb: FormBuilder,private invoiceRequestServices:InvoiceRequestServices,private toastr: ToastrService) { }

  dataSourceOne = new MatTableDataSource(DATA_ONE); //data
  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate','amt','rate','total'];
  displayedColumnsOne1: string[] = [
    'SNo',
    'DescGoods',
    'IdNo',
    'Qty',
    'Rate',
    'Amt',
    'DiscAmt',
    'NetAmt',
    'TaxRate',
    'TaxAmt',
    'Total'
  ];
  dataSourceTwo = new MatTableDataSource(DATA_TWO); //data
  displayedColumnsTwo: string[] = [
    'Funding CCY',
    'FX rate Base CCY',
    'Base CCY Amount',
    'Fundable percentage',
    'Funding Amount / Repay Amount (Base CCY)',
    'Funding Amount / Repay Amount (Inv CCY)',
    'Repayment Date'
  ];
  displayedInvoiceTwo: string[] = [
    'Inv Discount  Rate',
    'Disc Amt (Base CCY)',
    'Disc Amt (Inv CCY)',
    'Annual Yield (Basis a360)',
    'Tenor Days',
    'Penal ROI',
    'Net Amt payable (Base CCY)',
    'Net Amt payable (Inv CCY)',
    'Offer Exp period',
    'Off Exp date /time'
  ];
  launchBidPopup :string[] = [
    'Funding CCY',
    'Base CCY Amount',
    'Fundable percentage',
    'Funding Amount / Repay Amount (Base CCY)',
    'Repayment Date'
  ]
  launchBid_Popup:any
  launchBidTableTwo_Popup:any
  launchBidTableTwoPopup :string[] = [
    'Inv Discount Rate',
    'Disc Amt (Base CCY)',
    'Net Amt payable (Base CCY)',
    'Annual Yield (Basis a360)',
    'Offer Exp period',
    'Off Exp date /time'
  ]
  displayInvDatas = new MatTableDataSource(displayInvDatas); //data

  displayedInvoiceFormsColumns: string[] = [
    // 'invRefNumber',
    // 'invId',
    // 'invDate',
    // 'invDueDate',
    // 'invAmt',
    // 'buyerName',
    // 'sellerName',
    // 'buyerRating',
    // 'sellerRating'
    'billNo',
    'invId',
    'invDate',
    'invDueDate',
    'invAmt',
    'buyerName',
    'smeId', 
  ];
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  bidpanelOpenState = false;
  // @Input() id: "";
  id:any

  // invoiceDetails = {
  //   billNo : String,
  //         invId : String,
  //         invDate : String,
  //         invDueDate : String,
  //         invAmt : String,
  //         buyerName : String,
  //         smeId : String,  
  // }
  invoiceDetails:any
  moment: any = moment;
  FinancebiddingDetails: any;
  type: string;
  isView: boolean;
  Rejectform: FormGroup;
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
    { name: 'others',labelPosition:'before',formControlName:'others'},
  ]
}

submit(){

}


updateAllComplete(text){
  console.log(text,"text")
  if(text === 'Others'){
    console.log(text,"text")

    
  }
}
  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.type === 'view'){
      this.isView = true
    }
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildform()
    this.buildformSecond()
    this.buildfromReload()
    this.FinanceBiddingRejectedServices.getInvDetailsLists_ForFinanceBidding(this.id).subscribe(resp => {
      if(resp){
        this.FinancebiddingDetails = resp
        this.invoiceRequestServices.getInvDetailsLists_ForFinanceBidding(resp.invoiceId).subscribe(resp => {
          this.invoiceDetails = resp
          this.buildfinBidform()
          this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
        })
      }else{
        this.buildfinBidform()
      }
     
    })
    this.FinanceBiddingRejectedServices.getRemarkFinanceBidding(this.id).subscribe(resp => {
      if(resp){
        let response = resp ? resp[0].remarkValue : ''
        let response2 = JSON.parse(response)
        this.FinancebiddingDetailsRemarks = response2
        this.TextAreaDiv = true;
        this.buildformSecond()
      }
    })
  }
  buildfinBidform() {
    var ddatae = new Date();
    this.finBidform = this.fb.group({
      fundingCcy: [this.FinancebiddingDetails.fundingCcy, Validators.required],
      fxRate: [this.FinancebiddingDetails.fxRate, Validators.required],
      baseCcyAmt: [this.FinancebiddingDetails.baseCcyAmt, Validators.required],
      fundablePercent: [this.FinancebiddingDetails.fundablePercent, Validators.required],
      baseCcyFundingAmt: [this.FinancebiddingDetails.baseCcyFundingAmt, Validators.required],
      invCcyFundingAmt: [this.FinancebiddingDetails.invCcyFundingAmt, Validators.required],
      repaymentDate: [this.datePipe.transform(this.FinancebiddingDetails.repaymentDate), Validators.required],
      invDiscRate: [this.FinancebiddingDetails.invDiscRate, Validators.required],
      baseCcyDiscAmt: [this.FinancebiddingDetails.baseCcyDiscAmt, Validators.required],
      invCcyDiscAmt: [this.FinancebiddingDetails.invCcyDiscAmt, Validators.required],
      baseCcyNetAmtPayable: [this.FinancebiddingDetails.baseCcyNetAmtPayable, Validators.required],
      invCcyNetAmtPayable: [this.FinancebiddingDetails.invCcyNetAmtPayable, Validators.required],
      annualYeild: [this.FinancebiddingDetails.annualYeild, Validators.required],
      offerExpPeriod: [this.FinancebiddingDetails.offerExpPeriod, Validators.required],
      offerExpDateTime: [this.datePipe.transform(this.FinancebiddingDetails.offerExpDateTime), Validators.required],
      finId: localStorage.getItem("userId"),
      //invoiceId: this.id,
      invoiceId: [this.FinancebiddingDetails.invoiceId, Validators.required],
      tenor: [this.dateMinus(this.datePipe.transform(this.invoiceDetails.invDueDate, 'MM/dd/yyyy'), this.datePipe.transform(this.invoiceDetails.invDate, 'MM/dd/yyyy')), Validators.required],
      penalRate:[this.FinancebiddingDetails.penalRate],
      invNo: [this.FinancebiddingDetails.invNo],
      invoiceAmt: [this.FinancebiddingDetails.invoiceAmt]
    })
  }
  buildform() {
    this.finBidform = this.fb.group({
      fundingCcy: ['SGD', Validators.required],
      fxRate: ['1', Validators.required],
      baseCcyAmt: ['', Validators.required],
      fundablePercent: ['90', Validators.required],
      baseCcyFundingAmt: ['', Validators.required],
      invCcyFundingAmt: ['', Validators.required],
      repaymentDate: ['', Validators.required],
      invDiscRate: ['', Validators.required],
      baseCcyDiscAmt: ['', Validators.required],
      invCcyDiscAmt: ['', Validators.required],
      baseCcyNetAmtPayable: ['', Validators.required],
      invCcyNetAmtPayable: ['', Validators.required],
      annualYeild: ['', Validators.required],
      offerExpPeriod: ['24H', Validators.required],
      offerExpDateTime: ['', Validators.required],
      finId: localStorage.getItem("userId"),
      invoiceId: this.id,
      tenor: ['', Validators.required],
      penalRate:[''],
      invNo: [''],
      invoiceAmt: ['']
    })
  }
  dateMinus(repaymentDate,cureentday){
    var date1, date2;  
    console.log(repaymentDate,cureentday)
    date1 = new Date(cureentday);  
    date2 = new Date(repaymentDate);  
    var time_difference = date2.getTime() - date1.getTime();  
    console.log(time_difference,"time_difference")
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    return days_difference
  }

  isOpenHandle(isTrue){
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }

  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
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
  logout(){
    this.authenticationService.logout()
    }
  goHome(){
      this.router.navigateByUrl('/financier-dashboard');
    }
  handleToggle(e,status){
      this.modalDialogService.confirm("Confirm Delete","Do you really want to change the status ?","Ok","Cancel").subscribe(result =>{       
      })
  }
  openModal(event, template) {
    event.preventDefault();
    this.finBidform.patchValue({
      invNo : this.invoiceDetails ? this.invoiceDetails.invId:'',
      invoiceAmt:this.invoiceDetails ? this.invoiceDetails.invAmt:''
    });
      let array = []
      array.push(this.finBidform.value)
      this.launchBid_Popup = new MatTableDataSource(array);
      console.log(this.finBidform.value)
      console.log(this.finBidform,"this.finBidform")
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
 
  onSubmitBidForm() {
    try {
      if (this.finBidform.status === "INVALID"){
        this.toastr.error(this.translate.instant('Please fill Mandatory fields'))
      }else{
        let params = this.finBidform.value
        let userData = JSON.parse(localStorage.getItem('userCred'))
        params.repaymentDate = this.invoiceDetails.invDueDate;
        params.financierProfileId = userData['financierProfileId'];
        params.buyerUEN = this.invoiceDetails.buyerUEN;
        params.smeProfileId = this.invoiceDetails.smeProfileId;
        params.offerExpDateTime = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z";
        this.FinanceBiddingRejectedServices.UpdateBiddingSave(this.id,params).subscribe(resp => {
        
        }, error => {
          if(error.status != 200){
            let availableData = error.error
            let desiredData = this.replaceCommaLine(availableData);
            this.toastr.error(desiredData, '', {
              timeOut: 4000, progressBar: true, enableHtml: true
            });

            // this.toastr.error(error.error);
          }else{
            // this.toastr.success(error.error.text);
            this.toastr.success(this.translate.instant(error.error.text))
            this.buildfinBidform();
            this.modalRef.hide()
            this.router.navigateByUrl('/financier-dashboard');
          }
        })
      }
    } 
    catch (err) {
    }
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  changeRowgrid(){
    console.log(this.finBidform,"finnnn");
    if(this.isView === true){
    }else{
      this.finBidform.value.baseCcyAmt = Number(this.invoiceDetails.invAmt) * Number(this.finBidform.value.fxRate)
    
      this.finBidform.value.baseCcyFundingAmt = Number(this.finBidform.value.baseCcyAmt)*Number(this.finBidform.value.fundablePercent) / 100;
      
      this.finBidform.value.baseCcyDiscAmt = (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild/100) /360)
      
      this.finBidform.value.invDiscRate = Number(this.finBidform.value.baseCcyDiscAmt) / Number(this.finBidform.value.baseCcyFundingAmt)*100;
      
      
      this.finBidform.value.invCcyDiscAmt = (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild/100) /360)
      
      this.finBidform.value.baseCcyNetAmtPayable = this.finBidform.value.baseCcyFundingAmt - (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild/100) /360)
      
      
      this.finBidform.patchValue({baseCcyAmt: this.finBidform.value.baseCcyAmt,
      baseCcyFundingAmt: this.finBidform.value.baseCcyFundingAmt,
      invCcyFundingAmt:this.finBidform.value.baseCcyFundingAmt,
      baseCcyDiscAmt:this.finBidform.value.baseCcyDiscAmt.toFixed(2),
      invCcyDiscAmt:this.finBidform.value.invCcyDiscAmt.toFixed(2),
      invDiscRate:this.finBidform.value.invDiscRate.toFixed(2),
      baseCcyNetAmtPayable:this.finBidform.value.baseCcyNetAmtPayable.toFixed(2),
      invCcyNetAmtPayable:this.finBidform.value.baseCcyNetAmtPayable.toFixed(2)
      });
    }
  }
  openModalsecond(event,template,id) {
    this.FinanceBiddingRejectedServices.getRemarkFinanceBidding(this.id).subscribe(resp => {
      if(resp){
        let response = resp ? resp[0].remarkValue : ''
        let response2 = JSON.parse(response)
        this.FinancebiddingDetailsRemarks = response2
        this.TextAreaDiv = true;
        this.buildformSecond()
      }
    })
    event.preventDefault();
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  buildformSecond() {
    this.Rejectform = this.fb.group({
      invDiscountLow: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.invDiscountLow : false],
      annualYield: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.annualYield : false],
      fundablepercentagelow: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.fundablepercentagelow : false],
      fundingAmountHigh: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.fundingAmountHigh : false],
      netPayable: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.netPayable : false],
      baseAmount: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.baseAmount : false],
      invoiceAmt: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.invoiceAmt : false],
      repaymentDate: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.repaymentDate : false],
      fundingCCY: [this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.fundingCCY : false],
      offDate:[this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.offDate : false],
      others:[this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.others : false],
      othersRemarks:[this.FinancebiddingDetailsRemarks ? this.FinancebiddingDetailsRemarks.othersRemarks : '']
    })
  }
  buildfromReload(){
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
}


