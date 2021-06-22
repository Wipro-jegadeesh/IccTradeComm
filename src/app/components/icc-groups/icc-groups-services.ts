import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
const queryString = require('query-string');

@Injectable()
export class IccGroupServices  {
  constructor(private apiService: ApiService) { }


  submitIccGroups(body: any) {
    if(body.groupId){
      return this.apiService.put(environment.financierServicePath+'groups-details/groupsdetails/'+body.groupId, body);
    }else{
      return this.apiService.post(environment.financierServicePath+'groupinfo', body);
    }
  }

  getAllGroups(){
    return this.apiService.tempGet(environment.financierServicePath+'groups-profile/allgroupsdetails');
  }

  getParticularGroups(id){
    return this.apiService.tempGet(environment.financierServicePath+'groups-profile/'+id);
  }

  search_getAllGroups(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'groups-profile/allgroupsdetails?'+params);
  }
}