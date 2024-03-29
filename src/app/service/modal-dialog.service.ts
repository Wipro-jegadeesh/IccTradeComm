import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ModalComponent } from '../shared/modals/modals.component';

@Injectable()
export class ModalDialogService {

config = {
keyboard: false,
backdrop: true,
ignoreBackdropClick: true
};
constructor(private modalService: BsModalService) { }

public confirm(title: string,message: string,btnOkText: string = 'OK',btnCancelText: string): Observable<Object> {
const modalRef = this.modalService.show(ModalComponent, {
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
    });
// console.log(modalRef, 'modal result');
modalRef.content.title = title;
modalRef.content.message = message;
modalRef.content.btnOkText = btnOkText;
if (btnCancelText) {
modalRef.content.btnCancelText = btnCancelText;
}
return modalRef.content.action;
}
}