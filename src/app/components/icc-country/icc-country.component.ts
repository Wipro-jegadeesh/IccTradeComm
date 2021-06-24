import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { IccCountryServices } from './icc-country.services';
import { DatePipe } from '@angular/common';
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

  displayedColumns: string[] = ['country', 'countrycode2', 'countrycode3', 'numeric', 'action'];
  dataSource;
  countryTooltip = CountryModule;
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

    'country': String,
    'countrycode2': String,
    'countrycode3': String,
    'numeric': String
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


  constructor(public translate: TranslateService, public router: Router, private IccCountryServices: IccCountryServices,
    private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) {
    this.countryFormBuild()
  }

  ngOnInit(): void {
    this.getList()
    this.buildform()
  }

  getList(){
    // this.dataSource = new MatTableDataSource([{ 'id': '1', 'countrycode2': 'CODE123', 'countrycode3': 'CODE123', 'numeric': '676767', 'country': 'test' }]);
    this.IccCountryServices.getAllcountry().subscribe(listResp => {
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

      country: ['', Validators.required],
      countrycode2: ['', Validators.required],
      countrycode3: ['', Validators.required],
      numeric: ['', Validators.required]
      // buyerName: [''],
      // invoiceDate: [''],
      // invoiceDueDate: ['']
    })
  }

  getSearchList(){
    this.IccCountryServices.search_getAllcountry(this.Searchform.value).subscribe(listResp => {
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


  countryFormBuild() {
    this.countryForm = this.fb.group({
      country: ['', Validators.required],
      countrycode2: ['', Validators.required],
      countrycode3: ['', Validators.required],
      numeric: ['', Validators.required]
    });

  }

  onSubmitcountryForm() {

    // **** Start Need to hide *****
    // this.id = "";
    // this.isEdit = false
    // this.countryForm.reset();
    // End Need to hide **********

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

  getEditData(data) {
    // **** Start Need to hide *****
    // this.isEdit = true
    // this.id = 1
    // let respData = {'id' : '1' ,'countrycode' : 'CODE123','country' : 'test', 'countryDescription' : 'description of country'}
    // this.countryForm.patchValue({  
    //   countrycode : respData.countrycode,
    //   country : respData.country,
    //   countryDescription : respData.countryDescription
    // })
    // **** End Need to hide  *****
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

