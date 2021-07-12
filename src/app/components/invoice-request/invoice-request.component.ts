import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { InvoiceRequestServices } from './invoice-service';
import { DatePipe } from '@angular/common';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { COUNTRYNAMES } from '../../shared/constants/Country';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  selector: 'app-invoice-request',
  templateUrl: './invoice-request.component.html',
  styleUrls: ['./invoice-request.component.scss']
})
export class InvoiceRequestComponent implements OnInit {
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
  displayedColumns: string[] = ['select', 'InvoiceRefNo', 'DateTime', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount', 'Ccy', 'Score', 'Status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isOpen = ""
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  formArray: any;
  tooltipPosition = "below";
  UpdateInvoiceLable: boolean;
  invoiceIdBoolean: boolean = false
  invoiceDetails: any;
  userDeatils: any;
  optionDatas: any;
  nonFilterOptions: any;
  score: any;
  invoiceRefNo
  isDisabled: boolean;
  currencyAMT: string;
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  currencyDropdownList = [
    {
      item_id: 'INR', item_text: 'INR'
    },
    {
      item_id: 'AUD', item_text: 'AUD'
    },
    {
      item_id: 'USD', item_text: 'USD'
    },
    {
      item_id: 'SGD', item_text: 'SGD'
    }
  ];
  dropdownSettings: IDropdownSettings = {
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
  public variables = ['One', 'Two', 'County', 'Three', 'Zebra', 'XiOn'];
  type: any
  FileData: any;
  constructor(private activatedRoute: ActivatedRoute, public translate: TranslateService, private IccCountryServices: IccCountryServices, public router: Router,
    private invoiceRequestServices: InvoiceRequestServices, private fb: FormBuilder,
    private datePipe: DatePipe, private toastr: ToastrService
  ) {
    this.FileData = this.router.getCurrentNavigation().extras.state;
    this.type = this.activatedRoute.snapshot.paramMap.get("type");
    this.invoiceFormBuild()
    this.dataSourceTwo = new MatTableDataSource();
  }
  ngOnInit() { //Initially works after constructor
    this.getAllCountry()
    this.addRow();
    this.isDisabled = this.type === 'repository' ? true : this.type === 'manual' ? false : false
    if (this.type === 'repository') {
      this.isDisabled = true
      this.UpdateReposInvoice(this.FileData.FileData.queryParams.invoicedata)
    }
    this.userDeatils = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : { role: 'Authorise' }
    this.getInvDetailsLists()
  }
  UpdateReposInvoice(item) { //get invoice repos and set
    this.invoiceRequestServices.getInvRepositryDetailsLists(item.RUC, item.DocumentNumber).subscribe(resp => {
      let data = resp
      this.invoiceIdBoolean = true;
      this.dateFormArray.controls = [];
      this.invoiceDetails = data
      this.invoiceForm.patchValue({
        invId: data.invId,
        billNo: data.billNo,
        invAmt: data.invAmt,
        smeId: localStorage.getItem("userId"),
        invCcy: data.invCcy,
        invDueDate: moment(data.invDate, 'YYYY - MM - DD HH: mm').toDate(),
        invDate: moment(data.invDate, 'YYYY - MM - DD HH: mm').toDate(),
        dispDate: moment(data.dispDate, 'YYYY - MM - DD HH: mm').toDate(),
        email: data.email,
        buyerName: data.buyerName,
        phoneNo: data.phoneNo,
        buyerUEN: data.buyerUEN,
        buyerAddr: data.buyerAddr,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        postalCode: data.postalCode,
        companyName: data.companyName
      });
      this.invoiceID = data.invId;
      this.currencyName = data.invCcy
      this.invoiceRefNo = data.invref
      this.currencyAMT = data.invAmt
      this.InvoiceFdate = moment(data.invDate, 'YYYY - MM - DD HH: mm').toDate()
      this.score = data.buyerScore
      this.dataSourceTwo.data = []
      data.goodsDetails.length && data.goodsDetails.forEach(element => {
        const row = this.fb.group({
          ID: this.invoiceID,
          descGoods: element.descGoods,
          dateOfInvoice: moment(this.InvoiceFdate, 'YYYY - MM - DD').toDate(),
          quantity: element.quantity,
          rate: element.rate,
          amt: element.amt,
          amtCcy: this.currencyName,
          discAmt: element.discAmt,
          netAmtPay: element.netAmtPay,
          taxRate: element.taxRate,
          taxAmt: element.taxAmt,
          total: element.total,
          goodsId: element.goodsId,
          status: "isActive"
        })
        this.dateFormArray.push(row);
      });
      if (!data.goodsDetails.length) {
        const row = this.fb.group({
          ID: this.invoiceID,
          descGoods: [""],
          dateOfInvoice: [""],
          quantity: [""],
          rate: [""],
          amt: [""],
          amtCcy: [""],
          discAmt: [""],
          netAmtPay: [""],
          taxRate: [""],
          taxAmt: [""],
          total: [""],
          goodsId: [""],
          status: "isActive"
        })
        this.dateFormArray.push(row);
      }
      this.dataSourceTwo.data = this.dateFormArray.controls;
    })
  }
  getInvDetailsLists() { //Get invoice details 
    this.invoiceRequestServices.getInvDetailsLists().subscribe(resp => {
      const INVOICE_ARRAY: invoiceData[] = resp;
      this.dataSource = new MatTableDataSource(INVOICE_ARRAY);
    })
  }
  addRow() { //add extra row when click plus icon
    this.dataSourceTwo.filter = "";
    const row = this.fb.group({
      ID: this.invoiceID,
      descGoods: [""],
      dateOfInvoice: [""],
      quantity: [""],
      rate: [""],
      amt: [""],
      amtCcy: [""],
      discAmt: [""],
      netAmtPay: [""],
      taxRate: [""],
      taxAmt: [""],
      total: [""],
      goodsId: [""],
      status: "isActive"
    })
    this.dateFormArray.push(row);
    this.dataSourceTwo.data = this.dateFormArray.controls;
  }
  repositoryFetch() {//navigate repository page with data
    let path = '/invoice-Repository'
    let data: NavigationExtras = {
      queryParams: {
        "Type": "updateRepo",
        "searchfield": 'this.FileData.FileData.queryParams.searchfield'
      }
    }
    this.router.navigate([path], { state: { FileData: data } });
  }
  public setTwoNumberDecimal($event, name) { //number field validation for demimal restriction
    if (this.chkDecimalLength($event.target.value) >= 2) {
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.invoiceForm.patchValue({ [name]: parseFloat($event.target.value).toFixed(2) })
    }
  }
  public setGoodsDetails_TwoNumberDecimal($event, name, index) { //decimal validation for goods number fields
    if (Number.isInteger(Number($event.target.value))) { // not an decimal
      this.invoiceForm.value.goodsDetails[index][name] = $event.target.value
      this.changeRowgrid(index)
    } else if (this.chkDecimalLength($event.target.value) >= 2) { //check decimal length
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.invoiceForm.value.goodsDetails[index][name] = parseFloat($event.target.value).toFixed(2)
      this.changeRowgrid(index)
    }
  }
  chkDecimalLength(value) { //to check the decimal length
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }
  changeRowgrid(index) { //calls when changing input fields for calculation
    this.invoiceForm.value.goodsDetails[index]["ID"] = this.invoiceID
    this.invoiceForm.value.goodsDetails[index]["amt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["rate"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["quantity"]) ? Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["rate"])) * Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["quantity"])) : "0"
    this.invoiceForm.value.goodsDetails[index]["netAmtPay"] = parseInt(this.invoiceForm.value.goodsDetails[index]["amt"]) - parseInt(this.invoiceForm.value.goodsDetails[index]["discAmt"]) ? (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["amt"])) - Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["discAmt"]))).toFixed(2) : '0'
    this.invoiceForm.value.goodsDetails[index]["taxAmt"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) * parseInt(this.invoiceForm.value.goodsDetails[index]["taxRate"]) / 100 ? (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["netAmtPay"])) * Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["taxRate"])) / 100).toFixed(2) : "0"
    this.invoiceForm.value.goodsDetails[index]["total"] = parseInt(this.invoiceForm.value.goodsDetails[index]["netAmtPay"]) + parseInt(this.invoiceForm.value.goodsDetails[index]["taxAmt"]) ? (Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["netAmtPay"])) + Number(parseFloat(this.invoiceForm.value.goodsDetails[index]["taxAmt"]))).toFixed(2) : '0'
    this.invoiceForm.value.goodsDetails[index]["amtCcy"] = this.currencyName
    this.dateFormArray.patchValue(this.invoiceForm.value.goodsDetails);
  }

  getAllCountry() { //To get all country list
    this.IccCountryServices.getAllcountry().subscribe(resp => {
      let countryArray = []
      resp && resp.map(item => {
        let obj = { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
      this.optionDatas = countryArray
      this.nonFilterOptions = countryArray
    })
  }
  onKey(value) { //to get searched value
    this.optionDatas = this.search(value);
  }

  search(value: string) { //to get datas based on typing on search field
    if (value == "") {
      this.optionDatas = this.nonFilterOptions
      return this.optionDatas
    }
    let filter = value.toLowerCase();
    return this.optionDatas.filter(option => option.itemName.toLowerCase().startsWith(filter));
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
  }
  authoriseInvoice() { //to update invoice with score check
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
  }
  updateInvoice(invoiceIds) {//update api call here
    this.toastr.success(this.translate.instant('Selected Invoices has been Authorized'));
    this.invoiceRequestServices.authoriseInvoice(invoiceIds.toString()).subscribe(resp => {
      this.getInvDetailsLists();
      this.dataSourceTwo.data = []
      this.invoiceFormBuild();
    })

    let reqParams = []
    this.dataSource.data.map((item) => {
      if (invoiceIds.includes(item.id)) {
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
  UpdateInvoice(data) { //good details handle with new rows
    this.invoiceIdBoolean = true;
    this.dateFormArray.controls = [];
    this.addRow()
    this.isDisabled = false
    this.invoiceDetails = data
    this.invoiceForm.patchValue({
      invId: data.invId,
      billNo: data.billNo,
      invAmt: data.invAmt,
      smeId: localStorage.getItem("userId"),
      invCcy: data.invCcy,
      invDueDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
      invDate: moment(data.invDueDate, 'YYYY - MM - DD HH: mm').toDate(),
      dispDate: moment(data.dispDate, 'YYYY - MM - DD HH: mm').toDate(),
      email: data.email,
      buyerName: data.buyerName,
      phoneNo: data.phoneNo,
      buyerUEN: data.buyerUEN,
      buyerAddr: data.buyerAddr,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      postalCode: data.postalCode,
      companyName: data.companyName
    });
    this.invoiceID = data.invId;
    this.currencyName = data.invCcy
    this.invoiceRefNo = data.invref
    this.InvoiceFdate = data.invDueDate
    this.score = data.buyerScore
    this.dataSourceTwo.data = []
    data.goodsDetails.length && data.goodsDetails.forEach(element => {
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

    if (!data.goodsDetails.length) {
      const row = this.fb.group({
        ID: this.invoiceID,
        descGoods: [""],
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
  delete(index) { // remove row from goods details
    this.dateFormArray.removeAt(index)
  }
  onSubmitInvoiceForm() { //update invoice request with score update
    let grandtotal = 0;
    this.userDeatils = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : {}
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
      this.invoiceForm.value['invoiceDetailsSequenceNumber'] = {}
      this.invoiceForm.value.smeProfileId = this.userDeatils['smeProfileId']
      this.invoiceForm.value.smeName = this.userDeatils['companyName']
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
      }
      params['invoiceDetails'].goodsDetails[0].netAmtPay = parseInt(params['invoiceDetails'].goodsDetails[0].netAmtPay)
      params['invoiceDetails'].goodsDetails[0].total = parseInt(params['invoiceDetails'].goodsDetails[0].total)
      if (this.UpdateInvoiceLable === true) {
        let buyerDetails = this.sendBuyerDetails(this.invoiceRefNo)
        this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp => {
          if (resp) {
            this.score = resp.score
            params['invoiceDetails']['buyerScore'] = resp.score
            this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id, params).subscribe(resp => {
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
            })

          }
        }, error => {
          params['invoiceDetails']['buyerScore'] = this.score
          this.invoiceRequestServices.UpdateInvoice(this.invoiceDetails.id, params).subscribe(resp => {
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
      else {
        this.invoiceRequestServices.invoiceRequestSave(params).subscribe(resp => {
          this.invoiceRefNo = resp
          let buyerDetails = this.sendBuyerDetails(resp)
          this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp => {
            if (resp) {
              this.score = resp.score
              let obj = {
                'buyerScore': resp.score
              }
              this.invoiceRequestServices.updateScore(this.invoiceRefNo, obj).subscribe(scoreResp => {
                this.invoiceRefNo = ''
              })
            }
          }, error => {
            let obj = {
              'buyerScore': 0
            }
            this.invoiceRequestServices.updateScore(this.invoiceRefNo, obj).subscribe(scoreResp => {
              this.invoiceRefNo = ''
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
          if (error.status != 200) {
            let availableData = error.error
            let desiredData = this.replaceCommaLine(availableData);
            this.toastr.error(desiredData, '', {
              timeOut: 4000, progressBar: true, enableHtml: true
            });

          } else {
            this.invoiceRefNo = error.error.text
            let buyerDetails = this.sendBuyerDetails(error.error.text)
            this.invoiceRequestServices.submitBuyerDetails(buyerDetails).subscribe(resp => {
              if (resp) {
                this.score = resp.Score
                let obj = {
                  'buyerScore': resp.score
                }
                this.invoiceRequestServices.updateScore(this.invoiceRefNo, obj).subscribe(scoreResp => {
                  this.invoiceRefNo = ''
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
            }, error => {
              let obj = {
                'buyerScore': 0
              }
              this.invoiceRequestServices.updateScore(this.invoiceRefNo, obj).subscribe(scoreResp => {
                this.invoiceRefNo = ''
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
          }
        })
      }
    } catch (err) {
    }
  }

  sendBuyerDetails(invoiceNo) { //to send respective object based on invoice number
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    let formValues = this.invoiceForm.value
    let buyerSubmitObj = {
      'name': userCred && userCred.name,
      'registrationnumber': userCred.companyId,
      'countryCode': 'SGP',
      'invoiceid': invoiceNo,
      'invoiceno': this.invoiceForm.value['invId'],
      "sectionList": [{
        "questionResponses": [
          { "type": "QuestionResponseTextDto", "questionAlias": "customer-business-name", "value": formValues.companyName },
          { "type": "QuestionResponseTextDto", "questionAlias": "address-line-1", "value": formValues.addressLine1 },
          { "type": "QuestionResponseTextDto", "questionAlias": "address-line-2", "value": formValues.addressLine2 },
          { "type": "QuestionResponseTextDto", "questionAlias": "city", "value": formValues.city },
          { "type": "QuestionResponseTextDto", "questionAlias": "postcode", "value": formValues.postalCode },
          { "type": "QuestionResponseMultipleChoiceDto", "questionAlias": "country", "optionAliases": ["SGP"] },
          { "type": "QuestionResponseTextDto", "questionAlias": "contact-email", "value": formValues.email },
          { "type": "QuestionResponseTextDto", "questionAlias": "contact-telephone", "value": formValues.phoneNo.toString() },
          { "type": "QuestionResponseTextDto", "questionAlias": "contact-name", "value": formValues.buyerName },
          { "type": "QuestionResponseTextDto", "questionAlias": "customer-company-registration-number", "value": formValues.buyerUEN }
        ],
      }]
    }
    return buyerSubmitObj;
  }
  replaceCommaLine(data) { //remove comma seperator from data
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
  get dateFormArray(): FormArray { //geeting goods details
    return this.invoiceForm.get('goodsDetails') as FormArray;
  }

  invoiceFormBuild() { //initially set formbuild for forms
    this.invoiceForm = this.fb.group({
      invDueDate: ['', Validators.required],
      invId: ['', Validators.required],
      billNo: ['', Validators.required],
      invAmt: ['', Validators.required],
      invDate: ['', Validators.required],
      dispDate: ['', Validators.required],
      smeId: localStorage.getItem("userId"),
      goodsDetails: this.fb.array([]),
      invCcy: ['', Validators.required],
      email: [''],
      buyerName: ['', Validators.required],
      buyerUEN: ['', Validators.required],
      phoneNo: [''],
      buyerAddr: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      postalCode: [''],
      companyName: ['', Validators.required]
    });
  }
  updateInvoiceId(event) { //update respective value
    this.invoiceID = event.target.value;
  }
  updateCurrency(event) {//update respective value
    this.currencyName = event.target.value
  }
  updateInvoicedate(event) {//update respective value
    this.InvoiceFdate = event.target.value;
  }
  invoiceId(Id) {//update respective value
    this.invoiceID = Id
  }
  removeRow(index) { //remove row
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
  clear() { //to clear filled data and reset like new form
    this.currencyName = ''
    this.invoiceID = ''
    this.InvoiceFdate = ''
    this.invoiceFormBuild();
    this.invoiceRefNo = ''
    this.score = 0
    this.dataSourceTwo = new MatTableDataSource();
    this.addRow();
    this.toastr.success("Data cleared successfully")
  }
}

