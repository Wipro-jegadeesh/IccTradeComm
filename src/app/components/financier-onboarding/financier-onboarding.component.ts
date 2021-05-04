import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer/customer.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancierOnboardingService } from './financier-onboarding.service';
import { ToastrService } from 'ngx-toastr';
import {Validation} from '../../service/Validation'

const ELEMENT_DATA: any[] = [
  {
    Name: '',
    Position: '',
    Address: '',
    TelephoneNo: '', 
    Email: ''
  }
];

interface ICity {
  // item_id: number;
  // item_text: string;

  id: number;
  itemName: string;
}
@Component({
  selector: 'app-financier-onboarding',
  templateUrl: './financier-onboarding.component.html',
  styleUrls: ['./financier-onboarding.component.scss']
})
export class FinancierOnboardingComponent implements OnInit {

  customer: Customer;
  isOpen = '';
  financierForm: FormGroup
  financierId = ''
  validation: any = Validation;

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private fb: FormBuilder,
    private customerService: CustomerService, public authenticationService: AuthenticationService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private financierService: FinancierOnboardingService) {
    this.customer = new Customer();
  }

  dataSource1 = new MatTableDataSource(ELEMENT_DATA); //data
  dataSource2 = new MatTableDataSource(ELEMENT_DATA); //data
  dataSource3 = new MatTableDataSource(ELEMENT_DATA); //data
  displayedColumns: string[] = ['Name', 'Position', 'Address', 'TelephoneNo', 'Email'];

  name = "Angular";
  cities: Array<ICity> = [];
  selectedItems: Array<ICity> = [];
  dropdownSettings = {
  };
  isView = false

  ngOnInit() {
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
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      enableSearchFilter : true,
      text: 'Country',
      autoPosition : false,
      maxHeight	: 170
    };
    this.activatedRoute.params.subscribe((params: Params) => {
      // this.financierId=params.id
      // let id = params.id && params.id.split('FIN')
      // this.financierId = id && id[1] ? id[1] : ''
      this.financierId = params.id
      this.isView = params.edit == 'view' ? true : false
    })
    this.buildFinancierForm()
    this.isView && this.disableFields()
    this.financierId && this.getSpecificFinancier()
  }
  disableFields() {
    // this.financierForm.controls['fName'].disable();
    this.dropdownSettings['disabled'] = true
  }
  addRow(type) {
    const partnerRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: [""]
    })
    if (type == 'partner') {
      this.partnerFormArray.push(partnerRow);
      this.dataSource1.data = this.partnerFormArray.controls;
    }
    else if (type == 'auth') {
      this.authoriseFormArray.push(partnerRow);
      this.dataSource2.data = this.authoriseFormArray.controls;
    }
    else {
      this.entityFormArray.push(partnerRow)
      this.dataSource3.data = this.entityFormArray.controls;
    }
  }
  getSpecificFinancier() {

   
    

let respObj = {​​​​​​​​
"profileID": 2,
"namedPKKey": 1,
"companyid": 1,
"financierNameConstitution": 1,
"taxIdentificationNumber": 1,
"principalBankAccount": 1,
"registerDate": 1,
"financierType": 1,
"annualSCFTurnOver": 50000,
"annualSCFTurnOverCCY": 1,
"transactionLimit": 1,
"transactionLimitCCY": 1,
"hQLimit": 1,
"serviceAddress": 1,
"financeexpyears": 1,
"locregno": 1,
"typeofact": 1,
"prncbankbranch": 1,
"finseq": 1,
"asocpartylst": [
        {​​​​​​​​
"partyKey": 3,
"profileID": 7654,
"name": "preethi",
"position": "gtyu",
"assocType": "type",
"addressType": "S",
"addressLine1": "add1",
"addressLine2": "add2",
"addressLine3": "add3",
"addressLine4": "add4",
"city": "cit1",
"state": "state1",
"postalCode": "ha37td",
"telephoneNumber": "123456",
"country": "countr1",
"email": "email1",
"swiftBic": "swftbic1",
"faxno": 765
        }​​​​​​​​,
        {​​​​​​​​
"partyKey": 4,
"profileID": 7654,
"name": "preethi",
"position": "gtyu",
"assocType": "type",
"addressType": "H",
"addressLine1": "add1",
"addressLine2": "add2",
"addressLine3": "add3",
"addressLine4": "add4",
"city": "cit1",
"state": "state1",
"postalCode": "ha37td",
"telephoneNumber": "123456",
"country": "countr1",
"email": "email1",
"swiftBic": "swftbic1",
"faxno": 765
        }​​​​​​​​
    ],
"userlst": [
        {​​​​​​​​
"userKey": 5,
"userId": "SMEUSER5",
"nationalId": "7865",
"firstName": "priya",
"lastName": "reddy",
"companyName": "xyz",
"address": "fdrew",
"locale": "ghtyr",
"role": "admin",
"profileType": "rtew",
"identifierKey": "frew",
"userName": "ayisha",
"userCreationDate": "2020-03-04",
"email": "fgrte",
"contactNo": 9765433452,
"country": "india",
"language": "tamil",
"groupname": "sme"
        }​​​​​​​​
    ]
}​​​​​​​​




    this.financierService.getSpecificFinancierData(this.financierId).subscribe(resp => {
      let respObj = resp
      this.financierForm = this.fb.group({
        financierId: [respObj.namedPKKey],
        fName: [respObj.financierNameConstitution, Validators.required],
        regNum: [respObj.locregno, Validators.required],
        taxIdNum: [respObj.taxIdentificationNumber, Validators.required],
        regDate: [respObj.registerDate],
        fExpYears: [respObj.financeexpyears, Validators.required],
        activity: [respObj.typeofact],
        principalBankAccount: [respObj.principalBankAccount],
        prncbankbranch: [respObj.prncbankbranch],
        anlScfTrnOver: [respObj.annualSCFTurnOver],
        transLimit: [respObj.transactionLimit],

        // userName : [respObj.userlst[0] && respObj.userlst[0].userName], email : [respObj.userlst[0] && respObj.userlst[0].email],contactNo: [respObj.userlst[0] && respObj.userlst[0].contactNo], 
        // companyName : [respObj.userlst[0] && respObj.userlst[0].companyName],userCreationDate: [respObj.userlst[0] && respObj.userlst[0].userCreationDate],
        //  address: [respObj.userlst[0] && respObj.userlst[0].address], language: [respObj.userlst[0] && respObj.userlst[0].language], country: [respObj.userlst[0] && respObj.userlst[0].country],

        headAddrLine1: [''],
        headAddrLine2: [''],
        headAddrLine3: [''],
        headcity: [''],
        headstate: [''],
        headpostalCode: [''],
        headtelephoneNumber: [''],
        headcountry: [[]],
        heademail: [''],
        headswiftBic: [''],
        headfaxNo: [''],
        servAddrLine1: [''],
        servAddrLine2: [''],
        servAddrLine3: [''],
        servcity: [''],
        servstate: [''],
        paymentCode: [''],
        servpostalCode: [''],
        servtelephoneNumber: [''],
        servemail: [''],
        servswiftBic: [''],
        servfaxNo: [''],
        servCountry: [[]],
        partnerDetails: this.fb.array([]),
        authSign: this.fb.array([]),
        entityAdmin: this.fb.array([])
      })

      //head & service address 
      respObj.addrlst && respObj.addrlst.length && respObj.addrlst.map((item) => {
        if (item.addressType == 'H') {
          item.faxno && this.financierForm.controls['headfaxNo'].setValue(item.faxno)
          item.addressLine1 && this.financierForm.controls['headAddrLine1'].setValue(item.addressLine1)
          item.addressLine2 && this.financierForm.controls['headAddrLine2'].setValue(item.addressLine2)
          item.addressLine3 && this.financierForm.controls['headAddrLine3'].setValue(item.addressLine3)
          if (item.country) {
            let obj = {
              'itemName': item.country
            }
            item.country == 'India' ? obj['id'] = 1 :
              item.country == 'Australia' ? obj['id'] = 2 :
                item.country == 'America' ? obj['id'] = 3 : obj['id'] = 4
            this.financierForm.controls['headcountry'].setValue([obj])
          }
          // item.country && this.financierForm.controls['headcountry'].setValue([{'id':1,itemName:item.country}])
          item.state && this.financierForm.controls['headstate'].setValue(item.state)
          item.city && this.financierForm.controls['headcity'].setValue(item.city)
          item.postalCode && this.financierForm.controls['headpostalCode'].setValue(item.postalCode)
          item.telephoneNumber && this.financierForm.controls['headtelephoneNumber'].setValue(item.telephoneNumber)
          item.email && this.financierForm.controls['heademail'].setValue(item.email)
          item.swiftBic && this.financierForm.controls['headswiftBic'].setValue(item.swiftBic)
        }
        else {
          item.faxno && this.financierForm.controls['servfaxNo'].setValue(item.faxno)
          item.addressLine1 && this.financierForm.controls['servAddrLine1'].setValue(item.addressLine1)
          item.addressLine2 && this.financierForm.controls['servAddrLine2'].setValue(item.addressLine2)
          item.addressLine3 && this.financierForm.controls['servAddrLine3'].setValue(item.addressLine3)
          if (item.country) {
            let obj = {
              'itemName': item.country
            }
            item.country == 'India' ? obj['id'] = 1 :
              item.country == 'Australia' ? obj['id'] = 2 :
                item.country == 'America' ? obj['id'] = 3 : obj['id'] = 4
            this.financierForm.controls['servCountry'].setValue([obj])
          }
          // item.country && this.financierForm.controls['servCountry'].setValue([{'id':1,itemName:item.country}])
          item.state && this.financierForm.controls['servstate'].setValue(item.state)
          item.city && this.financierForm.controls['servcity'].setValue(item.city)
          item.postalCode && this.financierForm.controls['servpostalCode'].setValue(item.postalCode)
          item.telephoneNumber && this.financierForm.controls['servtelephoneNumber'].setValue(item.telephoneNumber)
          item.email && this.financierForm.controls['servemail'].setValue(item.email)
          item.swiftBic && this.financierForm.controls['servswiftBic'].setValue(item.swiftBic)
        }
      })
      //more details datas
      respObj.asocpartylst && respObj.asocpartylst.length && respObj.asocpartylst.map((item) => {
        if (item.assocType == "Director/Partner") {
          let partnerRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            address: [ item.addressLine1 ? item.addressLine1 : ''],
            phoneNo: [item.telephoneNumber ? item.telephoneNumber : ''],
            email: [ item.email ? item.email : '']
          })
          this.partnerFormArray.push(partnerRow);
          this.dataSource1.data = this.partnerFormArray.controls;
        }
        else if (item.assocType == "Authorised Signat") {
          let authRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            address: [ item.addressLine1 ? item.addressLine1 : ''],
            phoneNo: [item.telephoneNumber ? item.telephoneNumber : ''],
            email: [ item.email ? item.email : '']
          })
          this.authoriseFormArray.push(authRow);
          this.dataSource2.data = this.authoriseFormArray.controls;
        }
        else {
          let entityRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            address: [ item.addressLine1 ? item.addressLine1 : ''],
            phoneNo: [item.telephoneNumber ? item.telephoneNumber : ''],
            email: [ item.email ? item.email : '']
          })
          this.entityFormArray.push(entityRow)
          this.dataSource3.data = this.entityFormArray.controls;
        }
      })
    })
  }
  buildFinancierForm() {
    this.financierForm = this.fb.group({
      financierId: [''],
      fName: ['', Validators.required],
      regNum: ['', Validators.required],
      taxIdNum: ['', Validators.required],
      regDate: ['',Validators.required],
      fExpYears: ['', Validators.required],
      activity: [''],
      principalBankAccount: [''],
      prncbankbranch: [''],
      anlScfTrnOver: [''],
      transLimit: [''],

      // userName : ['',Validators.required], email : ['',[Validators.email,Validators.required]],contactNo: ['',Validators.required], 
      // companyName : [''],userCreationDate: [''],
      //  address: [''], language: [''], country: [''],


      headAddrLine1: ['',Validators.required],
      headAddrLine2: [''],
      headAddrLine3: [''],
      headcity: [''],
      headstate: [''],
      headpostalCode: [''],
      headtelephoneNumber: ['',Validators.required],
      headcountry: [[]],
      heademail: ['',[Validators.email,Validators.required]],
      headswiftBic: [''],
      headfaxNo: [''],
      servAddrLine1: ['',Validators.required],
      servAddrLine2: [''],
      servAddrLine3: [''],
      servcity: [''],
      servstate: [''],
      paymentCode: [''],
      servpostalCode: [''],
      servtelephoneNumber: ['',Validators.required],
      servemail: ['',[Validators.email,Validators.required]],
      servswiftBic: [''],
      servfaxNo: [''],
      servCountry: [[]],
      partnerDetails: this.fb.array([]),
      authSign: this.fb.array([]),
      entityAdmin: this.fb.array([])
    })
    const partnerRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: [""]
    })
    const authRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: [""]
    })
    const entityRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: [""]
    })
    this.partnerFormArray.push(partnerRow);
    this.authoriseFormArray.push(authRow);
    this.entityFormArray.push(entityRow)
    this.dataSource1.data = this.partnerFormArray.controls;
    this.dataSource2.data = this.authoriseFormArray.controls;
    this.dataSource3.data = this.entityFormArray.controls;

  }
  get partnerFormArray(): FormArray {
    return this.financierForm.get('partnerDetails') as FormArray;
  }
  get authoriseFormArray(): FormArray {
    return this.financierForm.get('authSign') as FormArray;
  }
  get entityFormArray(): FormArray {
    return this.financierForm.get('entityAdmin') as FormArray;
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item)
  }
  onItemDeSelect(item: any) {
    this.selectedItems.push(item)
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }

   check() {
    // return 
    if(this.financierForm.valid){
      this.onSubmit()
    }else{
      this.toastr.error("Please Enter All Mandatory Fields")
    }
  }

  onSubmit() {    

    let formValues = this.financierForm.value

    // let userlst = [{
    //   userName : formValues.userName, email : formValues.email,contactNo : formValues.contactNo,companyName : formValues.companyName,
    //   userCreationDate : formValues.userCreationDate,address : formValues.address,language : formValues.language,country: formValues.country,
    // }]

    let associatePartyArr = []
    let headAddr = {
      'addressLine1': formValues.headAddrLine1,
      'addressLine2': formValues.headAddrLine2,
      'addressLine3': formValues.headAddrLine3,
      'city': formValues.headcity,
      'state': formValues.headstate,
      'country': formValues.headcountry && formValues.headcountry[0] && formValues.headcountry[0].itemName,
      'telephoneNumber': formValues.headtelephoneNumber,
      'email': formValues.heademail,
      'faxno': formValues.headfaxNo,
      'swiftBic': formValues.headswiftBic,
      "addressType": "H",
    }
    let serviceAddr = {
      'addressLine1': formValues.servAddrLine1,
      'addressLine2': formValues.servAddrLine2,
      'addressLine3': formValues.servAddrLine3,
      'city': formValues.servcity,
      'state': formValues.servstate,
      'country': formValues.servCountry && formValues.servCountry[0] && formValues.servCountry[0].itemName,
      'telephoneNumber': formValues.servtelephoneNumber,
      'email': formValues.servemail,
      'faxNo': formValues.servfaxNo,
      'swiftBic': formValues.servswiftBic,
      "addressType": "S"
    }
    //Parter details
    formValues.partnerDetails && formValues.partnerDetails.map((item => {
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Director/Partner",
        'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email
        // 'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.authSign && formValues.authSign.map((item => {
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Authorised Signat",
        'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email

        // 'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.entityAdmin && formValues.entityAdmin.map((item => {
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Entity Admin",
        'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email

        // 'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    let addrlst = [headAddr, serviceAddr]
    let findetobj = {
      // 'userlst' : userlst,
      'locregno': formValues.regNum,
      'financierNameConstitution': formValues.fName,
      'taxIdentificationNumber': formValues.taxIdNum,
      'financeexpyears': formValues.fExpYears,
      'registerDate': formValues.regDate,
      'typeofact': formValues.activity,
      'principalBankAccount': formValues.principalBankAccount,
      'prncbankbranch': formValues.prncbankbranch,
      'annualSCFTurnOver': formValues.anlScfTrnOver,
      'transactionLimit': formValues.transLimit,
      'addrlst': addrlst,
      'asocpartylst': associatePartyArr
    }
    if (this.financierId) {
      findetobj['namedPKKey'] = parseInt(this.financierId)
    }
    !this.financierId && this.financierService.submitFinancier(findetobj).subscribe(result => {
      //  this.toastr.success('Financier onboard Sucessfully')
      this.toastr.success('Financier onboard Sucessfully')
      this.gotoPage();
    })
    this.financierId && this.financierService.updateFinancier(findetobj).subscribe(result => {
      // this.toastr.success('Financier Updated Sucessfully')
      this.toastr.success('Financier details updated Sucessfully')
      this.gotoPage();
    })

    this.router.navigateByUrl('/financier-user-creation');
  }

  gotoPage() {
    this.router.navigate(['/icc-dashboard']);
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
  }

  logout() {
    this.authenticationService.logout()
  }
  goHome() {
    this.router.navigateByUrl('/icc-dashboard');
  }
  editPath() {
    this.router.navigateByUrl('/financier-onboarding/edit/' + this.financierId)
  }
  removeRow(type,index){
    if (type == 'partner') {
      let removeEntry=this.dataSource1.data
      removeEntry.splice(index,1)
      this.dataSource1.data=removeEntry
    }
    else if (type == 'auth') {
      let removeEntry=this.dataSource2.data
      removeEntry.splice(index,1)
      this.dataSource2.data=removeEntry
    }
    else {
      let removeEntry=this.dataSource3.data
      removeEntry.splice(index,1)
      this.dataSource3.data=removeEntry
    }
  }
}
