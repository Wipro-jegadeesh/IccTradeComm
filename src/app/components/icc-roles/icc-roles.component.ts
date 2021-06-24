import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Validators, FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { IccRolesServices } from './icc-roles-services';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';

import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-icc-roles',
  templateUrl: './icc-roles.component.html',
  styleUrls: ['./icc-roles.component.scss']
})
export class IccRolesComponent implements OnInit {
  groupsForm: FormGroup;

  displayedColumns: string[] = ['code', 'roleDescription', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  roleId: any
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
    'code': String,
    'roleDescription': String,
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

  constructor(public translate: TranslateService, public router: Router, private IccRolesServices: IccRolesServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
  }

  ngOnInit(): void {
    this.getList()
    this.buildform()
  }

  getList(){
    // this.dataSource = new MatTableDataSource([{ 'roleId': '1', 'code': 'CODE123', 'roleDescription': 'description of role' }]);
    this.IccRolesServices.getAllRoles().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  buildform() {
    this.Searchform = this.fb.group({
      code: [''],
      roleDescription: [''],
      // buyerName: [''],
      // invoiceDate: [''],
      // invoiceDueDate: ['']
    })
  }

  getSearchList(){
    this.IccRolesServices.search_getAllRoles(this.Searchform.value).subscribe(listResp => {
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


  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      code: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });

  }

  getEditData(data) {

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.roleId = 1
    // let respData = {'roleId' : '1','code' : 'CODE123','roleDescription' : 'description of role'}
    // this.groupsForm.patchValue({  
    //   code : respData.code,
    //   roleDescription : respData.roleDescription
    // })
    // **** End Need to hide  *****

    this.IccRolesServices.getParticularRoles(data.roleId).subscribe(resp => {
      if (resp) {
        let respData = resp;
        this.groupsForm.patchValue({
          code: respData.code,
          roleDescription: respData.roleDescription
        })
        this.isEdit = true
        this.roleId = respData.roleId

      }
    })
  }

  onSubmitRoleForm() {

    // **** Start Need to hide *****
    //  this.roleId = "";
    //  this.isEdit = false
    //  this.groupsForm.reset();
    // End Need to hide **********

    // this.IccGroupServices.getParticularGroups(1).subscribe(resp => { })
    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.roleId = this.roleId
      }
      this.IccRolesServices.submitIccRoles(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          // this.groupsForm.reset();
          this.formDirective.resetForm();
          this.roleId = "";
          this.isEdit = false
          this.IccRolesServices.getAllRoles().subscribe(listResp => {
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
