import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  profileDetailForm: FormGroup;
  userDetails: any;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.userProfileFormBuild()
  }

  ngOnInit(): void {
    this.profileDetails()
  }
  public hasError = (controlName, errorName) => {
    return this.profileDetailForm.controls[controlName].hasError(errorName);
  }
  // set/patch profile details
  profileDetails() {
    this.apiService.generalServiceget(environment.financierServicePath + 'userdata-details/' + localStorage.getItem("userId")).subscribe(resp => {
      if (resp) {
        this.userDetails = resp[0]
        this.profileDetailForm.patchValue({
          fname: resp[0].fname,
          email: resp[0].email,
          lname: resp[0].lname,
          contactNo: resp[0].contactnum,
          locale: resp[0].locale,
          address: resp[0].address,
          country: resp[0].country,
          languages: resp[0].languages,
          state: resp[0].state,
        });
      }
    })
  }
  //function to build user profile form 
  userProfileFormBuild() {
    this.profileDetailForm = this.fb.group({
      fname: [''],
      email: [''],
      lname: [''],
      contactNo: [''],
      locale: [''],
      address: [''],
      country: [''],
      languages: [''],
      state: [''],
      city: [''],
    });
  }
}
