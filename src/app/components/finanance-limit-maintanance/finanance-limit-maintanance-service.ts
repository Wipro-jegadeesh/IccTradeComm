import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinanceLimitMaintananceServices {
  public baseUrl: string;
  public userCred = JSON.parse(localStorage.getItem('userCred'))

  constructor(private apiService: ApiService) {
    this.baseUrl = "http://mock.com";
  }
  getnewLimitFinSmeDatas() {
    return this.apiService.tempGet(environment.serviePath_3 + 'api/v1/limit-details/getLimitUtilizedDetails/' + this.userCred['financierProfileId']);
  }
  gettransLimitUtilTableDatas() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_1 + 'limit-request/limitChartData/'+ userCred['financierProfileId']);
  }
  getsmetransLimitUtilTableDatas() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_1 + 'limit-request/limitChartDataBySmeId/'+ userCred['financierProfileId']);
  }
  getMainlimitScreenDatas() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/allLimitsbyFinId/' + userCred['financierProfileId']);
  }
  postnewMainLimitForm(body: any) {
    return this.apiService.post(environment.serviePath_4 + 'limit-initiate', body);
  }
  putnewMainLimitForm(body: any) {
    return this.apiService.put(environment.serviePath_4 + 'limit-update/' + this.userCred['financierProfileId'], body);
  }

}