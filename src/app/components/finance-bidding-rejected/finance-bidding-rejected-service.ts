import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinanceBiddingRejectedServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }

    getFinancierBidding(params : any){
        return this.apiService.get('invoiceRequestSave', params);
    }
    getInvoiceDetails() {
      return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/rejbidslist/'+localStorage.getItem("userId"));
    }
    UpdateBiddingSave(id,body: any) {
      return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/initbidstatus/'+id,body);
    }
    getInvDetailsLists_ForFinanceBidding(id){
      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingbyid/'+id); 
    }
    getRemarkFinanceBidding(id){
      return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/remarkshistory/'+id); 
    }
}