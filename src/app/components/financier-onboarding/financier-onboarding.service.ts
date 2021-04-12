import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FinancierOnboardingService {
    constructor(private apiService:ApiService) {

     }
    getSpecificFinancierData(id){
        let params=environment.financierServicePath
       return this.apiService.generalServiceget(params+'finonb/get/' + id)
    }
    submitFinancier(data){
    let params=environment.financierServicePath+'finonb/post'
    let findetobj={
        'findetobj' : data
    }
    return this.apiService.post(params,findetobj)
    }
    updateFinancier(data){
        let findetobj={
            'findetobj' : data
        }
        let params=environment.financierServicePath+'finonb/updatefindet'
        return this.apiService.put(params,findetobj)
    }
}