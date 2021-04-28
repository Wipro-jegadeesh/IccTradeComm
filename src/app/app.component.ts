import { Component, OnInit ,ChangeDetectorRef, Renderer2, ViewChild} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from "../../src/app/service/loader.service";
import { Subscription } from "rxjs";
import {SidebarComponent} from './shared/sidebar/sidebar.component';

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

  @ViewChild(SidebarComponent) sidebar:SidebarComponent

  constructor(private loaderService: LoaderService,private router: Router,private cdr: ChangeDetectorRef,private renderer: Renderer2) {
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
  }
  ngAfterViewInit() {
    this.showLoadingIcon = false
}
  ngDoCheck() {
    this.check();
  }

  check() {
    if ((this.router.url == '/') || (this.router.url == '/login') || (this.router.url == '/signup') || (this.router.url == '/signup-details')) {
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

    if(this.isOpen == 'active'  && this.showSidebar){
      // this.emitIsOpen('inActive')
      this.sidebar.isOpenHandle('active','disable')
    }
  }

}


