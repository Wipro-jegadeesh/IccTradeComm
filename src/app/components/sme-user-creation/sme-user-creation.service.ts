import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class SmeUserCreationService {
    constructor(private apiService:ApiService) { }

    getAlUserList(){
        return this.apiService.generalServiceget(environment.financierServicePath+'sme-userprofile/allUserProfileDetails');
      }
    
      getUserSMEDetails(id) {
        return this.apiService.tempGet(environment.financierServicePath+'sme-nationalinfo/'+id);
      }
      UpdateUser(id,body: any) {
        return this.apiService.put(environment.financierServicePath+'user-profile/updateUserProfile/'+id,body);
      }
      Usersave(body: any) {
        return this.apiService.post(environment.financierServicePath+'adduser', body);
      }
      getUserDetails(id) {
        return this.apiService.tempGet(environment.financierServicePath+'sme-userprofile/'+id);
      }
}