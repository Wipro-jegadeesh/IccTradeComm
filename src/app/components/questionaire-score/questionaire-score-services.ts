import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class QuestionaireScoreServices  {
  constructor(private apiService: ApiService) { }


  getScore(){
    return this.apiService.generalServiceget('http://localhost:3030/getScore?companyID=80f5590c-2c9b-49a2-a3f2-08d8ff5bb864');
  }
  
  submitIccGroups(body: any) {
    return this.apiService.post(environment.serviePath_1+'groupinfo', body);
  }

 

  getParticularGroups(id){
    return this.apiService.get('groups-profile/'+id);
  }
}