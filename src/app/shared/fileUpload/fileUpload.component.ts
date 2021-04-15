import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'fileUpload',
    templateUrl: './fileUpload.component.html'
})

export class FileUploadComponent implements OnInit {
    @Input() questionDatas
    @Output("formChange") change: EventEmitter<any> = new EventEmitter();
    fileData: any = [];
    fileNames=[]
    baseFileData

    constructor() { }

    ngOnInit() {
        this.fileNames=this.questionDatas.response ? this.questionDatas.response : []
     }

    onChange(event){
        let baseData=[]
        for(let i = 0; i < event.target.files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(<File>event.target.files[i]);
            reader.onload = function () {
                baseData.push(reader.result)
            };
            this.fileNames.push(<File>event.target.files[i].name)
        }

        this.baseFileData= baseData
            let obj={
                questionDatas: this.questionDatas,
                value:this.fileNames,
                number:this.questionDatas.number
            }
        this.change.emit(obj)
        event.target.value=''
    }  

    onFileRemove(index){
       this.fileNames.splice(index,1)
    }

}