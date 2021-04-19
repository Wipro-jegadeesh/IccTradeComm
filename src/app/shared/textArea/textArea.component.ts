import { Component, EventEmitter, Input, OnInit, Output, NgZone, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
    selector: 'textArea',
    templateUrl: './textArea.component.html'
})

export class TextAreaComponent implements OnInit {
    @Input() questionDatas
    @Output("formChange") change: EventEmitter<any> = new EventEmitter();
    textAreaValue=''
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(private _ngZone: NgZone) { }
    
    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
      }
    ngOnInit() {
     }

    onChange(event){
        this.textAreaValue=event.target.value
        this.change.emit(this.textAreaValue);
    }
}