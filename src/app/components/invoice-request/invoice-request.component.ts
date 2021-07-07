import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params,NavigationExtras } from '@angular/router';
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
    RefNo: "",
    id: "",
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

  public deletedRowedit: any = []

  dataSource = new MatTableDataSource(INVOICE_ARRAY);

  displayedColumns: string[] = ['select','InvoiceRefNo', 'DateTime', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount','Ccy','Score','Status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
  invoiceIdBoolean : boolean = false
  invoiceDetails: any;
  userDeatils: any;
  optionDatas: any;
  nonFilterOptions : any;
  score:any;
  invoiceRefNo
  isDisabled: boolean;
  currencyAMT: string;

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
  options: string[] = ['One', 'Two', 'Three'];
  disableSelect = new FormControl(false);
  states = COUNTRYNAMES
  // public variables = COUNTRYNAMES;
  public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];
  type:any
  FileData:any;
  constructor(private activatedRoute: ActivatedRoute,public translate: TranslateService,private IccCountryServices:IccCountryServices,public router: Router, private authenticationService: AuthenticationService, 
    private invoiceRequestServices: InvoiceRequestServices, private fb: FormBuilder,
    private datePipe: DatePipe,private toastr: ToastrService
    ) {
    this.FileData = this.router.getCurrentNavigation().extras.state;
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }

  ngOnInit() { //Initially works after constructor
    this.getAllCountry()
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.isDisabled = this.type === 'repository' ? true : this.type === 'manual' ? false : false
    if(this.type === 'repository'){
      this.isDisabled = true
      this.invoiceForm.patchValue({
        invId:"1790899780001",
    billNo: "1709155632001",
    invAmt: "27",
    invCcy:"USD",
    invDueDate: moment('2020-09-15', 'YYYY - MM - DD HH: mm').toDate(),
    invDate: moment('2020-06-15', 'YYYY - MM - DD HH: mm').toDate(),
    dispDate:  moment('2020-09-15', 'YYYY - MM - DD HH: mm').toDate(),
    email:"agb_andrea@yahoo.com.ar",
    buyerName:"GARCIA BENITEZ ANDREA MARIA",
    phoneNo:"987654321",
    buyerUEN:"1709155632001",
    buyerAddr:"BEL",
    addressLine1:"LAS PALMERAS N46-226 AND N46D DE LAS GARDENI",
    addressLine2:"GARDENI",
    city:"ECU",
    postalCode:"34567",
    companyName:"MacBook APPLE"
  });
  this.currencyName="USD"
  this.currencyAMT = "27"
  this.invoiceID = "1790899780001"
  this.InvoiceFdate = moment('2020-06-15', 'YYYY - MM - DD HH: mm').toDate()
  const row = this.fb.group({
    ID: this.invoiceID,
    descGoods: "NO MEMBER ELECTRONIC",
    dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
    quantity: '1',
    rate: '27',
    amt: '27',
    amtCcy: this.currencyName,
    discAmt: '0',
    netAmtPay: '0',
    taxRate: '0',
    taxAmt: '0',
    total: '27',
    goodsId: '1790899780001'
  })
      this.dateFormArray.push(row);
      // this.UpdateInvoice(this.FileData.FileData.queryParams.invoicedata)
    }
   
    this.userDeatils= JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : { role : 'Authorise' } 
    this.getInvDetailsLists()
    this.addRow();
    this.removeRow(1)
   
}
repositoryFetch(){
  let path = '/invoice-Repository'
  let data: NavigationExtras = {
    queryParams: {
      "Type": "updateRepo",
      "searchfield":'this.FileData.FileData.queryParams.searchfield'
    }
  }
  this.router.navigate([path], { state: { FileData: data } });
  // this.invoiceForm.patchValue({
  //   billNo: "IVAPPLE30062021",
  //   invAmt: "3500",
  //   smeId: localStorage.getItem("userId"),
  //   invCcy:"SGD",
  //   invDueDate: moment('2020-08-05', 'YYYY - MM - DD HH: mm').toDate(),
  //   invDate: moment('2020-06-02', 'YYYY - MM - DD HH: mm').toDate(),
  //   dispDate: moment('2020-09-09', 'YYYY - MM - DD HH: mm').toDate(),
  //   email:"APPle@mail.com",
  //   buyerName:"APPLE",
  //   phoneNo:"987654321",
  //   buyerUEN:"IVAPPLE",
  //   buyerAddr:"BEL",
  //   addressLine1:"32 victory",
  //   addressLine2:"london",
  //   city:"london",
  //   postalCode:"34567",
  //   companyName:"MacBook APPLE"
  // });
  // this.currencyName="SGD"
  // this.currencyAMT = "3500"
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
  }
  authoriseInvoice() {
    let invoiceIds = []
    let scoreCheck = false
    // this.selection.selected.forEach((s) => {
    //   invoiceIds.push(s.id)  
    // });
    // this.updateInvoice(invoiceIds)
    for(let i=0;i < this.selection.selected.length;i++){
      if(this.selection.selected[i].buyerScore >= 500){
        //  && this.selection.selected[i].id){
        invoiceIds.push(this.selection.selected[i].id)
        scoreCheck = true
      }
      else{
        scoreCheck = false
        break;
      }
    }
    if(scoreCheck){
    if(invoiceIds.length > 0){
      this.updateInvoice(invoiceIds)
    }else{
      return this.toastr.error(this.translate.instant('Please select invoice details'));
    }
  }
  else{
   this.selection.selected.length ? this.toastr.error('Your score is less to authorize') : this.toastr.error(this.translate.instant('Please select invoice details'))
  }
  }
  updateInvoice(invoiceIds) {
    this.toastr.success(this.translate.instant('Selected Invoices has been Authorized'));
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
      this.dataSourceTwo.data = []
      this.invoiceFormBuild();
    }, error => {
    })

    let reqParams=[]
    this.dataSource.data.map((item)=>{
      if(invoiceIds.includes(item.id)){
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
          // "buyerAddr":item['buyerAddr'],
          "buyerUEN":item['buyerUEN'],
          "dispDate":item['dispDate'],
           "invDueDate":item.invDueDate,
           "smeProfileId" : this.userDeatils['smeProfileId'],
           "smeName" : this.userDeatils['companyName'],
           "email": item['email'],
           "phoneNo": item['phoneNo'],
           "addressLine1": item['addressLine1'],
           "addressLine2": item['addressLine2'],
           "city": item['city'],
           "postalCode": item['postalCode'],
           "companyName": item['companyName'],
           "buyerScore" : item['buyerScore']
        }
        reqParams.push(obj)
      }
    })
    this.invoiceRequestServices.updateInvoiceDetails(reqParams).subscribe(resp =>{
      this.getInvDetailsLists();
    })
  }
  UpdateInvoice(data){
    this.invoiceIdBoolean = true;
    this.dateFormArray.controls = [];
    this.addRow()
    this.isDisabled = false
    this.invoiceDetails = data
    this.invoiceForm.patchValue({
      // buyerName: data.buyerName,
     // invDueDate: data.invDueDate.toString(),
      invId: data.invId,
      // buyerAddr: data.buyerAddr,
      // buyerUEN:data.buyerUEN,
      billNo: data.billNo,
      invAmt: data.invAmt,
      //invDate: data.invDate.toString(),
     // dispDate: data.dispDate.toString(),
      smeId: localStorage.getItem("userId"),
      invCcy:data.invCcy,
      invDueDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
  invDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
   dispDate: moment(data.dispDate, 'YYYY - MM - DD HH: mm').toDate(),
   
   email:data.email,
   buyerName:data.buyerName,
   phoneNo:data.phoneNo,
   buyerUEN:data.buyerUEN,
   buyerAddr:data.buyerAddr,
   addressLine1:data.addressLine1,
   addressLine2:data.addressLine2,
   city:data.city,
   postalCode:data.postalCode,
   companyName:data.companyName
    });
    this.invoiceID = data.invId;
    this.currencyName=data.invCcy
    this.invoiceRefNo=data.invref
    this.InvoiceFdate=data.invDueDate
    this.score=data.buyerScore

   
    this.dataSourceTwo.data = []
    data.goodsDetails.length &&  data.goodsDetails.forEach(element => {
      const row = this.fb.group({
        ID: this.invoiceID,
        descGoods: element.descGoods,
        dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
        quantity: element.quantity,
        rate: element.rate,
        amt: element.amt,
        amtCcy: this.currencyName,
        discAmt: element.discAmt,
        netAmtPay: element.netAmtPay,
        taxRate: element.taxRate,
        taxAmt: element.taxAmt,
        total: element.total,
        goodsId: element.goodsId
      })
      this.dateFormArray.push(row);
    });

   if(!data.goodsDetails.length){
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      // idNo: [""],
      dateOfInvoice: this.datePipe.transform(this.InvoiceFdate, "dd/MM/yyyy"),
      quantity: [""],
      rate: [""],
      amt: [""],
      amtCcy: this.currencyName,
      discAmt: [""],
      netAmtPay: [""],
      taxRate: [""],
      taxAmt: [""],
      total: [""],
      goodsId: [""],
    })
      this.dateFormArray.push(row);
    }
    this.delete(0)
    this.dataSourceTwo.data = this.dateFormArray.controls;
    this.UpdateInvoiceLable = true
  }
  delete(index){
    this.dateFormArray.removeAt(index)
}
  onSubmitInvoiceForm() {
    let grandtotal = 0;
    this.userDeatils= JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : {} 
    this.invoiceForm.value.goodsDetails.forEach(element => {
       grandtotal += parseFloat(element.total)
    });
    if (grandtotal != parseFloat(this.invoiceForm.value.invAmt)) {
      if (this.dataSourceTwo.data.length < 1) {
         this.toastr.error("Please add goods details");
         return
      }
       this.toastr.error(this.translate.instant('Please check Good Details !! Grant Total Should Be Equal to Funding Request Amount'));
       return
      }

    try {
      if (this.invoiceForm.status === "INVALID") {
        this.toastr.error("Please fill mandatory fields")
      }
      this.invoiceForm.value['invoiceDetailsSequenceNumber']={}     
      this.invoiceForm.value.smeProfileId = this.userDeatils['smeProfileId']
      this.invoiceForm.value.smeName = this.userDeatils['companyName']
      // this.invoiceForm.value.goodsDetails.concat(this.deletedRowedit);
if (this.deletedRowedit.length > 0) {
this.deletedRowedit.forEach(element => {
this.invoiceForm.value.goodsDetails.push(element);
});
}
this.invoiceForm.value.goodsDetails.forEach(element => {
  if (element.status == 'isActive') {
  element.status = 'Active'
  }
  });
      let params = {
        "invoiceDetails": this.invoiceForm.value,
        // "smeProfileId" :  userData['smeProfileId']
      }
      params['invoiceDetails'].goodsDetails[0].netAmtPay = parseInt(params['invoiceDetails'].goodsDetails[0].netAmtPay)
      params['invoiceDetails'].goodsDetails[0].total =   parseInt(params['invoiceDetails'].goodsDetails[0].total)

      if(this.UpdateInvoiceLable === true){
        let buyerDetails= this.sendBuyerDetails(this.invoiceRefNo)
        this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
          if(resp){
           this.score=resp.score
          params['invoiceDetails']['buyerScore'] = resp.score
        this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id,params).subscribe(resp => {
          this.deletedRowedit = [];

          this.invoiceFormBuild();
          this.dataSourceTwo.data = [];
          this.invoiceID = "";
          this.InvoiceFdate = "";
          this.invoiceRefNo = "";
          for (const key in this.invoiceForm.controls) {
            this.invoiceForm.get(key).clearValidators();
            this.invoiceForm.get(key).updateValueAndValidity();
          }
          this.UpdateInvoiceLable = false
          this.addRow()
          this.getInvDetailsLists();
        }, error => {
        })

          }
         },error =>{
          params['invoiceDetails']['buyerScore'] = this.score
          this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id,params).subscribe(resp => {
            this.deletedRowedit = [];
  
            this.invoiceFormBuild();
            this.dataSourceTwo.data = [];
            this.invoiceID = "";
            this.InvoiceFdate = "";
            this.invoiceRefNo = "";
            for (const key in this.invoiceForm.controls) {
              this.invoiceForm.get(key).clearValidators();
              this.invoiceForm.get(key).updateValueAndValidity();
            }
            this.UpdateInvoiceLable = false
            this.addRow()
            this.getInvDetailsLists();
          }, error => {
          })
         })
      }
      else{
        this.invoiceRequestServices.invoiceRequestSave(params).subscribe(resp => {
          this.invoiceRefNo=resp
          let buyerDetails= this.sendBuyerDetails(resp)
          this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
            if(resp){
              this.score=resp.score
              let obj={
                'buyerScore':resp.score
              }
              this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
                this.invoiceRefNo=''
              })
            }
          },error=>{
            let obj={
              'buyerScore':0
            }
            this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
              this.invoiceRefNo=''
            })
            
          })

          
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
            this.invoiceRefNo=error.error.text
            let buyerDetails= this.sendBuyerDetails(error.error.text)
            this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp =>{
              if(resp){
                this.score=resp.Score
                let obj={
                  'buyerScore':resp.score
                }
                this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
                  this.invoiceRefNo=''
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
                })
            this.toastr.success('Data Added Successfully')
          }
        },error =>{
          let obj={
            'buyerScore':0
          }
          this.invoiceRequestServices.updateScore(this.invoiceRefNo,obj).subscribe(scoreResp =>{
            this.invoiceRefNo=''
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
          })
        })
            // (error.error.text);
          }
          

        })
      }
    } catch (err) {
    }
  }
  
  sendBuyerDetails(invoiceNo){
    let userCred=JSON.parse(localStorage.getItem('userCred'))
    let formValues=this.invoiceForm.value
    // let buyerdetails={
    //   'name':formValues.buyerName,
    //   'city':formValues.city,
    //   'location':formValues.buyerAddr,
    //   'postalCode':formValues.postalCode,
    //   'addr1':formValues.addressLine1,
    //   'addr2':formValues.addressLine2,
    //   'companyName':userCred.companyName,
    //   'uniqueId':formValues.buyerUEN,
    //   'email':formValues.email,
    //   'phoneNo':formValues.phoneNo
    // }
    // localStorage.setItem('buyerDetails',JSON.stringify(buyerdetails))
      let buyerSubmitObj={
        'name':userCred && userCred.name,
        'registrationnumber':userCred.companyId,
        'countryCode':'SGP',
        'invoiceid':invoiceNo,
        'invoiceno':this.invoiceForm.value['invId'],
        "sectionList":[{
          "questionResponses":[
            {"type": "QuestionResponseTextDto", "questionAlias": "customer-business-name", "value": formValues.companyName},
            {"type": "QuestionResponseTextDto", "questionAlias": "address-line-1", "value": formValues.addressLine1},
            {"type": "QuestionResponseTextDto", "questionAlias": "address-line-2", "value": formValues.addressLine2},
            {"type": "QuestionResponseTextDto", "questionAlias": "city", "value": formValues.city},
            {"type": "QuestionResponseTextDto", "questionAlias": "postcode", "value": formValues.postalCode},
            {"type": "QuestionResponseMultipleChoiceDto", "questionAlias": "country", "optionAliases": ["SGP"]},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-email", "value": formValues.email},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-telephone", "value": formValues.phoneNo.toString()},
            {"type": "QuestionResponseTextDto", "questionAlias": "contact-name", "value": formValues.buyerName},
            {"type": "QuestionResponseTextDto", "questionAlias": "customer-company-registration-number", "value": formValues.buyerUEN}
            ],
        }]
      }
      return buyerSubmitObj;
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  get dateFormArray(): FormArray {
    return this.invoiceForm.get('goodsDetails') as FormArray;
  }
  addRow() {
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
      goodsId: [""],
      // goodsId: "GD101",
      status: "isActive"
    })
    this.dateFormArray.push(row);
    this.dataSourceTwo.data = this.dateFormArray.controls;
  }
  invoiceFormBuild() {
    this.invoiceForm = this.fb.group({
      invDueDate: ['', Validators.required],
      invId: ['', Validators.required],
      billNo: ['', Validators.required],
      invAmt: ['', Validators.required],
      invDate: ['', Validators.required], 
      dispDate: ['', Validators.required],
      smeId: localStorage.getItem("userId"),
      goodsDetails: this.fb.array([]),
      invCcy:['',Validators.required],

      // buyer details
      email: [''],
      buyerName: ['', Validators.required],
      buyerUEN: ['', Validators.required],
      phoneNo:[''],
      buyerAddr:[''],
      addressLine1:[''],
      addressLine2:[''],
      city:[''],
      postalCode:[''],
      companyName:['',Validators.required]
    });
    // let buyerDetails=JSON.parse(localStorage.getItem('buyerDetails'))
    // if(buyerDetails){
    //   this.invoiceForm.patchValue({
    //     email:buyerDetails.email,
    //     buyerName:buyerDetails.name,
    //     phoneNo:buyerDetails.phoneNo,
    //     buyerUEN:buyerDetails.uniqueId,
    //     buyerAddr:buyerDetails.location,
    //     addressLine1:buyerDetails.addr1,
    //     addressLine2:buyerDetails.addr2,
    //     city:buyerDetails.city,
    //     postalCode:buyerDetails.postalCode,
    //     companyName:buyerDetails.companyName
    //   })
    // }
  }
  updateInvoiceId(event) {
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
    // removeRow(index) {
    //   let removeEntry = this.dataSourceTwo.data
    //  this.invoiceForm.value.goodsDetails.splice(index, 1)
    //    removeEntry.splice(index, 1)
    //   this.dataSourceTwo.data = removeEntry
    // }
    // removeRow(index) {
    //   if (this.invoiceIdBoolean) {
    //     if (this.invoiceForm.value.goodsDetails[index].status) {
    //       let removeEntry = this.dataSourceTwo.data
    //       this.invoiceForm.value.goodsDetails[index]["status"] = "delete"
    //       this.deletedRowedit.push(this.invoiceForm.value.goodsDetails[index]);
    //       removeEntry.splice(index, 1);
    //       this.dataSourceTwo.data = removeEntry
    //     } else {
    //       let removeEntry = this.dataSourceTwo.data
    //       this.invoiceForm.value.goodsDetails.splice(index, 1)
    //       removeEntry.splice(index, 1)
    //       this.dataSourceTwo.data = removeEntry
    //     }
  
    //   } else {
    //     let removeEntry = this.dataSourceTwo.data
    //     this.invoiceForm.value.goodsDetails.splice(index, 1)
    //     removeEntry.splice(index, 1)
    //     this.dataSourceTwo.data = removeEntry
    //   }
    // }
    removeRo1w(index) {
      if (this.invoiceIdBoolean) {
      if (this.invoiceForm.value.goodsDetails[index].status == 'active') {
      let removeEntry = this.dataSourceTwo.data
      this.invoiceForm.value.goodsDetails[index]["status"] = "Deleted"
      this.deletedRowedit.push(this.invoiceForm.value.goodsDetails[index]);
      this.invoiceForm.value.goodsDetails.splice(index, 1)
      removeEntry.splice(index, 1);
      this.dataSourceTwo.data = removeEntry
      } else {
      let removeEntry = this.dataSourceTwo.data
      this.invoiceForm.value.goodsDetails.splice(index, 1)
      removeEntry.splice(index, 1)
      this.dataSourceTwo.data = removeEntry
      }
      
      } else {
      let removeEntry = this.dataSourceTwo.data
      this.invoiceForm.value.goodsDetails.splice(index, 1)
      removeEntry.splice(index, 1)
      this.dataSourceTwo.data = removeEntry
      }
      }
      

  removeRow(index) {
  if (this.invoiceIdBoolean) {
  if (this.invoiceForm.value.goodsDetails[index].status == 'active' || this.invoiceForm.value.goodsDetails[index].status == 'Active') {
  let removeEntry = this.dataSourceTwo.data
  this.invoiceForm.value.goodsDetails[index]["status"] = "Deleted"
  this.deletedRowedit.push(this.invoiceForm.value.goodsDetails[index]);
  this.invoiceForm.value.goodsDetails.splice(index, 1)
  removeEntry.splice(index, 1);
  this.dataSourceTwo.data = removeEntry
  } else {
  let removeEntry = this.dataSourceTwo.data
  this.invoiceForm.value.goodsDetails.splice(index, 1)
  removeEntry.splice(index, 1)
  this.dataSourceTwo.data = removeEntry
  }
  
  } else {
  let removeEntry = this.dataSourceTwo.data
  this.invoiceForm.value.goodsDetails.splice(index, 1)
  removeEntry.splice(index, 1)
  this.dataSourceTwo.data = removeEntry
  }
}
    clear() {
      this.currencyName = ''
      this.invoiceID = ''
      this.InvoiceFdate = ''
      this.invoiceFormBuild();
      this.invoiceRefNo=''
      this.score=0
      this.dataSourceTwo = new MatTableDataSource();
      // this.dataSourceTwo.data = []
      this.addRow();
      this.toastr.success("Data cleared successfully")
    }
  
}

