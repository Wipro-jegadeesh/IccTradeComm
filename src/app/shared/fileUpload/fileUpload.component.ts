import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'fileUpload',
    templateUrl: './fileUpload.component.html'
})

export class FileUploadComponent implements OnInit {
    @Input() questionDatas
    @Output("formChange") change: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    onChange(event){
        this.change.emit(event)
    }    
}