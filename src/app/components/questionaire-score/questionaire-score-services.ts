import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class QuestionaireScoreServices  {
  constructor(private apiService: ApiService) { }

  getScore(data){
    return this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/scorebycompany/' + data.companyId + '/' + data.companyName + '/' + data.country);
  }
  submitScore(body: any) {
    return this.apiService.post(environment.serviePath_1+'groupinfo', body);
  }
  getParticularGroups(id){
    return this.apiService.get('groups-profile/'+id);
  }
}