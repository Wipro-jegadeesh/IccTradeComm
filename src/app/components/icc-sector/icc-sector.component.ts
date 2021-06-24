import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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

  displayedColumns: string[] = ['code', 'description', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  id: any
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

    'code': String,
    'description': String
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


  constructor(public translate: TranslateService, public router: Router, private IccRolesServices: IccSectorServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
  }

  ngOnInit(): void {
   this.getList()
    this.buildform()
  }

  getList(){
    // this.dataSource = new MatTableDataSource([{ 'id': '1', 'code': 'sector123', 'description': 'description of sector' }]);
    this.IccRolesServices.getAllRoles().subscribe(listResp => {
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
      code: ['', Validators.required],
      description: ['', Validators.required]
      // buyerName: [''],
      // invoiceDate: [''],
      // invoiceDueDate: ['']
    })
  }

  getSearchList(){
    this.IccRolesServices.search_getAllSector(this.Searchform.value).subscribe(listResp => {
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
    this.getList()
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
      description: ['', Validators.required]
    });

  }

  getEditData(data) {

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

  onSubmitRoleForm() {

    // **** Start Need to hide *****
    //  this.id = "";
    //  this.isEdit = false
    //  this.groupsForm.reset();
    // End Need to hide **********

    // this.IccGroupServices.getParticularGroups(1).subscribe(resp => { })
    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.id = this.id
      }
      console.log(this.id, "this.id")
      console.log(value, "value.id")
      this.IccRolesServices.submitIccRoles(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          this.groupsForm.reset();
          this.id = "";
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
