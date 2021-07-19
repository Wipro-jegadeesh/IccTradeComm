import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LOGINCONSTANTS } from '../../shared/constants/constants'
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  invalidLogin = false;
  hide = true;
  loginTooltip = LOGINCONSTANTS;
  modalRef: BsModalRef;
  languages = [{ "id": "en", "itemName": "English", "nativeName": "English" },
  { "id": "es", "itemName": "Espano", "nativeName": "Español" }
  ]
  constructor(public translate: TranslateService, private modalService: BsModalService,
    private router: Router, private apiService: ApiService, private toastr: ToastrService) { }
  ngOnInit(): void { //Initially works after constructor
  }
  login(event, template) { //calls when clicking login button
    localStorage.setItem("userId", this.username);
    if (this.username && this.password) {
      this.checkQuesCompl(event, template)
      this.invalidLogin = false;
    }
    else {
      this.invalidLogin = true;
      this.toastr.error("Invalid username or password")
    }
  }
  signUpPage(type) {//calls when clicking signup link
    localStorage.setItem("existingCUS", type);
    this.router.navigateByUrl('/signup');
  }
  dashboardNavigate() { //dashboard navigate function
    this.modalRef.hide();
    this.router.navigateByUrl('/score-received')
  }
  setlocalstroageLanguage(value) { //Default language set when initaially render
    localStorage.setItem("DefultLanguage", value);
  }
  checkQuesCompl(event, template) { //questionaire check for existing user
    event.preventDefault();
    this.apiService.generalServiceget(environment.financierServicePath + 'userdata-details/' + this.username).subscribe(resp => {
      if (resp.length) {
        if (resp[0].profiletype == 'SME') {
          let userObj = {
            'companyName': resp[0].companyname,
            'userId': this.username,
            'companyId': resp[0].nationalid,
            'country': 'SGP',
            'role': resp[0].role,
            'name': resp[0].name,
            'address': resp[0].address,
            'mobile': resp[0].contactnum,
            'email': resp[0].email,
            'city': resp[0].locale,
            'status': resp[0].status
          }
          let isQuesSucc = resp[0].questionnaire
          let status = resp[0].status
          if (status == 'P') {
            this.modalRef = this.modalService.show(template, { class: 'modal-md' });
          }
          else if (isQuesSucc == 'N') {
            this.router.navigateByUrl('/sme-onboarding')
          } else {
            this.router.navigateByUrl('/sme-dashboard')
            userObj['questionnaire'] = resp[0].questionnaire
          }
          localStorage.setItem('userCred', JSON.stringify(userObj))
        }
        else if (resp[0].profiletype == 'FIN') {
          this.router.navigateByUrl('/financier-dashboard')
        }
        else if (resp[0].profiletype == 'ICC') {
          this.router.navigateByUrl('/icc-dashboard')
        }
      }
      else {
        this.toastr.error('User Not Found')
      }
    })
  }
}
