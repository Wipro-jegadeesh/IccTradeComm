import {Component, Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserIdleService } from 'angular-user-idle';
import { AuthConfigService } from 'src/app/service/auth.guard.service';

@Injectable()
export class DialogDataExampleService {
  constructor(public dialog: MatDialog) {}

  openDialog() {
      this.dialog.closeAll()
    const dialogRef = this.dialog.open(DialogDataExampleDialog, { disableClose: true })
      }
}

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialogBox.component.html',
  })
  export class DialogDataExampleDialog {
    constructor(private authService:AuthConfigService,private userIdle:UserIdleService,
    public dialogRef: MatDialogRef<DialogDataExampleDialog>) {
        dialogRef.disableClose = true;  
    }
    onOk(){
        this.dialogRef.close();
        this.userIdle.resetTimer();
        this.userIdle.startWatching();
        this.authService.refreshToken()
    }
    onCancel(){
        this.dialogRef.close();
        this.authService.logoutSession()
    }
  }