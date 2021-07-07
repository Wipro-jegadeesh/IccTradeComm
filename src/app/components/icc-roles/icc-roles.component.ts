import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
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
    'roleDescription': String
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
  constructor(public translate: TranslateService, public router: Router, private iccRolesServices: IccRolesServices,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.groupsFormBuild()
  }
  ngOnInit(): void { //Initially this func execute
    this.getList()
    this.buildform()
  }
  getList() { //This function calls initially to get list from api call
    this.iccRolesServices.getAllRoles().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  buildform() { //this function is to build search form group initially
    this.Searchform = this.fb.group({
      code: [''],
      roleDescription: ['']
    })
  }

  getSearchList() { // This func is to get searched data from list api
    this.iccRolesServices.search_getAllRoles(this.Searchform.value).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  searchApi() { //This func is call from html when search button click
    this.getSearchList()
  }
  resetApi() { //This func is call to reset searched data
    this.buildform();
    this.getList();
  }
  searchDiv() { //This func is used for hide and show "search input fields"
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv() { //This func is used for hide and show "filter input fields"
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  groupsFormBuild() { //This func is used for assigning form to add data
    this.groupsForm = this.fb.group({
      code: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });
  }
  getEditData(data) { //To get Particular data to prepopulate in form for Edit func
    this.iccRolesServices.getParticularRoles(data.roleId).subscribe(resp => {
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
  onSubmitRoleForm() { // To submit form for add and update flow
    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.roleId = this.roleId
      }
      this.iccRolesServices.submitIccRoles(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.formDirective.resetForm();
          this.roleId = "";
          this.isEdit = false
          this.iccRolesServices.getAllRoles().subscribe(listResp => {
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
