import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceRequestServices } from '../../invoice-request/invoice-service';
import { INVOICEDETAILSCONSTANTS } from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SmeFinancierForBiddingServices } from '../../sme-financefor-bidding/sme-financefor-bidding-service';



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

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  providers: [DatePipe]
})
export class InvoiceDetailsComponent implements OnInit {
  finBidform: FormGroup;
  modalRef: BsModalRef;

  detailsTooltip = INVOICEDETAILSCONSTANTS
  limitDetails: any;
  public getSmeName: any = []

  constructor(public translate: TranslateService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder, private SmeFinancierForBiddingServices: SmeFinancierForBiddingServices, private invoiceRequestServices: InvoiceRequestServices, private toastr: ToastrService) { }

  dataSourceOne = new MatTableDataSource(); //data
  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
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
  launchBidPopup: string[] = [
    'Funding CCY',
    'Base CCY Amount',
    'Fundable percentage',
    'Funding Amount / Repay Amount (Base CCY)',
    'Repayment Date'
  ]
  launchBid_Popup: any
  launchBidTableTwo_Popup: any
  launchBidTableTwoPopup: string[] = [
    'Inv Discount Rate',
    'Disc Amt (Base CCY)',
    'Net Amt payable (Base CCY)',
    'Annual Yield (Basis a360)',
    'Offer Exp period',
    'Off Exp date /time'
  ]
  displayInvDatas = new MatTableDataSource(); //data

  displayedInvoiceFormsColumns: string[] = [
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
  id: any
  invoiceDetails: any
  moment: any = moment;

  public smeRatingDetails: any = [];



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
            // this.invoiceDetails = { invId :'3456789'}

    this.buildform()
    this.invoiceRequestServices.getInvDetailsLists_ForFinanceBidding(this.id).subscribe(resp => {
      if (resp) {
        this.getuserProfile();
        this.buildfinBidform()
        this.changeRowgrid()
        this.displayInvDatas = new MatTableDataSource([
          {
            billNo: resp.billNo,
            invId: resp.invId,
            invDate: resp.invDate,
            invDueDate: resp.invDueDate,
            invAmt: resp.invAmt,
            buyerName: resp.buyerName,
            smeId: resp.smeId,
          }

        ])
        this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
      } else {
        this.buildfinBidform()
      }
    })

    this.invoiceRequestServices.getMainlimitScreenDatas().subscribe(resp => {
      this.limitDetails = resp
    })
  }

  getsmeNameId() {
    this.SmeFinancierForBiddingServices.getsmeNameId().subscribe(resp => {
      this.getSmeName = resp;
    })
  }
  getuserProfile() {
    this.invoiceRequestServices.getuserProfile(this.invoiceDetails.smeProfileId).subscribe(resp => {
      if (resp) {
        this.smeRatingDetails = resp;
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
      penalRate: [''],
      invNo: [''],
      invoiceAmt: ['']
    })
  }
  buildfinBidform() {
    var ddatae = new Date();
    console.log(this.datePipe.transform(this.invoiceDetails.invDueDate), "this.datePipe.transform(this.invoiceDetails.invDueDate)")
    this.finBidform = this.fb.group({
      fundingCcy: ['SGD', Validators.required],
      fxRate: ['1', Validators.required],
      baseCcyAmt: [this.invoiceDetails.invAmt * 1, Validators.required],
      fundablePercent: ['90', Validators.required],
      baseCcyFundingAmt: ['', Validators.required],
      invCcyFundingAmt: ['', Validators.required],
      repaymentDate: [this.datePipe.transform(this.invoiceDetails.invDueDate), Validators.required],
      invDiscRate: ['', Validators.required],
      baseCcyDiscAmt: ['', Validators.required],
      invCcyDiscAmt: ['', Validators.required],
      baseCcyNetAmtPayable: ['', Validators.required],
      invCcyNetAmtPayable: ['', Validators.required],
      annualYeild: ['', Validators.required],
      offerExpPeriod: ['24H', Validators.required],
      offerExpDateTime: [this.datePipe.transform(ddatae.setDate(ddatae.getDate() + 1)), Validators.required],
      finId: localStorage.getItem("userId"),
      invoiceId: this.id,
      tenor: [this.dateMinus(this.datePipe.transform(this.invoiceDetails.invDueDate, 'MM/dd/yyyy'), this.datePipe.transform(this.invoiceDetails.invDate, 'MM/dd/yyyy')), Validators.required],
      penalRate: [''],
      invNo: [''],
      invoiceAmt: ['']
    })
  }
  dateMinus(repaymentDate, cureentday) {
    var date1, date2;
    console.log(repaymentDate, cureentday)
    date1 = new Date(cureentday);
    date2 = new Date(repaymentDate);
    var time_difference = date2.getTime() - date1.getTime();
    console.log(time_difference, "time_difference")
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    console.log(days_difference, "days_difference")
    return days_difference
  }

  openModal(event, template) {
    console.log(this.limitDetails, "this.limitDetails")
    if (Number(this.limitDetails && this.limitDetails.OverallAvailable) < this.finBidform.value.baseCcyNetAmtPayable) {
      this.toastr.error(this.translate.instant('Could not launch the bid! Overall available is less than bidding amount'))
    } else {
      if (Number(this.limitDetails && this.limitDetails.transactions) < this.finBidform.value.baseCcyNetAmtPayable) {
        this.toastr.error(this.translate.instant('Could not launch the bid! transactions available is less than bidding amount'))
      } else {
        event.preventDefault();
        this.finBidform.patchValue({
          invNo: this.invoiceDetails ? this.invoiceDetails.invId : '',
          invoiceAmt: this.invoiceDetails ? this.invoiceDetails.invAmt : ''
        });
        let array = []
        array.push(this.finBidform.value)
        this.launchBid_Popup = new MatTableDataSource(array);
        console.log(this.finBidform.value)
        console.log(this.finBidform, "this.finBidform")
        this.modalRef = this.modalService.show(template, { class: 'modal-lg mod-box' });
      }
    }
  }

  onSubmitBidForm() {
    try {
      if (this.finBidform.status === "INVALID") {
        this.toastr.error(this.translate.instant('Please fill Mandatory fields'))
      } else {
        let params = this.finBidform.value
        let userData = JSON.parse(localStorage.getItem('userCred'))
        params.repaymentDate = this.invoiceDetails.invDueDate;
        params.offerExpDateTime = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
        params.financierProfileId = userData['financierProfileId'];
        params.repaymentDate = this.invoiceDetails.invDueDate;
        params.buyerUEN = this.invoiceDetails.buyerUEN;
        params.smeProfileId = this.invoiceDetails.smeProfileId;
        params.smeRating = this.smeRatingDetails && this.smeRatingDetails.smeRating ? this.smeRatingDetails.smeRating : '0';
        params.transactionRating = this.invoiceDetails && this.invoiceDetails.buyerScore ? this.invoiceDetails.buyerScore : '0';

        this.invoiceRequestServices.finbidSave(params).subscribe(resp => {
          this.toastr.success(this.translate.instant('Bid Launched successfully'))
          this.buildfinBidform();
          this.modalRef.hide()
          this.router.navigateByUrl('/financier-dashboard');
        }, error => {
          if (error.status != 200) {
            let availableData = error.error
            let desiredData = this.replaceCommaLine(availableData);
            this.toastr.error(desiredData, '', {
              timeOut: 4000, progressBar: true, enableHtml: true
            });
          } else {
            this.toastr.success(error.error.text);
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
  changeRowgrid() {
    this.finBidform.value.baseCcyAmt = Number(this.invoiceDetails.invAmt) * Number(this.finBidform.value.fxRate)
    this.finBidform.value.baseCcyFundingAmt = Number(this.finBidform.value.baseCcyAmt) * Number(this.finBidform.value.fundablePercent) / 100;
    this.finBidform.value.baseCcyDiscAmt = (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild / 100) / 360)
    this.finBidform.value.invDiscRate = Number(this.finBidform.value.baseCcyDiscAmt) / Number(this.finBidform.value.baseCcyFundingAmt) * 100;
    this.finBidform.value.invCcyDiscAmt = (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild / 100) / 360)
    this.finBidform.value.baseCcyNetAmtPayable = this.finBidform.value.baseCcyFundingAmt - (this.finBidform.value.baseCcyFundingAmt * this.finBidform.value.tenor * (this.finBidform.value.annualYeild / 100) / 360)
    this.finBidform.patchValue({
      baseCcyAmt: this.finBidform.value.baseCcyAmt,
      baseCcyFundingAmt: this.finBidform.value.baseCcyFundingAmt,
      invCcyFundingAmt: this.finBidform.value.baseCcyFundingAmt,
      baseCcyDiscAmt: this.finBidform.value.baseCcyDiscAmt.toFixed(2),
      invCcyDiscAmt: this.finBidform.value.invCcyDiscAmt.toFixed(2),
      invDiscRate: this.finBidform.value.invDiscRate.toFixed(2),
      baseCcyNetAmtPayable: this.finBidform.value.baseCcyNetAmtPayable.toFixed(2),
      invCcyNetAmtPayable: this.finBidform.value.baseCcyNetAmtPayable.toFixed(2)
    });
  }
}
