
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
import { IccRolesServices } from '../../icc-roles/icc-roles-services';
import * as _ from 'lodash';
import { MatListOption } from '@angular/material/list';


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
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  assignRoles=[];
  cardImageKYCBase64: any;
  isImageSavedKYC: boolean;
  sectors: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  bidpanelOpenState = false;
  fileData: any = [];
    fileNames=[]
    baseFileData
  dropdownSettings :IDropdownSettings = {
  singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true  
  }
  selectedProducts:any
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers','Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  RolesType:any;
  constructor(private IccRolesServices: IccRolesServices,private activatedRoute: ActivatedRoute,public router: Router, private authenticationService: AuthenticationService, 
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
    // this.RolesType = [{"roleId":1,"code":"Maker","roleDescription":"Maker"},{"roleId":2,"code":"Checker","roleDescription":"Checker"}]

    this.IccRolesServices.getAllRoles().subscribe(listResp => {
      if(listResp){
        console.log(listResp)
        this.RolesType = listResp
      }
    })
    this.IccUserCreationssService.getAllSector().subscribe(listResp => {
      if(listResp){
        this.sectors = listResp
      }
    })
}

selectionChange(option) {
  console.log(option,this.selectedProducts,'ddd');

  // this.assignRoles = option.selected
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
    this.IccUserCreationssService.getUserSMEDetails(this.userForm.value.nationalId).subscribe(resp => {
      console.log(resp)
      this.userForm.patchValue({
    firstName: resp[0].fname,
    email: resp[0].email ,
    lastName: resp[0].lname,
    contactNo: resp[0].contactnum,
    companyName: resp[0].companyname, 
    locale: resp[0].locale,
    address:resp[0].address,
    country:resp[0].country,
    role:resp[0].role,
    profileType:resp[0].profiletype,

      });

    })
  }
  fileChangeEvent(fileInput: any,type) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        if(type === 'profile'){
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;
  
          if (fileInput.target.files[0].size > max_size) {
              this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
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
                      this.imageError = 'Maximum dimentions allowed ' + max_height + '*' + max_width +'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.cardImageBase64 = imgBase64Path;
                      this.isImageSaved = true;
                  }
              };
          };
          reader.readAsDataURL(fileInput.target.files[0]);
        }else{
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const imgBase64Path = e.target.result;
              this.cardImageKYCBase64 = imgBase64Path;
              this.isImageSavedKYC = true;
          };
          reader.readAsDataURL(fileInput.target.files[0]);
        }
       
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
  onSubmitInvoiceForm() {
    try {
      this.userForm.patchValue({
        role:JSON.stringify(this.selectedProducts)
      })
      if (this.userForm.status === "INVALID"){
        // throw { "mes": "Please fill mendatory  fields" }
        this.toastr.error("Please fill mendatory  fields")
      }        
                 if(this.id){
                  this.IccUserCreationssService.UpdateUser(this.id,this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/icc-sme-details');
          
                  }, error => {
                  })
                }else{
                  this.IccUserCreationssService.Usersave(this.userForm.value).subscribe(resp => {
                    this.invoiceFormBuild();
                    this.router.navigateByUrl('/icc-sme-details');
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
      }else{
        this.IccUserCreationssService.getUserSMEDetails(this.id).subscribe(resp => {
          console.log(resp)
          this.userForm.patchValue({
        firstName: resp[0].fname,
        email: resp[0].email ,
        lastName: resp[0].lname,
        contactNo: resp[0].contactnum,
        companyName: resp[0].companyname, 
        locale: resp[0].locale,
        address:resp[0].address,
        country:resp[0].country,
        role:resp[0].role,
        profileType:resp[0].profiletype,
    
          });
        })
      }
    })
   
  }
  invoiceFormBuild() {
    this.userForm = this.fb.group({
      nationalId: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: ['', Validators.required], 
      locale: ['', Validators.required],
      address:['',Validators.required],
      address1:['',Validators.required],
      country:['',Validators.required],
      state:['',Validators.required],
      postalCode:['',Validators.required],
      sector:[''],
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

