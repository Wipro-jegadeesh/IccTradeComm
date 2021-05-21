import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl,NgForm } from '@angular/forms';
import { IccGroupServices } from './icc-groups-services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'

@Component({
  selector: 'app-icc-groups',
  templateUrl: './icc-groups.component.html',
  styleUrls: ['./icc-groups.component.scss']
})
export class IccGroupsComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['groupCode','groupName', 'groupDescription','action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean
  groupId : any
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(public router: Router, private IccGroupServices: IccGroupServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'groupId' : '1' ,'groupCode' : 'CODE123','groupName' : 'test', 'groupDescription' : 'description of group'}]);

    this.IccGroupServices.getAllGroups().subscribe(listResp => {
      if(listResp){
        this.dataSource = new MatTableDataSource(listResp);
      }
    })
  }

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      groupCode: ['', Validators.required], 
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required]
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
      this.IccGroupServices.submitIccGroups(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          // this.groupsForm.reset();
          this.formDirective.resetForm();
          this.groupId = "";
          this.isEdit = false
          this.IccGroupServices.getAllGroups().subscribe(listResp => {
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
   

        this.IccGroupServices.getParticularGroups(data.groupId).subscribe(resp => { 
          if(resp){
            let respData = resp;
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
