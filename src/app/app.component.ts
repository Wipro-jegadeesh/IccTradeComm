import { Component, OnInit ,ChangeDetectorRef, Renderer2, ViewChild} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from "../../src/app/service/loader.service";
import { Subscription } from "rxjs";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import { DialogDataExampleService } from './shared/dialogBox/dialogBox.component';
import { UserIdleService } from 'angular-user-idle';
import { TranslateService } from '@ngx-translate/core';

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

  @ViewChild(SidebarComponent) sidebar:SidebarComponent

  constructor(public translate: TranslateService,private loaderService: LoaderService,private router: Router,private cdr: ChangeDetectorRef,
    private renderer: Renderer2,private dialogBox:DialogDataExampleService,private userIdle: UserIdleService) {
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
    this.check();
     //Start watching for user inactivity.
     if(this.showNavbar){
     this.userIdle.startWatching();
    
     // Start watching when user idle is starting.
     this.userIdle.onTimerStart().subscribe((count) =>{ 
     });

    //   // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() =>{
      this.dialogBox.openDialog()
    });
  }
  }
  ngAfterViewInit() {
    this.showLoadingIcon = false
}
  ngDoCheck() {
    this.check();
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


