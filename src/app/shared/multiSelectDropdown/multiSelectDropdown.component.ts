import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'multiSelectDropdown',
    templateUrl: './multiSelectDropdown.component.html'
})

export class MultiSelectDropdown implements OnInit {
    @Input() questionDatas
    @Output("formChange") change: EventEmitter<any> = new EventEmitter();

    optionDatas=[]
    dropdownSettings:any={}
    selectedItems=[]

    constructor() { }

    ngOnInit() {
        this.questionDatas.options.map((item)=>{
            let obj={
                'id': item.alias,
                'itemName': item.label
            }
            this.optionDatas.push(obj)
        })
        if(this.questionDatas.response.length > 0){
      this.questionDatas.response.map((item)=>{
            this.optionDatas.map((optionItem)=>{
                if(optionItem.id == item){
                    this.selectedItems.push(optionItem)
                }
            })
        })
    }
        this.dropdownSettings = {
            singleSelection: this.questionDatas.allowMultiple ? false : true,
            defaultOpen: false,
            idField: "item_id",
            textField: "item_text",
            allowSearchFilter: true,
            showCheckbox:this.questionDatas.allowMultiple ? true : false,
            position:'bottom'
          };
        // this.dropdownSettings['singleSelection'] = this.questionDatas.allowMultiple ? true : false;
        // this.dropdownSettings['showCheckbox']=this.questionDatas.allowMultiple ? true : false;
        this.dropdownSettings['text']=this.questionDatas.required ? this.questionDatas.label + '*' : this.questionDatas.label;
        // this.dynWidth=this.questionDatas.label.length <= 50 ? '260px' : '827px'
     }
     onChange(event){
         let obj={
             selectedItems:this.selectedItems,
             questionDatas:this.questionDatas,
             number:this.questionDatas['number']
         }
        this.change.emit(obj);
    }
}