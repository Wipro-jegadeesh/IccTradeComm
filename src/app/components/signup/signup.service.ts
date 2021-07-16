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
    checkSignup(body: any){
        return this.apiService.post(environment.financierServicePath+'sme-userprofile/checkuser', body);
    }
    submitSignupDetails(body: any) {
        return this.apiService.post(environment.financierServicePath+'smeonboard', body);
      }
    checkCompany(data){
        return this.apiService.generalServiceget(environment.coriolisServicePath + 'test/company/' + data.companyId + '/' + data.companyName + '/' + data.country);
    }
    getUserDetails(data){
        return this.apiService.generalServiceget(environment.coriolisServicePath + 'test/questionaire/' + data.registrationId + '/' + data.companyName + '/' + data.country )
    }
    getAllSectorList(){
        return this.apiService.tempGet(environment.financierServicePath+'sector/allsector');
      }

    //  AFTER LOGIN API CALLS(SERVICES )
    checkSmeAuth(userName){
        return this.apiService.generalServiceget(environment.financierServicePath + 'sme-custom/' + userName);
    }
    checkFinancierAuth(userName){
        return this.apiService.generalServiceget(environment.financierServicePath + 'financier-custom/' + userName);
    }
}