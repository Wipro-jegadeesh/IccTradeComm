import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SmeUserCreationService } from '../sme-user-creation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sme-user-details',
  templateUrl: './sme-user-details.component.html',
  styleUrls: ['./sme-user-details.component.scss']
})
export class SmeUserDetailsComponent implements OnInit {
  userForm: FormGroup;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  mobileScreen = false;
  tooltipPosition = "below";
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  id: string;
  companyId;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(private activatedRoute: ActivatedRoute, public router: Router,
    private smeUserCreationService: SmeUserCreationService, private fb: FormBuilder,
    private toastr: ToastrService) {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    this.companyId = userCred.companyId
    this.userCreationFormBuild();
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    if (this.id) {
      this.userEditFormBuild()
    }
  }
  //function to get company details (country,state)
  onLoadCmpyDetail() {
    this.smeUserCreationService.getUserSMEDetails(this.userForm.value.nationalId).subscribe(resp => {
      if (resp) {
        this.userForm.patchValue({
          firstName: '',
          email: '',
          lastName: '',
          contactNo: '',
          companyName: resp[0].companyname,
          city: '',
          address: '',
          country: resp[0].country,
          role: resp[0].role,
          profileType: resp[0].profiletype,
        });
      }
    })
  }
  //submit/save function
  onSubmitUserForm() {
    try {
      if (this.userForm.status === "INVALID") {
        throw { "mes": "Please fill mendatory  fields" }
      }
      if (this.id) {
        this.smeUserCreationService.UpdateUser(this.id, this.userForm.value).subscribe(resp => {
          this.userCreationFormBuild();
          this.router.navigateByUrl('/sme-user-creation');

        }, error => {
          error && error.error && error.error.msg ? this.toastr.error(this.replaceCommaLine(error.error.msg), '', { timeOut: 4000, progressBar: true, enableHtml: true }) : this.toastr.error('Error')
        })
      } else {
        this.smeUserCreationService.smeUserCreation(this.userForm.value).subscribe(resp => {
          if (resp && resp.status == 200) {
            this.userCreationFormBuild();
            this.router.navigateByUrl('/sme-user-creation');
          }
        }, error => {
          error && error.error && error.error.msg ? this.toastr.error(this.replaceCommaLine(error.error.msg), '', { timeOut: 4000, progressBar: true, enableHtml: true }) : this.toastr.error('Error')
        })
      }
    } catch (err) {
    }
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  //function to build form for user-details edit 
  userEditFormBuild() {
    this.smeUserCreationService.getUserDetails(this.id).subscribe(resp => {
      if (resp) {
        // this.FinancebiddingDetails = resp
        let data = resp.userlst[0]
        let addr = resp.addrlst[0]
        this.userForm.patchValue({
          nationalId: data.nationalId,
          firstName: data.firstName,
          email: data.email,
          lastName: data.lastName,
          contactNo: data.contactNo,
          companyName: data.companyName,
          city: addr.city,
          state: addr.state,
          // ICCId: localStorage.getItem("userId"),
          postalCode: addr.postalCode,
          address: addr.addressLine1,
          address1: addr.addressLine2,
          country: data.country,
          // groupname:['',Validators.required],
          role: data.role,
          profileType: data.profileType,
          userId: data.userId
        });
      }
    })

  }
  //Form build function
  userCreationFormBuild() {
    this.userForm = this.fb.group({
      nationalId: [this.companyId, Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: ['', Validators.required],
      // locale: ['', Validators.required],
      address: ['', Validators.required],
      address1: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      // groupname:['',Validators.required],
      role: ['', Validators.required],
      profileType: ['', Validators.required],
      userId: ['']
      // language:['',Validators.required],

    });
    this.onLoadCmpyDetail()
  }
  //validation function
  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}