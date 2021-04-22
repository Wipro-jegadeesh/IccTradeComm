import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccGroupServices  {
  constructor(private apiService: ApiService) { }


  submitIccGroups(body: any) {
    return this.apiService.post(environment.serviePath_1+'groupinfo', body);
  }

  getAllGroups(){
    return this.apiService.get('groups-profile/allgroupsDetails');
  }

  getParticularGroups(id){
    return this.apiService.get('groups-profile/'+id);
  }
}