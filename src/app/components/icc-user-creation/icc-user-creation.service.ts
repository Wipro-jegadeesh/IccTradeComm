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
    return this.apiService.tempGet(environment.financierServicePath+'sme-userprofile/alluserprofiledetails');
  }
  UpdateUser(id,body: any) {
    return this.apiService.put(environment.financierServicePath+'user-profile/updateUserProfile/'+id,body);
  }
  Usersave(body: any) {
    return this.apiService.post(environment.financierServicePath+'adduser', body);
  }
  getUserDetails(id) {
    return this.apiService.tempGet(environment.financierServicePath+'sme-userprofile/'+id);
  }
  getUserSMEDetails(id) {
    return this.apiService.tempGet(environment.financierServicePath+'sme-nationalinfo/'+id);
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
  statusChange(regNumber,body){
    return this.apiService.put(environment.financierServicePath+'sme-profile/smeprofilestatus/'+​regNumber,body);
  }
  getIccRelaterUsers(regNo){
    return this.apiService.tempGet(environment.financierServicePath+'sme-profile/details/'+regNo);
  }
  getAllSector(){
    return this.apiService.tempGet(environment.financierServicePath+'sector/getAll');
  }
}