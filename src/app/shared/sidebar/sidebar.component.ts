import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  @Output() isOpenSidebar = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  isOpen = 'inActive';


  isOpenHandle(isTrue){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    this.isOpenSidebar.emit(this.isOpen);
    }
    smeOnboard(){
      this.router.navigateByUrl('/sme-onboarding')
    }

}
