import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LOGINCONSTANTS } from '../../shared/constants/constants'
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from '../../shared/constants/Languages';
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
  modalRef: BsModalRef;
  // @ViewChild('template')
// private modalRef: TemplateRef<any>;
  // mymodal
  languages  = [{"id":"en","itemName":"English","nativeName":"English"},
  {"id":"es","itemName":"Espano","nativeName":"Español"}
]
  constructor(public translate: TranslateService,private modalService: BsModalService,private router: Router,private apiService:ApiService,
    private authService: AuthenticationService,private toastr: ToastrService) { }
  ngOnInit(): void { //Initially works after constructor
  }
  // tslint:disable-next-line: typedef
  login(event,template) {
     localStorage.setItem("userId",this.username);
      if(this.username && this.password){
        this.checkQuesCompl(event,template)
        this.invalidLogin = false;
      }
      else{
        this.invalidLogin = true;
      this.toastr.error("Invalid username or password")
      }
    // if (this.authService.loginAsSme(this.username, this.password)) {
    //     this.checkQuesCompl(event,template)
    //   // this.router.navigate(['sme-dashboard']);
    //     // this.checkQuesCompl(this.username)
    //   this.invalidLogin = false;
    // } else if (this.authService.loginAsFinancier(this.username, this.password)) {
    //   this.router.navigate(['financier-dashboard']);
    //   this.invalidLogin = false;
    // }  else if (this.authService.loginAsICCUser(this.username, this.password)) {
    //   this.router.navigate(['icc-dashboard']);
    //   this.invalidLogin = false;
    // } else {
    //   this.invalidLogin = true;
    //   this.toastr.error("Invalid username or password")
    // }
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
    this.modalRef.hide();
    // this.mymodal = this.modalService.hide();
    this.router.navigateByUrl('/score-received')
  }
  modalhide(){
    this.modalRef.hide();
    // this.mymodal = this.modalService.hide();
  }
  setlocalstroageLanguage(value){
    localStorage.setItem("DefultLanguage",value);
  }
  checkQuesCompl(event,template){
    event.preventDefault();
    // 'sme-custom/'
    this.apiService.generalServiceget(environment.financierServicePath+'userdata-details/'+this.username).subscribe(resp=>{
      if(resp.length){
        if(resp[0].profiletype == 'SME'){
        let userObj={
          'companyName':resp[0].companyname,
          'userId':this.username,
          'companyId':resp[0].nationalid,
          'country':'SGP',
          'role':resp[0].role,
          'name':resp[0].name,
          'address':resp[0].address,
          'mobile':resp[0].contactnum,
          'email':resp[0].email,
          'city':resp[0].locale,
          'status': resp[0].status
        }
        let isQuesSucc=resp[0].questionnaire
        let status=resp[0].status
        if(status == 'P'){
          this.modalRef = this.modalService.show(template, { class: 'modal-md' });
        }
        
        else if(isQuesSucc == 'N'){
          this.router.navigateByUrl('/sme-onboarding')
        }else{
          this.router.navigateByUrl('/sme-dashboard')
          userObj['questionnaire']=resp[0].questionnaire
        }
        localStorage.setItem('userCred',JSON.stringify(userObj))
      }
      else if(resp[0].profiletype == 'FIN'){
        this.router.navigateByUrl('/financier-dashboard')
      }
      else if(resp[0].profiletype == 'ICC'){
        this.router.navigateByUrl('/icc-dashboard')
      }
      }
      else{
        this.toastr.error('User Not Found')
      }
    })
  }
}
