import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
// import { QuestionaireScoreServices } from './questionaire-score-services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-financier-limit-maintanace',
    templateUrl: './financier-limit-maintanace.component.html',
    styleUrls: ['./financier-limit-maintanace.component.scss']
  })
  
export class FinancierLimitMaintanaceComponent implements OnInit {
  limitMaintanceForm: FormGroup;
  displayedColumns: string[] = ['Exposure','Modified', 'Available Exposure','Created'];
  dataSource : any;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean;
  isOk: boolean;
  groupId : any;
  enableReadonly = true

  constructor(public router: Router, 
     private fb: FormBuilder,private apiService:ApiService,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

//     let staticResp =   {
//       "companyId": "80f5590c-2c9b-49a2-a3f2-08d8ff5bb864",
//       "state": "PartialScore",
//       "score": 98.0,
//       "scores": [
//           {
//               "scoreAlias": "business-planning",
//               "scoreName": "Business Planning",
  
//               "score": 60,
  
//               "information": [
//                   {
//                       "type": "Warning",
//                       "message": "Not enough questions answered"
//                   }   
//               ]
//           },
//           {
//               "scoreAlias": "contractual-planning",
//               "scoreName": "Contractual Planning",
//               "score": 70,
//               "information": []
//           },
  
//           {
//               "scoreAlias": "financial-planning",
//               "scoreName": "Financial Planning",
//               "score": 88,
//               "information": []
//           }
//       ]        
// }

//     this.dataSource = new MatTableDataSource(staticResp.scores)

//     this.limitMaintanceForm.patchValue({  
//       state : staticResp.state,
//       score : staticResp.score
//     })

  // this.QuestionaireScoreServices.getScore().subscribe(listResp => {
  //   if(listResp){
  //     this.dataSource = new MatTableDataSource(listResp.scores);
  //      this.limitMaintanceForm.patchValue({  
  //       state : listResp.state,
  //       score : listResp.score
  //     })
  //   }
  // })
}

  groupsFormBuild() {
    this.limitMaintanceForm = this.fb.group({
      exposureAmt: ['0', Validators.required], 
      modifyExpoOptions: ['', Validators.required], 
      modifyExposureAmt: ['', Validators.required],
      avblExposureAmt: ['', Validators.required],
      invCcy:['',Validators.required]
    });
  }
  clickedit(){
       this.enableReadonly = true;
     this.isEdit = true;
    this.isOk = true;
    // this.limitMaintanceForm.get('modifyExpoOptions').clearValidators();
    // this.limitMaintanceForm.get('modifyExposureAmt').clearValidators();
    // this.limitMaintanceForm.controls.modifyExpoOptions.enable();
    // this.limitMaintanceForm.controls.modifyExposureAmt.enable();
    
  }
  onSubmitLimitForm(){
    this.isOk = false;
  
    // if(!this.isEdit){
    //   this.limitMaintanceForm.controls.modifyExpoOptions.disable();
    //   this.limitMaintanceForm.controls.modifyExposureAmt.disable();
    // }

    if(this.limitMaintanceForm.value && this.limitMaintanceForm.status == "VALID"){
      var ddatae = new Date();
      let value = this.limitMaintanceForm.value;
      value.created = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
      // value.modified = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
      console.log(value,"this.limitMaintanceForm.value");
      let array=[]
      array.push(value)
      this.dataSource = new MatTableDataSource(array);
      
      // this.apiService.post(environment.financierServicePath+'sme-custom/',this.limitMaintanceForm.value).subscribe(resp=>{
       
      
      // })
      // if(this.isEdit){
      //   value.groupId = this.groupId
      // }
      // this.QuestionaireScoreServices.submitIccGroups(value).subscribe(resp => {
      //   if(resp){
      //     this.toastr.success("Saved Successfully")
      //     this.limitMaintanceForm.reset();
      //     this.groupId = "";
      //     this.isEdit = false
      //     this.QuestionaireScoreServices.getScore().subscribe(listResp => {
      //       if(listResp){
      //         this.dataSource = new MatTableDataSource(listResp);
      //       }
      //     })
      //   }
      // })
    }else{
      this.isOk = true;
      this.toastr.error("Please Fill Mandatory fields")
    }
  }

  getEditData(data){

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.groupId = 1
    // let respData = {'groupId' : '1' ,'groupCode' : 'CODE123','groupName' : 'test', 'groupDescription' : 'description of group'}
    // this.limitMaintanceForm.patchValue({  
    //   groupCode : respData.groupCode,
    //   groupName : respData.groupName,
    //   groupDescription : respData.groupDescription
    // })
    // **** End Need to hide  *****
   

        // this.QuestionaireScoreServices.getParticularGroups(data.groupId).subscribe(resp => { 
        //   if(resp && resp[0]){
        //     let respData = resp[0];
        //     this.limitMaintanceForm.patchValue({  
        //       groupCode : respData.groupCode,
        //       groupName : respData.groupName,
        //       groupDescription : respData.groupDescription
        //     })
        //     this.isEdit = true
        //     this.groupId = respData.groupId

        //   }

        // })
 
}
changeExposure(event,type){
  console.log(event,"event");
  let exposureAmt = parseInt(this.limitMaintanceForm.value.exposureAmt);
  let modifyExpoOptions = this.limitMaintanceForm.value.modifyExpoOptions
  let modifyExposureAmt = parseInt(this.limitMaintanceForm.value.modifyExposureAmt);
  let avblExpAmt = modifyExpoOptions == "+" ? exposureAmt+modifyExposureAmt : exposureAmt-modifyExposureAmt
  console.log(avblExpAmt,"avblExposureAmt");
  this.limitMaintanceForm.patchValue({  
  avblExposureAmt : !this.isEdit ? exposureAmt : avblExpAmt?avblExpAmt:"0"
  })
}
clickadd(){
  this.enableReadonly = false
  var ddatae = new Date();
  let value = this.limitMaintanceForm.value;
  value.created = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
  value.modified = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
  console.log(value,"this.limitMaintanceForm.value");
  let array=[]
  array.push(value)
  this.dataSource = new MatTableDataSource(array);
  this.limitMaintanceForm.get('modifyExpoOptions').clearValidators();
      this.limitMaintanceForm.get('modifyExposureAmt').clearValidators();
      this.limitMaintanceForm.controls.modifyExpoOptions.enable();
      this.limitMaintanceForm.controls.modifyExposureAmt.enable();
      this.enableReadonly = true;
      this.isEdit = true;
}
}