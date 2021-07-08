import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';

@Injectable()
export class FinanceBiddingExpiryServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }

  //Bidding Table Response getting 
  getInvoiceDetails(userData) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/invoice-request/expbids/' + userData.finId);
  }
  //Bidding Details All Response Getting
  getInvDetailsLists_ForFinanceBidding(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/biddingbyid/' + id);
  }
  //Bidding Details Updated 
  UpdateBiddingSave(id, body: any) {
    return this.apiService.put(environment.serviePath_2 + 'api/v1/bidding-details/initbidstatus/' + id, body);
  }
  //Search API Hitting 
  searchFinanceFunded(params) {
    let biddingamount = params.BiddingAmt == "" ? "" : params.BiddingAmt;
    let bidId = params.BidId == "" ? "" : params.BidId;
    let invoiceAmt = params.invoiceAmount == "" ? "" : params.invoiceAmount;
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/searchexpiredbids?finId=' + localStorage.getItem("userId") + '&bidId=' + bidId + '&biddingamount=' + biddingamount + '&invoiceAmt=' + invoiceAmt);
  }
}