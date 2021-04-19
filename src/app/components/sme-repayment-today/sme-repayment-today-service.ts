import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class Repayment_todayServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://2aefcdf3e17f.ngrok.io/ "; }
  
  getFinanceForBiddingLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/allInvoiceFinancing/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/getInvoiceData/'+id); 
  }
  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/getFinancingDetails/'+id);
  }  
}