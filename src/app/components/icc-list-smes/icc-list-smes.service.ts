
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccListSmeServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { }
  getallSmeProfileDetails(){
    return this.apiService.tempGet(environment.financierServicePath+'sme-userprofile/allsmeprofiledetails'); 
  }
  statusChange(regNumber,body){
    return this.apiService.put(environment.financierServicePath+'sme-profile/smeprofilestatus/'+​regNumber,body);
  }
  getUserSMEDetails(id) {
    return this.apiService.tempGet(environment.financierServicePath+'sme-nationalinfo/'+id);
  }
  getAllSector(){
    return this.apiService.tempGet(environment.financierServicePath+'sector/allsector');
  }

  search_getallSmeProfileDetails(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'smesearch?'+params);
  }
}