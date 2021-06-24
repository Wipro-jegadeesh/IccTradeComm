import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class FinanceBiddingExpiryServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }


  getInvoiceDetails(userData) {
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/expbids/'+userData.finId);
  }

    getFinancierBidding(params : any){
        return this.apiService.get('expiredbids', params);
    }

    getInvDetailsLists_ForFinanceBidding(id){
      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingbyid/'+id); 
    }

    getInvDetailsLists(id){
      return this.apiService.get('invoice-request/invoice/'+id);
    }


    finbidSave(body: any) {
      return this.apiService.post(environment.serviePath_2+'api/v1/bidding-details', body);
    }
    UpdateBiddingSave(id,body: any) {
      return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/initbidstatus/'+id,body);
    }
    searchFinanceFunded(params){

      let biddingamount  = params.BiddingAmt == "" ? "" : params.BiddingAmt;
      let bidId  = params.BidId == "" ? "" : params.BidId;
      let invoiceAmt  = params.invoiceAmount == "" ? "" : params.invoiceAmount;

      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/searchexpiredbids?finId='+localStorage.getItem("userId")+'&bidId='+bidId+'&biddingamount='+biddingamount+'&invoiceAmt='+invoiceAmt);
    }

  
}