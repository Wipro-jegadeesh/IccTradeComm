import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IccSectorServices } from './icc-sector-services';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-icc-sector',
  templateUrl: './icc-sector.component.html',
  styleUrls: ['./icc-sector.component.scss']
})
export class IccSectorComponent implements OnInit {
  groupsForm: FormGroup;
  displayedColumns: Array<string> = ['code', 'description', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  id: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumnsload: Array<string> = [
    'TopBar',
  ]
  displayedColumnsearch: Array<string> = [
    'Search',
  ]
  displayedColumnFilter: Array<string> = [
    'Filter',
  ]
  SearchModel = {
    'codes',
    'description'
  }
  value = 0;
  highValue = 50;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value, label: LabelType) => {
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
  searchForm: FormGroup;
  constructor(public translate: TranslateService, public router: Router, private iccSectorServices: IccSectorServices,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.groupsFormBuild()
  }
  ngOnInit(): void {//Initially works after constructor
    this.getList()
    this.buildForm()
  }
  getList() { //Get sector total list from api call
    this.iccSectorServices.getAllRoles().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  buildForm() { //Set Search form basic fields
    this.searchForm = this.fb.group({
      codes: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  getSearchList() { //Get Searched data from api 
    this.iccSectorServices.search_getAllSector(this.searchForm.value).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  searchApi() {//This func is called from html when search button click
    this.getSearchList()
  }
  resetApi() {// reset Searched data and get All list
    this.buildForm();
    this.getList()
  }
  searchDiv() { // hide and show "search input fields"
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv() {//hide and show "filter input fields"
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  groupsFormBuild() { // used for assigning form to add data
    this.groupsForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getEditData(data) { //To get Particular data to prepopulate in form for Edit func
    this.iccSectorServices.getParticularRoles(data.id).subscribe(resp => {
      if (resp) {
        let respData = resp;
        this.groupsForm.patchValue({
          code: respData.code,
          description: respData.description
        })
        this.isEdit = true
        this.id = respData.id
      }
    })
  }

  onSubmitRoleForm() {  // To submit form for add and update flow
    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.id = this.id
      }
      this.iccSectorServices.submitIccRoles(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.groupsForm.reset();
          this.id = "";
          this.isEdit = false
          this.iccSectorServices.getAllRoles().subscribe(listResp => {
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
