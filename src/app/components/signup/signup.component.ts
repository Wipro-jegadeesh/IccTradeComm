import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import {COUNTRYNAMES} from '../../shared/constants/Country'
import {SIGNUPSECTORS} from '../../shared/constants/signUpSectors'

import { SignupService } from './signup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccUserCreationService } from '../icc-user-creation/icc-user-creation.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IccCountryServices } from '../icc-country/icc-country.services'


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
  type: string;
  signUpDiv: boolean;
  signUpDetails:any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private IccUserCreationssService: IccUserCreationService,private fb: FormBuilder,private activatedRoute: ActivatedRoute,private router: Router,
    private signupService:SignupService,private IccCountryServices:IccCountryServices,
    private toastr: ToastrService) { }

  
  name = "";
  optionDatas=[]
  dropdownSettings:any={}
  selectedItems=[]
  sectorOptionsDatas=[]
  sectordropdownSettings:any={}

  ngOnInit() {
    // this.optionDatas = COUNTRYNAMES
    this.getAllCountry()

    this.sectorOptionsDatas = SIGNUPSECTORS
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
    this.sectordropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "sector_id",
      textField: "sector_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position:'bottom',
      text:'Select Sector',
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };
    this.selectedItems=[]
    localStorage.clear();
  }

  getAllCountry(){
    this.IccCountryServices.getAllcountry().subscribe(resp => {    
      let countryArray = []

      resp && resp.map(item =>{
        let obj =  { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
    
      this.optionDatas = countryArray
    
    })
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
      let signUpDetailss = {
        companyName : this.name,
        nationalId : this.CountryPin,
        country : this.selectedItems,
      }
      localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
       
      
      // this.router.navigateByUrl('/signup');


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
  openModal(event, template) {
    event.preventDefault();
    let signUpDetailss = {
      companyName : this.name,
      nationalId : this.CountryPin,
      country : this.selectedItems,
    }
    let RegisteNo = {
      name : this.name,
      registrationNumber : this.CountryPin,
    }
    localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
    this.signupService.singUpCheck(RegisteNo).subscribe(resp=>{
        if(resp.status === "true"){
          this.toastr.error("This company already exists in Icc tradecomm Market place");
        }else{
          let data={
            'companyId':this.CountryPin,
            'country':this.selectedItems[0].id,
            'companyName':this.name
          }
          // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
          this.signupService.companyCheck(data).subscribe(resp =>{
            if(resp && resp.registrationnumber){
              this.router.navigateByUrl('/signup-details');
            }
            else{
              this.router.navigateByUrl('/signup-details')
            }
          },
          err=>{
            this.toastr.error('Error')
          })
          
        }

      })
  }
  signUpPage(type){
    this.modalRef.hide();
    localStorage.setItem("existingCUS",type);
    let signUpDetailss = {
      companyName : this.name,
      nationalId : this.CountryPin,
      country : this.selectedItems,
    }
    localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
    if(type === 'yes'){
          this.router.navigate(['sme-onboarding'])
    }else{
      this.router.navigateByUrl('/signup-details');
    }
  }
  GotoLogin(){
    window.location.href = "/"
    // this.router.navigateByUrl('/'); 
  }

}
