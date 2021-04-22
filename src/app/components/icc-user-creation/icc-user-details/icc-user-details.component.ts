
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FUNDINGREQUESTCONSTANTS } from '../../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IccUserCreationService } from '../icc-user-creation.service';



@Component({
  selector: 'app-icc-user-details',
  templateUrl: './icc-user-details.component.html',
  styleUrls: ['./icc-user-details.component.scss']
})

export class IccUserDetailsComponent implements OnInit {
  userForm: FormGroup;
 
 
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
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
 

  constructor(private activatedRoute: ActivatedRoute,public router: Router, private authenticationService: AuthenticationService, 
    private IccUserCreationssService: IccUserCreationService, private fb: FormBuilder,
    private datePipe: DatePipe,private toastr: ToastrService) {
    this.invoiceFormBuild()
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    if(this.id){
      this.UserEditFormBuild()
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
  
  
  
  onSubmitInvoiceForm() {
    try {
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
     
      
                 this.router.navigateByUrl('/icc-user-creation');
                 if(this.id){
                  this.IccUserCreationssService.UpdateUser(this.id,this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/icc-user-creation');
          
                  }, error => {
                  })
                }else{
                  this.IccUserCreationssService.Usersave(this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/icc-user-creation');
                  }, error => {
                  })
                }
     
    } catch (err) {
    }
  }
  UserEditFormBuild(){
    this.IccUserCreationssService.getUserDetails(this.id).subscribe(resp => {
      if(resp){
        // this.FinancebiddingDetails = resp
        this.userForm.patchValue({
          userId: resp.userId,
      nationalId: resp.nationalId,
      firstName: resp.firstName,
      email: resp.email ,
      lastName: resp.lastName,
      contactNo: resp.contactNo,
      companyName: resp.companyName, 
      locale: resp.locale,
      // ICCId: localStorage.getItem("userId"),
      address:resp.address,
      country:resp.country,
      // groupname:['',Validators.required],
      role:resp.role,
      profileType:resp.profileType,

        });
      }
    })
   
  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      nationalId: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: ['', Validators.required], 
      locale: ['', Validators.required],
      // ICCId: localStorage.getItem("userId"),
      address:['',Validators.required],
      country:['',Validators.required],
      // groupname:['',Validators.required],
      role:['',Validators.required],
      profileType:['',Validators.required],

      // language:['',Validators.required],

    });
  
    
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

}

