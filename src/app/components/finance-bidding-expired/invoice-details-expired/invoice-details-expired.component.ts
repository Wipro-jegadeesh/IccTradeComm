import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FinanceBiddingExpiryServices } from '../../finance-bidding-expired/finance-bidding-expiry-service';
import { INVOICEDETAILSCONSTANTS } from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { InvoiceRequestServices } from '../../invoice-request/invoice-service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-details-expired',
  templateUrl: './invoice-details-expired.component.html',
  styleUrls: ['./invoice-details-expired.component.scss'],
  providers: [DatePipe]
})
export class InvoiceDetailsExpiredComponent implements OnInit {
  finBidform: FormGroup;
  modalRef: BsModalRef;
  detailsTooltip = INVOICEDETAILSCONSTANTS
  FinancebiddingDetails: any;
  type: string;
  isView: boolean;

  dataSourceOne = new MatTableDataSource(); //Good Details
  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  dataSourceTwo = new MatTableDataSource(); //Funding Details
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
  //launchBidPopup Funding Popup
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

  currentPage = 0;
  pageCount = 1;
  limit = 7;
  bidpanelOpenState = false;
  id: any
  invoiceDetails: any
  moment: any = moment;

  constructor(public translate: TranslateService, private invoiceRequestServices: InvoiceRequestServices, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private modalService: BsModalService, private router: Router,
    private fb: FormBuilder, private FinanceBiddingExpiryServices: FinanceBiddingExpiryServices, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.type === 'view') {
      this.isView = true
    }
    //Funding From
    this.buildform()
    this.FinanceBiddingExpiryServices.getInvDetailsLists_ForFinanceBidding(this.id).subscribe(resp => {
      if (resp) {
        this.FinancebiddingDetails = resp
        this.invoiceRequestServices.getInvDetailsLists_ForFinanceBidding(resp.invoiceId).subscribe(resp => {
          this.invoiceDetails = resp
          this.buildfinBidform()
          this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
        })
      } else {
        //Funding From Data Filled 
        this.buildfinBidform()
      }
    })
  }
  buildfinBidform() {
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
      invoiceId: [this.FinancebiddingDetails.invoiceId, Validators.required],
      tenor: [this.dateMinus(this.datePipe.transform(this.invoiceDetails.invDueDate, 'MM/dd/yyyy'), this.datePipe.transform(this.invoiceDetails.invDate, 'MM/dd/yyyy')), Validators.required],
      penalRate: [this.FinancebiddingDetails.penalRate],
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
      penalRate: [''],
      invNo: [''],
      invoiceAmt: ['']
    })
  }
  //Date minus in B/W Days 
  dateMinus(repaymentDate, cureentday) {
    var date1, date2;
    console.log(repaymentDate, cureentday)
    date1 = new Date(cureentday);
    date2 = new Date(repaymentDate);
    var time_difference = date2.getTime() - date1.getTime();
    console.log(time_difference, "time_difference")
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    return days_difference
  }

  //Popup open For ReLaunch Bidding
  openModal(event, template) {
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
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  //Re Submit From 
  onSubmitBidForm() {
    try {
      if (this.finBidform.status === "INVALID") {
        this.toastr.error(this.translate.instant('Please fill Mandatory fields'))
      } else {
        let params = this.finBidform.value
        params.repaymentDate = this.invoiceDetails.invDueDate;
        params.offerExpDateTime = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
        this.FinanceBiddingExpiryServices.UpdateBiddingSave(this.id, params).subscribe(resp => {
          this.toastr.success(this.translate.instant('Bid Update successfully'))
          this.buildfinBidform();
          this.modalRef.hide()
          this.router.navigateByUrl('/financier-dashboard');
        }, error => {
        })
      }
    }
    catch (err) {
    }
  }
  //calculationRate For FX rate 
  changeRowgrid() {
    if (this.isView === true) {
    } else {
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
}

