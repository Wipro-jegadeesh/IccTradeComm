
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccListSmeServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { }
  getallSmeProfileDetails(){
    return this.apiService.tempGet(environment.serviePath_1+'sme-userprofile/allSmeProfileDetails'); 
  }
}