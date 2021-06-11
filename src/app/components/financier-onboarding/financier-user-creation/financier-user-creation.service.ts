import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FinancierUserCreationService {
    constructor(private apiService:ApiService) { } 

    getAlUserList(finDetailId){
        return this.apiService.generalServiceget(environment.financierServicePath+'financiercompany-details/'+finDetailId);
      }
    
      getUserSMEDetails(id) {
        return this.apiService.tempGet(environment.financierServicePath+'sme-nationalinfo/'+id);
      }
      UpdateUser(id,body: any) {
        return this.apiService.put(environment.financierServicePath+'user-profile/userprofile/'+id,body);
      }
      Usersave(body: any) {
        return this.apiService.post(environment.financierServicePath+'adduser', body);
      }
      getUserDetails(id) {
        return this.apiService.tempGet(environment.financierServicePath+'uservaliddetails/'+id);
      }
}