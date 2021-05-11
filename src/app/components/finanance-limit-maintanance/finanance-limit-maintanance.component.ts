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
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';

@Component({
  selector: 'app-finanance-limit-maintanance',
  templateUrl: './finanance-limit-maintanance.component.html',
  styleUrls: ['./finanance-limit-maintanance.component.scss']
})
export class FinananceLimitMaintananceComponent implements OnInit {
  limitMaintanceForm: FormGroup;
  countrylimitMaintanceForm: FormGroup;
  displayedColumns: string[] = ['Exposure', 'Modified', 'Available Exposure', 'Created'];
  dataSource: any;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean;
  isOk: boolean;
  groupId: any;
  enableReadonly = true
  invoiceForm: FormGroup;
  dataSourceTwo = new MatTableDataSource(); //data
  displayedColumnsTwo: string[] = [
    'sme',
    'country',
    'utilizedAmt',
    'balAmt'
  ];
  dataSourceThree = new MatTableDataSource(); //data
  displayedColumnsThree: string[] = [
    'country',
    'utzAmt',
    'avlAmt'
  ];
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  overAllLimit;
  smeoverAllLimit;
  countryoverLimitval;
  countrysmeoverAllLimitVal;
  cntryoverAllLimit;
  cntrysmeoverAllLimit
  totalExposure:number=0;
  countrytotalExposure:number=0;
  constructor(public router: Router,
    private fb: FormBuilder, private apiService: ApiService, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
    this.countrylimitMaintanceFormBuild()
  }
  ngOnInit(): void {
    this.overAllLimit = this.limitMaintanceForm.value.overAllLimit;
    this.smeoverAllLimit = this.limitMaintanceForm.value.smeoverAllLimit;
    this.countryoverLimitval = this.countrylimitMaintanceForm.value.countryoverAllLimit
    this.countrysmeoverAllLimitVal = this.countrylimitMaintanceForm.value.countrysmeoverAllLimit


    this.limitMaintance();
    this.countrylimitMaintance();
  }
  limitMaintance() {
    this.totalExposure=0;
    let limitMaintance = [{
      sme: "SME1",
      country: 'SINGAPORE',
      utilizedAmt: 20000,
    }, {
      sme: "SME2",
      country: 'SINGAPORE',
      utilizedAmt: 40000,
    }, {
      sme: "SME3",
      country: 'SINGAPORE',
      utilizedAmt: 4000,
    },
    {
      sme: "SME3",
      country: 'SINGAPORE',
      utilizedAmt: 300,
    }]
    limitMaintance.forEach(element => {
      if(element){
      this.totalExposure += element.utilizedAmt
      element['balanceAmt'] = this.smeoverAllLimit-element.utilizedAmt
      }
      });
      let totalCalculation ={
      sme: "",
      country:'Total Exposure',
      utilizedAmt: this.totalExposure,
      balanceAmt:this.overAllLimit -this.totalExposure
      }
      limitMaintance.push(totalCalculation);
    this.dataSourceTwo = new MatTableDataSource(limitMaintance);
  }
  countrylimitMaintance() {
    this.countrytotalExposure=0;
    let countrylimitMaintance = [{
      country: 'SINGAPORE',
      utzAmt: 20000,
      // balanceAmt: 48000,
    }, {
      country: 'SINGAPORE',
      utzAmt: 40000,
      // avlAmt: 48000,
    }, {
      country: 'SINGAPORE',
      utzAmt: 4000,
      // avlAmt: 48000,
    },
    {
      country: 'SINGAPORE',
      utzAmt: 300,
      // avlAmt: 48000,
    }]
    countrylimitMaintance.forEach(element => {
      if(element){
      this.countrytotalExposure += element.utzAmt
      element['avlAmt'] = this.countryoverLimitval-element.utzAmt
      }
      });
      let totalCalculation ={
      sme: "",
      country:'Total Exposure',
      utzAmt: this.totalExposure,
      avlAmt:this.countryoverLimitval -this.countrytotalExposure
      }
      countrylimitMaintance.push(totalCalculation);
      this.dataSourceThree = new MatTableDataSource(countrylimitMaintance);
  }
  changesmelimit(event, type) {
    console.log(event, "event");
    if (type == 'overAllLimit') {
      this.overAllLimit = event.target.value
      this.limitMaintance()
    }
    else if (type == 'smeoverAllLimit') {
      this.smeoverAllLimit = event.target.value
      this.limitMaintance()
    }
  }
  changecountrylimit(event, type) {
    console.log(event, "event");
    if (type == 'overAllLimit') {
      this.countryoverLimitval= event.target.value
      this.countrylimitMaintance()
    }
    else if (type == 'countryoverAllLimit') {
      this.countrysmeoverAllLimitVal = event.target.value
      this.countrylimitMaintance()
    }
  }
  
  
  groupsFormBuild() {
    this.limitMaintanceForm = this.fb.group({
      overAllLimit: ['500000', Validators.required],
      smeoverAllLimit: ['400000', Validators.required],
      ccy: ['SGD', Validators.required]
    });

  }
  countrylimitMaintanceFormBuild() {
    this.countrylimitMaintanceForm = this.fb.group({
      countryoverAllLimit: ['300000', Validators.required],
      countrysmeoverAllLimit: ['100000', Validators.required],
      countryccy: ['SGD', Validators.required]
    });
  }
  clickedit() {
    this.enableReadonly = true;
    this.isEdit = true;
    this.isOk = true;
  }
  onSubmitLimitForm() {
    this.isOk = false;
    if (this.limitMaintanceForm.value && this.limitMaintanceForm.status == "VALID") {
      var ddatae = new Date();
      let value = this.limitMaintanceForm.value;
      value.created = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
      // value.modified = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
      console.log(value, "this.limitMaintanceForm.value");
      let array = []
      array.push(value)
      this.dataSource = new MatTableDataSource(array);
    } else {
      this.isOk = true;
      this.toastr.error("Please Fill Mandatory fields")
    }
  }
  clickadd() {
    this.enableReadonly = false
    var ddatae = new Date();
    let value = this.limitMaintanceForm.value;
    value.created = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
    value.modified = this.datePipe.transform(ddatae.setDate(ddatae.getDate()))
    console.log(value, "this.limitMaintanceForm.value");
    let array = []
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