import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as queryString from 'query-string';

@Injectable()
export class IccDashboardServices {
  constructor(private apiService: ApiService) { }
  /** To get icc details **/
  getIccDashDetails() {
    return this.apiService.generalServiceget('https://jsonplaceholder.typicode.com/posts',);
  }
  /** To get financier list **/
  getFinancierList() {
    let params = environment.financierServicePath + 'financier-details/allfinancierdetails'
    return this.apiService.generalServiceget(params)
  }
  /** To get funding request tiles list **/
  getFundingRequestTileList() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/icc-dashboard/fundingrequests');
  }
  /** To get offer acceptance tiles list **/
  getOfferAcceptanceTileList() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/icc-dashboard/offerforacceptance');
  }
  /** To get invoice master count **/
  getInvoiceMasterCount() {
    return this.apiService.generalServiceget(environment.serviePath_2 + 'api/v1/icc-dashboard/invoicemaster');
  }
  /** To get find today count **/
  getAllfinTdyCount() {
    return this.apiService.generalServiceget(environment.serviePath_2 + 'api/v1/financing-details/financetoday');
  }
  /** To get finance master count **/
  getFinanceMasterCount() {
    return this.apiService.generalServiceget(environment.serviePath_2 + 'api/v1/icc-dashboard/financemaster');
  }
  /** To get sme profile details **/
  getallSmeProfileDetails() {
    return this.apiService.tempGet(environment.financierServicePath + 'sme-userprofile/allsmeprofiledetails');
  }
  /** To get search financier list **/
  search_getFinancierList(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'financiersearch?' + params);
  }
  /** To get filter financier list **/
  getFilteredData(obj) {
    let params = queryString.stringify(obj);
    return this.apiService.tempGet(environment.financierServicePath + 'financierfilter?' + params);
  }
}