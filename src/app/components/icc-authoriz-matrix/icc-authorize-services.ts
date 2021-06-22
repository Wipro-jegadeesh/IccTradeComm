import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
const queryString = require('query-string');

@Injectable()
export class IccAuthorizeServices  {
  constructor(private apiService: ApiService) { }


  submitIccAuthorizeMatrix(body: any) {
    if(body.id){
      return this.apiService.put(environment.financierServicePath+'authorization-details/authorizationdetails/'+body.id, body);
    }else{
      return this.apiService.post(environment.financierServicePath+'authorize', body);

    }
  }

  getAllAuthorizeMatrix(){
    return this.apiService.tempGet(environment.financierServicePath+'authorize-matrix/allmatrixdetails');
  }

  getParticularAuthorizeMatrix(id){
    return this.apiService.tempGet(environment.financierServicePath+'authorize-matrix/'+id);
  }

  search_getAllAuthorizeMatrix(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'authorize-matrix/allmatrixdetails?'+params);
  }
}