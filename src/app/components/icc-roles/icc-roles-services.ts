import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccRolesServices  {
  constructor(private apiService: ApiService) { }


  submitIccRoles(body: any) {
    return this.apiService.post(environment.financierServicePath+'userroles', body);
  }

  getAllRoles(){
    return this.apiService.tempGet(environment.financierServicePath+'roles-profile/allrolesDetails');
  }

  getParticularRoles(id){
    return this.apiService.tempGet(environment.financierServicePath+'roles-profile/'+id);
  }
}