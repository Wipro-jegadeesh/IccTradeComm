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
  companyId;

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
    private smeUserCreationService: SmeUserCreationService, private fb: FormBuilder,
    private datePipe: DatePipe,private toastr:ToastrService) {
      let userCred=JSON.parse(localStorage.getItem('userCred'))
      this.companyId = userCred.companyId
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
  
  blurFunction(){
    console.log(this.userForm.value.nationalId,"this.userForm.value.nationalId")
    this.smeUserCreationService.getUserSMEDetails(this.userForm.value.nationalId).subscribe(resp => {

      if(resp){
      this.userForm.patchValue({
    firstName: '',
    email:'' ,
    lastName: '',
    contactNo:'',
    companyName: resp[0].companyname,
    city: '',
    address:'',
    country:resp[0].country,
    role:resp[0].role,
    profileType:resp[0].profiletype,

      });
    }
    })
  }
  onSubmitUserForm() {
    try {
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
                 if(this.id){
                  this.smeUserCreationService.UpdateUser(this.id,this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/sme-user-creation');
          
                  }, error => {
                    error && error.error && error.error.msg ?this.toastr.error(this.replaceCommaLine(error.error.msg),'',{timeOut: 4000, progressBar: true, enableHtml: true}) : this.toastr.error('Error')
                  })
                }else{
                  this.smeUserCreationService.Usersave(this.userForm.value).subscribe(resp => {
                    if(resp && resp.status == 200){
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/sme-user-creation');
                    }
                  }, error => {
                    error && error.error && error.error.msg ?this.toastr.error(this.replaceCommaLine(error.error.msg),'',{timeOut: 4000, progressBar: true, enableHtml: true}) : this.toastr.error('Error')
                  })
                }
     
    } catch (err) {
    }
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  UserEditFormBuild(){
    this.smeUserCreationService.getUserDetails(this.id).subscribe(resp => {
      if(resp){
        // this.FinancebiddingDetails = resp
        let data=resp.userlst[0]
        let addr=resp.addrlst[0]
        this.userForm.patchValue({
      nationalId: data.nationalId,
      firstName: data.firstName,
      email: data.email ,
      lastName: data.lastName,
      contactNo: data.contactNo,
      companyName: data.companyName, 
      city: addr.city,
      state:addr.state,
      // ICCId: localStorage.getItem("userId"),
      postalCode:addr.postalCode,
      address:addr.addressLine1,
      address1:addr.addressLine2,
      country:data.country,
      // groupname:['',Validators.required],
      role:data.role,
      profileType:data.profileType,
      userId:data.userId 
        });
      }
    })
   
  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      nationalId: [this.companyId, Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: ['', Validators.required], 
      // locale: ['', Validators.required],
      address:['',Validators.required],
      address1:[''],
      country:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      postalCode:['',Validators.required],
      // groupname:['',Validators.required],
      role:['',Validators.required],
      profileType:['',Validators.required],
      userId:['']
      // language:['',Validators.required],

    });
    this.blurFunction()
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

}

