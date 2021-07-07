import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccAuthorizeServices {
  constructor(private apiService: ApiService) { }
  /** Api to put and post the form value **/
  submitIccAuthorizeMatrix(body: any) {
    if (body.id) {
      return this.apiService.put(environment.financierServicePath + 'authorization-details/authorizationdetails/' + body.id, body);
    } else {
      return this.apiService.post(environment.financierServicePath + 'authorize', body);
    }
  }
  /** Api to get  all authorize matrix list **/
  getAllAuthorizeMatrix() {
    return this.apiService.tempGet(environment.financierServicePath + 'authorize-matrix/allmatrixdetails');
  }
  /** Api to get individual authorize matrix record by id **/
  getParticularAuthorizeMatrix(id) {
    return this.apiService.tempGet(environment.financierServicePath + 'authorize-matrix/' + id);
  }
  /** Api to get search list **/
  search_getAllAuthorizeMatrix(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'authorizesearch?' + params);
  }
  /** Api to get filter list **/
  getFilteredData(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'authorize-matrix/filteramount?' + params);
  }
}