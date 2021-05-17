import { Component, OnInit ,ChangeDetectorRef, Renderer2, ViewChild} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from "../../src/app/service/loader.service";
import { Subscription } from "rxjs";
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import { DialogDataExampleService } from './shared/dialogBox/dialogBox.component';

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
  minutes
  seconds
  private subscription: Subscription
  showLoadingIcon = false;
  timeoutId;

  @ViewChild(SidebarComponent) sidebar:SidebarComponent

  constructor(private loaderService: LoaderService,private router: Router,private cdr: ChangeDetectorRef,
    private renderer: Renderer2,private dialogBox:DialogDataExampleService) {
  }

  emitIsOpen(value){
    this.isOpen = value
  }

  ngOnInit() {
    let currentTime=new Date()
    this.minutes=currentTime.getMinutes()
    this.seconds=currentTime.getSeconds()
    localStorage.setItem('iniSessionMinute',this.minutes)
    localStorage.setItem('iniSessionSecond',this.seconds)
    this.subscription = this.loaderService.currentLoadingIconStatus.subscribe(
      value => {
        this.showLoadingIcon = value;
      }
    );
    this.check();
  }
  ngAfterViewInit() {
    this.showLoadingIcon = false
}
  ngDoCheck() {
    this.check();
    let sessionStartTime=JSON.parse(localStorage.getItem('iniSessionMinute'))
    let currentTime=new Date();
    if((sessionStartTime+5) <= currentTime.getMinutes()){
      this.minutes=currentTime.getMinutes()
      this.seconds=currentTime.getSeconds()
      localStorage.setItem('iniSessionMinute',this.minutes)
      localStorage.setItem('iniSessionSecond',this.seconds)
      this.dialogBox.openDialog()
    }
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
  onMouseMove(event){
    let sessionStartMinute=JSON.parse(localStorage.getItem('iniSessionMinute'))
    let sessionStartSecond=JSON.parse(localStorage.getItem('iniSessionSecond'))
    let currentTime=new Date();
    if((sessionStartMinute+5) <= currentTime.getMinutes()){
      if(sessionStartSecond >= currentTime.getSeconds()){
        this.minutes=currentTime.getMinutes()
        this.seconds=currentTime.getSeconds()
        localStorage.setItem('iniSessionMinute',this.minutes)
        localStorage.setItem('iniSessionSecond',this.seconds)
      }
      else{
        this.dialogBox.openDialog()
      }
    }
    else{
      this.minutes=currentTime.getMinutes()
      this.seconds=currentTime.getSeconds()
      localStorage.setItem('iniSessionMinute',this.minutes)
      localStorage.setItem('iniSessionSecond',this.seconds)
    }
  }
  screenClicked(event){

    if(this.isOpen == 'active'  && this.showSidebar){
      // this.emitIsOpen('inActive')
      this.sidebar.isOpenHandle('active','disable')
    }
  }

}


