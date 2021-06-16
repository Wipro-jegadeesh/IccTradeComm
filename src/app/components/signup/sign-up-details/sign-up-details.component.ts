import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from '../signup.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import {SIGNUPSECTORS} from '../../../shared/constants/signUpSectors'
import {LANGUAGES} from '../../../shared/constants/Languages'
import { IccCountryServices } from '../../icc-country/icc-country.services'
import {TranslateService} from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.scss']
})
export class SignUpDetailsComponent implements OnInit {
  userForm: FormGroup;
  signUpDetails:any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  bidpanelOpenState = false;
  // sectorOptionsDatas=[]
  // sectordropdownSettings:any={}
  // selectedItems=[]
  sectors: any;
  languages  = [{"id":"en","itemName":"English","nativeName":"English"},
  {"id":"es","itemName":"Espano","nativeName":"Español"}
]


  constructor(public translate: TranslateService,private toastr: ToastrService,private router: Router,private SignupServices: SignupService,
    private fb: FormBuilder,private IccCountryServices:IccCountryServices,private apiService:ApiService) { }

  name = "";
  optionDatas=[]
  // dropdownSettings:any={}
  selectedItems=[]
  sectorOptionsDatas=[]
  sectordropdownSettings:any={}


  LanguagesOptions=[]
  languageDropdownSettings:any={}
  languageSelectedItems=[]

  dropdownList = [];
  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  // languageDropdownSettings:IDropdownSettings = {
  //   singleSelection: true,
  //   idField: 'id',
  //   textField: 'itemName',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 3,
  //   allowSearchFilter: true
  // };
  ngOnInit(): void {
    console.log(this.translate,"translate")
    console.log(this.translate.instant('Basic Details'));
    this.getAllCountry()
    this.signUpDetails =  JSON.parse(localStorage.getItem("signUpDetails"))
    this.sectorOptionsDatas = SIGNUPSECTORS
    this.LanguagesOptions = [{"id":"en","itemName":"English","nativeName":"English"},{"id":"es","itemName":"Espano","nativeName":"Español"}]

    
    this.languageDropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position:'bottom',
      text:this.translate.instant('Select Language'),
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };

    this.signupFormBuild()
    // this.dropdownSettings = {
    //   singleSelection: true ,
    //   defaultOpen: false,
    //   idField: "item_id",
    //   textField: "item_text",
    //   allowSearchFilter: true,
    //   showCheckbox: false,
    //   position:'bottom',
    //   text:this.translate.instant('Select Country'),
    //   enableSearchFilter : true,
    //   autoPosition : false,
    //   maxHeight	: 170
    // };
    this.sectordropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "sector_id",
      textField: "sector_text",
      allowSearchFilter: true,
      showCheckbox: false,
      position:'bottom',
      text:'Select Sector',
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };
    this.selectedItems=[]

    this.SignupServices.getAllRoles().subscribe(listResp => {
      if(listResp){
        this.sectors = listResp
      }
    })
  }
  
  setlocalstroageLanguage(value){
    localStorage.setItem("DefultLanguage",value);
    console.log(this.translate,"this.translate")
    console.log(this.translate.instant('Select Country'),"this.translate.instant('Select Country')")
  }
  getAllCountry(){
    this.IccCountryServices.getAllcountry().subscribe(resp => {    
      let countryArray = []

      resp && resp.map(item =>{
        let obj =  { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
    
      this.optionDatas = countryArray
    
    })
      }

  onDeSelect(event) {
  
  }
  onKey(value) { 
    this.languages = this.search(value);
  }
  search(value: string) { 
      let filter = value.toLowerCase();
      return this.languages.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onChange(event){
   
   }
  signupFormBuild() {
    
    this.userForm = this.fb.group({
      userId: [''],
      nationalId: [this.signUpDetails ? this.signUpDetails.nationalId : '' , Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      companyName: [this.signUpDetails ? this.signUpDetails.companyName : '', Validators.required], 
      address:['',Validators.required],
      address1:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      postalCode:['',Validators.required],
      sector:[''],
      country:[[],Validators.required],
      language:[[],Validators.required],
      // country:[this.signUpDetails ? this.signUpDetails.country[0].itemName : '' ,Validators.required],
      role:[''],
      profileType:['SME',Validators.required],
    });

    let data = this.signUpDetails ? this.signUpDetails.country[0].itemName : ''
    this.setCountryValue(data)

    let obj={
      'registrationId':this.signUpDetails  ? this.signUpDetails.nationalId : '',
      'companyName':this.signUpDetails ? this.signUpDetails.companyName: '',
      'country':this.signUpDetails ? this.signUpDetails.country[0].id:'',
    }
    this.SignupServices.getUserDetails(obj).subscribe(resp=>{
      if(resp){
        resp.sectionDtoList[0].sectionResponse && resp.sectionDtoList[0].sectionResponse.responses.map((item,index)=>{
           switch(item.questionAlias){
             case 'name':
               this.userForm.get("firstName").setValue(item.value);
               break;
             case 'email':
              this.userForm.get("email").setValue(item.value);
              break;
             case 'address-line-1':
              this.userForm.get("address").setValue(item.value);
              break;
            case 'telephone-mobile':
              this.userForm.get("contactNo").setValue(item.value);
              break;
            case 'city':
            this.userForm.get("city").setValue(item.value);
            break;
            default:
           }
         })
      }
    })
    
  }


  setCountryValue(country){
    if(country){
    let obj = {
      'itemName': country
    }

    const result = this.optionDatas && this.optionDatas.filter(country => country.itemName == country);
    obj['id'] = result['id']
    this.userForm.controls['country'].setValue([obj])
  }
    }


  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

 fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => { 
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }
  onSubmitInvoiceForm() {
    try {
      console.log(this.userForm,"this.userForm.value")
      console.log(this.userForm.value,"this.userForm.value")
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
      console.log(this.userForm.value,"this.userForm.value")
      console.log(this.userForm,"this.userForm.value")
      
      let addrlst = [{
          addressLine1: this.userForm.value.address,
          addressLine2: this.userForm.value.address1,
          addressLine3:'',
          addressLine4: '',
          city: this.userForm.value.city,
          state: this.userForm.value.state,
          postalCode: this.userForm.value.postalCode,
          country: this.userForm.value.country && this.userForm.value.country[0] && this.userForm.value.country[0].itemName,
          telephoneno: this.userForm.value.contactNo,
          email: this.userForm.value.email,
          swiftBic: '',
          addressType:''
        }]

      let userList = [{
        userId: this.userForm.value.userId,
        nationalId: this.userForm.value.nationalId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        companyName: this.userForm.value.companyName,
        address: this.userForm.value.address,
        locale: this.userForm.value.city,
        role: this.userForm.value.role,
        profileType: this.userForm.value.profileType,
        email: this.userForm.value.email,
        contactNo: this.userForm.value.contactNo,
        country:  this.userForm.value.country && this.userForm.value.country[0] && this.userForm.value.country[0].itemName,
        language: this.userForm.value.language && this.userForm.value.language[0] && this.userForm.value.language[0].itemName
      }]
      let smeboard = {
        corporateCode: '',
        name: this.userForm.value.companyName,
        registrationNumber: this.userForm.value.nationalId,
        taxNo: '',
        rating: '',
        sector:this.userForm.value.sector,
        addrlst :addrlst,
        userlst : userList
      };
      let smeboards = {
        smeboard:smeboard
      }
      console.log(smeboards,"smeboards")
       
    this.SignupServices.Usersave(smeboards).subscribe(resp => {
            if(resp && resp.status == 200){
                    this.signupFormBuild();
                    // this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/fetchScoreByCompany/' + smeboard.registrationNumber + '/' + smeboard.name + '/' + smeboard.country).subscribe(resp=>{
                    //   let obj={
                    //       "smeRating":resp.score,
                    //   }
                      
                    //     this.apiService.put(environment.financierServicePath + 'sme-profile/smeRating/' + userCred.companyId , obj).subscribe(scoreUpdateResp=>{
          
                    //     })
                    // })
                    this.toastr.success("SME created succesfully kindly login with your credentials")
                    window.location.href = "/"
            }
          },error => {
            error && error.error && error.error.msg ? 
            this.toastr.error(this.replaceCommaLine(error.error.msg),'',
            {timeOut: 4000, progressBar: true, enableHtml: true}) :
             this.toastr.error('Error')
      })
                
    } catch (err) {
    }
  }
  replaceCommaLine(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join("</br>");
  }
}
