import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import {Location} from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from '../constants/Languages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentHeaderName = "";
  userName
  homePath = "";
  headerPaths = [];
  isHide=false; 
  userDeatils: any;
  roleName: string;
  // languages = LANGUAGES
  languages  = [{"id":"en","itemName":"English","nativeName":"English"},
  {"id":"es","itemName":"Espano","nativeName":"español, castellano"}
]
  constructor(public translate: TranslateService,public router: Router, private route: ActivatedRoute,public authenticationService:AuthenticationService,private _location: Location
    // ,private oauthService: OAuthService
    )
   { }

   
  LanguagesOptions=[]
  languageDropdownSettings:any={}
  languageSelectedItems=[]
  selectedItems=[]


  ngOnInit(): void {
    this.userName = localStorage.getItem("userId")
    this.roleName = localStorage.getItem("roleName")
    this.userDeatils = JSON.parse(localStorage.getItem('userCred'))
    // const result = this.router.config && this.router.config.filter(item => '/'+item.path == this.router.url);
    // this.currentHeaderName = result && result[0] && result[0].data && result[0].data.HeaderName
    this.getModuleDependencies()

       this.LanguagesOptions = LANGUAGES
    this.languageDropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position:'bottom',
      text:'Select Language',
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };

    this.selectedItems = [{"id":"en","itemName":"English"}]

    
  }
  setlocalstroageLanguage(value){
    localStorage.setItem("DefultLanguage",value);
    console.log(this.translate,"this.translate")
    console.log(this.translate.instant('Select Country'),"this.translate.instant('Select Country')")
  }
  ngDoCheck(){
    this.getModuleDependencies()
    // let componentName =  this.route.firstChild && this.route.firstChild.data && this.route.firstChild.data['_value'] && this.route.firstChild.data['_value'].HeaderName ? this.route.firstChild.data['_value'].HeaderName : '';   
    // const result = this.router.config && this.router.config.filter(item => item.data && item.data.HeaderName == componentName);
    // this.currentHeaderName = result && result[0] && result[0].data && result[0].data.HeaderName
    // this.homePath = result && result[0] && result[0].data && result[0].data.homePath


    // if(this.router.url.includes('financier-onboarding') && (this.router.url.includes('edit') || this.router.url.includes('view'))){
    //   this.currentHeaderName = 'Financier Onboarding'
    // }else if(this.router.url.includes('sme-bidding/') && this.router.url.includes('id')){
    //   this.currentHeaderName = 'SME Bidding / SME Bidding Details'
    // }else if(this.router.url.includes('finance-bidding') && this.router.url.includes('id')){
    //   this.currentHeaderName = 'Invoice Details'
    // }else{
    //   this.currentHeaderName = result && result[0] && result[0].data && result[0].data.HeaderName
    // }
  }


  getModuleDependencies(){    
    let componentName =  this.route.firstChild && this.route.firstChild.data && this.route.firstChild.data['_value'] && this.route.firstChild.data['_value'].HeaderName ? this.route.firstChild.data['_value'].HeaderName : '';   
    const result = this.router.config && this.router.config.filter(item => item.data && item.data.HeaderName == componentName);
    this.currentHeaderName = result && result[0] && result[0].data && result[0].data.HeaderName
    this.homePath = result && result[0] && result[0].data && result[0].data.homePath
    let userData=JSON.parse(localStorage.getItem('userCred'))
    if(this.router.url == '/sme-onboarding' || this.router.url == '/score-received' && userData && userData.questionnaire){
      this.headerPaths =[{path:"/sme-dashboard",pathName:"Seller Dashboard"}]
    }else if(this.router.url == '/view-profile/sme'){
      this.headerPaths =[{path:"/sme-dashboard",pathName:"Seller Dashboard"}]
    }else if(this.router.url == '/view-profile/financier'){
      this.headerPaths =[{path:"/financier-dashboard",pathName:"Financier Dashboard"}]
    }else if(this.router.url == '/view-profile/icc'){
      this.headerPaths =[{path:"/icc-dashboard",pathName:"ICC TradeComm Administrator Dashboard"}]
    }
    else{
    this.headerPaths = result && result[0] && result[0].data && result[0].data.headerPaths ? result[0].data.headerPaths : []
    }
  }

  onChange(event){
    // translate.use(event.id)
  //  this.showCountSignBtn= this.selectedItems.length ? true : false
  //  this.CountryPinLabel=event.regNo ? event.regNo : 'No'
  }

  goHome(){
    this.router.navigateByUrl(this.homePath);
  }

  logout(){
    // this.oauthService.logOut();
    localStorage.clear();
  this.authenticationService.logout()
    }

    backNavigation() {
    //  !this.isHide ? this._location.back() : this.router.navigateByUrl('/signup')
    this._location.back()
    }

    navigationHeadersPath(path){
      this.router.navigateByUrl(path);
    }
    profile(){
      this.router.navigateByUrl('/view-profile/'+this.roleName)
    }
}
