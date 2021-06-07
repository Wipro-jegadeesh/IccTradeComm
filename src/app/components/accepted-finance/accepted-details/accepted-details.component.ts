import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AcceptedFinanceServices } from '../accepted-finance-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

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
  moment: any = moment;

  bidpanelOpenState = false;
  id: any;

  constructor(private activatedRoute: ActivatedRoute,private AcceptedFinanceServices:AcceptedFinanceServices) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.AcceptedFinanceServices.getInvoiceRequestLists(this.id).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource([
        { 'invId': resp.invId, 'invDate': resp.invDate, 'buyerName': resp.buyerName, 'invAmt': resp.invAmt, 'status': resp.status }
      ]);

// [{
//   "id": 127,
//   "smeId": "user110",
//   "invId": "1111",
//   "invref": "INV202100127",
//   "invAmt": 1000,
//   "invCcy": "SGD",
//   "buyerName": "gold",
//   "invDate": "2021-06-01",
//   "invDueDate": "2021-06-24",
//   "buyerAddr": "AFG",
//   "billNo": "123",
//   "dispDate": "2021-06-10",
//   "baseAmt": 0,
//   "baseCcy": null,
//   "fxRate": 0,
//   "source": null,
//   "smeRating": null,
//   "transactionRating": null,
//   "status": "APR",
//   "smeProfileId": "SME44",
//   "financierProfileId": null,
//   "buyerUEN": null,
//   "goodsDetails": [
//       {
//           "key97": 145,
//           "descGoods": "giold",
//           "quantity": 10,
//           "quantityType": null,
//           "rate": 100,
//           "amtCcy": "SGD",
//           "amt": 1000,
//           "discAmt": 0,
//           "netAmtPay": 1000,
//           "taxRate": 0,
//           "taxAmt": 0,
//           "total": 1000
//       }
//   ]
// }]

      this.dataSourceOne = new MatTableDataSource(resp.goodsDetails);

    })
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
    this.AcceptedFinanceServices.getAcceptedFinanceDetails(this.id).subscribe(resp => {
      if (resp) {
        let array =  [
          {
              "baseCcyDiscAmt": 13.13,
              "invoiceDate": "2021-05-31T18:30:00.000+0000",
              "baseCcyNetAmtPayable": 886.88,
              "fundablePercent": "90",
              "invoiceNo": "1111",
              "invoiceId": "127",
              "tenor": "21",
              "repaymentDate": "2021-06-23T18:30:00.000+0000",
              "annualYeild": "25",
              "fxRate": "1",
              "baseCcyFundingAmt": 900.0,
              "status": "FIN",
              "repaymentAmt": 900.00,
              "baseCcyAmt": "SGD",
              "invoiceDueDate": "2021-06-23T18:30:00.000+0000",
              "baseamt": 1000.00,
              "fin_id": "FIN202100081",
              "finId": "FIN202100081",
              "buyerName": "gold",
              "smeId": "user110"
          }
      ]
        console.log(array,"jlsllsls")


        this.dataSourceThree = new MatTableDataSource(resp);
        this.dataSourceFour = new MatTableDataSource(resp);
        this.dataSourceFive = new MatTableDataSource(resp);


        let arrayobj = []
        for (var i = 0; i < 26; i++) {
          arrayobj.push(resp[0])
        }
        let aromzition = []
        arrayobj.forEach((element,i) => {
          var dt = new Date(element.invoiceDate);
          console.log(dt,"dtdt")
          aromzition.push({days:i + 1,date: element.invoiceDate
            // new Date(dt.setDate(dt.getDate() + 1))
            // this.getDateArray(moment(element.invoiceDate).format('YYYY/MM/DD'),(moment(element.invoiceDueDate).format('YYYY/MM/DD')))
            ,InterestCurrency:element.baseCcyAmt,
            Interestperday:element.baseCcyDiscAmt,InteresttillDate:element.baseCcyDiscAmt/element.tenor})
        });
        console.log(arrayobj)
        console.log(aromzition,"aromzition")
        this.dataSourceSix = new MatTableDataSource(aromzition);
        
        
      }
    })
  }
  getDateArray = function(start,end) {

     start = new Date(start)
     end = new Date(end)
    var
      arr = new Array(),
      dt = new Date(start);
    let datet 
    while (dt <= end) {
      arr.push(new Date(dt));
      datet = new Date(dt)
      dt.setDate(dt.getDate() + 1);
    }
    console.log(arr,"arr")
    console.log(datet,"datet")
    // return datet
  }  
}
