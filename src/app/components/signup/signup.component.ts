import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SIGNUPSECTORS } from '../../shared/constants/signUpSectors'
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IccCountryServices } from '../icc-country/icc-country.services'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  countryForm: FormGroup;

  countryPin: string;
  invalidLogin = false
  selectedItem;
  countryPinLabel;
  showCountSignBtn = false;
  signUpDetails: any;
  modalRef: BsModalRef;
  languages = [{ "id": "en", "itemName": "English", "nativeName": "English" },
  { "id": "es", "itemName": "Espano", "nativeName": "Español" }
  ]
  countryId: any

  constructor(public translate: TranslateService, private modalService: BsModalService, private fb: FormBuilder, private router: Router,
    private signupService: SignupService, private IccCountryServices: IccCountryServices,
    private toastr: ToastrService) { }


  name = "";
  optionDatas = []
  dropdownSettings: any = {}
  selectedItems = []
  sectorOptionsDatas = []

  ngOnInit() {
    this.sectorOptionsDatas = SIGNUPSECTORS
    //Country drop down options
    this.dropdownSettings = {
      singleSelection: true,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      // showCheckbox: false,
      // position:'bottom',
      text: 'Select Country',
      enableSearchFilter: true,
      autoPosition: false,
      maxHeight: 170
    };
    this.selectedItems = []
    this.buildSignupForm();
    this.getAllCountry();
    localStorage.clear();
  }
  // build signup form fields
  buildSignupForm() {
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      countryPin: ['', Validators.required]
    })
  }
  // store/set a current language in local storage
  setLanguage(value) {
    localStorage.setItem("DefultLanguage", value);
  }
  // Function to get a country list
  getAllCountry() {
    this.IccCountryServices.getAllcountry().subscribe(resp => {
      if (resp && resp.length) {
        let countryArray = []
        resp.map((item) => {
          let obj = { id: item.countrycode3, itemName: item.country }
          countryArray.push(obj)
        })
        this.optionDatas = countryArray
      }
    })
  }
  //Deselect event for country dropdown
  onDeSelect(event) {
    this.showCountSignBtn = false
    this.countryPinLabel = ''
  }
  //Select event for country dropdown
  onChange(event) {
    this.showCountSignBtn = event && event.itemName ? true : false
    if (event.itemName == "Singapore") {
      this.countryId = "UEN"
    } else if (event.itemName == "Equatorial Guinea") {
      this.countryId = "RUC"
    } else {
      this.countryId = event.id
      // this.countryPinLabel=event.regNo ? event.regNo : 'No'
    }
  }
  //signup submission function
  onSignupFormSubmit(event, template) {
    event.preventDefault();
    if (this.countryForm && this.countryForm.valid) {
      let formValues = this.countryForm.value

      let signUpDetailsObj = {
        companyName: formValues.name,
        nationalId: formValues.countryPin,
        country: formValues.country,
      }
      let RegDetailObj = {
        name: formValues.name,
        country: formValues.country,
        registrationNumber: formValues.countryPin,
      }
      localStorage.setItem("signUpDetails", JSON.stringify(signUpDetailsObj))
      this.signupService.checkSignup(RegDetailObj).subscribe(resp => {
        if (resp.status === "true") {
          this.toastr.error("This company already exists in Icc tradecomm market place");
        } else if (resp.status === "invalid") {
          this.toastr.error(resp.message);
        } else {
          let data = {
            'companyId': formValues.countryPin,
            'country': formValues.country && formValues.country[0] && formValues.country[0].id,
            'companyName': formValues.name
          }
          // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
          this.signupService.checkCompany(data).subscribe(resp => {
            if (resp && resp.registrationnumber) {
              this.router.navigateByUrl('/signup-details');
            }
            else {
              this.router.navigateByUrl('/signup-details');
            }
          },
            err => {
              this.toastr.error('Error')
            })
        }
      })
    } else {
      this.toastr.error("Mandatory fields are missing")
    }
  }
  // confirmation function for existing company or not.
  signUpPage(type) {
    if (this.countryForm && this.countryForm.valid) {
      let formValues = this.countryForm.value
      this.modalRef.hide();
      localStorage.setItem("existingCUS", type);
      let signUpDetailss = {
        companyName: formValues.name,
        nationalId: formValues.countryPin,
        country: formValues.country,
      }
      localStorage.setItem("signUpDetails", JSON.stringify(signUpDetailss))
      if (type === 'yes') {
        this.router.navigate(['sme-onboarding'])
      } else {
        this.router.navigateByUrl('/signup-details');
      }
    } else {
      this.toastr.error("Mandatory fields are missing")
    }
  }
  //Login navigation function
  loginNavigation() {
    window.location.href = "/"
  }
}
