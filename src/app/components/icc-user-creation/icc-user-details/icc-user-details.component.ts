
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IccUserCreationService } from '../icc-user-creation.service';
import { IccRolesServices } from '../../icc-roles/icc-roles-services';
import * as _ from 'lodash';
import { IccCountryServices } from '../../icc-country/icc-country.services'

interface ICity {
  id;
  itemName: string;
}
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
  tooltipPosition = "below";
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  id: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  assignRoles = [];
  cardImageKYCBase64: any;
  isImageSavedKYC: boolean;
  sectors: any;
  type: string;
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  bidpanelOpenState = false;
  fileData: any = [];
  fileNames = []
  baseFileData
  selectedProducts: any
  typesOfShoes: Array<string> = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  RolesType: any;
  constructor(private iccRolesServices: IccRolesServices, private activatedRoute: ActivatedRoute, public router: Router,
    private authenticationService: AuthenticationService, private iccUserCreationService: IccUserCreationService, private fb: FormBuilder,
    private toastr: ToastrService, private iccCountryServices: IccCountryServices) {
    this.userFormBuild()
  }
  name = "Angular";
  cities: Array<ICity> = [];
  selectedItems: Array<ICity> = [];
  dropdownSettings = {
  };
  isView = false
  LanguagesOptions = []
  languageDropdownSettings: any = {}
  languageSelectedItems = []

  ngOnInit() {//Initially works after constructor
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.LanguagesOptions = [{ "id": "english", "itemName": "English", "nativeName": "English" }, { "id": "espano", "itemName": "Espano", "nativeName": "Español" }]
    this.languageDropdownSettings = {
      singleSelection: true,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position: 'bottom',
      text: 'Select Language',
      enableSearchFilter: true,
      autoPosition: false,
      maxHeight: 170
    };
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      enableSearchFilter: true,
      text: 'Select Country',
      autoPosition: false,
      maxHeight: 170
    };
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getAllCountry()
    this.iccRolesServices.getAllRoles().subscribe(listResp => {
      if (listResp) {
        this.RolesType = listResp
      }
    })
    this.iccUserCreationService.getAllSector().subscribe(listResp => {
      if (listResp) {
        this.sectors = listResp
      }
    })
    if (this.id && this.type === 'EDIT') {
      this.UserEditFormBuild()
    }
    if (this.id && this.type === 'ADD') {
      this.UserADDFormBuild()
    }
  }
  getAllCountry() { //get all country list from api call
    this.iccCountryServices.getAllcountry().subscribe(resp => {
      let countryArray = []
      resp && resp.map(item => {
        let obj = { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
      this.cities = countryArray
    })
  }

  UserADDFormBuild() { //get sme details from api call and prepopulated 
    this.iccUserCreationService.getUserSMEDetails(this.id).subscribe(resp => {
      this.userForm.patchValue({
        firstName: '',
        email: '',
        lastName: '',
        contactNo: '',
        companyName: resp[0].companyname,
        locale: '',
        address: '',
        role: resp[0].role,
        profileType: resp[0].profiletype,
        address1: '',
        postalCode: '',
        state: '',
        nationalId: this.id
      });
      this.setCountryFormController(resp[0])
      this.setLanguageFormController(resp[0])
    })
  }
  selectionChange(option) { //calls when changing dropdown option
    this.selectedProducts = []
    let arr = option && option.option && option.option.selectionList && option.option.selectionList._value ? option.option.selectionList._value : []
    this.RolesType.forEach((item) => {
      arr.forEach((arrItem) => {
        if (arrItem == item.roleId) {
          item['isSelected'] = true
          this.selectedProducts.push(item)
        }
      })
    })
  }
  blurFunction() { //set form build for user form
    this.iccUserCreationService.getUserSMEDetails(this.userForm.value.nationalId).subscribe(resp => {
      if (resp && resp.length) {
        this.userForm.patchValue({
          firstName: ['', Validators.required],
          email: ['', Validators.required],
          lastName: ['', Validators.required],
          contactNo: ['', Validators.required],
          companyName: resp[0].companyname,
          locale: ['', Validators.required],
          address: ['', Validators.required],
          role: resp[0].role,
          profileType: resp[0].profiletype,
          address1: ['', Validators.required],
          postalCode: ['', Validators.required],
          state: ['', Validators.required],
        });
        this.setCountryFormController(resp[0])
        this.setLanguageFormController(resp[0])
      }
    })
  }
  fileChangeEvent(fileInput: any, type) {//calls when upload
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      if (type === 'profile') {
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

            if (img_height > max_height && img_width > max_width) {
              this.imageError = 'Maximum dimentions allowed ' + max_height + '*' + max_width + 'px';
              return false;
            } else {
              const imgBase64Path = e.target.result;
              this.cardImageBase64 = imgBase64Path;
              this.isImageSaved = true;
            }
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      } else {
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

  removeImage() { //calls when removing image
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
  onSubmitUserForm() {  //user form submit
    let role = ''
    this.selectedProducts && this.selectedProducts.forEach((item) => {
      role = role + item.roleId
    })
    try {
      this.userForm.patchValue({
        role: JSON.stringify(this.selectedProducts)
      })

      if (this.userForm.status === "INVALID") {
        // throw { "mes": "Please fill mendatory  fields" }
        this.toastr.error("Please fill mendatory  fields")
        return
      }
      this.userForm.value['country'] = this.userForm.value.country && this.userForm.value.country[0] && this.userForm.value.country[0].itemName
      let respObj = {
        "lastName": this.userForm.value.lastName,
        "locale": this.userForm.value.locale,
        "nationalId": this.userForm.value.nationalId,
        "postalcode": this.userForm.value.postalCode,
        "profileType": this.userForm.value.profileType,
        "role": role,
        "state": this.userForm.value.state,
        "address": this.userForm.value.address,
        "address2": this.userForm.value.address1,
        "companyName": this.userForm.value.companyName,
        "contactNo": this.userForm.value.contactNo,
        "country": this.userForm.value.country,
        "email": this.userForm.value.email,
        "firstName": this.userForm.value.firstName,
        "language": this.userForm.value.language[0].id
      }
      if (this.id && this.type === 'EDIT') {
        this.iccUserCreationService.UpdateUser(this.id, respObj).subscribe(resp => {
          this.userFormBuild();
          if (resp && resp.status == 200) {
            let data: NavigationExtras = {
              queryParams: {
                "companyId": this.id,
                "companyName": respObj.companyName,
                "country": "SGP"
              }
            }
            this.router.navigate(['/icc-sme-details/1'], { state: { smeData: data } });
          }
        }, error => {
          error && error.error && error.error.msg ? this.toastr.error(error.error.msg) : this.toastr.error('Error')
        })
      } else {
        this.iccUserCreationService.Usersave(respObj).subscribe(resp => {
          if (resp && resp.status == 200) {
            this.userFormBuild();
            let data: NavigationExtras = {
              queryParams: {
                "companyId": this.id,
                "companyName": respObj.companyName,
                "country": "SGP"
              }
            }
            this.router.navigate(['/icc-sme-details/1'], { state: { smeData: data } });
          }
        }, error => {
          error && error.error && error.error.msg ? this.toastr.error(error.error.msg) : this.toastr.error('Error')
        })
      }

    } catch (err) {
    }
  }
  UserEditFormBuild() { //calls when getting edit datas to prepopulate
    this.iccUserCreationService.getUserDetails(this.id).subscribe(resp => {
      if (resp) {
        this.userForm.patchValue({
          nationalId: resp.nationalId,
          firstName: resp.firstName,
          email: resp.email,
          lastName: resp.lastName,
          contactNo: resp.contactNo,
          companyName: resp.companyName,
          locale: resp.locale,
          address: resp.address,
          role: resp.role,
          profileType: resp.profileType,
          address1: resp.address2,
          postalCode: resp.postalcode,
          state: resp.state,
        });
        this.setCountryFormController(resp)
        this.setLanguageFormController(resp)
      }
    })
  }
  userFormBuild() { //build form fields for user form
    this.userForm = this.fb.group({
      nationalId: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: ['', Validators.required],
      locale: ['', Validators.required],
      address: ['', Validators.required],
      address1: ['', Validators.required],
      country: [[], Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      role: ['', Validators.required],
      profileType: ['', Validators.required],
      language: ['', Validators.required]
    });
  }
  setCountryFormController(item) {//set country data i form control
    let obj = {
      'itemName': item.country
    }
    const result = this.cities && this.cities.filter(country => country.itemName == item.country);
    obj['id'] = result['id']
    this.userForm.controls['country'].setValue([obj])
  }
  setLanguageFormController(item) {//language set for form build
    let obj = {
      'itemName': item.language
    }
    const result = this.LanguagesOptions && this.LanguagesOptions.filter(language => language.itemName == item.language);
    obj['id'] = result['id']
    this.userForm.controls['language'].setValue([obj])
  }
  public hasError = (controlName: string, errorName: string) => { //validation error throw when field is empty
    return this.userForm.controls[controlName].hasError(errorName);
  }
}

