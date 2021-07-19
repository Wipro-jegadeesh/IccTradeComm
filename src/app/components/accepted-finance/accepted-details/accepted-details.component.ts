import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AcceptedFinanceServices } from '../accepted-finance-service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-accepted-details',
  templateUrl: './accepted-details.component.html',
  styleUrls: ['./accepted-details.component.scss']
})
export class AcceptedDetailsComponent implements OnInit {

  //Goods Details
  displayedColumnsOne: Array<string> = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  //Invoice Details
  displayedColumnsTwo: Array<string> = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];
  //Finance Details
  displayedColumnsThree: Array<string> = ['id', 'finId', 'invoiceId', 'fxRate', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'repaymentDate', 'baseCcyNetAmtPayable', 'annualYeild'];
  //Interest Details
  displayedColumnsFour: Array<string> = ['FromDate', 'ToDate', 'NoDays', 'FinanceCurrency', 'TotalAmount', 'ActualRate', 'InterestAmount', 'RepaymentDate', 'RepaymentAmount'];
  //Amortization Details
  displayedColumnsFive: Array<string> = ['FromDate', 'ToDate', 'NoDays', 'FinanceCurrency', 'TotalAmount', 'ActualRate', 'InterestAmount', 'RepaymentDate'];
  //Amortization Details On Daily Basis
  displayedColumnsSix: Array<string> = ['Day', 'Date', 'InterestCurrency', 'InterestDay', 'InterestDate'];
  //Payment Details
  displayedColumnsSeven: Array<string> = ['Payment Id', 'Payment Type', 'Payment Date', 'Payment Amount', 'Ben Name', 'Ben Account', 'Ben IFSC', 'Net Amount'];

  dataSourceOne = new MatTableDataSource(); //Goods Details
  dataSourceTwo = new MatTableDataSource(); //Invoice Details
  dataSourceThree = new MatTableDataSource(); //Finance Details
  dataSourceFour = new MatTableDataSource(); //Interest Details
  dataSourceFive = new MatTableDataSource(); //Amortization Details
  dataSourceSix = new MatTableDataSource(); //Amortization Details On Daily Basis
  dataSourceSeven = new MatTableDataSource(); //Payment Details
  moment: any = moment;
  bidpanelOpenState = false;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private AcceptedFinanceServices: AcceptedFinanceServices) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    //Invoice API 
    this.AcceptedFinanceServices.getInvoiceRequestLists(this.id).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);
      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);
    })
    //Payment API 
    this.AcceptedFinanceServices.getPaymentDetails(this.id).subscribe(resp => {
      if (resp) {
        this.dataSourceSeven = new MatTableDataSource(resp);
      }
    })
    // this.AcceptedFinanceServices.getAmortiaztionDetails(this.id).subscribe(resp => {
    //   if (resp) {
    //     this.dataSourceSix = new MatTableDataSource(resp);
    //   }
    // })

    //AmortiaztionDetails
    this.AcceptedFinanceServices.getAcceptedFinanceDetails(this.id).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
        this.dataSourceFour = new MatTableDataSource(resp);
        this.dataSourceFive = new MatTableDataSource(resp);
        var dated = new Date();
        var ddatae = dated.setDate(dated.getDate() - 1)
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((new Date(resp[0].invoiceDate).valueOf() - ddatae.valueOf()) / oneDay));
        let arrayobj = []
        let Tentor = diffDays
        for (var i = 0; i < Tentor; i++) {
          arrayobj.push(resp[0])
        }
        let aromzition = []
        arrayobj.forEach((element, i) => {
          var start = new Date(element.invoiceDate);
          var end = new Date(element.invoiceDueDate);
          var dt = new Date(start);
          let arr = []
          while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
          }
          aromzition.push({
            days: i, date: arr[i],
            InterestCurrency: element.baseCcyAmt,
            Interestperday: element.baseCcyDiscAmt, InteresttillDate: element.baseCcyDiscAmt / element.tenor
          })
        });
        this.dataSourceSix = new MatTableDataSource(aromzition);

      }
    })
  }

  //HMTL to Interest Amount Calculation 
  tillDateCalu(invoiceDate, baseCcyAmt, tenor) {
    console.log(baseCcyAmt, tenor, "baseCcyAmt,tenor")
    if (invoiceDate) {
      var dated = new Date();
      var ddatae = dated.setDate(dated.getDate() - 1)
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((new Date(invoiceDate).valueOf() - ddatae.valueOf()) / oneDay));
      return baseCcyAmt / tenor * diffDays
    }
  }
}
