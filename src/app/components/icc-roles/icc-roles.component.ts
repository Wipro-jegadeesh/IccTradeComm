// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-icc-roles',
//   templateUrl: './icc-roles.component.html',
//   styleUrls: ['./icc-roles.component.scss']
// })
// export class IccRolesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccRolesServices } from './icc-roles-services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'

@Component({
  selector: 'app-icc-roles',
  templateUrl: './icc-roles.component.html',
  styleUrls: ['./icc-roles.component.scss']
})
export class IccRolesComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['code','roleDescription'];
  dataSource;
  groupTooltip = StaicDataMaintenance;


  constructor(public router: Router, private IccRolesServices: IccRolesServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'code' : 'CODE123','roleDescription' : 'description of role'}]);

  }

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      code: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });

  }

  onSubmitRoleForm(){
    // this.IccGroupServices.getParticularGroups(1).subscribe(resp => { })
    if(this.groupsForm.value && this.groupsForm.status == "VALID"){
      let value = this.groupsForm.value
      this.IccRolesServices.submitIccRoles(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          this.groupsForm.reset();
          this.IccRolesServices.getAllRoles().subscribe(listResp => {
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
