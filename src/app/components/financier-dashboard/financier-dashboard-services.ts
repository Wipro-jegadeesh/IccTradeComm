import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinancierDashboardServices {
  constructor(private apiService: ApiService) { }
  getOpenForOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/openforoffer/'+localStorage.getItem("userId"));
  }
  getExpireOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/expiredbids/'+localStorage.getItem("userId"));
  }

  getFinancierFunded(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/sumoffinancingduebyfinid/'+localStorage.getItem("userId"));
  }
  getRejectOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/allrejectedbids/'+localStorage.getItem("userId"));
  }
  getbidsToBeAccepted(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/bidstobeaccepted/'+localStorage.getItem("userId"));
  }
  getFinMatData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/finmatdataforfinancier/'+localStorage.getItem("userId"));
  }
  getFinSizeData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/finmatsizeforfinancier/'+localStorage.getItem("userId"));
  }
  getChartData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/finactualfundingchartdata/'+localStorage.getItem("userId"));
  }
}