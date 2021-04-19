import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Financier } from '../../model/financier-bidding/financier';
import { ApiService } from "../../service/api.service";
import { environment } from '../../../environments/environment';

@Injectable()
export class FinancierService {

  private custUrl=environment.serviePath_2+'api/v1/bidding-details/getBiddingDetails/1';
  private baseUrl='http://localhost:8080/';
  constructor(private http: HttpClient,private apiService: ApiService) {
    this.baseUrl = "http://localhost:8080/";
   }
  
  getUser(): Observable<Financier[]> {
    return this.http.get<Financier[]>(this.custUrl);
  }
  
  getInvoiceDetails() {
    //return this.apiService.get('invoice-request/approvedInvoices');
    // return this.apiService.get('invoice-request/approvedInvoicesBySmeId/'+localStorage.getItem("userId"));
    return this.apiService.tempGet(environment.serviePath_2+'api/v1/invoice-request/allBiddingInvoicesBySmeId/'+localStorage.getItem("userId"));

  }

  getInvoiceAndGoodsDetails(){
    
    // return this.apiService.get('invoice-request/approvedInvoices');

    return this.apiService.get('invoice-request/approvedInvoicesBySmeId/'+localStorage.getItem("userId"));
  }
}
