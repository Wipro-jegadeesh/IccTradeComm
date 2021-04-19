import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class FinancierDashboardServices {
  constructor(private apiService: ApiService) { }
  getOpenForOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/openForOffer/'+localStorage.getItem("userId"));
  }
  getExpireOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/allExpiredBids/'+localStorage.getItem("userId"));
  }

  getFinancierFunded(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/getSumOfFinancingDueByFinId/'+localStorage.getItem("userId"));
  }
  getRejectOffer(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/allRejectedBids/'+localStorage.getItem("userId"));
  }
  getbidsToBeAccepted(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/bidsToBeAccepted/'+localStorage.getItem("userId"));
  }
  getFinMatData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/getFinMatData/'+localStorage.getItem("userId"));
  }
  getFinSizeData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/getFinSizeData/'+localStorage.getItem("userId"));
  }
  getChartData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/getFinActualFundingChartData/'+localStorage.getItem("userId"));
  }
}