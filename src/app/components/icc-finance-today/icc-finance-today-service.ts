import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccFinanceTodayServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getFinanceTodayLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/allFinanceTodayList');
  }
  getInvoiceRequestLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // debugger;
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/getInvoiceData/'+id); 
  }

  getFinanceBiddingLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // debugger;
    // bidding-details/getBiddingDetails/{invoiceId}    http://950f76a46a8b.ngrok.io/api/v1
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/getBiddingDetails/'+id);
  }

  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/getFinancingDetails/'+id);
  }  
  
}