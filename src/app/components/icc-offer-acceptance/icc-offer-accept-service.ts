import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class IccOfferAcceptServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  /** Api to get offer acceptance list **/
  getOfferAcceptanceLists() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/icc-dashboard/allofferforacceptance');
  }
  /** Api to get particular invoice request list **/
  getInvoiceRequestLists(id) {
    return this.apiService.tempGet(environment.serviePath_1 + 'invoice-request/invoice/' + id);
  }
  /** Api to get particular finance bidding list **/
  getFinanceBiddingLists(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/biddingdetails/' + id);
  }
  /** Api to get financier bidding **/
  getFinancierBidding(params: any) {
    return this.apiService.get('invoiceRequestSave', params);
  }
  /** Api to get particular invoice details  **/
  getInvoiceDetails(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/invoice-request/allbiddinginvoicesbysmeid/' + id);
  }
  /** Api to update the bidding **/
  UpdateBiddingSave(id, body: any) {
    return this.apiService.put(environment.serviePath_2 + 'api/v1/bidding-details/initbidstatus/' + id, body);
  }
  /** Api to get the invoice details for finance bidding **/
  getInvDetailsLists_ForFinanceBidding(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/biddingbyid/' + id);
  }
  /** Api to get search list **/
  searchFinanceFunded(params) {
    console.log("params.invoiceDate", params.invoiceDate);
    let invoiceRef = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId = params.smeId == "" ? "" : params.smeId;
    let buyerName = params.buyerName == "" ? "" : params.buyerName;
    let invoiceDate = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate = params.invoiceDueDate == "" ? "" : moment(params.invoiceDueDate).format('YYYY-MM-DD');
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/invoice-request/searchallofferacceptanceinvoices?smeId=' + smeId + '&invoiceNo=' + invoiceRef + '&buyerName=' + buyerName + '&invoiceDate=' + invoiceDate + '&invDueDate=' + invDueDate);
  }
}