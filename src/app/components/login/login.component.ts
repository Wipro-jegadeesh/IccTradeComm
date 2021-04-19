import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LOGINCONSTANTS } from '../../shared/constants/constants'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  invalidLogin = false;
  hide = true;
  loginTooltip = LOGINCONSTANTS;
  
  constructor(private router: Router, private authService: AuthenticationService,private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  login() {
     localStorage.setItem("userId",this.username);
    if (this.authService.loginAsSme(this.username, this.password)) {
      this.router.navigate(['sme-dashboard']);
      this.invalidLogin = false;
    } else if (this.authService.loginAsFinancier(this.username, this.password)) {
      this.router.navigate(['financier-dashboard']);
      this.invalidLogin = false;
    }  else if (this.authService.loginAsICCUser(this.username, this.password)) {
      this.router.navigate(['icc-dashboard']);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
      this.toastr.error("Invalid username or password")
    }
  }

}
