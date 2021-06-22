import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
const queryString = require('query-string');

@Injectable()
export class IccRolesServices  {
  constructor(private apiService: ApiService) { }


  submitIccRoles(body: any) {
    if(body.roleId){
      return this.apiService.put(environment.financierServicePath+'roles-details/rolesdetails/'+body.roleId, body);
} else{
  return this.apiService.post(environment.financierServicePath+'userroles', body);

}
   return this.apiService.post(environment.financierServicePath+'userroles', body);
  }

  getAllRoles(){
    return this.apiService.tempGet(environment.financierServicePath+'roles-profile/allrolesdetails');
  }

  // search_getAllRoles(){
  //   return this.apiService.tempGet(environment.financierServicePath+'roles-profile/allrolesdetails');
  // }

  getParticularRoles(id){
    return this.apiService.tempGet(environment.financierServicePath+'roles-profile/'+id);
  }

  search_getAllRoles(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'roles-profile/allrolesdetails?'+params);
  }
}