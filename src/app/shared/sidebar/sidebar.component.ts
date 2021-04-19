import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  @Output() isOpenSidebar = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  isOpen = 'inActive';


  isOpenHandle(isTrue){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    this.isOpenSidebar.emit(this.isOpen);
    }

}
