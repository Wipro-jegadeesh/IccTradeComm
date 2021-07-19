
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
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

  displayedColumns: Array<string> = ['slab', 'smefin', 'currency', 'fromAmt', 'toAmt', 'noofPersons', 'action'];
  dataSource;
  groupTooltip = StaicDataMaintenance;
  isEdit: boolean
  id: any

  @ViewChild('formDirective') private formDirective: NgForm;

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
    // 'invoiceRef',
    // 'smeId',

    'slab',
    'smefin',
    'currency',
    'fromAmt',
    'toAmt',
    'noofPersons'

    // 'buyerName',
    // 'invoiceDate',
    // 'invoiceDueDate'
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
  Searchform: FormGroup;
  constructor(public translate: TranslateService, public router: Router, private IccAuthorizeServices: IccAuthorizeServices,
    private fb: FormBuilder,private toastr: ToastrService) {
    this.groupsFormBuild()
  }
  ngOnInit(): void {
    this.getList()
    this.buildform()
  }
  /** Getting the list to display all Authrized matrix **/
  getList() {
    this.IccAuthorizeServices.getAllAuthorizeMatrix().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** Constructing the empty search form ,invoked while performing search**/
  buildform() {
    this.Searchform = this.fb.group({
      slab: ['', Validators.required],
      smefin: ['', Validators.required],
      currency: ['', Validators.required],
      fromAmt: ['', Validators.required],
      toAmt: ['', Validators.required],
      noofPersons: ['', Validators.required]
    })
  }
  /** To display the list after passing search value **/
  getSearchList() {
    this.IccAuthorizeServices.search_getAllAuthorizeMatrix(this.Searchform.value).subscribe(listResp => {
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
    this.getList();
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
  // Filtering the datas using fromAmt and toAmt
  getFilteredData() {
    let obj = {
      fromAmt: this.value,
      toAmt: this.highValue
    }
    this.IccAuthorizeServices.getFilteredData(obj).subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** To reset the filter field and get back the list **/
  resetFilteredData() {
    this.value = 0
    this.highValue = 50
    this.getList()
  }

  // Setting all the form values with two decimal values
  public setTwoNumberDecimal($event, name) {
    if (this.chkDecimalLength($event.target.value) >= 2) {
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.groupsForm.patchValue({ [name]: parseFloat($event.target.value).toFixed(2) })
    }
  }
  // Splitting the decimal values  
  chkDecimalLength(value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }
  // Building the empty form, used in Oninit function
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
  /** retrieving individual record based on id  and patched to the form to display  **/
  getEditData(data) {
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
  // Submitting the form and getting all the list after submission
  onSubmitgroupsForm() {
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

