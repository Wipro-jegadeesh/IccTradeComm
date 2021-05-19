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
    return this.apiService.get('invoice-request/initiatedInvoicesBySmeId/'+localStorage.getItem("userId"));
  }
  getBiddingDetails(invId){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/bidding-details/getBiddingDetails/'+invId);
  } 
  getInvoiceGoodsDetails(invId){
    return this.apiService.generalServiceget(environment.serviePath_1+'invoice-request/getInvoiceData/'+invId);
  }
  saveFinBid(body: any) {
    return this.apiService.post(environment.serviePath_2+'api/v1/financing-details/addFinancingBidDetails', body);
  }
  updateFinBid(id){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/updateBidStatus/'+id,'');
  }
  updateFinStatusBid(id,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/updateBidStatus/'+id,body);
  }
  updateAcceptStatusBid(FINID,BASEAMOUNT,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/limit-update/overAmountAvailable?finId='+FINID+'&OverallUtilizedLimit='+BASEAMOUNT,'');
  }
  rejectFinBid(id,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/rejectBidStatus/'+id,body);
  }
  searchFinanceFunded(params){
    console.log("params.invoiceDate",params.invoiceDate);
    let invoiceRef  = params.invoiceRef == undefined ? "" : params.invoiceRef;
    let smeId  = params.smeId == undefined ? "" : params.smeId;
    let buyerName  = params.buyerName == undefined ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == undefined ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invDueDate == undefined ? "" :  moment(params.invDueDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchBiddingInvoices?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

  }
}