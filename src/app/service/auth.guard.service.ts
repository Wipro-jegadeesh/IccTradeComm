import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { DialogDataExampleService } from '../shared/dialogBox/dialogBox.component';
import { UserIdleService } from 'angular-user-idle';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Injectable()
export class AuthConfigService {

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig,
    private router: Router,
    private apiService: ApiService,
    private dialogBox: DialogDataExampleService,
    private userIdle: UserIdleService,
    private idle: Idle, private keepalive: Keepalive
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
   }
   
  ngDoCheck() {
   
    setTimeout(() => {
      console.log(this.idleState, this.lastPing, 'onini', "this.idleStatecons")
    }, 1000);


  }
   reset() {
    // this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  async initAuth(): Promise<any> {
    let url = window.location.pathname;
    if (url == "/signup") {
      this.router.navigateByUrl('/signup');
      return false;
    }
    else {
      return new Promise<void>((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();

        this.oauthService.events
          .pipe(
          ).subscribe(e => {
            console.log(e['info'], "info");
            console.log(e, "info");
            console.log(e['type'], "type");
            if(e['type'] == 'invalid_nonce_in_state'){
              // this.oauthService.tryLogin().then((arg) => {
              //   console.log("this.oauthService.tryLogin()",arg)
              // });
              this.oauthService.refreshToken();
            }
            if (e instanceof OAuthErrorEvent) {
              console.error(event, "error");
              
              //  if(e['type'] == 'token_refresh_error'){
              //   this.logoutSession();
              // }
            }
            else {
              // event.info
              if (e['info'] == "access_token" && e['type'] == 'token_expires') {
                if (this.idleState == 'Timed out!') {
                  this.dialogBox.openDialog();
                  this.reset();
                } else {
                  console.log("refreshes  calles")
                  this.reset();
                  this.oauthService.refreshToken()
                  // this.oauthService.setupAutomaticSilentRefresh();
                }

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
            console.log("scope", scope);
            localStorage.setItem("userId", claims['preferred_username']);
            localStorage.setItem("accessToken", this.oauthService.getAccessToken());
            console.log("222222", claims);
            const sameCaseArray = claims['realm_access'] && claims['realm_access']['roles'].map(value => value.toLowerCase());




            //chk 

            var timestamp = this.oauthService.getAccessTokenExpiration()

            const date1: any = new Date();
            var date2: any = new Date(timestamp);

            const diffTime = Math.abs(date2 - date1);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            var actualMilliSecond = (diffTime - 120000) //less 2 mins
            // this.userIdle.setConfigValues({ idle: actualMilliSecond, timeout: actualMilliSecond, ping: 0 })

            // milliseconds to  seconds
            let milliToSeconds=(diffTime/1000)
            
            this.userIdle.setConfigValues({ idle:milliToSeconds,timeout:1,ping:0})



            //Set Expiry time
            //       var timestamp = this.oauthService.getAccessTokenExpiration()
            //       var date = new Date(timestamp);
            //       var milliseconds : any = date.getMilliseconds();
            //       var actualMilliSecond = (milliseconds - 120000) //less 2 mins


            // this.userIdle.setConfigValues({idle : actualMilliSecond, timeout : actualMilliSecond, ping : 0})





            sameCaseArray && sameCaseArray.map(item => {
              if (item.match(/^.*sme$/) || item.match(/^sme.*$/)) {
                this.apiService.generalServiceget(environment.financierServicePath + 'sme-custom/' + claims['preferred_username']).subscribe(resp => {
                  if (resp.length) {
                    let userObj = {
                      'smeProfileId': resp[0].companyid,
                      'companyName': resp[0].companyname,
                      'userId': claims['preferred_username'],
                      'companyId': resp[0].nationalid,
                      'country': 'SGP',
                      'role': resp[0].role,
                      'name': resp[0].name,
                      'address': resp[0].address,
                      'mobile': resp[0].contactnum,
                      'email': resp[0].email,
                      'city': resp[0].locale,
                      'language': resp[0].languages,
                      'status': resp[0].status
                    }
                    let isQuesSucc = resp[0].questionnaire
                    let status = resp[0].status
                    if (status == 'P' || status == 'I') {
                      localStorage.setItem("roleName", "sme");
                      this.router.navigateByUrl('/notActivated')
                    }
                    else if (isQuesSucc == 'N') {
                      localStorage.setItem("roleName", "sme");
                      this.router.navigateByUrl('/sme-onboarding')
                    }
                    else {
                      localStorage.setItem("roleName", "sme");
                      localStorage.setItem("redirectUri", environment.SMEURL);
                      userObj['questionnaire'] = resp[0].questionnaire
                      this.router.navigateByUrl('/sme-dashboard')
                    }
                    localStorage.setItem('userCred', JSON.stringify(userObj))
                    this.updateScore()
                  }
                  else {
                    this.oauthService.logOut()
                  }
                })
              }
              if (item.match(/^.*financier$/) || item.match(/^financier.*$/)) {
                this.apiService.generalServiceget(environment.financierServicePath + 'financier-custom/' + claims['preferred_username']).subscribe(resp => {
                  if (resp.length) {
                    let userObj = {
                      'financierProfileId': resp[0].companyid,
                      'profileID': resp[0].profileID,
                      'role': resp[0].role,
                      'userId': claims['preferred_username'],
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
                    localStorage.setItem('userCred', JSON.stringify(userObj))
                    localStorage.setItem("roleName", "financier");
                    localStorage.setItem("redirectUri", environment.FINANCEURL);
                    this.router.navigateByUrl('/financier-dashboard');

                  }
                })

              }
              if (item.match(/^.*icc$/) || item.match(/^icc.*$/)) {
                localStorage.setItem("roleName", "icc");
                localStorage.setItem("redirectUri", environment.ICCURL);
                this.router.navigateByUrl('/icc-dashboard');
              }
            })
            console.log("this.oauthService", this.oauthService);
            console.log("claimsclaims", claims);
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

  refreshToken() {
    this.userIdle.resetTimer();
    this.oauthService.refreshToken();
  }
  logoutSession() {
    this.userIdle.stopWatching();
    this.oauthService.logOut();
  }
  updateScore(){
    let userCred=JSON.parse(localStorage.getItem('userCred'))
      this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/fetchScoreByCompany/' + userCred.companyId + '/' + userCred.name + '/' + userCred.country).subscribe(resp=>{
        let obj={
            "smeRating":resp.score,
        }
          this.apiService.put(environment.financierServicePath + 'sme-profile/smeRating/' + userCred.companyId , obj).subscribe(scoreUpdateResp=>{

          })
      })
  }
}