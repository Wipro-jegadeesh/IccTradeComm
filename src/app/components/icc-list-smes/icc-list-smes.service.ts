
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccListSmeServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { }
  /** Api to get all sme profile details **/
  getallSmeProfileDetails() {
    return this.apiService.tempGet(environment.financierServicePath + 'sme-userprofile/allsmeprofiledetails');
  }
  /** Api to change the status **/
  statusChange(regNumber, body) {
    return this.apiService.put(environment.financierServicePath + 'sme-profile/smeprofilestatus/' + regNumber, body);
  }
  /** Api to get user sme details by id **/
  getUserSMEDetails(id) {
    return this.apiService.tempGet(environment.financierServicePath + 'sme-nationalinfo/' + id);
  }
  /** Api to get all sector **/
  getAllSector() {
    return this.apiService.tempGet(environment.financierServicePath + 'sector/allsector');
  }
  /** Api to get search list **/
  search_getallSmeProfileDetails(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'smesearch?' + params);
  }
}