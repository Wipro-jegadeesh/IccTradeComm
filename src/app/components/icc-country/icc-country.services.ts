import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class IccCountryServices  {
  constructor(private apiService: ApiService) { }


  submitIcccountry(body: any) {
    if(body.countryId){
      return this.apiService.put(environment.financierServicePath+'country-details/updateCountryDetails/'+body.countryId, body);
    }else{
      return this.apiService.post(environment.financierServicePath+'countrydetails', body);
    }
  }

  getAllcountry(){
    return this.apiService.tempGet(environment.financierServicePath+'countrylistdetails/allCountryListDetails');
  }

  getParticularcountry(id){
    return this.apiService.tempGet(environment.financierServicePath+'countrylist/'+id);
  }
}