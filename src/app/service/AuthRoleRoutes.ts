import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRoute, NavigationEnd, Router,NavigationStart,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import 'rxjs/add/operator/filter'

@Injectable()
export class AuthGuard implements CanActivate {
    moduleName;
    constructor(private router: Router, private oauthService: OAuthService, private activatedroute:ActivatedRoute) {
      
    }
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // sessionStorage.setItem("Module", claims['realm_access']['roles'][0]);

     console.log(state["_root"].children[0].value.data.Module,"statestatestate");
       if (sessionStorage.getItem('Module') == "sme" && state["_root"].children[0].value.data.Module == "sme") {
            // this.router.navigateByUrl('/sme-dashboard');
            console.log(state["_root"].children[0].value.data.Module,"loginnn");
            return true;
        } 
        else if (sessionStorage.getItem('Module') == "icc" && state["_root"].children[0].value.data.Module == "icc") {
            // this.router.navigateByUrl('/sme-dashboard');
            console.log(state["_root"].children[0].value.data.Module,"loginnn");
            return true;
        }
        else{
            this.oauthService.logOut();
        }
        // console.log(state["_root"].children[0].value.data.Module,"logOutlogOut");
       
        // this.oauthService.logOut();
        return false;
    }
}