import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../service/authentication/authentication.service';

import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancierOnboardingService } from './financier-onboarding.service';
import { ToastrService } from 'ngx-toastr';
import {Validation} from '../../service/Validation'
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import { FinancierUserCreationService } from './financier-user-creation/financier-user-creation.service'
import { IccCountryServices } from '../icc-country/icc-country.services'

const ELEMENT_DATA: any[] = [
  {
    uniqueId : '',
    Name: '',
    Position: '',
    // Address: '',
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

  isOpen = '';
  financierForm: FormGroup
  financierId = ''
  validation: any = Validation;
  biddingTooltip = BIDDINGCONSTANTS;
  userDataSource = new MatTableDataSource();
  companyid;
  errorColor = ""
  errorColor1 = ""


  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private fb: FormBuilder,
     public authenticationService: AuthenticationService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private financierService: FinancierOnboardingService, private FinancierUserCreationService: FinancierUserCreationService,
    private IccCountryServices:IccCountryServices) {
  }

  dataSource1 = new MatTableDataSource(ELEMENT_DATA); //data
  dataSource2 = new MatTableDataSource(ELEMENT_DATA); //data
  dataSource3 = new MatTableDataSource(ELEMENT_DATA); //data

  // , 'Address'
  displayedColumns: string[] = ['uniqueId','name','Position', 'TelephoneNo', 'Email'];
  displayedColumnsUser: string[] = ['userId','firstName', 'lastName', 'emailId', 'phoneNumber', 'action'];


  name = "Angular";
  cities: Array<ICity> = [];
  selectedItems: Array<ICity> = [];
  dropdownSettings = {
  };
  isView = false

  ngOnInit() {
    this.cities = [
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
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   // this.financierId=params.id
    //   // let id = params.id && params.id.split('FIN')
    //   // this.financierId = id && id[1] ? id[1] : ''
    //   
    //   this.financierId = params.id
    //   this.isView = params.edit == 'view' ? true : false
    // })


    this.financierId = this.activatedRoute.snapshot.paramMap.get("id")
    this.isView = this.activatedRoute.snapshot.paramMap.get("edit") == 'view' ? true : false


    this.buildFinancierForm()
    this.isView && this.disableFields()
    this.financierId && this.getSpecificFinancier()

    // this.userDataSource = new MatTableDataSource([{'userId':1,
    // 'firstName':"11",
    // 'lastName':"980",
    // 'companyName':"lkjlk",
    // 'email':"jklk",
    // 'contactNo':"ipoip",
    // 'status':'A'
    // },{'userId':1,
    // 'firstName':"11",
    // 'lastName':"980",
    // 'companyName':"lkjlk",
    // 'email':"jklk",
    // 'contactNo':"ipoip",
    // 'status':'R'
    // }])
    this.getAllCountry()
  }

  public setTwoNumberDecimal($event,name) {
    if(this.chkDecimalLength($event.target.value) >= 2){
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.financierForm.patchValue({ [name] : parseFloat($event.target.value).toFixed(2) })
    }
  }
  
  chkDecimalLength (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
    }

  getAllCountry(){
    this.IccCountryServices.getAllcountry().subscribe(resp => {    
      let countryArray = []

      resp && resp.map(item =>{
        let obj =  { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
    
      this.cities = countryArray
    
    })
      }

  getUserList(finDetailId){
    this.FinancierUserCreationService.getAlUserList(finDetailId).subscribe(resp => {
      this.userDataSource = new MatTableDataSource(resp);
      // this.dataSource.paginator = this.paginator
    })
  }




  disableFields() {
    // this.financierForm.controls['fName'].disable();
    this.dropdownSettings['disabled'] = true
  }
  addRow(type) {
    const partnerRow = this.fb.group({
      name: [""],
      position: [""],
      // address: [""],
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

   
    

// let respObj = {​​​​​​​​
// "profileID": 2,
// "namedPKKey": 1,
// "companyid": 1,
// "financierNameConstitution": 1,
// "taxIdentificationNumber": 1,
// "principalBankAccount": 1,
// "registerDate": 1,
// "financierType": 1,
// "annualSCFTurnOver": 50000,
// "annualSCFTurnOverCCY": 1,
// "transactionLimit": 1,
// "transactionLimitCCY": 1,
// "hQLimit": 1,
// "serviceAddress": 1,
// "financeexpyears": 1,
// "locregno": 1,
// "typeofact": 1,
// "prncbankbranch": 1,
// "finseq": 1,
// "asocpartylst": [
//         {​​​​​​​​
// "partyKey": 3,
// "profileID": 7654,
// "name": "preethi",
// "position": "gtyu",
// "assocType": "type",
// "addressType": "S",
// "addressLine1": "add1",
// "addressLine2": "add2",
// "addressLine3": "add3",
// "addressLine4": "add4",
// "city": "cit1",
// "state": "state1",
// "postalCode": "ha37td",
// "telephoneNumber": "123456",
// "country": "countr1",
// "email": "email1",
// "swiftBic": "swftbic1",
// "faxno": 765
//         }​​​​​​​​,
//         {​​​​​​​​
// "partyKey": 4,
// "profileID": 7654,
// "name": "preethi",
// "position": "gtyu",
// "assocType": "type",
// "addressType": "H",
// "addressLine1": "add1",
// "addressLine2": "add2",
// "addressLine3": "add3",
// "addressLine4": "add4",
// "city": "cit1",
// "state": "state1",
// "postalCode": "ha37td",
// "telephoneNumber": "123456",
// "country": "countr1",
// "email": "email1",
// "swiftBic": "swftbic1",
// "faxno": 765
//         }​​​​​​​​
//     ],
// "userlst": [
//         {​​​​​​​​
// "userKey": 5,
// "userId": "SMEUSER5",
// "nationalId": "7865",
// "firstName": "priya",
// "lastName": "reddy",
// "companyName": "xyz",
// "address": "fdrew",
// "locale": "ghtyr",
// "role": "admin",
// "profileType": "rtew",
// "identifierKey": "frew",
// "userName": "ayisha",
// "userCreationDate": "2020-03-04",
// "email": "fgrte",
// "contactNo": 9765433452,
// "country": "india",
// "language": "tamil",
// "groupname": "sme"
//         }​​​​​​​​
//     ]
// }​​​​​​​​


    this.financierService.getSpecificFinancierData(this.financierId).subscribe(resp => {
      let respObj = resp
       this.getUserList(respObj.companyid)
       this.companyid = respObj.companyid
      this.financierForm = this.fb.group({
        financierId: [respObj.namedPKKey],
        fName: [respObj.financierNameConstitution, Validators.required],
        regNum: [respObj.locregno,[Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)] ],
        taxIdNum: [respObj.taxIdentificationNumber, Validators.required],
        regDate: [respObj.registerDate],
        fExpYears: [respObj.financeexpyears, Validators.required],
        activity: [respObj.typeofact],
        principalBankAccount: [respObj.principalBankAccount,[Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/),Validators.maxLength(34)]],
        prncbankbranch: [respObj.prncbankbranch],
        anlScfTrnOver: [respObj.annualSCFTurnOver],
        transLimit: [respObj.transactionLimit],
        currency: [respObj.currency],


        // userName : [respObj.userlst[0] && respObj.userlst[0].userName], email : [respObj.userlst[0] && respObj.userlst[0].email],contactNo: [respObj.userlst[0] && respObj.userlst[0].contactNo], 
        // companyName : [respObj.userlst[0] && respObj.userlst[0].companyName],userCreationDate: [respObj.userlst[0] && respObj.userlst[0].userCreationDate],
        //  address: [respObj.userlst[0] && respObj.userlst[0].address], language: [respObj.userlst[0] && respObj.userlst[0].language], country: [respObj.userlst[0] && respObj.userlst[0].country],

        headAddrLine1: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].addressLine1,Validators.required],
        headAddrLine2: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].addressLine2],
        headAddrLine3: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].addressLine3],
        headcity: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].city],
        headstate: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].state],
        headpostalCode: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].postalCode],
        headtelephoneNumber: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].telephoneNumber,Validators.required],
        headcountry: [[]],
        heademail: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].email,Validators.required],
      
        // postalCode: [respObj.postalCode],

        headswiftBic: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].swiftBic],
        headfaxNo: [resp.asocpartylst && resp.asocpartylst[0] && resp.asocpartylst[0].faxno],

        servAddrLine1: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].addressLine1,Validators.required],
        servAddrLine2: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].addressLine2],
        servAddrLine3: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].addressLine3],
        servcity: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].city],
        servstate: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].state],
        paymentCode: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].paymentCode],
        servpostalCode: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].postalCode],
        servtelephoneNumber: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].telephoneNumber,Validators.required],
        servemail: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].email,Validators.required],
        servswiftBic: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].swiftBic],
        servfaxNo: [resp.asocpartylst && resp.asocpartylst[1] && resp.asocpartylst[1].faxno],
        servCountry: [[],Validators.required],
        partnerDetails: this.fb.array([]),
        authSign: this.fb.array([]),
        entityAdmin: this.fb.array([])
      })

      //head & service address 
      respObj.finAdressLst && respObj.finAdressLst.length && respObj.finAdressLst.map((item) => {
        if (item.addressType == 'H') {
          item.faxno && this.financierForm.controls['headfaxNo'].setValue(item.faxno)
          item.addressLine1 && this.financierForm.controls['headAddrLine1'].setValue(item.addressLine1)
          item.addressLine2 && this.financierForm.controls['headAddrLine2'].setValue(item.addressLine2)
          item.addressLine3 && this.financierForm.controls['headAddrLine3'].setValue(item.addressLine3)
          if (item.country) {
            let obj = {
              'itemName': item.country
            }

            const result = this.cities && this.cities.filter(country => country.itemName == item.country);
            obj['id'] = result['id']


            // item.country == 'India' ? obj['id'] = 1 :
            //   item.country == 'Australia' ? obj['id'] = 2 :
            //     item.country == 'America' ? obj['id'] = 3 : obj['id'] = 4
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
            const result = this.cities && this.cities.filter(country => country.itemName == item.country);
            obj['id'] = result['id']
            // item.country == 'India' ? obj['id'] = 1 :
            //   item.country == 'Australia' ? obj['id'] = 2 :
            //     item.country == 'America' ? obj['id'] = 3 : obj['id'] = 4
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
      if( respObj.asocpartylst && respObj.asocpartylst.length >= 1){      
      respObj.asocpartylst && respObj.asocpartylst.length && respObj.asocpartylst.map((item) => {
        if (item.assocType == "Director/Partner") {
          let partnerRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            // address: [ item.addressLine1 ? item.addressLine1 : ''],
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
            // address: [ item.addressLine1 ? item.addressLine1 : ''],
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
            // address: [ item.addressLine1 ? item.addressLine1 : ''],
            phoneNo: [item.telephoneNumber ? item.telephoneNumber : ''],
            email: [ item.email ? item.email : ''] 
          })
          this.entityFormArray.push(entityRow)
          this.dataSource3.data = this.entityFormArray.controls;
        }
      })
    }else{
      const partnerRow = this.fb.group({
        name: [""],
        position: [""],
        // address: [""],
        phoneNo: [""],
        email: [""]
      })
      const authRow = this.fb.group({
        name: [""],
        position: [""],
        // address: [""],
        phoneNo: [""],
        email: [""]
      })
      const entityRow = this.fb.group({
        name: [""],
        position: [""],
        // address: [""],
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
    })
  }
  buildFinancierForm() {
    this.financierForm = this.fb.group({
      financierId: [''],
      fName: ['', Validators.required],
      regNum: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      taxIdNum: ['', [Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      regDate: ['',Validators.required],
      fExpYears: ['', Validators.required],
      activity: ['',Validators.required],
      principalBankAccount: ['',[Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/),Validators.maxLength(34)]],
      prncbankbranch: ['',Validators.required],
      anlScfTrnOver: ['',Validators.required],
      transLimit: ['',Validators.required],
      // postalCode: [''],
      currency: ['',Validators.required],


      // userName : ['',Validators.required], email : ['',[Validators.email,Validators.required]],contactNo: ['',Validators.required], 
      // companyName : [''],userCreationDate: [''],
      //  address: [''], language: [''], country: [''],


      headAddrLine1: ['',Validators.required],
      headAddrLine2: [''],
      headAddrLine3: [''],
      headcity: ['',Validators.required],
      headstate: ['',Validators.required],
      headpostalCode: ['',Validators.required],
      headtelephoneNumber: ['',Validators.required],
      headcountry: [[],Validators.required],
      heademail: ['',[Validators.email,Validators.required]],
      headswiftBic: ['',[Validators.required, Validators.pattern(/^[0-9a-zA-Z]+$/),Validators.maxLength(11)]],
      headfaxNo: ['',Validators.required],
      servAddrLine1: ['',Validators.required],
      servAddrLine2: [''],
      servAddrLine3: [''],
      servcity: ['',Validators.required],
      servstate: [''],
      paymentCode: [''],
      servpostalCode: ['',Validators.required],
      servtelephoneNumber: ['',Validators.required],
      servemail: ['',[Validators.email,Validators.required]],
      servswiftBic: ['',Validators.required],
      servfaxNo: ['',Validators.required],
      servCountry: [[],Validators.required],
      partnerDetails: this.fb.array([]),
      authSign: this.fb.array([]),
      entityAdmin: this.fb.array([])
    })
    const partnerRow = this.fb.group({
      uniqueId: ["",Validators.required],
      name: ["",Validators.required],
      position: ["",Validators.required],
      // address: [""],
      phoneNo: ["",Validators.required],
      email: ["",Validators.required]
    })
    const authRow = this.fb.group({
      uniqueId: ["",Validators.required],
      name: ["",Validators.required],
      position: ["",Validators.required],
      // address: [""],
      phoneNo: ["",Validators.required],
      email: ["",Validators.required]
    })
    const entityRow = this.fb.group({
      uniqueId: ["",Validators.required],
      name: ["",Validators.required],
      position: ["",Validators.required],
      // address: [""],
      phoneNo: ["",Validators.required],
      email: ["",Validators.required]
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
  onHeadCountrySelect(item: any) {
    this.errorColor = ""
  }

  onHeadCountryDeSelect(item : any){
    this.errorColor = "error-color"
  }

  onServeCountrySelect(item: any) {
    this.errorColor1 = ""
  }

  onServeCountryDeSelect(item : any){
    this.errorColor1 = "error-color"
  }

  // onClose(item : any){
  //   debugger
  //   this.checkHeadCountryData(this.financierForm.value && this.financierForm.value.headcountry && this.financierForm.value.headcountry[0])
  // } 

  checkHeadCountryData(data){
if(data && data.itemName){
  this.errorColor = ""
}else{
  this.errorColor = "error-color"
}
  }
  checkServeCountryData(data){
    if(data && data.itemName){
      this.errorColor1 = ""
    }else{
      this.errorColor1 = "error-color"
    }
      }

   check() {
    if(this.financierForm.valid){
      this.onSubmit()
    }else{
      this.checkHeadCountryData(this.financierForm.value && this.financierForm.value.headcountry && this.financierForm.value.headcountry[0])
      this.checkServeCountryData(this.financierForm.value && this.financierForm.value.servCountry && this.financierForm.value.servCountry[0])

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
      'postalCode':formValues.headpostalCode,
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
      'postalCode':formValues.servpostalCode, 
      'paymentCode' : formValues.paymentCode, 
      'swiftBic': formValues.servswiftBic,
      "addressType": "S"
    }
    //Parter details
    ;

    formValues.partnerDetails && formValues.partnerDetails.map((item => {
      ;
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Director/Partner",
        // 'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.authSign && formValues.authSign.map((item => {
      ;
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Authorised Signat",
        // 'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email

      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.entityAdmin && formValues.entityAdmin.map((item => {
      ;
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Entity Admin",
        // 'addressLine1': item.address,
        'telephoneNumber': item.phoneNo,
        'email': item.email
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    let finAdressLst = [headAddr, serviceAddr]
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
      // 'postalCode': formValues.postalCode,
      'currency': formValues.currency,
      'finAdressLst': finAdressLst,
      'asocpartylst': associatePartyArr
    }
    if (this.financierId) {
      findetobj['namedPKKey'] = parseInt(this.financierId)
    }
    !this.financierId && this.financierService.submitFinancier(findetobj).subscribe(result => {
      if(result){
        this.toastr.success('Financier onboard Sucessfully')
        // this.router.navigate(['financier-user-creation', {  finDetailId: result.profileID }]);  
        // this.router.navigate(['/financier-user-creation'], {queryParams: {finDetailId: result.profileID}});
        this.router.navigateByUrl('/financier-user-creation/'+result.profileID+'/'+result.companyid);

      }
   
    })
    this.financierId && this.financierService.updateFinancier(findetobj).subscribe(result => {
      if(result){
        this.toastr.success('Financier details updated Sucessfully')
        this.gotoPage()
      } 
    })
  }

  gotoPage() {
    this.router.navigate(['/icc-dashboard']);
  }

  navigateUserAdd(){
     this.router.navigateByUrl('/financier-user-details/'+this.financierId+'/'+this.companyid +'/');
  }

  navigateUserEdit(data){
    this.router.navigateByUrl('/financier-user-details/'+this.financierId+'/'+this.companyid +'/'+data.usersKey);
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
  cancel() {
    this.buildFinancierForm();
    this.goHome();
  }
}
