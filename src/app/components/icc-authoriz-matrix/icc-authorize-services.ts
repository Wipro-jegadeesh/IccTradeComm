import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccAuthorizeServices  {
  constructor(private apiService: ApiService) { }


  submitIccAuthorizeMatrix(body: any) {
    if(body.id){
      return this.apiService.put(environment.financierServicePath+'authorization-details/updateAuthorizationDetails/'+body.id, body);
    }else{
      return this.apiService.post(environment.financierServicePath+'authorize', body);

    }
  }

  getAllAuthorizeMatrix(){
    return this.apiService.tempGet(environment.financierServicePath+'authorize-matrix/allmatrixDetails');
  }

  getParticularAuthorizeMatrix(id){
    return this.apiService.tempGet(environment.financierServicePath+'authorize-matrix/'+id);
  }
}