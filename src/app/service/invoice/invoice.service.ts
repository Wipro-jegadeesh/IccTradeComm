import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../../model/invoice/invoice.model';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class InvoiceService {

  private custUrl: string;
  constructor(private http: HttpClient) {
    this.custUrl = 'http://localhost:8080/invoice-request';
   }

   public save(Invoice : Invoice){
    return this.http.post<Invoice>(this.custUrl, Invoice);
   }
}
