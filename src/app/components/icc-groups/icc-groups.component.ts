import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { IccGroupServices } from './icc-groups-services';
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
  displayedColumnsload: string[] = ['TopBar',
  ]
  displayedColumnsearch: string[] = [
    'Search',
  ]
  displayedColumnFilter: string[] = [
    'Filter',
  ]
  SearchModel = {
    'groupCode': String, 'groupName': String, 'groupDescription': String,
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
    private fb: FormBuilder, private toastr: ToastrService) {
    this.groupsFormBuild()
  }
  ngOnInit(): void {
    this.getList()
    this.buildform()
  }
  /** Getting the list to display all groups **/
  getList() {
    this.IccGroupServices.getAllGroups().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** Constructing the empty search form ,invoked while performing search**/
  buildform() {
    this.Searchform = this.fb.group({
      'groupCode': [''], 'groupName': [''], 'groupDescription': ['']
    })
  }
  /** To display the list after passing search value **/
  getSearchList() {
    this.IccGroupServices.search_getAllGroups(this.Searchform.value).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** Invoking the search function to get the search list  **/
  searchApi() {
    this.getSearchList()
  }
  /** To reset the searched value and get back the list  **/
  resetApi() {
    this.buildform();
    this.getList()
  }
  /** To Hide the filter field and display the search field ,while event performed on search icon **/
  searchDiv() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  /** To Hide the search field and display the filter field, while event performed on filter icon **/
  filterDiv() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  // Building the empty form, used in Oninit function to initialize the form
  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      groupCode: ['', Validators.required],
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required]
    });
  }
  // Submitting the form and getting all the list after submission
  onSubmitgroupsForm() {
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
  /** retrieving individual record based on id  and patched to the form to display  **/
  getEditData(data) {
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
