import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from "../../service/api.service"
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class IccFinanceMasterServices {
  public baseUrl: string;
  constructor(private apiService: ApiService) { this.baseUrl = "http://localhost:8080/ "; }
  
  getFinanceMasterLists(){
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/icc-dashboard/getAllFinanceMaster');
  }
  getInvoiceRequestLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // 
    return this.apiService.tempGet(environment.serviePath_1+'invoice-request/invoice/'+id); 
  }

  getFinanceBiddingLists(id){
    // let stringifyObj = JSON.stringify( { invoiceDetails : { id : 1} })
    // 
    // bidding-details/getBiddingDetails/{invoiceId}    http://950f76a46a8b.ngrok.io/api/v1
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/bidding-details/getBiddingDetails/'+id);
  }
  searchFinanceFunded(params){
    console.log("params.invoiceDate",params.invoiceDate);
    let invoiceRef  = params.invoiceRef == undefined ? "" : params.invoiceRef;
    let smeId  = params.smeId == undefined ? "" : params.smeId;
    let buyerName  = params.buyerName == undefined ? "" : params.buyerName;
    let invoiceDate  = params.invoiceDate == undefined ? "" : moment(params.invoiceDate).format('YYYY-MM-DD');
    let invDueDate  = params.invDueDate == undefined ? "" :  moment(params.invDueDate).format('YYYY-MM-DD');
    
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/searchInvoiceFinancing?smeId='+smeId+'&invoiceNo='+invoiceRef+'&buyerName='+buyerName+'&invoiceDate='+invoiceDate+'&invDueDate='+invDueDate);

  }
}