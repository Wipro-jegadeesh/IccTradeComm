import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class IccUserCreationService {

  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getAllFundingList(){
    return this.apiService.tempGet(environment.api_url+'/sme-userprofile/allUserProfileDetails');
  }
  UpdateUser(id,body: any) {
    return this.apiService.put(environment.api_url+'/user-profile/updateUserProfile/'+id,body);
  }
  Usersave(body: any) {
    return this.apiService.post(environment.api_url+'/adduser', body);
  }
  getUserDetails(id) {
    return this.apiService.tempGet(environment.api_url+'/sme-userprofile/'+id);
  }
  searchFinanceFunded(params){
    console.log("params.invoiceDate",params.invoiceDate);
    let invoiceRef  = params.invoiceRef == undefined ? "" : params.invoiceRef;
    let smeId  = params.smeId == undefined ? "" : params.smeId;
    let buyerName  = params.buyerName == undefined ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == undefined ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invDueDate == undefined ? "" :  moment(params.invDueDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchInvoiceFinancing?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);
  
  }
}