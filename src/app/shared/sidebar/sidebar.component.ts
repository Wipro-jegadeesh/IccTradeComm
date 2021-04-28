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
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkRolesPer=JSON.parse(localStorage.getItem('userCred'))

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
      this.router.navigateByUrl(path)
    }

}
