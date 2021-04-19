import { Component, OnInit ,ChangeDetectorRef, Renderer2} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from "../../src/app/service/loader.service";
import { Subscription } from "rxjs";

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
    if ((this.router.url == '/') || (this.router.url == '/login') || (this.router.url == '/signup')) {
      this.showSidebar = false;
      this.showNavbar = false;
      this.showFooter = false;
    } else {
      this.showSidebar = true;
      this.showNavbar = true;
      this.showFooter = true;
    }
  }
}


