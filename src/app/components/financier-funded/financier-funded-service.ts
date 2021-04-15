import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinancierFundedServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://2aefcdf3e17f.ngrok.io/ "; }
  
  getFinanceForBiddingLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/getFundedListByFinId/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/getInvoiceData/'+id); 
  }
  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/getFinancingDetails/'+id);
  }
  searchFinanceFunded(params){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/searchFinanceFunded?finId'+localStorage.getItem("userId")+'&invNo='+params.invoiceRef+'&smeId='+params.smeId+'&buyerName='+params.buyerName+'&invoiceDate=2021-04-01&invDueDate=2021-04-17');

  }
}