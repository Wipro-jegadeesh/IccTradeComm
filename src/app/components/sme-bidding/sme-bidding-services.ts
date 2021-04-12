import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
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
  rejectFinBid(id,body){
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/rejectBidStatus/'+id,body);
  }
}