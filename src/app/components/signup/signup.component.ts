import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import {COUNTRYNAMES} from '../../shared/constants/Country'
import { SignupService } from './signup.service';

interface ICity{
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  country: string;
  CountryPin: string;
  invalidLogin = false
  selectedItem;
  CountryPinLabel;
  showCountSignBtn =false;
  closeDropDownOnSelection

  constructor(private router: Router,private signupService:SignupService,
    private toastr: ToastrService) { }

  
  name = "";
  optionDatas=[]
  dropdownSettings:any={}
  selectedItems=[]


  ngOnInit() {
this.optionDatas = COUNTRYNAMES
    this.dropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position:'bottom',
      text:'Select Country',
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };
    this.selectedItems=[]
   
  }
  onDeSelect(event) {
    this.showCountSignBtn = false
    this.CountryPinLabel=''
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onDropDownClose() {
    console.log('dropdown closed');
  }
  onChange(event){
   this.showCountSignBtn= this.selectedItems.length ? true : false
   this.CountryPinLabel=event.regNo ? event.regNo : 'No'
  }
  signup(form:NgForm) {
    // if (this.country.valueOf() !== '' || this.CountryPin.valueOf() !== '') {
    //   this.router.navigate(['sme-onboarding'])
    //   this.invalidLogin = false
    // } else
    //   this.invalidLogin = false
    
    // if (this.CountryPin.valueOf() !== '' || this.selectedItem != "" ) {
    //   this.router.navigate(['sme-onboarding'])
    //   this.invalidLogin = false
    // } else
    //  { this.invalidLogin = true }

    if(this.name && this.CountryPin && this.selectedItems.length){
      this.router.navigate(['sme-onboarding'])
      // this.signupService.signup(form.value).subscribe(resp=>{
      //   if(resp){
      //     this.router.navigate(['sme-onboarding'])
      //   }
      // })
    }
    else{
      this.toastr.error('Error')
    }
  }
}
