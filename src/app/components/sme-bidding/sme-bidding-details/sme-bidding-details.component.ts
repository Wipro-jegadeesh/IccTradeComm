import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from '../../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { SMEDASHBOARDCONSTANTS } from '../../../shared/constants/constants';
import { SmeBiddingServices } from '../sme-bidding-services';
import { INVOICEDETAILSCONSTANTS } from '../../../shared/constants/constants';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as moment from 'moment';

const DATA_ONE: any[] = [];
const DATA_INV_DETAILS: any[] = [];
@Component({
  selector: 'app-sme-bidding',
  templateUrl: './sme-bidding-details.component.html',
  styleUrls: ['./sme-bidding-details.component.scss']
})

export class SmeBiddingDetailsComponent implements OnInit {

  isOpen = ""
  modalRef: BsModalRef;
  detailsTooltip = INVOICEDETAILSCONSTANTS
  bidDetails
  financierProfileId;
  buyerUEN
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  id: any;
  textAreaDiv: boolean;
  public issubmitTrue: boolean = false;
  moment: any = moment;
  panelOpenState = false;
  financierTooltip = SMEDASHBOARDCONSTANTS;
  rejectForm: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, public router: Router, private modalService: BsModalService,
    private modalDialogService: ModalDialogService, private authenticationService: AuthenticationService
    , private smeBiddingServices: SmeBiddingServices, private toastr: ToastrService) { }
  goodsDetailsData = new MatTableDataSource(DATA_ONE); //data
  bidListData; //data
  bidDetailsData;
  invoiceListData = new MatTableDataSource(DATA_INV_DETAILS); //data

  // Goods table header
  goodsTableHeaders: Array<string> = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  //Bid details table headers - 1
  bidDetailsHeaderOne: Array<string> = [
    'Funding CCY',
    'FX rate Base CCY',
    'Base CCY Amount',
    'Fundable percentage',
    // 'Funding Amount / Repay Amount (Base CCY)',
    'Funding Amount / Repay Amount (Inv CCY)',
    'Repayment Date',
    'Penal ROI'
  ];
  //Bid details table headers - 2
  bidDetailsHeaderTwo: Array<string> = [
    'Inv Discount  Rate',
    'Disc Amt (Base CCY)',
    'Disc Amt (Inv CCY)',
    'Annual Yield (Basis a360)',
    // 'Penal ROI',
    'Net Amt payable (Base CCY)',
    'Net Amt payable (Inv CCY)',
    'Offer Exp period',
    'Off Exp date /time'
  ];
  //main bid table header
  bidTableHeaders: Array<string> = [
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
    'Penal ROI',
    'Net Amt payable (Base CCY)',
    // 'Net Amt payable (Inv CCY)',
    // 'Offer Exp period',
    'Off Exp date /time',
    // 'Status'
  ];
  //Invoice detail table header
  invoiceTableHeader: Array<string> = [
    'InvoiceID',
    'InvoiceDate',
    'smeId',
    'Buyer',
    'Amount',
  ];

  //Rejection question options
  rejectQuestionOne = {
    subrejectQuestionOne: [
      { name: 'Inv Discount Rate High', labelPosition: 'before', formControlName: 'invDiscountLow' },
      { name: 'Annual Yield (Basis a360) Too High', labelPosition: 'before', formControlName: 'annualYield' },
      { name: 'Fundable percentage Less', labelPosition: 'before', formControlName: 'fundablepercentagelow' },
      { name: 'Funding Amount Less', labelPosition: 'before', formControlName: 'fundingAmountHigh' },
    ]
  };
  rejectQuestionTwo = {
    subrejectQuestionTwo: [
      { name: 'Net Amt payable (Base CCY) Low', labelPosition: 'before', formControlName: 'netPayable' },
      { name: 'Repayment Date Less', labelPosition: 'before', formControlName: 'repaymentDate' },
      { name: 'Off Exp date /time Less', labelPosition: 'before', formControlName: 'offDate' },
      { name: 'Others', labelPosition: 'before', formControlName: 'others' },
    ]
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getFundingBidDetails();
  }
  //func to get specific bid details
  getFundingBidDetails() {
    this.smeBiddingServices.getBiddingDetails(this.id).subscribe(resp => {
      if (resp) {
        this.financierProfileId = resp[0] && resp[0].financierProfileId;
        this.buyerUEN = resp[0] && resp[0].buyerUEN
        // get Invoice & goods details of the specific invoice
        this.smeBiddingServices.getInvoiceGoodsDetails(resp[0] && resp[0].invoiceId).subscribe(resp => {
          this.goodsDetailsData = new MatTableDataSource(resp.goodsDetails)
          this.invoiceListData = new MatTableDataSource([
            { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status, 'smeId': resp.smeId }
          ]);
        })
        this.bidListData = new MatTableDataSource(resp);
        this.bidDetails = resp;
      }
    })
  }
  //rejection form checkbox options
  buildBidDetailForm() {
    this.rejectForm = this.fb.group({
      invDiscountLow: [false],
      annualYield: [false],
      fundablepercentagelow: [false],
      fundingAmountHigh: [false],
      netPayable: [false],
      baseAmount: [false],
      invoiceAmt: [false],
      repaymentDate: [false],
      fundingCCY: [false],
      offDate: [false],
      others: [false],
      othersRemarks: ['']
    })
  }
  //update rejection form 
  updateBidRejection(text) {
    if (text === 'Others') {
      this.rejectForm.get('othersRemarks').setValidators([Validators.required]);
      this.rejectForm.get('othersRemarks').updateValueAndValidity();
      this.textAreaDiv = !this.textAreaDiv
    }
  }
  //invoice rejection popup function
  openModal(event, template, index, financier) {
    if (index === 'reject') {
      this.modalRef.hide()
      this.textAreaDiv = false
      this.buildBidDetailForm()
      event.preventDefault();
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
    else {
      let array = []
      array.push(financier)
      this.bidDetailsData = new MatTableDataSource(array);
      event.preventDefault();
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
  }
  //Error validation function
  public errorHandling = (control, error) => {
    return this.rejectForm.controls[control].hasError(error);
  }
  //Accept bid functionality
  onAcceptBid(data) {
    let userData = JSON.parse(localStorage.getItem('userCred'))
    data.filteredData[0]['smeId'] = localStorage.getItem("userId")
    data.filteredData[0]['status'] = 'FIN'
    data.filteredData[0]['invoiceId'] = data.filteredData[0].invoiceId
    data.filteredData[0]['invoiceNo'] = data.filteredData[0].invNo
    data.filteredData[0]['financierProfileId'] = this.financierProfileId
    data.filteredData[0]['smeProfileId'] = userData['smeProfileId']
    data.filteredData[0]['buyerUEN'] = this.buyerUEN
    var element = data.filteredData[0];
    this.smeBiddingServices.saveFinBid(element).subscribe(resp => {
      if (resp) {
        let userData = JSON.parse(localStorage.getItem('userCred'))
        let obj = {
          "smeProfileId": userData['smeProfileId']
        }
        //API call for Update financier status
        this.smeBiddingServices.updateFinStatusBid(data.filteredData[0].id, obj).subscribe(resp => {
        })
        //API call for Update particular bid status
        this.smeBiddingServices.updateAcceptedBidStatus(data.filteredData[0].financierProfileId, data.filteredData[0].baseCcyNetAmtPayable, '').subscribe(resp => {
        })
        // API call for update payment bid
        this.smeBiddingServices.updateBidPayment(element).subscribe(resp => {
        })
        this.toastr.success("Accepted successfully")
        this.modalRef.hide()
        this.router.navigateByUrl('/sme-dashboard');
      }
    })
  }
  //reject bid functionality
  rejectBid(data) {
    this.issubmitTrue = true;
    if (this.rejectForm.invalid) {
      return;
    }
    var date = new Date();
    let array = []
    array.push(this.rejectForm.value)
    let obj = {
      remarkValue: JSON.stringify(array),
      invoiceId: data.filteredData[0].invoiceId,
      invNo: data.filteredData[0].invNo,
      bidId: data.filteredData[0].bidId,
      updatedTime: moment(date, 'YYYY - MM - DD HH: mm').toDate()
    }
    if (this.rejectForm.valid) {
      //API call for reject financier Bid
      this.smeBiddingServices.rejectFinancierBid(data.filteredData[0].id, obj).subscribe(resp => {
        this.toastr.success("Rejected successfully")
        this.issubmitTrue = false;
        this.modalRef.hide()
        this.rejectForm.reset();
        this.router.navigateByUrl('/sme-dashboard');
      })
    }
  }
}