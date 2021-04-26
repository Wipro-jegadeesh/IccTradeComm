import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { QuestionaireScoreServices } from './questionaire-score-services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'

@Component({
  selector: 'app-questionaire-score',
  templateUrl: './questionaire-score.component.html',
  styleUrls: ['./questionaire-score.component.scss']
})
export class QuestionaireScoreComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['scoreName', 'score','information'];
  dataSource : any;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean
  groupId : any


  constructor(public router: Router, private QuestionaireScoreServices: QuestionaireScoreServices, 
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

//     this.groupsForm.patchValue({  
//       state : staticResp.state,
//       score : staticResp.score
//     })

  this.QuestionaireScoreServices.getScore().subscribe(listResp => {
    if(listResp){
      this.dataSource = new MatTableDataSource(listResp.scores);
       this.groupsForm.patchValue({  
        state : listResp.state,
        score : listResp.score
      })
    }
  })
}

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      state: ['', Validators.required], 
      score: ['', Validators.required],
      // groupDescription: ['', Validators.required]
    });

  }

  onSubmitgroupsForm(){

    // **** Start Need to hide *****
    // this.groupId = "";
    // this.isEdit = false
    // this.groupsForm.reset();
    // End Need to hide **********

    if(this.groupsForm.value && this.groupsForm.status == "VALID"){
      let value = this.groupsForm.value
      if(this.isEdit){
        value.groupId = this.groupId
      }
      this.QuestionaireScoreServices.submitIccGroups(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          this.groupsForm.reset();
          this.groupId = "";
          this.isEdit = false
          this.QuestionaireScoreServices.getScore().subscribe(listResp => {
            if(listResp){
              this.dataSource = new MatTableDataSource(listResp);
            }
          })
        }
      })
    }else{
      this.toastr.error("Mandatory fields are missing")
    }
  }

  getEditData(data){

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.groupId = 1
    // let respData = {'groupId' : '1' ,'groupCode' : 'CODE123','groupName' : 'test', 'groupDescription' : 'description of group'}
    // this.groupsForm.patchValue({  
    //   groupCode : respData.groupCode,
    //   groupName : respData.groupName,
    //   groupDescription : respData.groupDescription
    // })
    // **** End Need to hide  *****
   

        this.QuestionaireScoreServices.getParticularGroups(data.groupId).subscribe(resp => { 
          if(resp && resp[0]){
            let respData = resp[0];
            this.groupsForm.patchValue({  
              groupCode : respData.groupCode,
              groupName : respData.groupName,
              groupDescription : respData.groupDescription
            })
            this.isEdit = true
            this.groupId = respData.groupId

          }

        })
 
}


}
