import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
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
}