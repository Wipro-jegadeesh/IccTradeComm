import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceRequestServices } from './invoice-service';
import { DatePipe } from '@angular/common';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { COUNTRYNAMES } from '../../shared/constants/Country';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IccCountryServices } from '../icc-country/icc-country.services'
import {TranslateService} from '@ngx-translate/core';
// import { MatInput } from '@angular/material/input';

const ELEMENT_DATA: any[] = [
  {
    Name: 'INV64320',
    Position: 'ISBGF5643',
    DateOfInvoice: '11/3/2021',
    Seller: 'SME1',
    Buyer: 'BUYER1',
    InvoiceAmount: '563489',
    Status: 'Active'
  },
  {
    Name: 'INV64320',
    Position: 'ISBGF5643',
    DateOfInvoice: '11/3/2021',
    Seller: 'SME1',
    Buyer: 'BUYER1',
    InvoiceAmount: '563489',
    Status: 'Active'
  },
  {
    Name: 'INV64320',
    Position: 'ISBGF5643',
    DateOfInvoice: '11/3/2021',
    Seller: 'SME1',
    Buyer: 'BUYER1',
    InvoiceAmount: '563489',
    Status: 'Active'
  },
];
// const DATA_TWO: any[] = [
//   {
//     BidID: 'BID03456',
//     FinOffAmt: 102700,
//     Ccy: 'SGD',
//     FxRateDiff: '1.35',
//     Margin: 10,
//     DiscRate: 3,
//     DiscAmt: 760,
//     NetAmtPay: 101940,
//     DueDate: '90D/10Mar21',
//     OffExpPrd: '4 PM',
//     Status: 'A'
//   }
// ];
// const RATE = ['', '', '', '', '', '', '',
//  ];
// const NAMES = ['', '', '', '', '', '',];

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
  selector: 'app-invoice-request',
  templateUrl: './invoice-request.component.html',
  styleUrls: ['./invoice-request.component.scss']
})

export class InvoiceRequestComponent implements OnInit {
  invoiceForm: FormGroup;
  tcode: string;
  invoiceID: any;
  currencyName:any;
  InvoiceFdate:any
  moment: any = moment;
  invoicedata: invoiceData = {
    id: "",
    RefNo: "",
    invId:"",
    invoiceId: "",
    invoiceDate: "",
    buyerName: "",
    InvoiceAmount: "",
    invDueDate:"",
    invref:""
  };

  hide = true;
  dataSourceTwo = new MatTableDataSource(); //data
  // dataSourceTwo = new MatTableDataSource(DATA_TWO); //data
  displayedColumnsTwo: string[] = [
    // 'ID',
    'goodsId',
    'DescGoods',
    // 'IdNo',
    // 'DateOfInvoice',
    'Quantity',
    'Rate',
    'Amt',
    'Ccy',
    'DiscAmt',
    'NetAmtPay',
    'TaxRate',
    'TaxAmount',
    'Total',
  ];

  // addGoods=new MatTableDataSource(this.ELEMENT_DATA1); 
  // displayedColumnsn: string[] = ['StatusCode', 'DateTime', 'IdNo', 'Quantity','Rate','Amount','DiscAmount','NetAmount','TaxRate','TaxAmount', 'Status'];

  dataSource = new MatTableDataSource(INVOICE_ARRAY);

  displayedColumns: string[] = ['select', 'DateTime','InvoiceRefNo', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount','Ccy','Status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('firstname', {static: true}) firstname:any;
  // tslint:disable-next-line: typedef
  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  formArray: any;
  tooltipPosition= "below";
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  UpdateInvoiceLable: boolean;
  invoiceDetails: any;
  userDeatils: any;
  optionDatas: any;
  nonFilterOptions : any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  currencyDropdownList = [
    {
      item_id:'INR',item_text:'INR'
    },
    {
      item_id:'AUD',item_text:'AUD'
    },
    {
      item_id:'USD',item_text:'USD'
    },
    {
      item_id:'SGD',item_text:'SGD'
    }
  ];
  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  disableSelect = new FormControl(false);
  states = COUNTRYNAMES
  // public variables = COUNTRYNAMES;
  public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];
  constructor(public translate: TranslateService,private IccCountryServices:IccCountryServices,public router: Router, private authenticationService: AuthenticationService, 
    private invoiceRequestServices: InvoiceRequestServices, private fb: FormBuilder,
    private datePipe: DatePipe,private toastr: ToastrService
    // ,private matInput: MatInput
    ) {
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit() {
   
    
    // this.firstname.nativeElement.focus();


    // setTimeout(() => this.matInput.focus());
    
    this.getAllCountry()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    let obj = {
      role : 'Authorise'
    }
    this.userDeatils= JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : obj 
    console.log(this.userDeatils,"this.userDeatils")
    this.getInvDetailsLists()
    this.addRow();
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
}

public setTwoNumberDecimal($event,name) {
  if(this.chkDecimalLength($event.target.value) >= 2){
    $event.target.value = parseFloat($event.target.value).toFixed(2);
    this.invoiceForm.patchValue({ [name] : parseFloat($event.target.value).toFixed(2) })
  }
}

public setGoodsDetails_TwoNumberDecimal($event,name,index) {
  if (Number.isInteger(Number($event.target.value))) { // not an decimal
    this.invoiceForm.value.goodsDetails[index][name] = $event.target.value
    this.changeRowgrid(index)
 }else if(this.chkDecimalLength($event.target.value) >= 2){ //check decimal length
    $event.target.value = parseFloat($event.target.value).toFixed(2);
    this.invoiceForm.value.goodsDetails[index][name] = parseFloat($event.target.value).toFixed(2)
    this.changeRowgrid(index)
    // this.invoiceForm.patchValue({ [name] : parseFloat($event.target.value).toFixed(2) })
  }
}



chkDecimalLength (value) {
  if(Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
  }


  changeRowgrid(index){
    // this.invoiceForm.value.goodsDetails.forEach(element => { element.ID=this.invoiceID });
    this.invoiceForm.value.goodsDetails[index]["ID"] = this.invoiceID 
    this.invoiceForm.value.goodsDetails[index]["amt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["rate"])*parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) ? Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["rate"]))*Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["quantity"])) : "0" 
    this.invoiceForm.value.goodsDetails[index]["netAmtPay"] = parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) ? (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["amt"])) - Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["discAmt"]))).toFixed(2) :'0'

    this.invoiceForm.value.goodsDetails[index]["taxAmt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 ? (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["netAmtPay"])) * Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["taxRate"])) / 100).toFixed(2)  :"0" 
   
    this.invoiceForm.value.goodsDetails[index]["total"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) ?  (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["netAmtPay"])) + Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["taxAmt"]))).toFixed(2):'0'
    this.invoiceForm.value.goodsDetails[index]["amtCcy"]=this.currencyName
    this.dateFormArray.patchValue(this.invoiceForm.value.goodsDetails);
}

//old one
// changeRowgrid(index){ 
//   // this.invoiceForm.value.goodsDetails.forEach(element => { element.ID=this.invoiceID });
//   this.invoiceForm.value.goodsDetails[index]["ID"] = this.invoiceID
//   this.invoiceForm.value.goodsDetails[index]["amt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["rate"])*parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["rate"])*parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) : "0" 
//   this.invoiceForm.value.goodsDetails[index]["netAmtPay"] = parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) ? parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) :'0'
//   this.invoiceForm.value.goodsDetails[index]["taxAmt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 ?parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100  :"0" 
//   this.invoiceForm.value.goodsDetails[index]["total"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) ?  parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]):'0'
//   this.invoiceForm.value.goodsDetails[index]["amtCcy"]=this.currencyName
//   this.dateFormArray.patchValue(this.invoiceForm.value.goodsDetails);
// }

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
}
getAllCountry(){
  this.IccCountryServices.getAllcountry().subscribe(resp => {    
    let countryArray = []
    resp && resp.map(item =>{
      let obj =  { id: item.countrycode3, itemName: item.country }
      countryArray.push(obj)
    })
    this.optionDatas = countryArray
    this.nonFilterOptions = countryArray
  })
  // this.optionDatas = COUNTRYNAMES; 
}

  onKey(value) { 
  this.optionDatas = this.search(value);
  }
  
  search(value: string) { 
    if(value == ""){
      this.optionDatas = this.nonFilterOptions
      return this.optionDatas
    }
    let filter = value.toLowerCase();
    return this.optionDatas.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  getInvDetailsLists() {
    let tempInvArray;
    this.invoiceRequestServices.getInvDetailsLists().subscribe(resp => {
      // resp.forEach(element => {
      //   if (element.status == "I") {
      //     tempInvArray.push(element)
      //     // resp.splice(resp.indexOf(element),1)
      //   }
      // });
      const INVOICE_ARRAY: invoiceData[] = resp;
      this.dataSource = new MatTableDataSource(INVOICE_ARRAY);
    }, error => {
    })
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

  openModal(event, template) {
    event.preventDefault();
  }
  goHome() {
    this.router.navigateByUrl('/sme-dashboard');
  }
  logout() {
    this.authenticationService.logout()
  }
  // tslint:disable-next-line: typedef

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
    this.selection.selected.forEach(s =>
      invoiceIds.push(s.id)
    );
    if(invoiceIds.length > 0){
      this.updateInvoice(invoiceIds)
    }else{
      return this.toastr.error(this.translate.instant('Please select invoice details'));
    }
    console.log("invoiceIds", invoiceIds);
  }
  updateInvoice(invoiceIds) {
    this.toastr.success(this.translate.instant('Selected Invoices has been Authorized'));
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
    }, error => {
    })

    let reqParams=[]
    this.dataSource.data.map((item)=>{
      if(invoiceIds.includes(item.id)){
        console.log(item,'tem');
        let obj={
          "invoiceId":item.id,
          "invoiceNo":item.invId,
          "invoiceRef":item.invref,
          "invoiceDate":item['invDate'],
          "smeId":item['smeId'],
          "invoiceAmt":item['invAmt'],
          "invoiceCcy":item['invCcy'],
          "status" : "APR", 
          "buyerName": item.buyerName,
          "buyerAddr":item['buyerAddr'],
          "buyerUEN":item['buyerUEN'],
          "dispDate":item['dispDate'],
           "invDueDate":item.invDueDate,
           "smeProfileId" : this.userDeatils['smeProfileId']

        }
        reqParams.push(obj)
      }
    })
    this.invoiceRequestServices.updateInvoiceDetails(reqParams).subscribe(resp =>{
      this.getInvDetailsLists();
    })
  }
  UpdateInvoice(data){
    console.log(data,"testtt")
    this.invoiceDetails = data
    this.invoiceForm.patchValue({
      buyerName: data.buyerName,
      invDueDate: data.invDueDate.toString(),
      invId: data.invId,
      buyerAddr: data.buyerAddr,
      buyerUEN:data.buyerUEN,
      billNo: data.billNo,
      invAmt: data.invAmt,
      invDate: data.invDate.toString(),
      dispDate: data.dispDate.toString(),
      smeId: localStorage.getItem("userId"),
      invCcy:data.invCcy
    });
    this.invoiceID = data.invId;
    this.currencyName=data.invCcy
    this.InvoiceFdate=data.invDueDate
    // console.log(this.dateFormArray,"this.dateFormArray")
    // this.dateFormArray.controls.splice(0,0);

   
    this.dataSourceTwo.data = []
    data.goodsDetails.forEach(element => {
      const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: element.descGoods,
      dateOfInvoice:this.datePipe.transform(this.InvoiceFdate,"dd/MM/yyyy"),
      quantity: element.quantity,
      rate:element.rate,
      amt: element.amt,
      amtCcy: this.currencyName,
      discAmt: element.discAmt, 
      netAmtPay: element.netAmtPay,
      taxRate: element.taxRate,
      taxAmt: element.taxAmt,
      total: element.total,
      goodsId: element.goodsId
      // goodsId: "GD101"
      })
      this.dateFormArray.push(row);
    });
    this.delete(0)
    this.dataSourceTwo.data = this.dateFormArray.controls;
    this.UpdateInvoiceLable = true
  }
  delete(index){
    this.dateFormArray.removeAt(index)
}
  onSubmitInvoiceForm() {
    let grandtotal = 0;
    this.invoiceForm.value.goodsDetails.forEach(element => {
       grandtotal += Number(element.total)
    });
    if (grandtotal != this.invoiceForm.value.invAmt) {
      if (this.dataSourceTwo.data.length < 1) {
        return this.toastr.error("Please add goods details");
      }
      return this.toastr.error(this.translate.instant('Please check Good Details !! Grant Total Should Be Equal to Funding Request Amount'));
    }

    try {
      if (this.invoiceForm.status === "INVALID") {
        this.toastr.error("Please fill mandatory fields")
        throw { "mes": "Please fill mendatory  fields" }
      }
      this.invoiceForm.value['invoiceDetailsSequenceNumber']={}     
      this.invoiceForm.value.smeProfileId = this.userDeatils['smeProfileId']

      let params = {
        "invoiceDetails": this.invoiceForm.value,
        // "smeProfileId" :  userData['smeProfileId']
      }
      console.log(params,"params");
      if(this.UpdateInvoiceLable === true){
        this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id,params).subscribe(resp => {
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.UpdateInvoiceLable = false
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
        })

      }else{
        this.invoiceRequestServices.invoiceRequestSave(params).subscribe(resp => {
          console.log(resp)
          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = ""
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
          if(error.status != 200){
            let availableData = error.error
            let desiredData = this.replaceCommaLine(availableData);
            this.toastr.error(desiredData, '', {
              timeOut: 4000, progressBar: true, enableHtml: true
            });

            // this.toastr.error(error.error);
          }else{
            this.invoiceFormBuild();
            this.dataSourceTwo.data = [];
            this.invoiceID = "";
            this.InvoiceFdate = ""
            for (const key in this.invoiceForm.controls) {
              this.invoiceForm.get(key).clearValidators();
              this.invoiceForm.get(key).updateValueAndValidity();
            }
            this.addRow()
            this.getInvDetailsLists();
            this.toastr.success(error.error.text);
          }
          

        })
      }
    } catch (err) {
      console.log(err,"errr")
    }
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  get dateFormArray(): FormArray {
    return this.invoiceForm.get('goodsDetails') as FormArray;
  }
  addRow() {
    console.log(this.invoiceForm, "adasdasd")
    this.dataSourceTwo.filter = "";
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      // idNo: [""],
      dateOfInvoice:this.datePipe.transform(this.InvoiceFdate,"dd/MM/yyyy"),
      quantity: [""],
      rate: [""],
      amt: [""],
      amtCcy: this.currencyName,
      discAmt: [""],
      netAmtPay: [""],
      taxRate: [""],
      taxAmt: [""],
      total: [""],
      goodsId: [""]
      // goodsId: "GD101",
    })
    this.dateFormArray.push(row);
    this.dataSourceTwo.data = this.dateFormArray.controls;
  }
  invoiceFormBuild() {
    this.invoiceForm = this.fb.group({
      buyerName: ['', Validators.required],
      invDueDate: ['', Validators.required],
      invId: ['', Validators.required],
      buyerAddr: ['', Validators.required],
      buyerUEN: ['', Validators.required],
      billNo: ['', Validators.required],
      invAmt: ['', Validators.required],
      invDate: ['', Validators.required], 
      dispDate: ['', Validators.required],
      smeId: localStorage.getItem("userId"),
      // invCcy: "",
      goodsDetails: this.fb.array([]),
      invCcy:['',Validators.required]
    });

  }
  updateInvoiceId(event) {
    console.log(event.target.value)
    this.invoiceID = event.target.value;
    // this.invoiceForm.value.goodsDetails.findIndex((obj => obj.ID == 1));
  }
  updateCurrency(event){
    this.currencyName=event.target.value
  }
  updateInvoicedate(event){
    this.InvoiceFdate = event.target.value;
  }
 
  onItemSelect(event){

  }
  invoiceId(Id){
    this.invoiceID=Id
    }
    removeRow(index) {
      let removeEntry = this.dataSourceTwo.data
     this.invoiceForm.value.goodsDetails.splice(index, 1)
       removeEntry.splice(index, 1)
      this.dataSourceTwo.data = removeEntry
    }
    clear() {
      this.currencyName = ''
      this.invoiceID = ''
      this.InvoiceFdate = ''
      this.invoiceFormBuild();
      this.dataSourceTwo = new MatTableDataSource();
      // this.dataSourceTwo.data = []
      this.addRow();
      this.toastr.success("Data cleared successfully")
    }
  
}

