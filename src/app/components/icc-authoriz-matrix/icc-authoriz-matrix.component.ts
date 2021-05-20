// import { Component, OnInit } from '@angular/core';

// @Component({
  // selector: 'app-icc-authoriz-matrix',
  // templateUrl: './icc-authoriz-matrix.component.html',
  // styleUrls: ['./icc-authoriz-matrix.component.scss']
// })
// export class IccAuthorizMatrixComponent implements OnInit {

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
import { Validators, FormGroup, FormBuilder, FormArray, FormControl,NgForm } from '@angular/forms';
import { IccAuthorizeServices } from './icc-authorize-services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'

@Component({
  selector: 'app-icc-authoriz-matrix',
  templateUrl: './icc-authoriz-matrix.component.html',
  styleUrls: ['./icc-authoriz-matrix.component.scss']
})
export class IccAuthorizMatrixComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['slab','smefin','currency','fromAmt','toAmt','noofPersons','action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit : boolean
  id : any

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(public router: Router, private IccAuthorizeServices: IccAuthorizeServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.groupsFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'id' : '1','slab' : '1','smefin' : 'sme123','currency' : '212', 'fromAmt' : '20','toAmt' : '100','noofPersons' : 2}]);
    this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
      if(listResp){
        this.dataSource = new MatTableDataSource(listResp);
      }
    })
  }

  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      slab: ['', Validators.required],
      smefin: ['', Validators.required],
      currency: ['', Validators.required],
      fromAmt: ['', Validators.required],
      toAmt: ['', Validators.required],
      noofPersons: ['', Validators.required]
    });

  }

  
  getEditData(data){

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.id = 1
    // let respData = {'id' : '1','slab' : '1','smefin' : 'sme123','currency' : '212', 'fromAmt' : '20','toAmt' : '100','noofPersons' : 2}
    // this.groupsForm.patchValue({  
    //   slab : respData.slab,
    //   smefin : respData.smefin,
    //   currency : respData.currency,
    //   fromAmt : respData.fromAmt,
    //   toAmt : respData.toAmt,
    //   noofPersons : respData.noofPersons,
    // })
    // **** End Need to hide  *****
   
        this.IccAuthorizeServices.getParticularAuthorizeMatrix(data.id).subscribe(resp => { 
          if(resp){
            let respData = resp;
            this.groupsForm.patchValue({
              slab : respData.slab,
              smefin : respData.smefin,
              currency : respData.currency,
              fromAmt : respData.fromAmt,
              toAmt : respData.toAmt,
              noofPersons : respData.noofPersons,
            })
            this.isEdit = true
            this.id = respData.id

          }

        })
 
}

  onSubmitgroupsForm(){

     // **** Start Need to hide *****
    //  this.id = "";
    //  this.isEdit = false
    //  this.groupsForm.reset();
     // End Need to hide **********

    if(this.groupsForm.value && this.groupsForm.status == "VALID"){
      let value = this.groupsForm.value
      if(this.isEdit){
        value.id = this.id
      }
      this.IccAuthorizeServices.submitIccAuthorizeMatrix(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          // this.groupsForm.reset();
          this.formDirective.resetForm();
          this.id = "";
          this.isEdit = false
          this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
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

