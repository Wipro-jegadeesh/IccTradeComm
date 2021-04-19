import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'textBox',
    templateUrl: './textBox.component.html'
})

export class TextboxComponent implements OnInit {

    @Input() questionDatas
    @Output("formChange") change: EventEmitter<any> = new EventEmitter();
    textboxValue=''
    sliderValue=0
    step = 1;
    tickInterval = 1;
    showTicks = false;
    autoTicks = true;
    dynWidth=''
    characterMax=''

    constructor() { }

    ngOnInit() {
        if(this.questionDatas.format == 'Range'){
            this.sliderValue=this.questionDatas.response ? this.questionDatas.response : 0
        }
        else{
            this.textboxValue=this.questionDatas.response ? this.questionDatas.response : ''
        }
        // this.dynWidth= this.questionDatas.characterMax <= 30 ? '280px' : this.questionDatas.characterMax <= 50 ?  '400px' : '820px'
        this.dynWidth= '400px'
        this.characterMax=this.questionDatas.characterMax ? this.questionDatas.characterMax : ''
     }
     formatLabel(value: number) {
        // if (value >= 1000) {
        //   return Math.round(value / 1000) + 'k';
        // }
    
        return value;
      }
    onChange(event){
        this.textboxValue=event.target.value
        let obj={
            questionDatas: this.questionDatas,
            value:this.textboxValue,
            number:this.questionDatas.number
        }
        this.change.emit(obj);
    }
    onSliderChange(event){
        this.sliderValue=event.value
        let obj={
            questionDatas: this.questionDatas,
            value:this.sliderValue,
            number:this.questionDatas.number
        }
        this.change.emit(obj);
    }
    getSliderTickInterval(): number | 'auto' {
        if (this.showTicks) {
          return this.autoTicks ? 'auto' : this.tickInterval;
        }
        return 0;
      }
}