import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccSectorServices  {
  constructor(private apiService: ApiService) { }


  submitIccRoles(body: any) {
    if(body.id){
      return this.apiService.put(environment.financierServicePath+'sector/modifysector/'+body.id, body);
    } else{
     return this.apiService.post(environment.financierServicePath+'sector/initialize', body);
    }
  }

  getAllRoles(){
    return this.apiService.tempGet(environment.financierServicePath+'sector/allsector');
  }

  getParticularRoles(id){
    return this.apiService.tempGet(environment.financierServicePath+'sector/'+id);
  }

  search_getAllSector(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'sector/search?'+params);
  }
}