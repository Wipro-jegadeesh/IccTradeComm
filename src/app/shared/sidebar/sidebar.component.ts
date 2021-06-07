import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  @Output() isOpenSidebar = new EventEmitter();
  checkRolesPer
  opened=false
  roleName
  constructor(private router:Router) {
    this.checkRolesPer=JSON.parse(localStorage.getItem('userCred'))
    this.roleName = localStorage.getItem('roleName');
   }

  ngOnInit(): void {
    console.log(this.checkRolesPer,"this.checkRolesPer")
    console.log(this.roleName,"this.roleName")
  }

  isOpen = 'inActive';


  isOpenHandle(isTrue,type){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    this.opened = isTrue === 'inActive' ? true : false ;
    if(type == 'open'){
    this.isOpenSidebar.emit(this.isOpen);
    }
    }
    navigatePage(path){
      this.opened = false
      this.router.navigateByUrl(path)
    }

}
