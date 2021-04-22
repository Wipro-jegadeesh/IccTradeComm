import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccRolesServices  {
  constructor(private apiService: ApiService) { }


  submitIccRoles(body: any) {
    return this.apiService.post(environment.serviePath_1+'userroles', body);
  }

  getAllRoles(){
    return this.apiService.get('roles-profile/allrolesDetails');
  }

  getParticularRoles(id){
    return this.apiService.get('roles-profile/'+id);
  }
}