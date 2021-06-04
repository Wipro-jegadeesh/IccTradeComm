import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class InvoiceRequestServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  getInvDetailsLists(){
    return this.apiService.get('invoice-request/initiatedinvoicesbysmeid/'+localStorage.getItem("userId"));
  }

  getInvDetailsLists_ForFinanceBidding(id){
    return this.apiService.get('invoice-request/invoice/'+id);
  }


  invoiceRequestSave(body: any) {
    return this.apiService.post(environment.api_url+'invoice-request', body);
  }
  
  authoriseInvoice(body: any) {
    return this.apiService.put(environment.api_url+'invoice-request/statusupdatetoapr/'+body,'' );
  }
  UpdateInvoice(id,body: any) {
    return this.apiService.put(environment.api_url+'invoice-request/invoiceupdate/'+id,body);
  }
  finbidSave(body: any) {
    return this.apiService.post(environment.serviePath_2+'api/v1/bidding-details', body);
  }
  updateInvoiceDetails(data){
    return this.apiService.post(environment.serviePath_2+'api/v1/invoice-details',data)
  }
  UpdateBiddingSave(id,body: any) {
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/updateBidStatusInitiated/'+id,body);
  }
  getMainlimitScreenDatas(){
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_4+'limit-request/allLimitsbyFinId/'+userCred['financierProfileId']); 
  }
  invoicePDFSave(body: any){
    return this.apiService.post(environment.api_url+'invoice-request/ocr', body);
  }
}