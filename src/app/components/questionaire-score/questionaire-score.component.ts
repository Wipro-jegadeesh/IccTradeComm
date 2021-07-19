import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { QuestionaireScoreServices } from './questionaire-score-services';
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

  displayedColumns: Array<string> = ['scoreName', 'score', 'information'];
  dataSource: any;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  groupId: any

  constructor(public translate: TranslateService, public router: Router, private questionaireScoreServices: QuestionaireScoreServices,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.groupsFormBuild()
  }
  
  ngOnInit(): void {
    this.getScoreData()
  }
  //get score data function
  getScoreData(){
    let data = JSON.parse(localStorage.getItem('userCred'))
     this.questionaireScoreServices.getScore(data).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp.scores);
        this.groupsForm.patchValue({
          state: listResp.state,
          score: listResp.score
        })
      }
    })
  }
  //form build function
  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      state: ['', Validators.required],
      score: [0, Validators.required],
      // groupDescription: ['', Validators.required]
    });
  }
  //Score submission function
  onScoreFormSubmit() {
    // **** Start Need to hide *****
    // this.groupId = "";
    // this.isEdit = false
    // this.groupsForm.reset();
    // End Need to hide **********
    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.groupId = this.groupId
      }
      this.questionaireScoreServices.submitScore(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.groupsForm.reset();
          this.groupId = "";
          this.isEdit = false
          let data = JSON.parse(localStorage.getItem('userCred'))
          this.questionaireScoreServices.getScore(data.companyId).subscribe(listResp => {
            if (listResp) {
              this.dataSource = new MatTableDataSource(listResp);
            }
          })
        }
      })
    } else {
      this.toastr.error(this.translate.instant('Please fill Mandatory fields'))
    }
  }
}