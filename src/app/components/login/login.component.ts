import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LOGINCONSTANTS } from '../../shared/constants/constants'
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/service/api.service';

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
  // modalRef: BsModalRef;
  @ViewChild('template')
private modalRef: TemplateRef<any>;
  mymodal

  constructor(private modalService: BsModalService,private router: Router,private apiService:ApiService,
    private authService: AuthenticationService,private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  login() {
     localStorage.setItem("userId",this.username);
    if (this.authService.loginAsSme(this.username, this.password)) {
        this.checkQuesCompl(this.username)
      // this.router.navigate(['sme-dashboard']);
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
  openModal(template) {
    // event.preventDefault();
    // this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  signUpPage(type){
    // this.modalRef.hide();
    localStorage.setItem("existingCUS",type);
    this.router.navigateByUrl('/signup');
  }
  dashboardNavigate(){
    this.mymodal = this.modalService.hide();
    this.router.navigateByUrl('/score-received')
  }
  modalhide(){
    this.mymodal = this.modalService.hide();
  }
  checkQuesCompl(userId){
    // this.apiService.generalServiceget('').subscribe(resp=>{
    //   if(resp){
    //     !resp.state ? this.router.navigateByUrl('/sme-onboarding') :
    //      this.router.navigateByUrl('/sme-dashboard')
    //   }
    // })
    // this.modalRef = this.modalService.show('template', { class: 'modal-lg' });
    if(userId == 'SME105'){
    this.mymodal = this.modalService.show(this.modalRef);
    }
    else if(userId == 'SME104'){
      this.router.navigateByUrl('/sme-onboarding')
    }
    else{
      this.router.navigateByUrl('/sme-dashboard')
    }
  }
}
