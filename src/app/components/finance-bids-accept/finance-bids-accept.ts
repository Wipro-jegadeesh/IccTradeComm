import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class FinancebidsRequestServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }

    getFinancierBidding(params : any){
        return this.apiService.get('/financing-details/allInitatedBids/{finId}', params);
    }
    CancelBidingAccept(id,params) {
       return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/canbidstatus/'+id,params);
    }
    getBidingAcceptDetails() {
       return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/initbids/'+localStorage.getItem("userId"));
    }
    searchFinanceFunded(params){
      let biddingamount  = params.BiddingAmt == undefined ? "" : params.BiddingAmt;
      let bidId  = params.BidId == undefined ? "" : params.BidId;
      let invoiceAmt  = params.invoiceAmount == undefined ? "" : params.invoiceAmount;

      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/searchinitiatedbids?finId='+localStorage.getItem("userId")+'&bidId='+bidId+'&biddingamount='+biddingamount+'&invoiceAmt='+invoiceAmt);
  
    }
}