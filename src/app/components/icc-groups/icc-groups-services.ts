import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';
@Injectable()
export class IccGroupServices {
  constructor(private apiService: ApiService) { }
  /** Api to put and post the form value **/
  submitIccGroups(body: any) {
    if (body.groupId) {
      return this.apiService.put(environment.financierServicePath + 'groups-details/groupsdetails/' + body.groupId, body);
    } else {
      return this.apiService.post(environment.financierServicePath + 'groupinfo', body);
    }
  }
  /** Api to get  all groups list **/
  getAllGroups() {
    return this.apiService.tempGet(environment.financierServicePath + 'groups-profile/allgroupsdetails');
  }
  /** Api to get individual group record by id **/
  getParticularGroups(id) {
    return this.apiService.tempGet(environment.financierServicePath + 'groups-profile/' + id);
  }
  /** Api to get search list **/
  search_getAllGroups(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'groups-details/search?' + params);
  }
}