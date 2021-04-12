import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class InvoiceRequestServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  getInvDetailsLists(){
    return this.apiService.get('invoice-request/initiatedInvoicesBySmeId/'+localStorage.getItem("userId"));
  }

  getInvDetailsLists_ForFinanceBidding(id){
    return this.apiService.get('invoice-request/getInvoiceData/'+id);
  }


  invoiceRequestSave(body: any) {
    return this.apiService.post(environment.api_url+'invoice-request', body);
  }
  
  authoriseInvoice(body: any) {
    return this.apiService.put(environment.api_url+'invoice-request/updateInvoiceStatus/'+body,'' );
  }
  UpdateInvoice(id,body: any) {
    return this.apiService.put(environment.api_url+'invoice-request/updateInvoice/'+id,body);
  }
  finbidSave(body: any) {
    return this.apiService.post(environment.serviePath_2+'api/v1/bidding-details', body);
  }
  updateInvoiceDetails(data){
    return this.apiService.post(environment.serviePath_2+'api/v1/invoice-details',data)
  }

}