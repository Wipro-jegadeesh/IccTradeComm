import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SignupService {
    constructor(public apiService:ApiService) { }

    signup(data){
        let params='/' + data.CountryPin +  '/' + data.name + '/' + data.country[0].id 
        return this.apiService.generalServiceget(params)
    }
    singUpCheck(body: any){
        return this.apiService.post(environment.financierServicePath+'sme-userprofile/checkUser', body);
    }
    Usersave(body: any) {
        return this.apiService.post(environment.financierServicePath+'smeonboard', body);
      }
      companyCheck(data){
        return this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/getCompany/' + data.companyId + '/' + data.companyName + '/' + data.country);
    }
    getUserDetails(data){
        return this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/getallquestionaire/' + data.registrationId + '/' + data.companyName + '/' + data.country )
    }
}