import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinanceBiddingExpiryServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }


  getInvoiceDetails(userData) {
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/allExpiredBidsList/'+userData.finId);
  }

    getFinancierBidding(params : any){
        return this.apiService.get('allExpiredBids', params);
    }

    getInvDetailsLists_ForFinanceBidding(id){
      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/getBiddingFromId/'+id); 
    }

    getInvDetailsLists(id){
      return this.apiService.get('invoice-request/getInvoiceData/'+id);
    }


    finbidSave(body: any) {
      return this.apiService.post(environment.serviePath_2+'api/v1/bidding-details', body);
    }
    UpdateBiddingSave(id,body: any) {
      return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/updateBidStatusInitiated/'+id,body);
    }

    // getInvDetailsLists_ForFinanceBidding(id){
    //   return this.apiService.get('invoice-request/getInvoiceData/'+id);
    // }
}