import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceRequestServices } from '../invoice-request/invoice-service';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IccCountryServices } from '../icc-country/icc-country.services'
import { TranslateService } from '@ngx-translate/core';


export interface invoiceData {
  invref: any;
  invDueDate: any;
  invId: any;
  id: String;
  RefNo: String;
  invoiceId: String;
  invoiceDate: String;
  buyerName: String;
  InvoiceAmount: String;

}
const INVOICE_ARRAY: invoiceData[] = [];

@Component({
  selector: 'app-invoice-repository',
  templateUrl: './invoice-repository.component.html',
  styleUrls: ['./invoice-repository.component.scss']
})

export class InvoiceRepositoryComponent implements OnInit {
  invoiceForm: FormGroup;
  tcode: string;
  invoiceID: any;
  currencyName: any;
  InvoiceFdate: any
  moment: any = moment;
  invoicedata: invoiceData = {
    RefNo: "",
    id: "",
    invId: "",
    invoiceId: "",
    invoiceDate: "",
    buyerName: "",
    InvoiceAmount: "",
    invDueDate: "",
    invref: ""
  };

  dataSourceTwo = new MatTableDataSource(); //data
  displayedColumnsTwo: string[] = [
    'goodsId',
    'DescGoods',
    'Quantity',
    'Rate',
    'Amt',
    'Ccy',
    'DiscAmt',
    'NetAmtPay',
    'TaxRate',
    'TaxAmount',
    'Total',
    'status'
  ];


  dataSource
  tooltipPosition = "below";

  displayedColumns: string[] = ['InvoiceRefNo', 'DateTime', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount', 'Ccy', 'Score', 'Status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userDeatils: any;
  isDisabled: boolean;
  currencyAMT: string;
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  type: any
  FileData:any;
  constructor(private activatedRoute: ActivatedRoute, public translate: TranslateService, private IccCountryServices: IccCountryServices, public router: Router, private authenticationService: AuthenticationService,
    private invoiceRequestServices: InvoiceRequestServices, private fb: FormBuilder,
    private toastr: ToastrService
  ){
    this.FileData = this.router.getCurrentNavigation().extras.state;
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit() {
    this.isDisabled = this.type === 'repository' ? true : this.type === 'manual' ? false : false
    this.userDeatils = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : { role: 'Authorise' }
    if(this.FileData && this.FileData.FileData.queryParams.type === 'updateRepo'){
      this.invoiceFormpatch()
    }
    // this.getInvDetailsLists()
  }
  invoiceFormBuild() {
    this.invoiceForm = this.fb.group({
      invId: [''],
      billNo: [''],
      buyerName: [''],
      invFromDate: [''],
      invToDate:['']
    })
  }
  invoiceFormpatch(){
    this.invoiceForm.patchValue({
      invId: ['4500'],
      billNo: ['400'],
      buyerName: ['apple'],
      invFromDate: [''],
      invToDate:['']
    })
    this.SearchInovice()
  }
  getInvDetailsLists() {
    this.invoiceRequestServices.getInvDetailsLists().subscribe(resp => {
      const INVOICE_ARRAY: invoiceData[] = resp
      this.dataSource = new MatTableDataSource(INVOICE_ARRAY);
    }, error => {
    })
    this.dataSource = new MatTableDataSource([{
      invref: "Singapore",
      buyerName: "Tata Steel",
      dispDate: "2020-06-02",
      id: 2,
      invAmt: "10000",
      invCcy: "SGD",
      invDate: "2020-06-02",
      invDueDate: "2020-06-02",
      invId: "INV102",
      smeId: "SME101",
      status: "A"
    }]);
  }
  SearchInovice() {
    console.log(this.invoiceForm.value,"this.invoiceForm")
    this.getInvDetailsLists()
  }
  navigateToSmeDetails(datas) {
    let path = '/invoice-request/repository'
    datas = {
      billNo: "IVAPPLE30062021",
      invAmt: "3500",
      smeId: localStorage.getItem("userId"),
      invCcy: "SGD",
      invDueDate: moment('2020-08-05', 'YYYY - MM - DD HH: mm').toDate(),
      invDate: moment('2020-06-02', 'YYYY - MM - DD HH: mm').toDate(),
      dispDate: moment('2020-09-09', 'YYYY - MM - DD HH: mm').toDate(),
      email: "APPle@mail.com",
      buyerName: "APPLE",
      phoneNo: "987654321",
      buyerUEN: "IVAPPLE",
      buyerAddr: "BEL",
      addressLine1: "32 victory",
      addressLine2: "london",
      city: "london",
      postalCode: "34567",
      companyName: "MacBook APPLE"
    }
    let data: NavigationExtras = {
      queryParams: {
        "invoicedata": datas,
        "Type": "updateRepo",
        "searchfield":this.invoiceForm.value
      }
    }
    this.router.navigate([path], { state: { FileData: data } });
  }

  selection = new SelectionModel(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selection.selected.forEach(s => console.log(s.name));
  }
  authoriseInvoice() {
    let invoiceIds = []
    let scoreCheck = false

    for (let i = 0; i < this.selection.selected.length; i++) {
      if (this.selection.selected[i].buyerScore >= 500) {
        invoiceIds.push(this.selection.selected[i].id)
        scoreCheck = true
      }
      else {
        scoreCheck = false
        break;
      }
    }
    if (scoreCheck) {
      if (invoiceIds.length > 0) {
        this.updateInvoice(invoiceIds)
      } else {
        return this.toastr.error(this.translate.instant('Please select invoice details'));
      }
    }
    else {
      this.selection.selected.length ? this.toastr.error('Your score is less to authorize') : this.toastr.error(this.translate.instant('Please select invoice details'))
    }
    console.log("invoiceIds", invoiceIds);
  }
  updateInvoice(invoiceIds) {
    this.toastr.success(this.translate.instant('Selected Invoices has been Authorized'));
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
      this.dataSourceTwo.data = []
    }, error => {
    })

    let reqParams = []
    this.dataSource.data.map((item) => {
      if (invoiceIds.includes(item.id)) {
        console.log(item, 'tem');
        let obj = {
          "invoiceId": item.id,
          "invoiceNo": item.invId,
          "invoiceRef": item.invref,
          "invoiceDate": item['invDate'],
          "smeId": item['smeId'],
          "invoiceAmt": item['invAmt'],
          "invoiceCcy": item['invCcy'],
          "status": "APR",
          "buyerName": item.buyerName,
          "buyerUEN": item['buyerUEN'],
          "dispDate": item['dispDate'],
          "invDueDate": item.invDueDate,
          "smeProfileId": this.userDeatils['smeProfileId'],
          "smeName": this.userDeatils['companyName'],
          "email": item['email'],
          "phoneNo": item['phoneNo'],
          "addressLine1": item['addressLine1'],
          "addressLine2": item['addressLine2'],
          "city": item['city'],
          "postalCode": item['postalCode'],
          "companyName": item['companyName'],
          "buyerScore": item['buyerScore']
        }
        reqParams.push(obj)
      }
    })
    this.invoiceRequestServices.updateInvoiceDetails(reqParams).subscribe(resp => {
      this.getInvDetailsLists();
    })
  }


}

