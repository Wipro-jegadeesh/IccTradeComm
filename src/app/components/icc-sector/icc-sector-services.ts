import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccSectorServices  {
  constructor(private apiService: ApiService) { }


  submitIccRoles(body: any) {
    if(body.id){
      return this.apiService.put(environment.financierServicePath+'sector/update/'+body.id, body);
    } else{
     return this.apiService.post(environment.financierServicePath+'sector/create', body);
    }
  }

  getAllRoles(){
    return this.apiService.tempGet(environment.financierServicePath+'sector/getAll');
  }

  getParticularRoles(id){
    return this.apiService.tempGet(environment.financierServicePath+'sector/get/'+id);
  }
}