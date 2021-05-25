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
    acceptEx

    constructor() { }

    ngOnInit() {
        this.questionDatas.response=this.questionDatas.response.length > 0 &&  this.questionDatas.response.map((item)=>{
            return {'name':item}
        }) 
        this.fileNames=this.questionDatas.response ? this.questionDatas.response : []
        this.questionDatas['extension']=this.questionDatas.extensions.map((item)=> { return item='.'+item })
        this.acceptEx=this.questionDatas.extension.toString()
     }

 onChange(event){

        if(this.fileNames.length < this.questionDatas.filesMax){
        this.getBase64(<File>event.target.files[0]).then((data) => {
            let fileName={
                'name':<File>event.target.files[0].name,
                'base64data':data
            }
        this.fileNames.push(fileName)
        event.target.value=''
            let obj={
                questionDatas: this.questionDatas,
                value:this.fileNames,
                number:this.questionDatas.number,
                base64data:data,
            }
            this.change.emit(obj)
        });
    }
        // for(let i = 0; i < event.target.files.length; i++) {
        //     var reader = new FileReader();
        //     reader.readAsDataURL(<File>event.target.files[i]);
        //     reader.onload =function () {
        //         baseData.push(reader.result)
        //     };
        //     this.fileNames.push(<File>event.target.files[i].name)
        // }
    }  
    getBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
    }

    onFileRemove(index){
       this.fileNames.splice(index,1)
       let obj={
        questionDatas: this.questionDatas,
        value:this.fileNames,
        number:this.questionDatas.number
    }
    this.change.emit(obj)
    }

}