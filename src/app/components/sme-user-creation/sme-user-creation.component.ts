
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDialogService } from '../../service/modal-dialog.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { Options,LabelType } from '@angular-slider/ngx-slider';
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
  @HostListener('window:resize', ['$event'])
  displayedColumns: string[] = ['userId','firstName', 'lastName', 'companyName', 'emailId', 'phoneNumber', 'action'];
  dataSource;
  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  color: ThemePalette = 'warn';
  ischecked = "true"
  bidpanelOpenState = false;
  biddingTooltip = BIDDINGCONSTANTS;
  moment: any = moment;
  isHover: boolean = false;
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
    'invoiceRef': String,
    'invoiceDate': String,
    'invoiceDueDate': String

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
constructor(public router: Router, private modalService: BsModalService, private modalDialogService: ModalDialogService,
      private authenticationService: AuthenticationService
      , private smeUserCreationService: SmeUserCreationService
      ) { }


  ngOnInit() {
    // this.dataSource = new MatTableDataSource([{'userId':1,
    // 'firstName':"11",
    // 'lastName':"980",
    // 'companyName':"lkjlk",
    // 'emailId':"jklk",
    // 'phoneNumber':"ipoip"
    // }])
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
          // let respArr=[]
          
        let userCred=JSON.parse(localStorage.getItem('userCred'))
    this.smeUserCreationService.getIccRelaterUsers(userCred.companyId).subscribe(resp => {
      // resp.map((item)=>{
      //   if(userCred.companyName == item.companyname){
      //   respArr.push(item)
      //   }
      // })
      // console.log(respArr,"respArr")
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator
    })
  }
 
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  searchApi(){
    // this.IccUserCreationsService.searchFinanceFunded(this.SearchModel).subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator
    // })
  }
  resetApi(){
    this.SearchModel={
      'invoiceRef': String,
      'invoiceDate': String,
      'invoiceDueDate': String

    };
    // this.IccUserCreationsService.getAllFundingList().subscribe(resp => {
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.paginator = this.paginator

    // })
  }
  searchDiv(){
    if(this.filterDivOpen === true){
    this.searchDivOpen = !this.searchDivOpen
    this.filterDivOpen = !this.filterDivOpen
    }else{
      this.searchDivOpen = !this.searchDivOpen
    }
  }
  filterDiv(){
    if(this.searchDivOpen === true){
      this.searchDivOpen = !this.searchDivOpen
      this.filterDivOpen = !this.filterDivOpen
    }else{
      this.filterDivOpen = !this.filterDivOpen
    }
  }

  public scrollRight(): void {
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: 'smooth',
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
  }

  openModal(event, template, data) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });


  }

  handleToggle(e, status) {
    this.modalDialogService.confirm("Confirm Delete", "Do you really want to change the status ?", "Ok", "Cancel").subscribe(result => {
    })

  }
  userClick() {
    this.router.navigateByUrl('/sme-user-details/');
  }
  navigateUserDetails(id) {
    this.router.navigateByUrl('/sme-user-details/'+id);
  }
  logout() {
    this.authenticationService.logout()
  }
}




