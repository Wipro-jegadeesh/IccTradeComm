import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { IccCountryServices } from './icc-country.services';
import { ToastrService } from 'ngx-toastr';
import { CountryModule } from '../../shared/constants/constants'
import { TranslateService } from '@ngx-translate/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-icc-country',
  templateUrl: './icc-country.component.html',
  styleUrls: ['./icc-country.component.scss']
})
export class IccCountryComponent implements OnInit {
  countryForm: FormGroup;
  displayedColumns: Array<string> = ['country', 'countrycode2', 'countrycode3', 'numeric', 'action'];
  dataSource;
  countryTooltip = CountryModule;
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
    'country',
    'countrycode2',
    'countrycode3',
    'numeric'
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
  constructor(public translate: TranslateService, public router: Router, private IccCountryServices: IccCountryServices,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.countryFormBuild()
  }
  ngOnInit(): void {
    this.getList()
    this.buildform()
  }
  /** Getting the list to display all country list **/
  getList() {
    this.IccCountryServices.getAllcountry().subscribe(listResp => {
      if (listResp) {
        this.dataSource = new MatTableDataSource(listResp);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  /** Constructing the empty search form ,invoked while performing search **/
  buildform() {
    this.Searchform = this.fb.group({
      country: ['', Validators.required],
      countrycode2: ['', Validators.required],
      countrycode3: ['', Validators.required],
      numeric: ['', Validators.required]
    })
  }
  /** To display the list after passing search value **/
  getSearchList() {
    this.IccCountryServices.search_getAllcountry(this.Searchform.value).subscribe(listResp => {
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
  /** Constructing the empty country form **/
  countryFormBuild() {
    this.countryForm = this.fb.group({
      country: ['', Validators.required],
      countrycode2: ['', Validators.required],
      countrycode3: ['', Validators.required],
      numeric: ['', Validators.required]
    });

  }
  /** Submitting the form and getting all the list after submission  **/
  onSubmitcountryForm() {
    if (this.countryForm.value && this.countryForm.status == "VALID") {
      let value = this.countryForm.value
      if (this.isEdit) {
        value.id = this.id
      }
      this.IccCountryServices.submitIcccountry(value).subscribe(resp => {
        if (resp) {
          this.toastr.success(this.translate.instant('Saved Successfully'))
          // this.countryForm.reset();
          this.formDirective.resetForm();
          this.id = "";
          this.isEdit = false
          this.IccCountryServices.getAllcountry().subscribe(listResp => {
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
    this.IccCountryServices.getParticularcountry(data.id).subscribe(resp => {
      if (resp) {
        let respData = resp;
        this.countryForm.patchValue({
          countrycode2: respData.countrycode2,
          countrycode3: respData.countrycode3,
          numeric: respData.numeric,
          country: respData.country,
        })
        this.isEdit = true
        this.id = respData.id
      }
    })
  }
}

