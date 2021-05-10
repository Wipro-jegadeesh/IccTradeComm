import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccUserCreationService } from '../icc-user-creation/icc-user-creation.service';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  userForm: FormGroup;
  userDeatils: any;

  constructor(private apiService:ApiService,private fb: FormBuilder) {     this.invoiceFormBuild()
  }

  ngOnInit(): void {
    this.UserEditFormBuild()
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }
  UserEditFormBuild(){
    this.apiService.generalServiceget(environment.financierServicePath+'sme-custom/'+localStorage.getItem("userId")).subscribe(resp=>{
      if(resp){
        this.userDeatils = resp[0]
        this.userForm.patchValue({
      firstName: resp[0].name,
      email: resp[0].email ,
      lastName: resp[0].lastName,
      contactNo: resp[0].contactnum,
      locale: resp[0].locale,
      address:resp[0].address,
      country:resp[0].country,
      state:resp[0].state,
        });
      }
    })
   
  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      firstName: [''],
      email: [''],
      lastName: [''],
      contactNo: [''],
      locale: [''],
      address:[''],
      country:[''],
      state:[''],
      city:[''],
    });
  
  }
}
