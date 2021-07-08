import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})

// STATIC PAGE COMPONENT FOR POPUP 
export class StaticPageComponent implements OnInit {

  constructor(private router: Router,public dialog: MatDialog) { }

  ngOnInit():void{
    const dialogRef = this.dialog.open(NotActivatedPopup);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/score-received')
    });
  }
 
}

@Component({
  selector: 'not-activated-popup',
  templateUrl: './notActivated-popup.html',
})
export class NotActivatedPopup {}