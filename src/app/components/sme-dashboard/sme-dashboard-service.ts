import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class SmeDashboardServices {
  constructor(private apiService: ApiService) { }
  getFinForBid(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/getOpenFundingRequests/'+localStorage.getItem("userId"));
  }
  getFundingBids(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/getSumOfIntiatedBidAmt/'+localStorage.getItem("userId"));
  }
  getFunded(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/getSumOfFinancingDue/'+localStorage.getItem("userId"));
  }
  getFinDueTdy(){
    return this.apiService.generalServiceget(environment.dboardServerPath4+'getFinDueTdy');
  }
  getFinPastDue(){
    return this.apiService.generalServiceget(environment.dboardServerPath5+'getFinPastDue');
  }
  getFinMatData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/getFinMatDataForSme/'+localStorage.getItem("userId"));
  }
  getFinSizeData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/getFinSizeDataForSme/'+localStorage.getItem("userId"));
  }
  getChartData(){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/getSmeFundingRequestedChartData/'+localStorage.getItem("userId")); 
  }
  getActualFundingChartData(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/getSmeActualFundingChartData/'+localStorage.getItem("userId")); 
  }
  
}
