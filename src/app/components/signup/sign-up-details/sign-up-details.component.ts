import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IccUserCreationService } from '../../icc-user-creation/icc-user-creation.service';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  userForm: FormGroup;
  signUpDetails:any;

  constructor(private router: Router,private IccUserCreationssService: IccUserCreationService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpDetails =  JSON.parse(localStorage.getItem("signUpDetails"))
    this.invoiceFormBuild()

  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      nationalId: [this.signUpDetails ? this.signUpDetails.nationalId : '' , Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: [this.signUpDetails ? this.signUpDetails.companyName : '', Validators.required], 
      locale: ['', Validators.required],
      // ICCId: localStorage.getItem("userId"),
      address:['',Validators.required],
      country:[this.signUpDetails ? this.signUpDetails.country[0].itemName : '' ,Validators.required],
      // groupname:['',Validators.required],
      role:['',Validators.required],
      profileType:['option1',Validators.required],

      // language:['',Validators.required],

    });
  
    
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }
  onSubmitInvoiceForm() {
    try {
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
       this.IccUserCreationssService.Usersave(this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/login');
                  }, error => {
          })
                
    } catch (err) {
    }
  }
}
