
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { IccAuthorizeServices } from './icc-authorize-services';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';

import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnsload: string[] = [
    'TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  SearchModel = {
    // 'invoiceRef': String,
    // 'smeId': String,

    'slab': String,
    'smefin': String,
    'currency': String,
    'fromAmt': String,
    'toAmt': String,
    'noofPersons': String

    // 'buyerName': String,
    // 'invoiceDate': String,
    // 'invoiceDueDate': String
  }
  value: number = 0;
  highValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min</b> $" + value;
        case LabelType.High:
          return "<b>Max</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  Searchform: FormGroup;

  constructor(public translate: TranslateService, public router: Router, private IccAuthorizeServices: IccAuthorizeServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
  }

  ngOnInit(): void {
   this.getList()
    this.buildform()
  }

  getList(){
    // this.dataSource = new MatTableDataSource([{ 'id': '1', 'slab': '1', 'smefin': 'sme123', 'currency': '212', 'fromAmt': '20', 'toAmt': '100', 'noofPersons': 2 }]);
    this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  buildform() {
    this.Searchform = this.fb.group({
      // invoiceRef: [''],
      // smeId: [''],

      slab: ['', Validators.required],
      smefin: ['', Validators.required],
      currency: ['', Validators.required],
      fromAmt: ['', Validators.required],
      toAmt: ['', Validators.required],
      noofPersons: ['', Validators.required]
      // buyerName: [''],
      // invoiceDate: [''],
      // invoiceDueDate: ['']
    })
  }

  getSearchList(){
    this.IccAuthorizeServices.search_getAllAuthorizeMatrix(this.Searchform.value).subscribe(listResp => {
      if (listResp) { 
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  SearchAPI() {
    // this.AcceptedFinanceServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator
    // })
    this.getSearchList()
  }
  ResetAPI() {
    this.buildform();
    this.getList();
    // this.getSearchList()
    // this.AcceptedFinanceServices.getFinanceForBiddingLists().subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator

    // })
  }
  searchDiv() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }

  getFilteredData(){
    
    let obj = {
      fromAmt : this.value,
      toAmt : this.highValue
    }

    this.IccAuthorizeServices.getFilteredData(obj).subscribe(listResp => {
      if (listResp) { 
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  resetFilteredData(){
    this.value = 0
    this.highValue = 50
    this.getList()
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

