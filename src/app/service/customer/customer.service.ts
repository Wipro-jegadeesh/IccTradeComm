import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../../model/customer';
// import { Observable } from 'rxjs/Observable';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class CustomerService {

  private custUrl: string;

  constructor(private http: HttpClient) {
    this.custUrl = 'https://ea307f9fea46.ngrok.io/finonb/post';
  }

  public save(customer) {
    return this.http.post(this.custUrl, customer);
  }
  
}
