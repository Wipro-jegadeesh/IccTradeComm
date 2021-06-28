import { Component, OnInit ,ChangeDetectorRef, Renderer2, ViewChild} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from "../../src/app/service/loader.service";
import { Subscription } from "rxjs";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import { DialogDataExampleService } from './shared/dialogBox/dialogBox.component';
import { UserIdleService } from 'angular-user-idle';
import { TranslateService } from '@ngx-translate/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'TradeComm';
  isOpen = ""
  showSidebar: boolean = false;
  showNavbar: boolean = false;
  showFooter: boolean = false;

  private subscription: Subscription
  showLoadingIcon = false;
  timeoutId;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  @ViewChild(SidebarComponent) sidebar:SidebarComponent

  constructor(public translate: TranslateService,private loaderService: LoaderService,private router: Router,private cdr: ChangeDetectorRef,
    private renderer: Renderer2,private dialogBox:DialogDataExampleService,private userIdle: UserIdleService,private idle: Idle, private keepalive: Keepalive) {
      let lang = localStorage.getItem("DefultLanguage")
      console.log(lang,"lang")
      if(lang){
        translate.setDefaultLang(lang);
        translate.use(lang);
      }
      else{
        translate.setDefaultLang('en');
        translate.use('en');
        localStorage.setItem("DefultLanguage",'en');
      }
    //   // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(5);
    // // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(5);
    // // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    // });
    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    // idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  emitIsOpen(value){
    this.isOpen = value
  }

  ngOnInit() {
    this.subscription = this.loaderService.currentLoadingIconStatus.subscribe(
      value => {
        this.showLoadingIcon = value;
      }
    );
    this.userIdle.startWatching();

     // Start watching when user idle is starting.
     this.userIdle.onTimerStart().subscribe((count) =>{ 
      console.log('idle timer')
    });

   //   // Start watch when time is up.
   this.userIdle.onTimeout().subscribe(() =>{
     console.log('idle timer2')
     if(this.showNavbar){
      this.userIdle.stopWatching();
     this.dialogBox.openDialog()
     }
   });
   this.check();
  }
  ngAfterViewInit() {
    this.showLoadingIcon = false
}

  ngDoCheck() {
    this.check();
    setTimeout(() => {
      // console.log(this.idleState, this.lastPing, 'onini', "this.idleStatecons")
    }, 1000);


  }

  check() {
    if ((this.router.url == '/') || (this.router.url == '/login') || (this.router.url == '/signup') || (this.router.url == '/signup-details') || (this.router.url == "/notActivated")) {
      this.showSidebar = false;
      this.showNavbar = false;
      this.showFooter = false;
    } else {
      this.showSidebar = true;
      this.showNavbar = true;
      this.showFooter = true;
    }
  }
  screenClicked(event){

    // this.isOpen == 'active'  &&
    if(this.showSidebar){
      // this.emitIsOpen('inActive')
      this.sidebar.isOpenHandle('active','disable')
    }
  }

}


