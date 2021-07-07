import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
declare var require: any
import * as queryString from 'query-string';

@Injectable()
export class IccCountryServices {
  constructor(private apiService: ApiService) { }
  /** Api to put and post the form value **/
  submitIcccountry(body: any) {
    if (body.id) {
      return this.apiService.put(environment.financierServicePath + 'countrydetails/countrydetails/' + body.id, body);
    } else {
      return this.apiService.post(environment.financierServicePath + 'countrydetails', body);
    }
  }
  /** Api to get  all country list **/
  getAllcountry() {
    return this.apiService.tempGet(environment.financierServicePath + 'countrylistdetails/allcountrylistdetails');
  }
  /** Api to get individual country record by id **/
  getParticularcountry(id) {
    return this.apiService.tempGet(environment.financierServicePath + 'countrylist/' + id);
  }
  /** Api to get search list **/
  search_getAllcountry(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'countrysearch?' + params);
  }
}