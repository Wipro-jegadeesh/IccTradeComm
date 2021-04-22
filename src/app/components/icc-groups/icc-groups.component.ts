import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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

  displayedColumns: string[] = ['groupCode','groupName', 'groupDescription'];
  dataSource;
  groupTooltip = StaicDataMaintenance;


  constructor(public router: Router, private IccGroupServices: IccGroupServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'groupCode' : 'CODE123','groupName' : 'test', 'groupDescription' : 'description of group'}]);

  }

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      groupCode: ['', Validators.required], 
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required]
    });

  }

  onSubmitgroupsForm(){
    // this.IccGroupServices.getParticularGroups(1).subscribe(resp => { })
    if(this.groupsForm.value && this.groupsForm.status == "VALID"){
      let value = this.groupsForm.value
      this.IccGroupServices.submitIccGroups(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          this.groupsForm.reset();
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
}
