import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Injectable({providedIn: 'root'})
export class SignupService {
    constructor(public apiService:ApiService) { }

    signup(data){
        let params='/' + data.CountryPin +  '/' + data.name + '/' + data.country[0].id 
        return this.apiService.generalServiceget(params)
    }
    
}