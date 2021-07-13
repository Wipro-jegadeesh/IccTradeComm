import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CoriolisService {
    constructor(private apiService:ApiService) { }

    getQuestionnaireSection(params){
      return this.apiService.get(environment.coriolisServicePath + 'coriolis/getallquestionaire/' + params.companyId + '/' + params.companyName + '/' + params.country)
    }
    getScoreSection(params){

    }
}