import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AcceptedFinanceServices } from '../accepted-finance-service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-accepted-details',
  templateUrl: './accepted-details.component.html',
  styleUrls: ['./accepted-details.component.scss']
})
export class AcceptedDetailsComponent implements OnInit {

  displayedColumnsOne: string[] = ['descGoods', 'quantity', 'taxRate', 'amt', 'rate', 'total'];
  displayedColumnsTwo: string[] = ['invId', 'invDate', 'buyerName', 'invAmt', 'status'];
  displayedColumnsThree: string[] = ['id', 'finId', 'invoiceId', 'fxRate', 'baseCcyAmt', 'fundablePercent', 'baseCcyFundingAmt', 'repaymentDate','baseCcyNetAmtPayable', 'annualYeild'];
  displayedColumnsFour: string[] = ['FromDate', 'ToDate', 'NoDays', 'FinanceCurrency', 'TotalAmount','ActualRate','InterestAmount','RepaymentDate','RepaymentAmount'];
  displayedColumnsFive: string[] = ['FromDate', 'ToDate', 'NoDays', 'FinanceCurrency', 'TotalAmount','ActualRate','InterestAmount','RepaymentDate'];
  displayedColumnsSix: string[] = ['Day', 'Date', 'InterestCurrency', 'InterestDay', 'InterestDate'];
  displayedColumnsSeven: string[] = ['Payment Id', 'Payment Type', 'Payment Date', 'Payment Amount', 'Ben Name','Ben Account','Ben IFSC','Net Amount'];
  dataSourceOne = new MatTableDataSource(); //data
  dataSourceTwo = new MatTableDataSource(); //data
  dataSourceThree = new MatTableDataSource(); //data
  dataSourceFour = new MatTableDataSource(); //data
  dataSourceFive = new MatTableDataSource(); //data
  dataSourceSix = new MatTableDataSource(); //data
  dataSourceSeven = new MatTableDataSource(); //data
  
  bidpanelOpenState = false;
  id: any;

  constructor(private activatedRoute: ActivatedRoute,private AcceptedFinanceServices:AcceptedFinanceServices) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.AcceptedFinanceServices.getInvoiceRequestLists(this.id).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);

    })
    this.AcceptedFinanceServices.getAcceptedFinanceDetails(this.id).subscribe(resp => {
      if (resp) {
        this.dataSourceThree = new MatTableDataSource(resp);
        this.dataSourceSeven = new MatTableDataSource(resp);
      }
    })
  }

}
