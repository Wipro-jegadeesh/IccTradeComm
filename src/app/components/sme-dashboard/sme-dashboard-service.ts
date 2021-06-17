import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
@Injectable()
export class SmeDashboardServices {
  constructor(private apiService: ApiService) { }
  getFinForBid(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/openfundingrequestsbysmeid/'+localStorage.getItem("userId"));
  }
  getFundingBids(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/sumofinitbidamtbysmeid/'+localStorage.getItem("userId"));
  }
  getFunded(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/invoice-request/sumoffinancingduebysmeid/'+localStorage.getItem("userId"));
  }
  getFinDueTdy(){
    return this.apiService.generalServiceget(environment.dboardServerPath4+'getFinDueTdy');
  }
  getFinPastDue(){
    return this.apiService.generalServiceget(environment.dboardServerPath5+'getFinPastDue');
  }
  getFinMatData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/finmatdataforsme/'+localStorage.getItem("userId"));
  }
  getFinSizeData(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/finsizedataforsme/'+localStorage.getItem("userId"));
  }
  getChartData(){
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/smefundreqchartdata/'+localStorage.getItem("userId")); 
  }
  getActualFundingChartData(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/smeactualfundingchartdata/'+localStorage.getItem("userId")); 
  }
  
}
