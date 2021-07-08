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
  getInvRepositryDetailsLists(ruc,​​​​​​​documentnumber){
    return this.apiService.get('invoice-request/doceinvoicedetails/'+​​​​​​​​​​​​​​ruc+'/'+​​​​​​​documentnumber);
  }
  getInvoice(​​​​​​​ruc,​​​​​​​documentnumber){
    return this.apiService.get('invoice-request/invoicefromdoce/'+​​​​​​​​​​​​​​ruc+'/'+​​​​​​​documentnumber);
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
    return this.apiService.put(environment.serviePath_2+'api/v1/bidding-details/initbidstatus/'+id,body);
  }
  getMainlimitScreenDatas(){
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_4+'limit-request/allLimitsbyFinId/'+userCred['financierProfileId']); 
  }
  invoicePDFSave(body: any){
    return this.apiService.post(environment.api_url+'invoice-request/ocr', body);
  }
  submitBuyerDetails(body: any){
    // http://localhost:8083/coriolis/Deal/Rating
    return this.apiService.post(environment.coriolisServicePath + 'coriolis/Deal/Rating' , body)
  }
  getBidingAcceptAllDetails(id) {
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/biddingbyid/'+id);
 }
  updateScore(id,body: any) {
    // http://localhost:8080/invoice-request/reformscore/%7BInvId%7D
    let invoiceDetails={
      'invoiceDetails' : body
    }
    return this.apiService.put(environment.api_url+'invoice-request/reformscore/'+id,invoiceDetails);
  }
  getuserProfile(id) {
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/user-profile/smeRating/' + id);

  }
}