import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class AuthenticationService { 

  constructor(private router:Router) { }

  // tslint:disable-next-line: typedef
  loginAsSme(username: string, password: string) {
    if (username.includes("SME") && password === '123456'){
      localStorage.setItem("roleName","sme");

      return true;
    }
    else{
      // this.toastr.error("Invalid username or password")
      return false;
    }
  }

  // tslint:disable-next-line: typedef
  loginAsFinancier(username: string, password: string) {

    if (username.includes("FINANCE") && password === '123456'){
      localStorage.setItem("roleName","financier");
      return true;
    }
    else{
      // this.toastr.error("Invalid username or password")
      return false;
    }
  }
  logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("userCred");
    this.router.navigateByUrl('/');
  }
  loginAsICCUser(username: string, password: string) {
    localStorage.setItem("roleName","icc");

    if (username.includes("ICC") && password === '123456'){
      return true;
    }
    else{
      // this.toastr.error("Invalid username or password")
      return false;
    }
  }
}
