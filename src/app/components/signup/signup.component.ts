import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


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

  constructor(private router: Router) { }

  
  name = "Angular";
  cities: Array<ICity> = [];
  selectedItems: Array<ICity> = [];
  dropdownSettings: IDropdownSettings = {
    allowSearchFilter: true,
    closeDropDownOnSelection:true
    
  };

  ngOnInit() {
this.cities = [
{ item_id: 1, item_text: "Singapore" },
{ item_id: 2, item_text: "Ecuador" },
{ item_id: 3, item_text: "Turkey" },
{ item_id: 4, item_text: "Mexico" },
{ item_id: 5, item_text: "Sri Lanka" }
  ];
    this.selectedItems = [
      { item_id: 4, item_text: "Pune" },
      { item_id: 6, item_text: "Navsari" }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
   
  }
  onItemSelect(item: any) {
    this.selectedItem = item.item_id;
    let CountryPinLabel = ""
    if(item.item_id == 1 ){
      CountryPinLabel = "UEN"
    }
    else if(item.item_id == 2){
      CountryPinLabel = "RUC"
    }
    else if(item.item_id == 3){
      CountryPinLabel = "TIN"
    }
    else if(item.item_id == 4){
      CountryPinLabel = "MEX"
    }
    else if(item.item_id == 5){
      CountryPinLabel = "SRI"
    }
    this.showCountSignBtn = true
    this.CountryPinLabel = CountryPinLabel;
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    this.showCountSignBtn = false
    console.log('onItem DeSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onDropDownClose() {
    console.log('dropdown closed');
  }

  signup() {
    // if (this.country.valueOf() !== '' || this.CountryPin.valueOf() !== '') {
    //   this.router.navigate(['sme-onboarding'])
    //   this.invalidLogin = false
    // } else
    //   this.invalidLogin = false
    
    if (this.CountryPin.valueOf() !== '' || this.selectedItem != "" ) {
      this.router.navigate(['sme-onboarding'])
      this.invalidLogin = false
    } else
     { this.invalidLogin = true }
  
  }

  
  

  // onSubmit() {
  //   this.router.navigate(['sme-onboarding']);
  //   alert(this.selectedRole);
  //   console.log(this.selectedRole)  //Will give you the role selected;
  //   if (this.selectedRole == "SME") {
  //     this.router.navigate(['sme-onboarding'])
  //   }
  //   else if (this.selectedRole == "ICC User") {
  //     this.router.navigate(['financier-onboarding'])
  //   }
  // }

}
