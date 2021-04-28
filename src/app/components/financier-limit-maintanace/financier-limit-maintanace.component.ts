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


@Component({
    selector: 'app-financier-limit-maintanace',
    templateUrl: './financier-limit-maintanace.component.html',
    styleUrls: ['./financier-limit-maintanace.component.scss']
  })
  
export class FinancierLimitMaintanaceComponent implements OnInit {
  limitMaintanceForm: FormGroup;
  displayedColumns: string[] = ['Exposure', 'Available Exposure','Created','Modified'];
  dataSource : any;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean;
  isOk: boolean;
  groupId : any;
  enableReadonly = true

  constructor(public router: Router, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
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
      exposureAmt: ['', Validators.required], 
      modifyExpoOptions: ['', Validators.required], 
      modifyExposureAmt: ['', Validators.required],
      avblExposureAmt: ['', Validators.required],
    });
  }
  clickedit(){
    this.isOk = true;
    this.limitMaintanceForm.controls.modifyExpoOptions.enable();
    this.limitMaintanceForm.controls.modifyExposureAmt.enable();
    this.enableReadonly = false
  }
  onSubmitLimitForm(){
    this.isOk = false;
    // **** Start Need to hide *****
    // this.groupId = "";
    // this.isEdit = false
    // this.limitMaintanceForm.reset();
    // End Need to hide **********
    if(!this.isEdit){
      this.limitMaintanceForm.controls.modifyExpoOptions.disable();
      this.limitMaintanceForm.controls.modifyExposureAmt.disable();
    }

    if(this.limitMaintanceForm.value && this.limitMaintanceForm.status == "VALID"){
      let value = this.limitMaintanceForm.value;
      console.log(this.limitMaintanceForm.value,"this.limitMaintanceForm.value");
    let array=[]
    array.push(value)
      this.dataSource = new MatTableDataSource(array);
      this.limitMaintanceForm.get('modifyExpoOptions').clearValidators();
      this.limitMaintanceForm.get('modifyExposureAmt').clearValidators();
      this.limitMaintanceForm.controls.modifyExpoOptions.enable();
      this.limitMaintanceForm.controls.modifyExposureAmt.enable();
      this.enableReadonly = true;
      this.isEdit = true;

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
      this.toastr.error("Mandatory fields are missing")
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
}
}