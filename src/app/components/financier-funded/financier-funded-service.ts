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
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/getFundedListByFinId/'+localStorage.getItem("userId"));
  }
  getInvoiceRequestLists(id){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/getInvoiceData/'+id); 
  }
  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/getFinancingDetails/'+id);
  }
  searchFinanceFunded(params){
    console.log("params.invoiceDate",params.invoiceDate);
    let invoiceRef  = params.invoiceRef == undefined ? "" : params.invoiceRef;
    let smeId  = params.smeId == undefined ? "" : params.smeId;
    let buyerName  = params.buyerName == undefined ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == undefined ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invDueDate == undefined ? "" :  moment(params.invDueDate).format('YYYY-MM-DD');
    
    http://localhost:8081/api/v1/financing-details/searchFinanceFunded?finId=FIN001&invNo=1234&smeId=SME101&buyerName=steel&invoiceDate=2021-04-01&invDueDate=2021-04-17
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/searchFinanceFunded?finId='+localStorage.getItem("userId")+'&invNo='+invoiceRef+'&smeId='+smeId+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

  }
}