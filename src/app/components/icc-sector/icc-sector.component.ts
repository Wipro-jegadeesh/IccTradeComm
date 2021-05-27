import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccSectorServices } from './icc-sector-services';
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
  selector: 'app-icc-sector',
  templateUrl: './icc-sector.component.html',
  styleUrls: ['./icc-sector.component.scss']
})
export class IccSectorComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['code','description','action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean
  id : any

  constructor(public translate: TranslateService,public router: Router, private IccRolesServices: IccSectorServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'id' : '1','code' : 'sector123','description' : 'description of sector'}]);
    this.IccRolesServices.getAllRoles().subscribe(listResp => {
      if(listResp){
        this.dataSource = new MatTableDataSource(listResp);
      }
    })
  }

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  getEditData(data){

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.id = 1
    // let respData = {'id' : '1','code' : 'CODE123','description' : 'description of role'}
    // this.groupsForm.patchValue({  
    //   code : respData.code,
    //   description : respData.description
    // })
    // **** End Need to hide  *****
   

        this.IccRolesServices.getParticularRoles(data.id).subscribe(resp => { 
          if(resp){
            let respData = resp;
            this.groupsForm.patchValue({  
              code : respData.code,
              description : respData.description
            })
            this.isEdit = true
            this.id = respData.id

          }

        })
 
}

  onSubmitRoleForm(){

     // **** Start Need to hide *****
    //  this.id = "";
    //  this.isEdit = false
    //  this.groupsForm.reset();
     // End Need to hide **********

    // this.IccGroupServices.getParticularGroups(1).subscribe(resp => { })
    if(this.groupsForm.value && this.groupsForm.status == "VALID"){
      let value = this.groupsForm.value
      if(this.isEdit){
        value.id = this.id
      }
      console.log(this.id,"this.id")
      console.log(value,"value.id")
      this.IccRolesServices.submitIccRoles(value).subscribe(resp => {
        if(resp){
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.groupsForm.reset();
          this.id = "";
          this.isEdit = false
          this.IccRolesServices.getAllRoles().subscribe(listResp => {
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

}
