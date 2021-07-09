import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class IccFundingServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  /** Api to get all funding lists **/
  getAllFundingList() {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/icc-dashboard/allfundingrequests');
  }
  /** Api to get invoice request lists by id **/
  getInvoiceRequestLists(id) {
    return this.apiService.tempGet(environment.serviePath_1 + 'invoice-request/invoice/' + id);
  }
  /** Api to get finance bidding lists by id **/
  getFinanceBiddingLists(id) {
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/bidding-details/biddingdetails/' + id);
  }
  /** Api to get search list **/
  searchFinanceFunded(params) {
    let invoiceRef = params.invoiceRef == "" ? "" : params.invoiceRef;
    let smeId = params.smeId == "" ? "" : params.smeId;
    let buyerName = params.buyerName == "" ? "" : params.buyerName;
    let invoiceDate = params.invoiceDate == "" ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate = params.invoiceDueDate == "" ? "" : moment(params.invoiceDueDate).format('YYYY-MM-DD');
    return this.apiService.tempGet(environment.serviePath_2 + 'api/v1/invoice-request/searchallfundedinvoices?finId=' + localStorage.getItem("userId") + '&smeId=' + smeId + '&invoiceNo=' + invoiceRef + '&buyerName=' + buyerName + '&invoiceDate=' + invoiceDate + '&invDueDate=' + invDueDate);
  }
}