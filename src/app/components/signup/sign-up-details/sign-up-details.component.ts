import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from '../signup.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  userForm: FormGroup;
  signUpDetails:any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(private toastr: ToastrService,private router: Router,private SignupServices: SignupService,private fb: FormBuilder) { }

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
 fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
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
                    this.toastr.success("SME create succesfully kindly login with your credentials")
                    this.router.navigateByUrl('/login');
          },error => {
      })
                
    } catch (err) {
    }
  }
}
