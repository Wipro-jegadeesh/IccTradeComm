import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { IccGroupServices } from './icc-groups-services';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';

import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-icc-groups',
  templateUrl: './icc-groups.component.html',
  styleUrls: ['./icc-groups.component.scss']
})
export class IccGroupsComponent implements OnInit {
  groupsForm: FormGroup;
  displayedColumns: string[] = ['groupCode', 'groupName', 'groupDescription', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  groupId: any
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

    'groupCode' : String, 'groupName' : String, 'groupDescription': String,
    
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

  constructor(public translate: TranslateService, public router: Router, private IccGroupServices: IccGroupServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.groupsFormBuild()
  }

  ngOnInit(): void {
   this.getList()
    this.buildform()
  }

  getList(){
    // this.dataSource = new MatTableDataSource([{ 'groupId': '1', 'groupCode': 'CODE123', 'groupName': 'test', 'groupDescription': 'description of group' }]);
    this.IccGroupServices.getAllGroups().subscribe(listResp => {
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

      'groupCode': [''], 'groupName': [''], 'groupDescription': ['']
      // buyerName: [''],
      // invoiceDate: [''],
      // invoiceDueDate: ['']
    })
  }

  getSearchList(){
    this.IccGroupServices.search_getAllGroups(this.Searchform.value).subscribe(listResp => {
      if (listResp) { 
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }

  searchApi() {
    // this.AcceptedFinanceServices.searchFinanceFunded(this.Searchform.value).subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator
    // })
    this.getSearchList()
  }
  resetApi() {
    this.buildform();
    // this.getSearchList()
    this.getList()
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
      groupCode: ['', Validators.required],
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required]
    });

  }

  onSubmitgroupsForm() {

    // **** Start Need to hide *****
    // this.groupId = "";
    // this.isEdit = false
    // this.groupsForm.reset();
    // End Need to hide **********

    if (this.groupsForm.value && this.groupsForm.status == "VALID") {
      let value = this.groupsForm.value
      if (this.isEdit) {
        value.groupId = this.groupId
      }
      this.IccGroupServices.submitIccGroups(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          // this.groupsForm.reset();
          this.formDirective.resetForm();
          this.groupId = "";
          this.isEdit = false
          this.IccGroupServices.getAllGroups().subscribe(listResp => {
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

  getEditData(data) {

    // **** Start Need to hide *****
    // this.isEdit = true
    // this.groupId = 1
    // let respData = {'groupId' : '1' ,'groupCode' : 'CODE123','groupName' : 'test', 'groupDescription' : 'description of group'}
    // this.groupsForm.patchValue({  
    //   groupCode : respData.groupCode,
    //   groupName : respData.groupName,
    //   groupDescription : respData.groupDescription
    // })
    // **** End Need to hide  *****
    this.IccGroupServices.getParticularGroups(data.groupId).subscribe(resp => {
      if (resp) {
        let respData = resp;
        this.groupsForm.patchValue({
          groupCode: respData.groupCode,
          groupName: respData.groupName,
          groupDescription: respData.groupDescription
        })
        this.isEdit = true
        this.groupId = respData.groupId
      }
    })
  }

  
}
