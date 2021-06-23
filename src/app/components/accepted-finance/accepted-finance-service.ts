import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class AcceptedFinanceServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://2aefcdf3e17f.ngrok.io/ "; }
  
  getFinanceForBiddingLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/invoicefinancing/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }
  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/financingdetails/'+id);
  }  
  getPaymentDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/payment-details/paymentdetailsbyinvid/'+id);
  }
  getAmortiaztionDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-details/onedayinterestcalculation/'+id);
  }
  searchFinanceFunded(params){
    console.log("params",params);
    let invoiceRef  = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId  = params.smeId == "" ? "" : params.smeId;
    let buyerName  = params.buyerName == "" ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchinvoicefinancing?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

  }
}