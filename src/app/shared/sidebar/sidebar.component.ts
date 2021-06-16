import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  @Output() isOpenSidebar = new EventEmitter();
  checkRolesPer
  opened = false
  roleName
  constructor(private router: Router, private readonly oauthService: OAuthService) {
    this.checkRolesPer = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : ''
    this.roleName = localStorage.getItem('roleName') ? localStorage.getItem('roleName') : '';
  }

  ngOnInit(): void {
    console.log(this.checkRolesPer, "this.checkRolesPer")
    console.log(this.roleName, "this.roleName")
  }

  isOpen = 'inActive';


  isOpenHandle(isTrue, type) {
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    this.opened = isTrue === 'inActive' ? true : false;
    if (type == 'open') {
      this.isOpenSidebar.emit(this.isOpen);
    }
  }
  navigatePage(path) {
    this.opened = false
    this.router.navigateByUrl(path)
  }

  navigateDashboardPage() {
    let roleName = localStorage.getItem('roleName')
    if (roleName == "icc") {
      this.router.navigateByUrl('/icc-dashboard');
    } else if (roleName == "financier") {
      this.router.navigateByUrl('/financier-dashboard');
    } else if (roleName == "sme") {
      this.router.navigateByUrl('/sme-dashboard');
    }
  }

  logout() {
    this.oauthService.logOut();
    localStorage.clear();
    // this.authenticationService.logout()
  }

}
