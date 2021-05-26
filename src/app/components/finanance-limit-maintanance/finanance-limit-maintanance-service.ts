import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinanceLimitMaintananceServices {
  public baseUrl: string;
  public userCred = JSON.parse(localStorage.getItem('userCred'))
  financierProfileId;
  constructor(private apiService: ApiService) {
    this.baseUrl = "http://mock.com";
    this.financierProfileId = this.userCred ? this.userCred['financierProfileId'] : 0;

  }
  getnewLimitFinSmeDatas() {
    return this.apiService.tempGet(environment.serviePath_3 + 'api/v1/limit-details/getLimitUtilizedDetails/' + this.financierProfileId);
  }
  gettransLimitUtilTableDatas() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/limitChartData/' + this.financierProfileId);
  }
  smetransApiDependDataService(item) {
    let minMax;
    if (item == "25") {
      minMax = "&min=0" + "&max=25"
    } else if (item == "50") {
      minMax = "&min=25" + "&max=50"
    } else if (item == "75") {
      minMax = "&min=50" + "&max=75"
    } else if (item == "100") {
      minMax = "&min=75" + "&max=100"
    }
    else {
      minMax = "&max=FULL"
    }
    // let userId = this.financierProfileId ? 'finId=' + this.financierProfileId : ''

    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/limitChartDataList?finId=' + this.financierProfileId + minMax);
  }
  getsmetransLimitUtilTableDatas() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/limitChartDataBySmeId/' + this.financierProfileId);
  }
  getMainlimitScreenDatas() {
    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/allLimitsbyFinId/' + this.financierProfileId);
  }
  postnewMainLimitForm(body: any) {
    return this.apiService.post(environment.serviePath_4 + 'limit-initiate', body);
  }
  putnewMainLimitForm(body: any) {
    return this.apiService.put(environment.serviePath_4 + 'limit-update/' + this.financierProfileId, body);
  }
  getsectorexposeTableDatas() {
    return this.apiService.tempGet(environment.serviePath_4 + 'limit-request/limitChartDataBySector/' + this.financierProfileId);
  }

}