
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { SMEUSERCREATIONCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { SmeUserCreationService } from './sme-user-creation.service'

@Component({
  selector: 'app-sme-user-creation',
  templateUrl: './sme-user-creation.component.html',
  styleUrls: ['./sme-user-creation.component.scss']
})
export class SmeUserCreationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  @HostListener('window:resize', [])
  userTableHeaders: Array<string> = ['userId', 'firstName', 'lastName', 'companyName', 'emailId', 'phoneNumber', 'action'];
  userLists;
  isOpen = ""
  modalRef: BsModalRef;
  color: ThemePalette = 'warn';
  userCreationToolTip = SMEUSERCREATIONCONSTANTS;
  moment: any = moment;
  isHover: boolean = false;
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
    'invoiceRef',
    'invoiceDate',
    'invoiceDueDate'

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
  constructor(public router: Router, private smeUserCreationService: SmeUserCreationService) {

  }
  ngOnInit() {
    this.getSMEUserList()
  }
  //get sme user list
  getSMEUserList() {
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    this.smeUserCreationService.getIccRelaterUsers(userCred.companyId).subscribe(resp => {
      this.userLists = new MatTableDataSource(resp);
      this.userLists.paginator = this.paginator
    })
  }  //function to show/hide a  search section
  onEnableSearch() {
    if (this.filterDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  //function to show/hide a filter section
  onEnableFilter() {
    if (this.searchDivOpen === true) {
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    } else {
      this.filterDivOpen = !this.filterDivOpen
    }
  }
  //Add user function 
  addSmeUser() {
    this.router.navigateByUrl('/sme-user-details/');
  }
  //SME user details page navigation function(Edit/view)
  navigateUserDetails(id) {
    this.router.navigateByUrl('/sme-user-details/' + id);
  }
}