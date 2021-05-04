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
            address: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].addressLine1 ? item.assocaddrlst[0].addressLine1 : ''],
            phoneNo: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].telephoneNumber ? item.assocaddrlst[0].telephoneNumber : ''],
            email: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].email ? item.assocaddrlst[0].email : '']
          })
          this.partnerFormArray.push(partnerRow);
          this.dataSource1.data = this.partnerFormArray.controls;
        }
        else if (item.assocType == "Authorised Signat") {
          let authRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            address: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].addressLine1 ? item.assocaddrlst[0].addressLine1 : ''],
            phoneNo: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].telephoneNumber ? item.assocaddrlst[0].telephoneNumber : ''],
            email: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].email ? item.assocaddrlst[0].email : '']
          })
          this.authoriseFormArray.push(authRow);
          this.dataSource2.data = this.authoriseFormArray.controls;
        }
        else {
          let entityRow = this.fb.group({
            name: [item.name ? item.name : ''],
            position: [item.position ? item.position : ''],
            address: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].addressLine1 ? item.assocaddrlst[0].addressLine1 : ''],
            phoneNo: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].telephoneNumber ? item.assocaddrlst[0].telephoneNumber : ''],
            email: [item.assocaddrlst && item.assocaddrlst[0] && item.assocaddrlst[0].email ? item.assocaddrlst[0].email : '']
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
      email: ["",Validators.email]
    })
    const authRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: ["",Validators.email]
    })
    const entityRow = this.fb.group({
      name: [""],
      position: [""],
      address: [""],
      phoneNo: [""],
      email: ["",Validators.email]
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
  get check() {
    return this.financierForm.valid
  }

  onSubmit() {
    let formValues = this.financierForm.value
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
        'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.authSign && formValues.authSign.map((item => {
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Authorised Signat",
        'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    formValues.entityAdmin && formValues.entityAdmin.map((item => {
      let hasValue = Object.values(item).filter(x => x)
      let partnerObj = {
        'name': item.name,
        'position': item.position,
        'assocType': "Entity Admin",
        'assocaddrlst': [{ 'addressLine1': item.address, 'telephoneNumber': item.phoneNo, 'email': item.email }]
      }
      hasValue.length && associatePartyArr.push(partnerObj)
    }))
    let addrlst = [headAddr, serviceAddr]
    let findetobj = {
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
