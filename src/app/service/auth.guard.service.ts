import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService,OAuthErrorEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { DialogDataExampleService } from '../shared/dialogBox/dialogBox.component';
import { UserIdleService } from 'angular-user-idle';

@Injectable()
export class AuthConfigService {
    
    private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() { return this._decodedAccessToken; }
    get decodedIDToken() { return this._decodedIDToken; }

    
    constructor(
      private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig,
      private router: Router,
      private apiService:ApiService,
      private dialogBox:DialogDataExampleService,
      private userIdle: UserIdleService
    ) {}

    async initAuth(): Promise<any> {
      let url=window.location.pathname;
      if(url== "/signup"){
        this.router.navigateByUrl('/signup');
        return false;
       }
  else{
    // return
        return new Promise<void>((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();

        this.oauthService.events
        .pipe(
        ).subscribe(e => {
          console.log(e['info'], "info");
          console.log(e['type'], "type");
          if (e instanceof OAuthErrorEvent) {
            console.error(event, "error");
          }
          else {
            // event.info
            if (e['info'] == "access_token" && e['type'] == 'token_expires') {
              this.dialogBox.openDialog();
              
              // if (confirm('Session TimeOut : Click Ok to continue with this session')) {
              // //  this.handleNewToken();
              //   // resolveFn();
              //    this.oauthService.refreshToken();
              //   // location.reload();
              // } else {
              //   this.oauthService.logOut()
              // }

            }
          }
        })
         this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
          if (isLoggedIn) { 
            // For Token Expire Check
            // this.oauthService.setupAutomaticSilentRefresh();

            resolveFn();
          // For Token Expire Check
            let claims = this.oauthService.getIdentityClaims();
            let scope = this.oauthService.scope;
            console.log("scope",scope); 
            localStorage.setItem("userId",claims['preferred_username']);
            localStorage.setItem("accessToken",this.oauthService.getAccessToken());
            console.log("222222",claims);
            const sameCaseArray = claims['realm_access'] && claims['realm_access']['roles'].map(value => value.toLowerCase());
           



              //chk 

              var timestamp = this.oauthService.getAccessTokenExpiration()

              const date1 : any = new Date();
              var date2 : any = new Date(timestamp);
           
              const diffTime = Math.abs(date2 - date1);
              // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              var actualMilliSecond = (diffTime - 120000) //less 2 mins
              this.userIdle.setConfigValues({idle : actualMilliSecond, timeout : actualMilliSecond, ping : 0})



            //Set Expiry time
      //       var timestamp = this.oauthService.getAccessTokenExpiration()
      //       var date = new Date(timestamp);
      //       var milliseconds : any = date.getMilliseconds();
      //       var actualMilliSecond = (milliseconds - 120000) //less 2 mins

            
      // this.userIdle.setConfigValues({idle : actualMilliSecond, timeout : actualMilliSecond, ping : 0})

      
      


            sameCaseArray && sameCaseArray.map(item =>{
              if (item.match(/^.*sme$/) || item.match(/^sme.*$/)){
                this.apiService.generalServiceget(environment.financierServicePath+'sme-custom/'+claims['preferred_username']).subscribe(resp=>{
                  if(resp.length){
                    let userObj={
                      'smeProfileId':resp[0].companyid,
                      'companyName':resp[0].companyname,
                      'userId':claims['preferred_username'],
                      'companyId':resp[0].nationalid,
                      'country':'SGP',
                      'role':resp[0].role,
                      'name':resp[0].name,
                      'address':resp[0].address,
                      'mobile':resp[0].contactnum,
                      'email':resp[0].email,
                      'city':resp[0].locale,
                      'language': resp[0].languages,
                      'status': resp[0].status
                    }
                    let isQuesSucc=resp[0].questionnaire
                    let status=resp[0].status
                    if(status == 'P'){
                      this.router.navigateByUrl('/notActivated')
                      // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
                    }
                    else if(isQuesSucc == 'N'){
                      this.router.navigateByUrl('/sme-onboarding')
                    }
                    else{
                      localStorage.setItem("roleName","sme");
                      this.router.navigateByUrl('/sme-dashboard')
                      localStorage.setItem("redirectUri",environment.SMEURL);  
                      userObj['questionnaire']=resp[0].questionnaire
                    }
                    localStorage.setItem('userCred',JSON.stringify(userObj))
                  }
                  else{
                    // this.toastr.error('User Not Found')
                    this.oauthService.logOut()
                  }
                })

                // if(claims['realm_access']['roles'] && claims['realm_access']['roles'][0] == "sme"){
                    // this.router.navigateByUrl('/sme-dashboard');
                    // localStorage.setItem("redirectUri","http://localhost:4200/sme-dashboard");
                   }
                  if (item.match(/^.*financier$/) || item.match(/^financier.*$/)){ 

                      // =============

                      this.apiService.generalServiceget(environment.financierServicePath+'financier-custom/'+claims['preferred_username']).subscribe(resp=>{
                        if(resp.length){
                          let userObj={
                            'financierProfileId':resp[0].companyid,
                            // 'companyName':resp[0].companyname,
                            'userId':claims['preferred_username'],
                            'language': resp[0].languages
                            // 'companyId':resp[0].nationalid,
                            // 'country':'SGP',
                            // 'role':resp[0].role,
                            // 'name':resp[0].name,
                            // 'address':resp[0].address,
                            // 'mobile':resp[0].contactnum,
                            // 'email':resp[0].email,
                            // 'city':resp[0].locale
                          }
                          localStorage.setItem('userCred',JSON.stringify(userObj))
                        }})

                      // ==============
                    localStorage.setItem("roleName","financier");
                  //  else if (claims['realm_access']['roles'] && claims['realm_access']['roles'][0] == "financier"){
                       localStorage.setItem("roleName","financier");
                       this.router.navigateByUrl('/financier-dashboard');
                       localStorage.setItem("redirectUri",environment.FINANCEURL);  
                   }
                   if(item.match(/^.*icc$/) || item.match(/^icc.*$/)){
                    localStorage.setItem("roleName","icc");
                    this.router.navigateByUrl('/icc-dashboard');
                    localStorage.setItem("redirectUri",environment.ICCURL);  
                   }
            }) 
          
            // localStorage.setItem("clientId",this.oauthService.clientId);
            // if (!claims) return null;
            // let loadUserProfile = this.oauthService
            console.log("this.oauthService",this.oauthService);
            console.log("claimsclaims",claims);
            // console.log("loadUserProfile",loadUserProfile);
            // if (!claims) 
            // return null;
            // return claims['name'];
          } else {
            this.oauthService.initImplicitFlow();
            rejectFn();
          }
        });
      });
     }
    }
  
    private handleNewToken() {
      this._decodedAccessToken = this.oauthService.getAccessToken();
      this._decodedIDToken = this.oauthService.getIdToken();
    }

    refreshToken(){
      this.userIdle.resetTimer();
      this.oauthService.refreshToken();
    }
    logoutSession(){
      this.userIdle.stopWatching();
      this.oauthService.logOut();
    }
}