import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class FinanceRequestServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://mock.com"; }

    getFinancierBidding(params : any){
        return this.apiService.get('invoiceRequestSave', params);
    }
    getInvoiceDetails() {
       return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/financeinvoices/'+localStorage.getItem("userId"));
    }
    searchFinanceFunded(params){
      console.log("params.invoiceDate",params);
      let iccrefer = params.iccrefer == "" ? "" : params.iccrefer;
      let invoiceRef  = params.invoiceRef == "" ? "" : params.invoiceRef;
      let smeId  = params.smeId == "" ? "" : params.smeId;
      let buyerName  = params.buyerName == "" ? "" : params.buyerName;

      return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchinvoicefinancing?finId='+localStorage.getItem("userId")+'&smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&iccrefer='+iccrefer);
  
    }
}