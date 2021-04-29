import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class AuthConfigService {
    
    private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() { return this._decodedAccessToken; }
    get decodedIDToken() { return this._decodedIDToken; }

    constructor(
      private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig,
      private router: Router
    ) {}

    async initAuth(): Promise<any> {
      let url=window.location.pathname;
      if(url== "/signup"){
        this.router.navigateByUrl('/signup');
        return false;
       }
  else{
      return new Promise<void>((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
  
        // subscribe to token events
        this.oauthService.events
          .pipe(filter((e: any) => {
            return e.type === 'token_received';
          }))
          .subscribe(() => this.handleNewToken());
          
        // continue initializing app or redirect to login-page
        
        this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
          if (isLoggedIn) { 
            this.oauthService.setupAutomaticSilentRefresh();
            resolveFn();
            let claims = this.oauthService.getIdentityClaims();
            let scope = this.oauthService.scope;
            console.log("scope",scope);
            localStorage.setItem("userId",claims['name']);
            localStorage.setItem("accessToken",this.oauthService.getAccessToken());
            console.log("222222",claims);
            const sameCaseArray = claims['realm_access']['roles'].map(value => value.toLowerCase());
            sameCaseArray.map(item =>{
              if (item.match(/^.*sme$/) || item.match(/^sme.*$/)){
                // if(claims['realm_access']['roles'] && claims['realm_access']['roles'][0] == "sme"){
                    this.router.navigateByUrl('/sme-dashboard');
                    localStorage.setItem("redirectUri","http://localhost:4200/sme-dashboard");
                   }
                  if (item.match(/^.*financier$/) || item.match(/^financier.*$/)){
                  //  else if (claims['realm_access']['roles'] && claims['realm_access']['roles'][0] == "financier"){
                       this.router.navigateByUrl('/financier-dashboard');
                       localStorage.setItem("redirectUri","http://localhost:4200/financier-dashboard");  
                   }
                   if(item.match(/^.*icc$/) || item.match(/^icc.*$/)){
                    this.router.navigateByUrl('/icc-dashboard');
                    localStorage.setItem("redirectUri","http://localhost:4200/icc-dashboard");  
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

}