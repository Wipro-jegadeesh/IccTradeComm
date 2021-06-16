import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import {COUNTRYNAMES} from '../../shared/constants/Country'
import {SIGNUPSECTORS} from '../../shared/constants/signUpSectors'

import { SignupService } from './signup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccUserCreationService } from '../icc-user-creation/icc-user-creation.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IccCountryServices } from '../icc-country/icc-country.services'
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from '../../shared/constants/Languages';

interface ICity{
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  country: string;
  CountryPin: string;
  invalidLogin = false
  selectedItem;
  CountryPinLabel;
  showCountSignBtn =false;
  closeDropDownOnSelection
  type: string;
  signUpDiv: boolean;
  signUpDetails:any;
  modalRef: BsModalRef;
  languages = [{"id":"en","itemName":"English","nativeName":"English"},
      {"id":"es","itemName":"Espano","nativeName":"Español"}
]
  countryId : any

  constructor(public translate: TranslateService,private modalService: BsModalService,private IccUserCreationssService: IccUserCreationService,private fb: FormBuilder,private activatedRoute: ActivatedRoute,private router: Router,
    private signupService:SignupService,private IccCountryServices:IccCountryServices,
    private toastr: ToastrService) { }

  
  name = "";
  optionDatas=[]
  dropdownSettings:any={}
  selectedItems=[]
  sectorOptionsDatas=[]
  sectordropdownSettings:any={}

  ngOnInit() {
    // this.optionDatas = COUNTRYNAMES
    this.getAllCountry()

    this.sectorOptionsDatas = SIGNUPSECTORS
    this.dropdownSettings = {
      singleSelection: true ,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      showCheckbox: false,
      // position:'bottom',
      text:'Select Country',
      enableSearchFilter : true,
      autoPosition : false,
      maxHeight	: 170
    };
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
    localStorage.clear();
  }
  setlocalstroageLanguage(value){
    localStorage.setItem("DefultLanguage",value);
  }
  getAllCountry(){
    this.IccCountryServices.getAllcountry().subscribe(resp => {    
      let countryArray = []
      resp && resp.map((item,index) =>{
        // if(item.country == "Singapore"){
        //   debugger;
        // }
        let obj =  { id: item.countrycode3, itemName: item.country }
        countryArray.push(obj)
      })
      this.optionDatas = countryArray
    })

    // let resp = [{"id":1,"country":"Afghanistan","countrycode2":"AF","countrycode3":"AFG","numeric":4},{"id":2,"country":"Albania","countrycode2":"AL","countrycode3":"ALB","numeric":8},{"id":3,"country":"Algeria","countrycode2":"DZ","countrycode3":"DZA","numeric":12},{"id":4,"country":"American Samoa","countrycode2":"AS","countrycode3":"ASM","numeric":16},{"id":5,"country":"Andorra","countrycode2":"AD","countrycode3":"AND","numeric":20},{"id":6,"country":"Angola","countrycode2":"AO","countrycode3":"AGO","numeric":24},{"id":7,"country":"Anguilla","countrycode2":"AI","countrycode3":"AIA","numeric":660},{"id":8,"country":"Antarctica","countrycode2":"AQ","countrycode3":"ATA","numeric":10},{"id":9,"country":"Antigua and Barbuda","countrycode2":"AF","countrycode3":"ATG","numeric":28},{"id":10,"country":"Argentina","countrycode2":"AR","countrycode3":"ARG","numeric":32},{"id":11,"country":"Armenia","countrycode2":"AM","countrycode3":"ARM","numeric":51},{"id":12,"country":"Aruba","countrycode2":"AW","countrycode3":"ABW","numeric":533},{"id":13,"country":"Australia","countrycode2":"AU","countrycode3":"AUS","numeric":36},{"id":14,"country":"Austria","countrycode2":"AT","countrycode3":"AUT","numeric":40},{"id":15,"country":"Azerbaijan","countrycode2":"AZ","countrycode3":"AZE","numeric":31},{"id":16,"country":"Bahamas (the)","countrycode2":"BS","countrycode3":"BHS","numeric":44},{"id":17,"country":"Bahrain","countrycode2":"BH","countrycode3":"BHR","numeric":48},{"id":18,"country":"Bangladesh","countrycode2":"BD","countrycode3":"BGD","numeric":50},{"id":19,"country":"Barbados","countrycode2":"BB","countrycode3":"BRB","numeric":52},{"id":20,"country":"Belarus","countrycode2":"BY","countrycode3":"BLR","numeric":112},{"id":21,"country":"Belgium","countrycode2":"BE","countrycode3":"BEL","numeric":56},{"id":22,"country":"Belize","countrycode2":"BZ","countrycode3":"BLZ","numeric":84},{"id":23,"country":"Benin","countrycode2":"BJ","countrycode3":"BEN","numeric":204},{"id":24,"country":"Bermuda","countrycode2":"BM","countrycode3":"BMU","numeric":60},{"id":25,"country":"Bhutan","countrycode2":"BT","countrycode3":"BTN","numeric":64},{"id":26,"country":"Bolivia (Plurinational State of)","countrycode2":"BO","countrycode3":"BOL","numeric":68},{"id":27,"country":"Bonaire, Sint Eustatius and Saba","countrycode2":"BQ","countrycode3":"BES","numeric":535},{"id":28,"country":"Bosnia and Herzegovina","countrycode2":"BA","countrycode3":"BIH","numeric":70},{"id":29,"country":"Botswana","countrycode2":"BW","countrycode3":"BWA","numeric":72},{"id":30,"country":"Bouvet Island","countrycode2":"BV","countrycode3":"BVT","numeric":74},{"id":31,"country":"Brazil","countrycode2":"BR","countrycode3":"BRA","numeric":76},{"id":32,"country":"British Indian Ocean Territory (the)","countrycode2":"IO","countrycode3":"IOT","numeric":86},{"id":33,"country":"Brunei Darussalam","countrycode2":"BN","countrycode3":"BRN","numeric":96},{"id":34,"country":"Bulgaria","countrycode2":"BG","countrycode3":"BGR","numeric":100},{"id":35,"country":"Burkina Faso","countrycode2":"BF","countrycode3":"BFA","numeric":854},{"id":36,"country":"Burundi","countrycode2":"BI","countrycode3":"BDI","numeric":108},{"id":37,"country":"Cabo Verde","countrycode2":"CV","countrycode3":"CPV","numeric":132},{"id":38,"country":"Cambodia","countrycode2":"KH","countrycode3":"KHM","numeric":116},{"id":39,"country":"Cameroon","countrycode2":"CM","countrycode3":"CMR","numeric":120},{"id":40,"country":"Canada","countrycode2":"CA","countrycode3":"CAN","numeric":124},{"id":41,"country":"Cayman Islands (the)","countrycode2":"KY","countrycode3":"CYM","numeric":136},{"id":42,"country":"Central African Republic (the)","countrycode2":"CF","countrycode3":"CAF","numeric":140},{"id":43,"country":"Chad","countrycode2":"TD","countrycode3":"TCD","numeric":148},{"id":44,"country":"Chile","countrycode2":"CL","countrycode3":"CHL","numeric":152},{"id":45,"country":"China","countrycode2":"CN","countrycode3":"CHN","numeric":156},{"id":46,"country":"Cocos (Keeling) Islands (the)","countrycode2":"CC","countrycode3":"CCK","numeric":166},{"id":47,"country":"Colombia","countrycode2":"CO","countrycode3":"COL","numeric":170},{"id":48,"country":"Comoros (the)","countrycode2":"KM","countrycode3":"COM","numeric":174},{"id":49,"country":"Congo (the Democratic Republic of the)","countrycode2":null,"countrycode3":"COD","numeric":180},{"id":50,"country":"Congo (the)","countrycode2":"CG","countrycode3":"COG","numeric":178},{"id":51,"country":"Cook Islands (the)","countrycode2":"CK","countrycode3":"COK","numeric":184},{"id":52,"country":"Costa Rica","countrycode2":"CR","countrycode3":"CRI","numeric":188},{"id":53,"country":"Croatia","countrycode2":"HR","countrycode3":"HRV","numeric":191},{"id":54,"country":"Cuba","countrycode2":"CU","countrycode3":"CUB","numeric":192},{"id":55,"country":"Curaçao","countrycode2":"CW","countrycode3":"CUW","numeric":531},{"id":56,"country":"Cyprus","countrycode2":"CY","countrycode3":"CYP","numeric":196},{"id":57,"country":"Czechia","countrycode2":"CZ","countrycode3":"CZE","numeric":203},{"id":58,"country":"Côte d'Ivoire","countrycode2":"CI","countrycode3":"CIV","numeric":384},{"id":59,"country":"Denmark","countrycode2":"DK","countrycode3":"DNK","numeric":208},{"id":60,"country":"Djibouti","countrycode2":"DJ","countrycode3":"DJI","numeric":262},{"id":61,"country":"Dominica","countrycode2":"DM","countrycode3":"DMA","numeric":212},{"id":62,"country":"Dominican Republic (the)","countrycode2":"DO","countrycode3":"DOM","numeric":214},{"id":63,"country":"Ecuador","countrycode2":"EC","countrycode3":"RUC","numeric":218},{"id":64,"country":"Egypt","countrycode2":"EG","countrycode3":"EGY","numeric":818},{"id":65,"country":"El Salvador","countrycode2":"SV","countrycode3":"SLV","numeric":222},{"id":66,"country":"Equatorial Guinea","countrycode2":"GQ","countrycode3":"GNQ","numeric":226},{"id":67,"country":"Eritrea","countrycode2":"ER","countrycode3":"ERI","numeric":232},{"id":68,"country":"Estonia","countrycode2":"EE","countrycode3":"EST","numeric":233},{"id":69,"country":"Eswatini","countrycode2":"SZ","countrycode3":"SWZ","numeric":748},{"id":70,"country":"Ethiopia","countrycode2":"ET","countrycode3":"ETH","numeric":231},{"id":71,"country":"Falkland Islands (the) [Malvinas]","countrycode2":"FK","countrycode3":"FLK","numeric":238},{"id":72,"country":"Faroe Islands (the)","countrycode2":"FO","countrycode3":"FRO","numeric":234},{"id":73,"country":"Fiji","countrycode2":"FJ","countrycode3":"FJI","numeric":242},{"id":74,"country":"Finland","countrycode2":"FI","countrycode3":"FIN","numeric":246},{"id":75,"country":"France","countrycode2":"FR","countrycode3":"FRA","numeric":250},{"id":76,"country":"French Guiana","countrycode2":"GF","countrycode3":"GUF","numeric":254},{"id":77,"country":"French Polynesia","countrycode2":"PF","countrycode3":"PYF","numeric":258},{"id":78,"country":"French Southern Territories (the)","countrycode2":"TF","countrycode3":"ATF","numeric":260},{"id":79,"country":"Gabon","countrycode2":"GA","countrycode3":"GAB","numeric":266},{"id":80,"country":"Gambia (the)","countrycode2":"GM","countrycode3":"GMB","numeric":270},{"id":81,"country":"Georgia","countrycode2":"GE","countrycode3":"GEO","numeric":268},{"id":82,"country":"Germany","countrycode2":"DE","countrycode3":"DEU","numeric":276},{"id":83,"country":"Ghana","countrycode2":"GH","countrycode3":"GHA","numeric":288},{"id":84,"country":"Gibraltar","countrycode2":"GI","countrycode3":"GIB","numeric":292},{"id":85,"country":"Greece","countrycode2":"GR","countrycode3":"GRC","numeric":300},{"id":86,"country":"Greenland","countrycode2":"GL","countrycode3":"GRL","numeric":304},{"id":87,"country":"Grenada","countrycode2":"GD","countrycode3":"GRD","numeric":308},{"id":88,"country":"Guadeloupe","countrycode2":"GP","countrycode3":"GLP","numeric":312},{"id":89,"country":"Guam","countrycode2":"GU","countrycode3":"GUM","numeric":316},{"id":90,"country":"Guatemala","countrycode2":"GT","countrycode3":"GTM","numeric":320},{"id":91,"country":"Guernsey","countrycode2":"GG","countrycode3":"GGY","numeric":831},{"id":92,"country":"Guinea","countrycode2":"GN","countrycode3":"GIN","numeric":324},{"id":93,"country":"Guinea-Bissau","countrycode2":"GW","countrycode3":"GNB","numeric":624},{"id":94,"country":"Guyana","countrycode2":"GY","countrycode3":"GUY","numeric":328},{"id":95,"country":"Haiti","countrycode2":"HT","countrycode3":"HTI","numeric":332},{"id":96,"country":"Heard Island and McDonald Islands","countrycode2":"HM","countrycode3":"HMD","numeric":334},{"id":97,"country":"Holy See (the)","countrycode2":"VA","countrycode3":"VAT","numeric":336},{"id":98,"country":"Honduras","countrycode2":"HN","countrycode3":"HND","numeric":340},{"id":99,"country":"Hong Kong","countrycode2":"HK","countrycode3":"HKG","numeric":344},{"id":100,"country":"Hungary","countrycode2":"HU","countrycode3":"HUN","numeric":348},{"id":101,"country":"Iceland","countrycode2":"IS","countrycode3":"ISL","numeric":352},{"id":102,"country":"India","countrycode2":"IN","countrycode3":"IND","numeric":356},{"id":103,"country":"Indonesia","countrycode2":"ID","countrycode3":"IDN","numeric":360},{"id":104,"country":"Iran (Islamic Republic of)","countrycode2":"IR","countrycode3":"IRN","numeric":364},{"id":105,"country":"Iraq","countrycode2":"IQ","countrycode3":"IRQ","numeric":368},{"id":106,"country":"Ireland","countrycode2":"IE","countrycode3":"IRL","numeric":372},{"id":107,"country":"Isle of Man","countrycode2":"IM","countrycode3":"IMN","numeric":833},{"id":108,"country":"Israel","countrycode2":"IL","countrycode3":"ISR","numeric":376},{"id":109,"country":"Italy","countrycode2":"IT","countrycode3":"ITA","numeric":380},{"id":110,"country":"Jamaica","countrycode2":"JM","countrycode3":"JAM","numeric":388},{"id":111,"country":"Japan","countrycode2":"JP","countrycode3":"JPN","numeric":392},{"id":112,"country":"Jersey","countrycode2":"JE",
    // "countrycode3":"JEY","numeric":832},{"id":113,"country":"Jordan","countrycode2":"JO","countrycode3":"JOR","numeric":400},{"id":114,"country":"Kazakhstan","countrycode2":"KZ","countrycode3":"KAZ","numeric":398},{"id":115,"country":"Kenya","countrycode2":"KE","countrycode3":"KEN","numeric":404},{"id":116,"country":"Kiribati","countrycode2":"KI","countrycode3":"KIR","numeric":296},{"id":117,"country":"Korea (the Democratic People's Republic of)","countrycode2":"KP","countrycode3":"PRK","numeric":408},{"id":118,"country":"Korea (the Republic of)","countrycode2":"KR","countrycode3":"KOR","numeric":410},{"id":119,"country":"Kuwait","countrycode2":"KW","countrycode3":"KWT","numeric":414},{"id":120,"country":"Kyrgyzstan","countrycode2":"KG","countrycode3":"KGZ","numeric":417},{"id":121,"country":"Lao People's Democratic Republic (the)","countrycode2":"LA","countrycode3":"LAO","numeric":418},{"id":122,"country":"Latvia","countrycode2":"LV","countrycode3":"LVA","numeric":428},{"id":123,"country":"Lebanon","countrycode2":"LB","countrycode3":"LBN","numeric":422},{"id":124,"country":"Lesotho","countrycode2":"LS","countrycode3":"LSO","numeric":426},{"id":125,"country":"Liberia","countrycode2":"LR","countrycode3":"LBR","numeric":430},{"id":126,"country":"Libya","countrycode2":"LY","countrycode3":"LBY","numeric":434},{"id":127,"country":"Liechtenstein","countrycode2":"LI","countrycode3":"LIE","numeric":438},{"id":128,"country":"Lithuania","countrycode2":"LT","countrycode3":"LTU","numeric":440},{"id":129,"country":"Luxembourg","countrycode2":"LU","countrycode3":"LUX","numeric":442},{"id":130,"country":"Macao","countrycode2":"MO","countrycode3":"MAC","numeric":446},{"id":131,"country":"Madagascar","countrycode2":"MG","countrycode3":"MDG","numeric":450},{"id":132,"country":"Malawi","countrycode2":"MW","countrycode3":"MWI","numeric":454},{"id":133,"country":"Malaysia","countrycode2":"MY","countrycode3":"MYS","numeric":458},{"id":134,"country":"Maldives","countrycode2":"MV","countrycode3":"MDV","numeric":462},{"id":135,"country":"Mali","countrycode2":"ML","countrycode3":"MLI","numeric":466},{"id":136,"country":"Malta","countrycode2":"MT","countrycode3":"MLT","numeric":470},{"id":137,"country":"Marshall Islands (the)","countrycode2":"MH","countrycode3":"MHL","numeric":584},{"id":138,"country":"Martinique","countrycode2":"MQ","countrycode3":"MTQ","numeric":474},{"id":139,"country":"Mauritania","countrycode2":"MR","countrycode3":"MRT","numeric":478},{"id":140,"country":"Mauritius","countrycode2":"MU","countrycode3":"MUS","numeric":480},{"id":141,"country":"Mayotte","countrycode2":"YT","countrycode3":"MYT","numeric":175},{"id":142,"country":"Mexico","countrycode2":"MX","countrycode3":"MEX","numeric":484},{"id":143,"country":"Micronesia (Federated States of)","countrycode2":"FM","countrycode3":"FSM","numeric":583},{"id":144,"country":"Moldova (the Republic of)","countrycode2":"MD","countrycode3":"MDA","numeric":498},{"id":145,"country":"Monaco","countrycode2":"MC","countrycode3":"MCO","numeric":492},{"id":146,"country":"Mongolia","countrycode2":"MN","countrycode3":"MNG","numeric":496},{"id":147,"country":"Montenegro","countrycode2":"ME","countrycode3":"MNE","numeric":499},{"id":148,"country":"Montserrat","countrycode2":"MS","countrycode3":"MSR","numeric":500},{"id":149,"country":"Morocco","countrycode2":"MA","countrycode3":"MAR","numeric":504},{"id":150,"country":"Mozambique","countrycode2":"MZ","countrycode3":"MOZ","numeric":508},{"id":151,"country":"Myanmar","countrycode2":"MM","countrycode3":"MMR","numeric":104},{"id":152,"country":"Namibia","countrycode2":"NA","countrycode3":"NAM","numeric":516},{"id":153,"country":"Nauru","countrycode2":"NR","countrycode3":"NRU","numeric":520},{"id":154,"country":"Nepal","countrycode2":"NP","countrycode3":"NPL","numeric":524},{"id":155,"country":"Netherlands (the)","countrycode2":"NL","countrycode3":"NLD","numeric":528},{"id":156,"country":"New Caledonia","countrycode2":"NC","countrycode3":"NCL","numeric":540},{"id":157,"country":"New Zealand","countrycode2":"NZ","countrycode3":"NZL","numeric":554},{"id":158,"country":"Nicaragua","countrycode2":"NI","countrycode3":"NIC","numeric":558},{"id":159,"country":"Niger (the)","countrycode2":"NE","countrycode3":"NER","numeric":562},{"id":160,"country":"Nigeria","countrycode2":"NG","countrycode3":"NGA","numeric":566},{"id":161,"country":"Niue","countrycode2":"NU","countrycode3":"NIU","numeric":570},{"id":162,"country":"Norfolk Island","countrycode2":"NF","countrycode3":"NFK","numeric":574},{"id":163,"country":"Northern Mariana Islands (the)","countrycode2":"MP","countrycode3":"MNP","numeric":580},{"id":164,"country":"Norway","countrycode2":"NO","countrycode3":"NOR","numeric":578},{"id":165,"country":"Oman","countrycode2":"OM","countrycode3":"OMN","numeric":512},{"id":166,"country":"Pakistan","countrycode2":"PK","countrycode3":"PAK","numeric":586},{"id":167,"country":"Palau","countrycode2":"PW","countrycode3":"PLW","numeric":585},{"id":168,"country":"Palestine, State of","countrycode2":"PS","countrycode3":"PSE","numeric":275},{"id":169,"country":"Panama","countrycode2":"PA","countrycode3":"PAN","numeric":591},{"id":170,"country":"Papua New Guinea","countrycode2":"PG","countrycode3":"PNG","numeric":598},{"id":171,"country":"Paraguay","countrycode2":"PY","countrycode3":"PRY","numeric":600},{"id":172,"country":"Peru","countrycode2":"PE","countrycode3":"PER","numeric":604},{"id":173,"country":"Philippines (the)","countrycode2":"PH","countrycode3":"PHL","numeric":608},{"id":174,"country":"Pitcairn","countrycode2":"PN","countrycode3":"PCN","numeric":612},{"id":175,"country":"Poland","countrycode2":"PL","countrycode3":"POL","numeric":616},{"id":176,"country":"Portugal","countrycode2":"PT","countrycode3":"PRT","numeric":620},{"id":177,"country":"Puerto Rico","countrycode2":"PR","countrycode3":"PRI","numeric":630},{"id":178,"country":"Qatar","countrycode2":"QA","countrycode3":"QAT","numeric":634},{"id":179,"country":"Republic of North Macedonia","countrycode2":"MK","countrycode3":"MKD","numeric":807},{"id":180,"country":"Romania","countrycode2":"RO","countrycode3":"ROU","numeric":642},{"id":181,"country":"Russian Federation (the)","countrycode2":"RU","countrycode3":"RUS","numeric":643},{"id":182,"country":"Rwanda","countrycode2":"RW","countrycode3":"RWA","numeric":646},{"id":183,"country":"Réunion","countrycode2":"RE","countrycode3":"REU","numeric":638},{"id":184,"country":"Saint Barthélemy","countrycode2":"BL","countrycode3":"BLM","numeric":652},{"id":185,"country":"Saint Helena, Ascension and Tristan da Cunha","countrycode2":"SH","countrycode3":"SHN","numeric":654},{"id":186,"country":"Saint Kitts and Nevis","countrycode2":"KN","countrycode3":"KNA","numeric":659},{"id":187,"country":"Saint Lucia","countrycode2":"LC","countrycode3":"LCA","numeric":662},{"id":188,"country":"Saint Martin (French part)","countrycode2":"MF","countrycode3":"MAF","numeric":663},{"id":189,"country":"Saint Pierre and Miquelon","countrycode2":"PM","countrycode3":"SPM","numeric":666},{"id":190,"country":"Saint Vincent and the Grenadines","countrycode2":"VC","countrycode3":"VCT","numeric":670},{"id":191,"country":"Samoa","countrycode2":"WS","countrycode3":"WSM","numeric":882},{"id":192,"country":"San Marino","countrycode2":"SM","countrycode3":"SMR","numeric":674},{"id":193,"country":"Sao Tome and Principe","countrycode2":"ST","countrycode3":"STP","numeric":678},{"id":194,"country":"Saudi Arabia","countrycode2":"SA","countrycode3":"SAU","numeric":682},{"id":195,"country":"Senegal","countrycode2":"SN","countrycode3":"SEN","numeric":686},{"id":196,"country":"Serbia","countrycode2":"RS","countrycode3":"SRB","numeric":688},{"id":197,"country":"Seychelles","countrycode2":"SC","countrycode3":"SYC","numeric":690},{"id":198,"country":"Sierra Leone","countrycode2":"SL","countrycode3":"SLE","numeric":694},{"id":199,"country":"Singapore","countrycode2":"SG","countrycode3":"SGP","numeric":702},{"id":200,"country":"Sint Maarten (Dutch part)","countrycode2":"SX","countrycode3":"SXM","numeric":534},{"id":201,"country":"Slovakia","countrycode2":"SK","countrycode3":"SVK","numeric":703},{"id":202,"country":"Slovenia","countrycode2":"SI","countrycode3":"SVN","numeric":705},{"id":203,"country":"Solomon Islands","countrycode2":"SB","countrycode3":"SLB","numeric":90},{"id":204,"country":"Somalia","countrycode2":"SO","countrycode3":"SOM","numeric":706},{"id":205,"country":"South Africa","countrycode2":"ZA","countrycode3":"ZAF","numeric":710},{"id":206,"country":"South Georgia and the South Sandwich Islands","countrycode2":"GS","countrycode3":"SGS","numeric":239},{"id":207,"country":"South Sudan","countrycode2":"SS","countrycode3":"SSD","numeric":728},{"id":208,"country":"Spain","countrycode2":"ES","countrycode3":"ESP","numeric":724},{"id":209,"country":"Sri Lanka","countrycode2":"LK","countrycode3":"LKA","numeric":144},{"id":210,"country":"Sudan (the)","countrycode2":"SD","countrycode3":"SDN","numeric":729},{"id":211,"country":"Suriname","countrycode2":"SR","countrycode3":"SUR","numeric":740},{"id":212,"country":"Svalbard and Jan Mayen","countrycode2":"SJ","countrycode3":"SJM","numeric":744},{"id":213,"country":"Sweden","countrycode2":"SE","countrycode3":"SWE","numeric":752},{"id":214,"country":"Switzerland","countrycode2":"CH","countrycode3":"CHE","numeric":756},{"id":215,"country":"Syrian Arab Republic","countrycode2":"SY","countrycode3":"SYR","numeric":760},{"id":216,"country":"Taiwan (Province of China)","countrycode2":"TW","countrycode3":"TWN","numeric":158},{"id":217,"country":"Tajikistan","countrycode2":"TJ","countrycode3":"TJK","numeric":762},{"id":218,"country":"Tanzania, United Republic of","countrycode2":"TZ","countrycode3":"TZA","numeric":834},{"id":219,"country":"Thailand","countrycode2":"TH","countrycode3":"THA","numeric":764},{"id":220,"country":"Timor-Leste","countrycode2":"TL","countrycode3":"TLS","numeric":626},{"id":221,"country":"Togo","countrycode2":"TG","countrycode3":"TGO","numeric":768},{"id":222,"country":"Tokelau","countrycode2":"TK","countrycode3":"TKL","numeric":772},{"id":223,"country":"Tonga","countrycode2":"TO","countrycode3":"TON","numeric":776},{"id":224,"country":"Trinidad and Tobago","countrycode2":"TT","countrycode3":"TTO","numeric":780},{"id":225,"country":"Tunisia","countrycode2":"TN","countrycode3":"TUN","numeric":788},{"id":226,"country":"Turkey","countrycode2":"TR","countrycode3":"TUR","numeric":792},{"id":227,"country":"Turkmenistan","countrycode2":"TM","countrycode3":"TKM","numeric":795},{"id":228,"country":"Turks and Caicos Islands (the)","countrycode2":"TC","countrycode3":"TCA","numeric":796},{"id":229,"country":"Tuvalu","countrycode2":"TV","countrycode3":"TUV","numeric":798},{"id":230,"country":"Uganda","countrycode2":"UG","countrycode3":"UGA","numeric":800},{"id":231,"country":"Ukraine","countrycode2":"UA","countrycode3":"UKR","numeric":804},{"id":232,"country":"United Arab Emirates (the)","countrycode2":"AE","countrycode3":"ARE","numeric":784},{"id":233,"country":"United Kingdom of Great Britain and Northern Ireland (the)","countrycode2":"GB","countrycode3":"GBR","numeric":826},{"id":234,"country":"United States Minor Outlying Islands (the)","countrycode2":"UM","countrycode3":"UMI","numeric":581},{"id":235,"country":"United States of America (the)","countrycode2":"US","countrycode3":"USA","numeric":840},{"id":236,"country":"Uruguay","countrycode2":"UY","countrycode3":"URY","numeric":858},{"id":237,"country":"Uzbekistan","countrycode2":"UZ","countrycode3":"UZB","numeric":860},{"id":238,"country":"Vanuatu","countrycode2":"VU","countrycode3":"VUT","numeric":548},{"id":239,"country":"Venezuela (Bolivarian Republic of)","countrycode2":"VE","countrycode3":"VEN","numeric":862},{"id":240,"country":"Viet Nam","countrycode2":"VN","countrycode3":"VNM","numeric":704},{"id":241,"country":"Virgin Islands (British)","countrycode2":"VG","countrycode3":"VGB","numeric":92},{"id":242,"country":"Virgin Islands (U.S.)","countrycode2":"VI","countrycode3":"VIR","numeric":850},{"id":243,"country":"Wallis and Futuna","countrycode2":"WF","countrycode3":"WLF","numeric":876},{"id":244,"country":"Western Sahara","countrycode2":"EH","countrycode3":"ESH","numeric":732},{"id":245,"country":"Yemen","countrycode2":"YE","countrycode3":"YEM","numeric":887},{"id":246,"country":"Zambia","countrycode2":"ZM","countrycode3":"ZMB","numeric":894},{"id":247,"country":"Zimbabwe","countrycode2":"ZW","countrycode3":"ZWE","numeric":716},{"id":248,"country":"Åland Islands","countrycode2":"AX","countrycode3":"ALA","numeric":248},{"id":249,"country":"Jordan","countrycode2":"JO","countrycode3":"JOR","numeric":400},{"id":250,"country":"Greenland","countrycode2":"GL","countrycode3":"GRL","numeric":304},{"id":252,"country":"India","countrycode2":"IN","countrycode3":"IND","numeric":356}]
    // let countryArray = []
    // resp && resp.map(item =>{
    //   let obj =  { id: item.countrycode3, itemName: item.country }
    //   countryArray.push(obj)
    // })
    // this.optionDatas = countryArray

  }
  onKey(value) { 
    this.languages = this.search(value);
  }
  search(value: string) { 
      let filter = value.toLowerCase();
      return this.languages.filter(option => option.itemName.toLowerCase().startsWith(filter));
  }
  onDeSelect(event) {
    this.showCountSignBtn = false
    this.CountryPinLabel=''
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onDropDownClose() {
    console.log('dropdown closed');
  }
  onChange(event){
   this.showCountSignBtn= this.selectedItems.length ? true : false
   if(event.itemName == "Singapore"){
    this.countryId = "UEN"
   }else if(event.itemName == "Equatorial Guinea"){
    this.countryId = "RUC"
   }else{
    this.countryId = event.id
    // this.CountryPinLabel=event.regNo ? event.regNo : 'No'
   }
  }
 
  signup(form:NgForm) {
    // if (this.country.valueOf() !== '' || this.CountryPin.valueOf() !== '') {
    //   this.router.navigate(['sme-onboarding'])
    //   this.invalidLogin = false
    // } else
    //   this.invalidLogin = false
    
    // if (this.CountryPin.valueOf() !== '' || this.selectedItem != "" ) {
    //   this.router.navigate(['sme-onboarding'])
    //   this.invalidLogin = false
    // } else
    //  { this.invalidLogin = true }

    if(this.name && this.CountryPin && this.selectedItems.length){
      let signUpDetailss = {
        companyName : this.name,
        nationalId : this.CountryPin,
        country : this.selectedItems,
      }
      localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
       
      
      // this.router.navigateByUrl('/signup');


      // this.signupService.signup(form.value).subscribe(resp=>{
      //   if(resp){
      //     this.router.navigate(['sme-onboarding'])
      //   }
      // })
    }
    else{
      this.toastr.error('Error')
    }
  }
  openModal(event, template) {
    event.preventDefault();
    let signUpDetailss = {
      companyName : this.name,
      nationalId : this.CountryPin,
      country : this.selectedItems,
    }
    let RegisteNo = {
      name : this.name,
      registrationNumber : this.CountryPin,
    }
    localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
    this.signupService.singUpCheck(RegisteNo).subscribe(resp=>{
        if(resp.status === "true"){
          this.toastr.error("This company already exists in Icc tradecomm Market place");
        }else{
          let data={
            'companyId':this.CountryPin,
            'country':this.selectedItems[0].id,
            'companyName':this.name
          }
          // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
          this.signupService.companyCheck(data).subscribe(resp =>{
            if(resp && resp.registrationnumber){
              this.router.navigateByUrl('/signup-details');
            }
            else{
              this.router.navigateByUrl('/signup-details')
            }
          },
          err=>{
            this.toastr.error('Error')
          })
          
        }

      })
  }
  signUpPage(type){
    this.modalRef.hide();
    localStorage.setItem("existingCUS",type);
    let signUpDetailss = {
      companyName : this.name,
      nationalId : this.CountryPin,
      country : this.selectedItems,
    }
    localStorage.setItem("signUpDetails",JSON.stringify(signUpDetailss))
    if(type === 'yes'){
          this.router.navigate(['sme-onboarding'])
    }else{
      this.router.navigateByUrl('/signup-details');
    }
  }
  GotoLogin(){
    window.location.href = "/"
    // this.router.navigateByUrl('/'); 
  }

}
