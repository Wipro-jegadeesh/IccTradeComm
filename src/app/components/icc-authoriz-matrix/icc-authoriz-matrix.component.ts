
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { IccAuthorizeServices } from './icc-authorize-services';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-icc-authoriz-matrix',
  templateUrl: './icc-authoriz-matrix.component.html',
  styleUrls: ['./icc-authoriz-matrix.component.scss']
})
export class IccAuthorizMatrixComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['slab', 'smefin', 'currency', 'fromAmt', 'toAmt', 'noofPersons', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  id: any

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(public translate: TranslateService, public router: Router, private IccAuthorizeServices: IccAuthorizeServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([{ 'id': '1', 'slab': '1', 'smefin': 'sme123', 'currency': '212', 'fromAmt': '20', 'toAmt': '100', 'noofPersons': 2 }]);
    this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
      }
    })
  }

  public setTwoNumberDecimal($event, name) {
    if (this.chkDecimalLength($event.target.value) >= 2) {
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.groupsForm.patchValue({ [name]: parseFloat($event.target.value).toFixed(2) })
    }
  }

  chkDecimalLength(value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
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
  getEditData(data) {

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
      if (resp) {
        let respData = resp;
        this.groupsForm.patchValue({
          slab: respData.slab,
          smefin: respData.smefin,
          currency: respData.currency,
          fromAmt: respData.fromAmt,
          toAmt: respData.toAmt,
          noofPersons: respData.noofPersons,
        })
        this.isEdit = true
        this.id = respData.id

      }
    })

  }

  onSubmitgroupsForm() {

    // **** Start Need to hide *****
    //  this.id = "";
    //  this.isEdit = false
    //  this.groupsForm.reset();
    // End Need to hide **********

    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.id = this.id
      }
      this.IccAuthorizeServices.submitIccAuthorizeMatrix(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          // this.groupsForm.reset();
          this.formDirective.resetForm();
          this.id = "";
          this.isEdit = false
          this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
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

