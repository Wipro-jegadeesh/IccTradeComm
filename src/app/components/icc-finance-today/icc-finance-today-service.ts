import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccFinanceTodayServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getFinanceTodayLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/financetodaylist');
  }
  getInvoiceRequestLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // 
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }

  getFinanceBiddingLists(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingdetails/'+id);
  }

  getAcceptedFinanceDetails(id){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/financingdetails/'+id);
  }  
  searchFinanceFunded(params){
   console.log(params,"params")
    let invoiceRef  = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId  = params.smeId == "" ? "" : params.smeId;
    let iccrefer  = params.iccrefer == "" ? "" : params.iccrefer;
    // let buyerName  = params.buyerName == "" ? "" : params.buyerName;
    // let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    // let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/financing-details/searchalltodayfinancefunded?smeId='+smeId+'&invoiceNo='+invoiceRef+'&iccrefer='+iccrefer);

  }
}