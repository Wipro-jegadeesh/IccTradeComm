import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class IccOfferAcceptServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getOfferAcceptanceLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/icc-dashboard/allofferforacceptance');
  }
  getInvoiceRequestLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // 
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }

  getFinanceBiddingLists(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingdetails/'+id);
  }
  
  getFinancierBidding(params : any){
    return this.apiService.get('invoiceRequestSave', params);
}
getInvoiceDetails(id) {
  return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/allbiddinginvoicesbysmeid/'+id);
}
UpdateBiddingSave(id,body: any) {
  return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/initbidstatus/'+id,body);
}
getInvDetailsLists_ForFinanceBidding(id){
  return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingbyid/'+id); 
}
searchFinanceFunded(params){
  console.log("params.invoiceDate",params.invoiceDate);


  let invoiceRef  = params.invoiceRef == "" ? "" : params.invoiceRef;
  let smeId  = params.smeId == "" ? "" : params.smeId;
  let buyerName  = params.buyerName == "" ? "" : params.buyerName;
  let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
  let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');
  
  return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchallofferacceptanceinvoices?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

}
}