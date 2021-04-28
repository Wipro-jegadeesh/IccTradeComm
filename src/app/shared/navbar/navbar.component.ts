import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import {Location} from '@angular/common';
// import { OAuthService } from 'angular-oauth2-oidc';

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

  constructor(public router: Router, private route: ActivatedRoute,public authenticationService:AuthenticationService,private _location: Location) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem("userId")
    // const result = this.router.config && this.router.config.filter(item => '/'+item.path == this.router.url);
    // this.currentHeaderName = result && result[0] && result[0].data && result[0].data.HeaderName
    this.getModuleDependencies()
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
    }
    else{
    this.headerPaths = result && result[0] && result[0].data && result[0].data.headerPaths ? result[0].data.headerPaths : []
    }
  }

  goHome(){
    this.router.navigateByUrl(this.homePath);
  }

  logout(){
    // this.oauthService.logOut();
    // localStorage.clear();
    this.authenticationService.logout()
    }

    backNavigation() {
    //  !this.isHide ? this._location.back() : this.router.navigateByUrl('/signup')
    this._location.back()
    }

    navigationHeadersPath(path){
      this.router.navigateByUrl(path);
    }
}
