import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class FinancierFundedServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://2aefcdf3e17f.ngrok.io/ "; }
  
  getFinanceForBiddingLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/fundedlist/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }
  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/financingdetails/'+id);
  }
  searchFinanceFunded(params){

    let invoiceRef  = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId  = params.smeId == "" ? "" : params.smeId;
    let buyerName  = params.buyerName == "" ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/searchfinancefunded?finId='+localStorage.getItem("userId")+'&invNo='+invoiceRef+'&smeId='+smeId+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate);

  }
}