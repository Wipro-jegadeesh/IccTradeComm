import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SignupService } from '../signup.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { SIGNUPSECTORS } from '../../../shared/constants/signUpSectors';
import { IccCountryServices } from '../../icc-country/icc-country.services'
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  signupForm: FormGroup;
  signUpDetails: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  bidpanelOpenState = false;
  sectors: any;
  languages = [{ "id": "en", "itemName": "English", "nativeName": "English" },
  { "id": "es", "itemName": "Espano", "nativeName": "Español" }
  ]


  constructor(public translate: TranslateService, private toastr: ToastrService, private SignupServices: SignupService,
    private fb: FormBuilder, private IccCountryServices: IccCountryServices) { }

  optionDatas = []
  selectedItems = []
  sectorOptionsDatas = []


  LanguagesOptions = []
  languageSelectedItems = []

  dropdownList = [];
  // country dropdown settings
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  ngOnInit(): void {
    this.getAllCountry()
    this.signUpDetails = JSON.parse(localStorage.getItem("signUpDetails"))
    this.sectorOptionsDatas = SIGNUPSECTORS
    this.LanguagesOptions = [{ "id": "en", "itemName": "English", "nativeName": "English" }, { "id": "es", "itemName": "Espano", "nativeName": "Español" }]
    this.signupFormBuild() //build signup form
    this.selectedItems = []
    this.getSectorList() //get sector list func
  }
  //Sector list Api call
  getSectorList() {
    this.SignupServices.getAllSectorList().subscribe(listResp => {
      if (listResp) {
        this.sectors = listResp
      }
    })
  }
  //country Api call
  getAllCountry() {
    this.IccCountryServices.getAllcountry().subscribe(resp => {
      let countryArray = []
      resp && resp.map(item => {
        let obj = { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
      this.optionDatas = countryArray
    })
  }

  onKey(value) {
    this.languages = this.search(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    return this.languages.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  //signup form build
  signupFormBuild() {
    this.signupForm = this.fb.group({
      userId: [''],
      nationalId: [this.signUpDetails ? this.signUpDetails.nationalId : '', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: [this.signUpDetails ? this.signUpDetails.companyName : '', Validators.required],
      address: ['', Validators.required],
      address1: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      sector: ['', Validators.required],
      country: [[], Validators.required],
      language: [[], Validators.required],
      // country:[this.signUpDetails ? this.signUpDetails.country[0].itemName : '' ,Validators.required],
      role: [''],
      profileType: ['SME', Validators.required],
    });

    let data = this.signUpDetails ? this.signUpDetails.country[0].itemName : ''
    this.setCountryValue(data) // set country drop down value

    let userDetailObj = {
      'registrationId': this.signUpDetails ? this.signUpDetails.nationalId : '',
      'companyName': this.signUpDetails ? this.signUpDetails.companyName : '',
      'country': this.signUpDetails ? this.signUpDetails.country[0].id : '',
    }
    this.SignupServices.getUserDetails(userDetailObj).subscribe(resp => {
      if (resp) {
        resp.sectionDtoList[0].sectionResponse && resp.sectionDtoList[0].sectionResponse.responses.map((item, index) => {
          switch (item.questionAlias) {
            case 'name':
              this.signupForm.get("firstName").setValue(item.value);
              break;
            case 'email':
              this.signupForm.get("email").setValue(item.value);
              break;
            case 'address-line-1':
              this.signupForm.get("address").setValue(item.value);
              break;
            case 'telephone-mobile':
              this.signupForm.get("contactNo").setValue(item.value);
              break;
            case 'city':
              this.signupForm.get("city").setValue(item.value);
              break;
            case 'postcode':
              this.signupForm.get("postalCode").setValue(item.value);
              break;
            case 'address-line-2':
              this.signupForm.get("address1").setValue(item.value);
              break;
            case 'sector':
              // this.sectors.filter(x => x.alias == item.questionAlias)
              this.signupForm.get("sector").setValue(item.optionAliases);
              break;
            default:
          }
        })
      }
    })
  }
  //set country dropdown value
  setCountryValue(country) {
    if (country) {
      let obj = {
        'itemName': country
      }

      const result = this.optionDatas && this.optionDatas.filter(country => country.itemName == country);
      obj['id'] = result['id']
      this.signupForm.controls['country'].setValue([obj])
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  }
  //Image upload functionality
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

          // In-progress(image)
          // console.log(img_height, img_width);


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
  //set language in local storage
  setlocalstroageLanguage(value) {
    localStorage.setItem("DefultLanguage", value);
  }
  //Image removal functionality
  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
  //Signup details submit function
  onSignupSubmit() {
    try {
      if (this.signupForm.status === "INVALID") {
        throw { "mes": "Please fill mendatory  fields" }
      }

      let basicAddrObj = [{
        addressLine1: this.signupForm.value.address,
        addressLine2: this.signupForm.value.address1,
        addressLine3: '',
        addressLine4: '',
        city: this.signupForm.value.city,
        state: this.signupForm.value.state,
        postalCode: this.signupForm.value.postalCode,
        country: this.signupForm.value.country && this.signupForm.value.country[0] && this.signupForm.value.country[0].itemName,
        telephoneno: this.signupForm.value.contactNo,
        email: this.signupForm.value.email,
        swiftBic: '',
        addressType: ''
      }]

      let userDetailObj = [{
        userId: this.signupForm.value.userId,
        nationalId: this.signupForm.value.nationalId,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        companyName: this.signupForm.value.companyName,
        address: this.signupForm.value.address,
        locale: this.signupForm.value.city,
        role: this.signupForm.value.role,
        profileType: this.signupForm.value.profileType,
        email: this.signupForm.value.email,
        contactNo: this.signupForm.value.contactNo,
        country: this.signupForm.value.country && this.signupForm.value.country[0] && this.signupForm.value.country[0].itemName,
        language: this.signupForm.value.language && this.signupForm.value.language[0] && this.signupForm.value.language[0].itemName
      }]
      let smeboard = {
        corporateCode: '',
        name: this.signupForm.value.companyName,
        registrationNumber: this.signupForm.value.nationalId,
        taxNo: '',
        rating: '',
        sector: this.signupForm.value.sector,
        addrlst: basicAddrObj,
        userlst: userDetailObj
      };
      let smeOnboardingObj = {
        smeboard: smeboard
      }


      this.SignupServices.submitSignupDetails(smeOnboardingObj).subscribe(resp => {
        if (resp && resp.status == 200) {
          this.signupFormBuild();
          this.toastr.success("SME created succesfully kindly login with your credentials")
          window.location.href = "/"
        }
      }, error => {
        error && error.error && error.error.msg ?
          this.toastr.error(this.replaceCommaLine(error.error.msg), '',
            { timeOut: 4000, progressBar: true, enableHtml: true }) :
          this.toastr.error('Error')
      })

    } catch (err) {
    }
  }
  //function to replace a function
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  //login page routing
  loginNavigation() {
    window.location.href = "/"
  }
}
