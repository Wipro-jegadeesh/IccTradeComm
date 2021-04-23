import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  userForm: FormGroup;
  signUpDetails:any;

  constructor(private router: Router,private SignupServices: SignupService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpDetails =  JSON.parse(localStorage.getItem("signUpDetails"))
    this.invoiceFormBuild()

  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      userId: [''],
      nationalId: [this.signUpDetails ? this.signUpDetails.nationalId : '' , Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: [this.signUpDetails ? this.signUpDetails.companyName : '', Validators.required], 
      address:['',Validators.required],
      address1:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      postalCode:['',Validators.required],
      country:[this.signUpDetails ? this.signUpDetails.country[0].itemName : '' ,Validators.required],
      role:[''],
      profileType:['SME',Validators.required],
    });
  
    
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }
  onSubmitInvoiceForm() {
    try {
      console.log(this.userForm,"this.userForm.value")
      console.log(this.userForm.value,"this.userForm.value")
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
      console.log(this.userForm.value,"this.userForm.value")
      console.log(this.userForm,"this.userForm.value")
      
      let addrlst = [{
          addressLine1: this.userForm.value.address,
          addressLine2: this.userForm.value.address1,
          addressLine3:'',
          addressLine4: '',
          city: this.userForm.value.city,
          state: this.userForm.value.state,
          postalCode: this.userForm.value.postalCode,
          country: this.userForm.value.country,
          telephoneno: this.userForm.value.contactNo,
          email: this.userForm.value.email,
          swiftBic: '',
          addressType:''
        }]

      let userList = [{
        userId: this.userForm.value.userId,
        nationalId: this.userForm.value.nationalId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        companyName: this.userForm.value.companyName,
        address: this.userForm.value.address,
        locale: this.userForm.value.city,
        role: this.userForm.value.role,
        profileType: this.userForm.value.profileType,
        email: this.userForm.value.email,
        contactNo: this.userForm.value.contactNo,
        country: this.userForm.value.country,
      }]
      let smeboard = {
        corporateCode: '',
        name: this.userForm.value.companyName,
        registrationNumber: this.userForm.value.nationalId,
        taxNo: '',
        rating: '',
        addrlst :addrlst,
        userlst : userList
      };
      let smeboards = {
        smeboard:smeboard
      } 
      console.log(smeboards,"smeboards")
       
    this.SignupServices.Usersave(smeboards).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/login');
          },error => {
      })
                
    } catch (err) {
    }
  }
}
