import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccDashboardServices  {
  constructor(private apiService: ApiService) { }
  getIccDashDetails(){
    return this.apiService.generalServiceget('https://jsonplaceholder.typicode.com/posts',);
  }
  getFinancierList(){
    let params=environment.financierServicePath+'financier-details/allfinancierdetails'
    return this.apiService.generalServiceget(params)
  }


  getFundingRequestTileList(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/icc-dashboard/fundingrequests');
  }

  getOfferAcceptanceTileList(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/icc-dashboard/offerforacceptance');
  }

  getInvoiceMasterCount(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/icc-dashboard/invoicemaster');
  }
  getAllfinTdyCount(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/financing-details/financetoday');
  }
  getFinanceMasterCount(){
    return this.apiService.generalServiceget(environment.serviePath_2+'api/v1/icc-dashboard/financemaster');
  }
  getallSmeProfileDetails(){
      return this.apiService.tempGet(environment.financierServicePath+'sme-userprofile/allsmeprofiledetails'); 
  }

  search_getFinancierList(obj){ 
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath+'financiersearch?'+params);
  }
}