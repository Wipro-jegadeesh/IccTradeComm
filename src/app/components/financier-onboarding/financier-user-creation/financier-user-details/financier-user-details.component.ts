import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FUNDINGREQUESTCONSTANTS } from '../../../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { FinancierUserCreationService } from '../financier-user-creation.service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-financier-user-details',
  templateUrl: './financier-user-details.component.html',
  styleUrls: ['./financier-user-details.component.scss']
})
export class FinancierUserDetailsComponent implements OnInit {
  userForm: FormGroup;
 
 
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  finDetailId = "";
  nationalId;
  tooltipPosition= "below";
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  UpdateInvoiceLable: boolean;
  invoiceDetails: any;
  id: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
 
  dropdownSettings :IDropdownSettings = {
  singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true  
  }
 

  constructor(private _location: Location,private route: ActivatedRoute,private activatedRoute: ActivatedRoute,public router: Router, private authenticationService: AuthenticationService, 
    private FinancierUserCreationService: FinancierUserCreationService, private fb: FormBuilder,
    private datePipe: DatePipe,private toastr:ToastrService) {
    this.invoiceFormBuild()
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.finDetailId = this.activatedRoute.snapshot.paramMap.get("finDetailId")
    this.nationalId = this.activatedRoute.snapshot.paramMap.get("nationalId")

    // this.finDetailId =
    //  this.route.snapshot && this.route.snapshot.params && this.route.snapshot.params.finDetailId
    

    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    // this.userForm.patchValue({
    //   finDetailId : this.finDetailId,
    //   firstName: "first",
    //   email: "emm@mail.com" ,
    //   lastName: "last",
    //   contactNo: "434343",
    //   role:"Input",
    //   profileType:"SME",
    //     });
    if(this.id){
      this.UserEditFormBuild()
    }else{
       this.userForm.patchValue({
          finDetailId : this.finDetailId
      })
    }
}


  
  public scrollRight(): void {
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: 'smooth',
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
  }

  openModal(event, template) {
    event.preventDefault();
  }
  goHome() {
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout() {
    this.authenticationService.logout()
  }
  
  blurFunction(){

   

    this.FinancierUserCreationService.getUserSMEDetails(this.userForm.value.finDetailId).subscribe(resp => {
      console.log(resp)
      this.userForm.patchValue({
        finDetailId : this.finDetailId,
    firstName: resp[0].fname,
    email: resp[0].email ,
    lastName: resp[0].lname,
    contactNo: resp[0].contactnum,
    // companyName: resp[0].companyname, 
    // city: resp[0].locale,
    // address:resp[0].address,
    // country:resp[0].country,
    role:resp[0].role,
    profileType:resp[0].profiletype,

      });

    })
  }
  onSubmitUserForm() {
    try {
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }

      let values = this.userForm.value
      values.nationalId = this.nationalId

      

                 if(this.id){
                  this.FinancierUserCreationService.UpdateUser(this.id,values).subscribe(resp => {
                    if(resp && resp.status == 200){
                    this.invoiceFormBuild();
                    // this.router.navigateByUrl('/financier-user-creation');
                    this.gobackPage()
                    }
                  }, error => {
                    error && error.error && error.error.msg ?this.toastr.error(error.error.msg) : this.toastr.error('Error')
                  })
                }else{
                  this.FinancierUserCreationService.Usersave(values).subscribe(resp => {
                    if(resp && resp.status == 200){
                    this.invoiceFormBuild();
                    // this.router.navigateByUrl('/financier-user-creation');
                    this.gobackPage();
                    }
                  }, error => {
                    error && error.error && error.error.msg ?this.toastr.error(error.error.msg) : this.toastr.error('Error')

                  })
                }
     
    } catch (err) {
    }
  }
  UserEditFormBuild(){
    this.FinancierUserCreationService.getUserDetails(this.id).subscribe(resp => {
      if(resp){
        // this.FinancebiddingDetails = resp
        this.userForm.patchValue({
      finDetailId: resp.finDetailId,
      firstName: resp.firstName,
      email: resp.email ,
      lastName: resp.lastName,
      contactNo: resp.contactNo,
      // companyName: resp.companyName, 
      // city: resp.locale,
      // ICCId: localStorage.getItem("userId"),
      // address:resp.address,
      // country:resp.country,
      // groupname:['',Validators.required],
      role:resp.role,
      profileType:resp.profileType,
      userId:resp.userId 
        });
      }
    })
   
  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      finDetailId: [''],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      // companyName: ['', Validators.required], 
      // locale: ['', Validators.required],
      // address:['',Validators.required],
      // address1:[''],
      // country:['',Validators.required],
      // state:['',Validators.required],
      // city:['',Validators.required],
      // postalCode:['',Validators.required],
      // groupname:['',Validators.required],
      role:['',Validators.required],
      profileType:['',Validators.required],
      userId:['']
      // language:['',Validators.required],

    });
  
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

  gobackPage(){
    this._location.back();
  }

}


