import { Component, OnInit, ElementRef, HostListener, ViewChild,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FinanceRequestServices} from './finance-service'
import {FinanceBiddingService} from '../../service/finance_bidding/finance-bidding.service';
import { FINANCIERDASHBOARDCONSTANTS} from '../../shared/constants/constants';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';

const ELEMENT_DATA: any[] = [
  {
    IccTraComRef: 'INV098765',
    InvId: 'VGRE4567',
    SellerName: 'Midweat Corp',
    BuyerName: 'AramCo',
    SellerRating: '7/10',
    BuyerRating: '9/10',
    InvDate: '01/03/2021',
    InvAmt: '84576 USD'
  }
];


interface ICity {
  // item_id: number;
  // item_text: string;

  id: number;
  itemName: string;
}
 

@Component({
  selector: 'app-finance-bidding',
  templateUrl: './finance-bidding.component.html',
  styleUrls: ['./finance-bidding.component.scss']
})
export class FinanceBiddingComponent implements OnInit {
  @Input() InvoiceDetailsComponent: InvoiceDetailsComponent;
  ELEMENT_DATA1: any[] ;

  
  constructor(public router: Router, public authenticationService:AuthenticationService,
    private modalService: BsModalService,private FinanceRequestServices : FinanceRequestServices,private FinanceBiddingService:FinanceBiddingService) { }

  dataSource ;//data
  displayedColumns: string[] = [
    // 'billNo',
    'invId',
    // 'invoiceId',
    'invoiceAmt',
    'smeId',
    'buyerName',
    'invDate',
    'action'
    // 'invAmt'
    // 'SellerRating',
    // 'BuyerRating',
    // 'InvDate',
    // 'InvAmt'
  ];

  // displayedColumns: string[] = ['refNo', 'invoiceId', 'invoiceAmt','invDate','invDueDate', 'buyer', 'financiercount'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  modalRef: BsModalRef;
  isHover: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cities: Array<ICity> = [];
  dropdownSettings = {
    singleSelection: true,
    defaultOpen: false,
    idField: "item_id",
    textField: "item_text",
    allowSearchFilter: true,
    text: 'Country',
  };


  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    this.FinanceBiddingService.getInvoiceDetails().subscribe(resp => {
      
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator

     
    })

    this.cities = [
      // { item_id: 1, item_text: "India" },
      // { item_id: 2, item_text: "Australia" },
      // { item_id: 3, item_text: "America" },
      // { item_id: 4, item_text: "Singapore" }


      { id: 1, itemName: "India" },
      { id: 2, itemName: "Australia" },
      { id: 3, itemName: "America" },
      { id: 4, itemName: "Singapore" }

    ];

    

  }
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  bidpanelOpenState = false;
  id = ""


  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  dashboardTooltip=FINANCIERDASHBOARDCONSTANTS;
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
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

  isOpenHandle(isTrue){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    }
    navigateFinanceBidding(){
      this.router.navigateByUrl('/finance-bidding');
  }
  logout(){
  this.authenticationService.logout()
  }
  goHome(){
    this.router.navigateByUrl('/financier-dashboard');
  }

  navigateInvoiceDetails(id){
    this.router.navigateByUrl('/finance-bidding/'+id);
  }
  openModal(event, template,id) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.id = id
  }

}
