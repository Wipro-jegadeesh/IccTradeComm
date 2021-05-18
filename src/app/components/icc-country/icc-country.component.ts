import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl,NgForm } from '@angular/forms';
import { IccCountryServices } from './icc-country.services';
import { DatePipe } from '@angular/common';
// import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { StaicDataMaintenance } from '../../shared/constants/constants'


@Component({
  selector: 'app-icc-country',
  templateUrl: './icc-country.component.html',
  styleUrls: ['./icc-country.component.scss']
})
export class IccCountryComponent implements OnInit {
  countryForm: FormGroup;

  displayedColumns: string[] = ['countrycode','country','action'];
  dataSource;
  countryTooltip = StaicDataMaintenance;
  isEdit : boolean
  id : any
  @ViewChild('formDirective') private formDirective: NgForm;


  constructor(public router: Router, private IccCountryServices: IccCountryServices, 
     private fb: FormBuilder,private datePipe: DatePipe,private toastr: ToastrService) { 
       this.countryFormBuild()
     }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource([{'id' : '1' ,'countrycode' : 'CODE123','country' : 'test'}]);

    this.IccCountryServices.getAllcountry().subscribe(listResp => {
      if(listResp){
        this.dataSource = new MatTableDataSource(listResp);
      }
    })
  }

  countryFormBuild() {
    this.countryForm = this.fb.group({
      countrycode: ['', Validators.required], 
      country: ['', Validators.required],
    });

  }

  onSubmitcountryForm(){

    // **** Start Need to hide *****
    // this.id = "";
    // this.isEdit = false
    // this.countryForm.reset();
    // End Need to hide **********

    if(this.countryForm.value && this.countryForm.status == "VALID"){
      let value = this.countryForm.value
      if(this.isEdit){
        value.id = this.id
      }
      this.IccCountryServices.submitIcccountry(value).subscribe(resp => {
        if(resp){
          this.toastr.success("Saved Successfully")
          // this.countryForm.reset();
          this.formDirective.resetForm();
           this.id = "";
          this.isEdit = false
          this.IccCountryServices.getAllcountry().subscribe(listResp => {
            if(listResp){
              this.dataSource = new MatTableDataSource(listResp);
            }
          })
        }
      })
    }else{
      this.toastr.error("Mandatory fields are missing")
    }
  }

  getEditData(data){

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
          if(resp){
            let respData = resp;
            this.countryForm.patchValue({  
              countrycode : respData.countrycode,
              country : respData.country,
            })
            this.isEdit = true
            this.id = respData.id

          }

        })
 
}


}

