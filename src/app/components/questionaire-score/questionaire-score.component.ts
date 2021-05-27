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
import { TranslateService } from '@ngx-translate/core';

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


  constructor(public translate: TranslateService,public router: Router, private QuestionaireScoreServices: QuestionaireScoreServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    let data=JSON.parse(localStorage.getItem('userCred'))
  this.QuestionaireScoreServices.getScore(data).subscribe(listResp => {
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
      score: [0, Validators.required],
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
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.groupsForm.reset();
          this.groupId = "";
          this.isEdit = false
          let data=JSON.parse(localStorage.getItem('userCred'))
          this.QuestionaireScoreServices.getScore(data.companyId).subscribe(listResp => {
            if(listResp){
              this.dataSource = new MatTableDataSource(listResp);
            }
          })
        }
      })
    }else{
      this.toastr.error(this.translate.instant('Please fill Mandatory fields'))
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
