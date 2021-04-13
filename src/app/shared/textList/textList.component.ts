import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'textList',
    templateUrl: './textList.component.html'
})

export class TextListComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  respValue=new FormControl
  listData: string[] = [];

  @Input() questionDatas
  @Output("formChange") change: EventEmitter<any> = new EventEmitter();
    textboxValue=''

  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;

  constructor() { }

    ngOnInit() {
      if(this.questionDatas.response.length){
      this.listData=this.questionDatas.response
      }
     }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    
        // Add our fruit
        if ((value || '').trim()) {
          this.listData.push(value.trim());
        }
    
        // Reset the input value
        if (input) {
          input.value = '';
        }
    
        this.respValue.setValue(null);
        let obj={
            questionDatas: this.questionDatas,
            value:this.listData,
            number:this.questionDatas.number
        }
        this.change.emit(obj);
      }
      remove(fruit : string): void {
        const index = this.listData.indexOf(fruit);
    
        if (index >= 0) {
          this.listData.splice(index, 1);
        }
        let obj={
            questionDatas: this.questionDatas,
            value:this.listData,
            number:this.questionDatas.number
        }
        this.change.emit(obj);
      }
      selected(event: MatAutocompleteSelectedEvent): void {
        // this.fruits.push(event.option.viewValue);
        this.chipsInput.nativeElement.value = '';
        this.respValue.setValue(null);
      }
}