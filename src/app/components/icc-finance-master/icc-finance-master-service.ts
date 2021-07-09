import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';

@Injectable()
export class IccFinanceMasterServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  /** Api to get  all finance master list **/
  getFinanceMasterLists() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/icc-dashboard/allfinancemaster');
  }
  /** Api to get particular invoice request list **/
  getInvoiceRequestLists(id) {
    return this.apiService.tempGet(environment.serviePath_1 + 'invoice-request/invoice/' + id);
  }
  /** Api to get particular finance bidding list **/
  getFinanceBiddingLists(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/biddingdetails/' + id);
  }
  /** Api to get search list **/
  searchFinanceFunded(params) {
    let invoiceRef = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId = params.smeId == "" ? "" : params.smeId;
    // let buyerName  = params.buyerName == "" ? "" : params.buyerName;
    // let invoiceDate  = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    // let invDueDate  = params.invoiceDueDate == "" ? "" :  moment(params.invoiceDueDate).format('YYYY-MM-DD');
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/financing-details/searchallfinancefunded?smeId=' + smeId + '&invoiceNo=' + invoiceRef);
  }
}