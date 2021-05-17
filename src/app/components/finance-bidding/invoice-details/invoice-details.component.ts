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
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  providers: [DatePipe]
})
export class InvoiceDetailsComponent implements OnInit {
  finBidform: FormGroup;
  modalRef: BsModalRef;

  status: Status[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'R', viewValue: 'R'},
  ];
  detailsTooltip=INVOICEDETAILSCONSTANTS
  
  constructor(private datePipe: DatePipe,private activatedRoute: ActivatedRoute,private modalService: BsModalService,
    private authenticationService:AuthenticationService,private router :Router,private modalDialogService:ModalDialogService,
    private fb: FormBuilder,private invoiceRequestServices:InvoiceRequestServices,private toastr: ToastrService) { }

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



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    // this.buildfinBidform()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.buildform()
    this.invoiceRequestServices.getInvDetailsLists_ForFinanceBidding(this.id).subscribe(resp => {
      if(resp){

        this.invoiceDetails = resp
        this.buildfinBidform()
        this.changeRowgrid()
        this.displayInvDatas = new MatTableDataSource([
         {
          billNo : resp.billNo,
          invId : resp.invId,
          invDate : resp.invDate,
          invDueDate : resp.invDueDate,
          invAmt : resp.invAmt,
          buyerName : resp.buyerName,
          smeId : resp.smeId,          
        }

      ])
      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
      }else{
        this.buildfinBidform()

      }
     
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
      invNo: [''],
      invoiceAmt: ['']
    })
  }
  buildfinBidform(){
    var ddatae = new Date();
    console.log(this.datePipe.transform(this.invoiceDetails.invDueDate),"this.datePipe.transform(this.invoiceDetails.invDueDate)")
    this.finBidform = this.fb.group({
      fundingCcy: ['SGD', Validators.required],
      fxRate: ['1', Validators.required],
      baseCcyAmt: [this.invoiceDetails.invAmt * 1,Validators.required],
      fundablePercent: ['90', Validators.required],
      baseCcyFundingAmt: ['', Validators.required],
      invCcyFundingAmt: ['', Validators.required],
      repaymentDate:[this.datePipe.transform(this.invoiceDetails.invDueDate), Validators.required],
      invDiscRate: ['', Validators.required],
      baseCcyDiscAmt:['', Validators.required],
      invCcyDiscAmt:['', Validators.required],
      baseCcyNetAmtPayable:['', Validators.required],
      invCcyNetAmtPayable:['', Validators.required],
      annualYeild:['', Validators.required],
      offerExpPeriod:['24H', Validators.required],
      offerExpDateTime:[this.datePipe.transform(ddatae.setDate(ddatae.getDate() + 1)), Validators.required],
      finId: localStorage.getItem("userId"),
      invoiceId : this.id,
      tenor:[this.dateMinus(this.datePipe.transform(this.invoiceDetails.invDueDate,'MM/dd/yyyy'),this.datePipe.transform(ddatae,'MM/dd/yyyy')), Validators.required],
      invNo:[''],
      invoiceAmt:['']
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
    this.modalRef = this.modalService.show(template, {class: 'modal-lg mod-box'});
  }
 
  onSubmitBidForm() {
    try {
      // for (const key in this.invoiceForm.controls) {
      //   this.invoiceForm.get(key).setValidators(Validators.required);
      //   this.invoiceForm.get(key).updateValueAndValidity();
      //   }
      if (this.finBidform.status === "INVALID"){
        this.toastr.error("Please fill Mandatory fields")
      }else{
        let params = this.finBidform.value
        let userData = JSON.parse(localStorage.getItem('userCred'))
        params.repaymentDate = this.invoiceDetails.invDueDate;
        params.offerExpDateTime = moment().format('YYYY-MM-DD')+ "T00:00:00.000Z"
        params.financierProfileId = userData['financierProfileId']
        // this.invoiceFormBuild();
        // this.dataSourceTwo.data = [];
        // this.invoiceID = "";
        // this.InvoiceFdate = ""
        // for (const key in this.invoiceForm.controls) {
        //   this.invoiceForm.get(key).clearValidators();
        //   this.invoiceForm.get(key).updateValueAndValidity();
        // }
        this.invoiceRequestServices.finbidSave(params).subscribe(resp => {
          this.toastr.success("Bid Launched successfully")
          this.buildfinBidform();
          this.modalRef.hide()
          this.router.navigateByUrl('/financier-dashboard');
          // this.getInvDetailsLists();
        }, error => {
        })
      }
    } 
    catch (err) {
    }
  }
    changeRowgrid(){
       console.log(this.finBidform,"finnnn");
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
