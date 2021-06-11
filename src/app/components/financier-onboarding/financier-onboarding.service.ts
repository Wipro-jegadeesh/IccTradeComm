import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FinancierOnboardingService {
    constructor(private apiService:ApiService) {

     }
    getSpecificFinancierData(id){
        let params=environment.financierServicePath
       return this.apiService.generalServiceget(params+'financier-details/' + id)
    }
    submitFinancier(data){
    let params=environment.financierServicePath+'addfinuser'
    let findetobj={
        'findetobj' : data
    }
    return this.apiService.post(params,findetobj)
    }
    updateFinancier(data){
        let findetobj={
            'findetobj' : data
        }
        let params=environment.financierServicePath+'financier-onboarding/financieronboarding/'+data.namedPKKey
        return this.apiService.put(params,findetobj)
    }
}