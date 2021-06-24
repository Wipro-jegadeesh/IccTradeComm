import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class SmeFinancierForBiddingServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getFinanceForBiddingLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/invoicesbysmeid/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // 
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }

  getFinanceBiddingLists(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingdetails/'+id);
  }
  searchFinanceFunded(params){
    console.log(params,"params")    
    let invoiceRef  = params.invoiceRef == undefined || "" ? "" : params.invoiceRef;
    let smeId  = params.smeId == undefined || "" ? "" : params.smeId;
    let buyerName  = params.buyerName == undefined || "" ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');

    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchinvoices?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);
  }
  getsmeNameId() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/user-profile/smeNameFromId');
    }
}