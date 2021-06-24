import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class SmeBiddingServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  getInvDetailsLists(){
    return this.apiService.get('invoice-request/initiatedinvoicesbysmeid/'+localStorage.getItem("userId"));
  }
  getBiddingDetails(invId){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/bidding-details/biddingdetails/'+invId);
  } 
  getInvoiceGoodsDetails(invId){
    return this.apiService.generalServiceget(environment.serviePath_1+'invoice-request/invoice/'+invId);
  }
  saveFinBid(body: any) {
    return this.apiService.post(environment.serviePath_2+'api/v1/financing-details', body);
  }
  updateFinBid(id){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/aprbidstatus/'+id,'');
  }
  updateFinStatusBid(id,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/aprbidstatus/'+id,body);
  }
  updatepaymentsBid(body){
    return this.apiService.post(environment.serviePath_2+'api/v1/payment-details/paymentdetails',body);
  }
  updateAcceptStatusBid(FINID,BASEAMOUNT,body){
    return this.apiService.put(environment.serviePath_4+'limit-update/overAmountAvailable?finId='+FINID+'&OverallUtilizedLimit='+BASEAMOUNT,{});
  }
  rejectFinBid(id,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/rejbidstatus/'+id,body);
  }
  searchFinanceFunded(params){
    let invoiceId  = params.invoiceId == "" ? "" : params.invoiceId;
    let buyerName  = params.buyerName == "" ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchbiddinginvoices?smeId='+localStorage.getItem("userId")+'&invoiceNo='+invoiceId+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

  }
  getInvoiceDetails() {
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/allbiddinginvoicesbysmeid/'+localStorage.getItem("userId"));
  }
}