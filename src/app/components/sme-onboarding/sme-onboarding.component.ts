import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

const ELEMENT_DATA: any[] = [
  {
    Name: '',
    Position: '',
    Address: '',
    TelephoneNo: '',
    Email: ''
  },
  {
    Name: '',
    Position: '',
    Address: '',
    TelephoneNo: '',
    Email: ''
  },
];

interface ICity{
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-sme-onboarding',
  templateUrl: './sme-onboarding.component.html',
  styleUrls: ['./sme-onboarding.component.scss']
})
export class SmeOnboardingComponent implements OnInit {

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['Name', 'Position', 'Address', 'TelephoneNo', 'Email'];

  sName: string;
  taxId: string;
  
  state: string;
  country: string;
  invalidLogin = false
  getFormInput
  questions=[]
  questionnaireSections=[]
  sectionIndex=0
  smeForm1:FormGroup
  disableSubbtn=true
  subSection=false
  // smeForm2:FormGroup
  // smeForm3:FormGroup
  // smeForm4:FormGroup
  // smeForm5:FormGroup
  // smeForm6:FormGroup
  // smeForm7:FormGroup
  // smeForm8:FormGroup

  smeForm:FormGroup

  constructor(private router: Router,
    private fb:FormBuilder,private toastr: ToastrService) { }

  
  name = "Angular";
  cities: Array<ICity> = [];
  selectedItems: Array<ICity> = [];
  dropdownSettings: IDropdownSettings = {};
  radioChecked={}

  ngOnInit() {
    this.sectionIndex=0
    this.questionnaireSections=[
        {
            "questions": [
                {
                    "characterMin": null,
                    "characterMax": 30,
                    "validation": [],
                    "number": "1",
                    "alias": "name",
                    "label": "Name",
                    "description": "Name of the person accountable for the information provided",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 30,
                    "validation": [],
                    "number": "2",
                    "alias": "job-title",
                    "label": "Job title",
                    "description": "Job title of the person accountable for the information provided",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 30,
                    "validation": [],
                    "number": "3",
                    "alias": "company-registration-number",
                    "label": "Company registration number",
                    "description": "Local company registration number",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "company",
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 50,
                    "validation": [],
                    "number": "4",
                    "alias": "company-name",
                    "label": "Company",
                    "description": "Company legal name",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "company",
                    "type": "QuestionTextDto"
                },
                {
                    "dateMin": null,
                    "dateMax": null,
                    "number": "5",
                    "alias": "date-founded",
                    "label": "Date founded",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "company",
                    "type": "QuestionDateDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 50,
                    "validation": [],
                    "number": "6",
                    "alias": "address-line-1",
                    "label": "Address line 1",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 50,
                    "validation": [],
                    "number": "7",
                    "alias": "address-line-2",
                    "label": "Address line 2",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": "address",
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 100,
                    "validation": [],
                    "number": "8",
                    "alias": "city",
                    "label": "Town/city",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 30,
                    "validation": [],
                    "number": "9",
                    "alias": "postcode",
                    "label": "ZIP/Postcode",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "AFG",
                            "label": "Afghanistan"
                        },
                        {
                            "alias": "ALB",
                            "label": "Albania"
                        },
                        {
                            "alias": "DZA",
                            "label": "Algeria"
                        },
                        {
                            "alias": "ARG",
                            "label": "Argentina"
                        },
                        {
                            "alias": "ARM",
                            "label": "Armenia"
                        },
                        {
                            "alias": "AUS",
                            "label": "Australia"
                        },
                        {
                            "alias": "AUT",
                            "label": "Austria"
                        },
                        {
                            "alias": "AZE",
                            "label": "Azerbaijan"
                        },
                        {
                            "alias": "BHR",
                            "label": "Bahrain"
                        },
                        {
                            "alias": "BGD",
                            "label": "Bangladesh"
                        },
                        {
                            "alias": "BLR",
                            "label": "Belarus"
                        },
                        {
                            "alias": "BEL",
                            "label": "Belgium"
                        },
                        {
                            "alias": "BLZ",
                            "label": "Belize"
                        },
                        {
                            "alias": "BTN",
                            "label": "Bhutan"
                        },
                        {
                            "alias": "BOL",
                            "label": "Bolivia"
                        },
                        {
                            "alias": "BIH",
                            "label": "Bosnia and Herzegovina"
                        },
                        {
                            "alias": "BWA",
                            "label": "Botswana"
                        },
                        {
                            "alias": "BRA",
                            "label": "Brazil"
                        },
                        {
                            "alias": "BRN",
                            "label": "Brunei"
                        },
                        {
                            "alias": "BGR",
                            "label": "Bulgaria"
                        },
                        {
                            "alias": "KHM",
                            "label": "Cambodia"
                        },
                        {
                            "alias": "CMR",
                            "label": "Cameroon"
                        },
                        {
                            "alias": "CAN",
                            "label": "Canada"
                        },
                        {
                            "alias": "029",
                            "label": "Caribbean"
                        },
                        {
                            "alias": "CHL",
                            "label": "Chile"
                        },
                        {
                            "alias": "CHN",
                            "label": "China"
                        },
                        {
                            "alias": "COL",
                            "label": "Colombia"
                        },
                        {
                            "alias": "COD",
                            "label": "Congo (DRC)"
                        },
                        {
                            "alias": "CRI",
                            "label": "Costa Rica"
                        },
                        {
                            "alias": "CIV",
                            "label": "Côte d’Ivoire"
                        },
                        {
                            "alias": "HRV",
                            "label": "Croatia"
                        },
                        {
                            "alias": "CUB",
                            "label": "Cuba"
                        },
                        {
                            "alias": "CZE",
                            "label": "Czech Republic"
                        },
                        {
                            "alias": "DNK",
                            "label": "Denmark"
                        },
                        {
                            "alias": "DJI",
                            "label": "Djibouti"
                        },
                        {
                            "alias": "DOM",
                            "label": "Dominican Republic"
                        },
                        {
                            "alias": "ECU",
                            "label": "Ecuador"
                        },
                        {
                            "alias": "EGY",
                            "label": "Egypt"
                        },
                        {
                            "alias": "SLV",
                            "label": "El Salvador"
                        },
                        {
                            "alias": "ERI",
                            "label": "Eritrea"
                        },
                        {
                            "alias": "EST",
                            "label": "Estonia"
                        },
                        {
                            "alias": "ETH",
                            "label": "Ethiopia"
                        },
                        {
                            "alias": "FRO",
                            "label": "Faroe Islands"
                        },
                        {
                            "alias": "FIN",
                            "label": "Finland"
                        },
                        {
                            "alias": "FRA",
                            "label": "France"
                        },
                        {
                            "alias": "GEO",
                            "label": "Georgia"
                        },
                        {
                            "alias": "DEU",
                            "label": "Germany"
                        },
                        {
                            "alias": "GRC",
                            "label": "Greece"
                        },
                        {
                            "alias": "GRL",
                            "label": "Greenland"
                        },
                        {
                            "alias": "GTM",
                            "label": "Guatemala"
                        },
                        {
                            "alias": "HTI",
                            "label": "Haiti"
                        },
                        {
                            "alias": "HND",
                            "label": "Honduras"
                        },
                        {
                            "alias": "HKG",
                            "label": "Hong Kong SAR"
                        },
                        {
                            "alias": "HUN",
                            "label": "Hungary"
                        },
                        {
                            "alias": "ISL",
                            "label": "Iceland"
                        },
                        {
                            "alias": "IND",
                            "label": "India"
                        },
                        {
                            "alias": "IDN",
                            "label": "Indonesia"
                        },
                        {
                            "alias": "IRN",
                            "label": "Iran"
                        },
                        {
                            "alias": "IRQ",
                            "label": "Iraq"
                        },
                        {
                            "alias": "IRL",
                            "label": "Ireland"
                        },
                        {
                            "alias": "ISR",
                            "label": "Israel"
                        },
                        {
                            "alias": "ITA",
                            "label": "Italy"
                        },
                        {
                            "alias": "JAM",
                            "label": "Jamaica"
                        },
                        {
                            "alias": "JPN",
                            "label": "Japan"
                        },
                        {
                            "alias": "JOR",
                            "label": "Jordan"
                        },
                        {
                            "alias": "KAZ",
                            "label": "Kazakhstan"
                        },
                        {
                            "alias": "KEN",
                            "label": "Kenya"
                        },
                        {
                            "alias": "KOR",
                            "label": "Korea"
                        },
                        {
                            "alias": "KWT",
                            "label": "Kuwait"
                        },
                        {
                            "alias": "KGZ",
                            "label": "Kyrgyzstan"
                        },
                        {
                            "alias": "LAO",
                            "label": "Laos"
                        },
                        {
                            "alias": "419",
                            "label": "Latin America"
                        },
                        {
                            "alias": "LVA",
                            "label": "Latvia"
                        },
                        {
                            "alias": "LBN",
                            "label": "Lebanon"
                        },
                        {
                            "alias": "LBY",
                            "label": "Libya"
                        },
                        {
                            "alias": "LIE",
                            "label": "Liechtenstein"
                        },
                        {
                            "alias": "LTU",
                            "label": "Lithuania"
                        },
                        {
                            "alias": "LUX",
                            "label": "Luxembourg"
                        },
                        {
                            "alias": "MAC",
                            "label": "Macao SAR"
                        },
                        {
                            "alias": "MKD",
                            "label": "Macedonia, FYRO"
                        },
                        {
                            "alias": "MYS",
                            "label": "Malaysia"
                        },
                        {
                            "alias": "MDV",
                            "label": "Maldives"
                        },
                        {
                            "alias": "MLI",
                            "label": "Mali"
                        },
                        {
                            "alias": "MLT",
                            "label": "Malta"
                        },
                        {
                            "alias": "MEX",
                            "label": "Mexico"
                        },
                        {
                            "alias": "MDA",
                            "label": "Moldova"
                        },
                        {
                            "alias": "MCO",
                            "label": "Monaco"
                        },
                        {
                            "alias": "MNG",
                            "label": "Mongolia"
                        },
                        {
                            "alias": "MNE",
                            "label": "Montenegro"
                        },
                        {
                            "alias": "MAR",
                            "label": "Morocco"
                        },
                        {
                            "alias": "MMR",
                            "label": "Myanmar"
                        },
                        {
                            "alias": "NPL",
                            "label": "Nepal"
                        },
                        {
                            "alias": "NLD",
                            "label": "Netherlands"
                        },
                        {
                            "alias": "NZL",
                            "label": "New Zealand"
                        },
                        {
                            "alias": "NIC",
                            "label": "Nicaragua"
                        },
                        {
                            "alias": "NGA",
                            "label": "Nigeria"
                        },
                        {
                            "alias": "NOR",
                            "label": "Norway"
                        },
                        {
                            "alias": "OMN",
                            "label": "Oman"
                        },
                        {
                            "alias": "PAK",
                            "label": "Pakistan"
                        },
                        {
                            "alias": "PAN",
                            "label": "Panama"
                        },
                        {
                            "alias": "PRY",
                            "label": "Paraguay"
                        },
                        {
                            "alias": "PER",
                            "label": "Peru"
                        },
                        {
                            "alias": "PHL",
                            "label": "Philippines"
                        },
                        {
                            "alias": "POL",
                            "label": "Poland"
                        },
                        {
                            "alias": "PRT",
                            "label": "Portugal"
                        },
                        {
                            "alias": "PRI",
                            "label": "Puerto Rico"
                        },
                        {
                            "alias": "QAT",
                            "label": "Qatar"
                        },
                        {
                            "alias": "REU",
                            "label": "Réunion"
                        },
                        {
                            "alias": "ROU",
                            "label": "Romania"
                        },
                        {
                            "alias": "RUS",
                            "label": "Russia"
                        },
                        {
                            "alias": "RWA",
                            "label": "Rwanda"
                        },
                        {
                            "alias": "SAU",
                            "label": "Saudi Arabia"
                        },
                        {
                            "alias": "SEN",
                            "label": "Senegal"
                        },
                        {
                            "alias": "SRB",
                            "label": "Serbia"
                        },
                        {
                            "alias": "SGP",
                            "label": "Singapore"
                        },
                        {
                            "alias": "SVK",
                            "label": "Slovakia"
                        },
                        {
                            "alias": "SVN",
                            "label": "Slovenia"
                        },
                        {
                            "alias": "SOM",
                            "label": "Somalia"
                        },
                        {
                            "alias": "ZAF",
                            "label": "South Africa"
                        },
                        {
                            "alias": "ESP",
                            "label": "Spain"
                        },
                        {
                            "alias": "LKA",
                            "label": "Sri Lanka"
                        },
                        {
                            "alias": "SWE",
                            "label": "Sweden"
                        },
                        {
                            "alias": "CHE",
                            "label": "Switzerland"
                        },
                        {
                            "alias": "SYR",
                            "label": "Syria"
                        },
                        {
                            "alias": "TWN",
                            "label": "Taiwan"
                        },
                        {
                            "alias": "TJK",
                            "label": "Tajikistan"
                        },
                        {
                            "alias": "THA",
                            "label": "Thailand"
                        },
                        {
                            "alias": "TTO",
                            "label": "Trinidad and Tobago"
                        },
                        {
                            "alias": "TUN",
                            "label": "Tunisia"
                        },
                        {
                            "alias": "TUR",
                            "label": "Turkey"
                        },
                        {
                            "alias": "TKM",
                            "label": "Turkmenistan"
                        },
                        {
                            "alias": "UKR",
                            "label": "Ukraine"
                        },
                        {
                            "alias": "ARE",
                            "label": "United Arab Emirates"
                        },
                        {
                            "alias": "GBR",
                            "label": "United Kingdom"
                        },
                        {
                            "alias": "USA",
                            "label": "United States"
                        },
                        {
                            "alias": "URY",
                            "label": "Uruguay"
                        },
                        {
                            "alias": "UZB",
                            "label": "Uzbekistan"
                        },
                        {
                            "alias": "VEN",
                            "label": "Venezuela"
                        },
                        {
                            "alias": "VNM",
                            "label": "Vietnam"
                        },
                        {
                            "alias": "001",
                            "label": "World"
                        },
                        {
                            "alias": "YEM",
                            "label": "Yemen"
                        },
                        {
                            "alias": "ZWE",
                            "label": "Zimbabwe"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "10",
                    "alias": "country",
                    "label": "Country",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "SGD",
                            "label": "Singapore Dollar"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "11",
                    "alias": "trading-currency",
                    "label": "Trading currency",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Url",
                        "MatchingDomain"
                    ],
                    "number": "12",
                    "alias": "website",
                    "label": "Website",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Email",
                        "MatchingDomain"
                    ],
                    "number": "13",
                    "alias": "email",
                    "label": "Email",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Phone"
                    ],
                    "number": "14",
                    "alias": "telephone-mobile",
                    "label": "Mobile",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Url"
                    ],
                    "number": "15",
                    "alias": "social-linked-in",
                    "label": "LinkedIn",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Url"
                    ],
                    "number": "16",
                    "alias": "social-twitter",
                    "label": "Twitter",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "multilateral-events",
                            "label": "To let you know about MultiLateral activities and events"
                        },
                        {
                            "alias": "information",
                            "label": "To provide you about information associated with your areas of interest"
                        },
                        {
                            "alias": "partners",
                            "label": "To provide you about services and offers provided by MultiLateral partners."
                        }
                    ],
                    "allowMultiple": true,
                    "number": "17",
                    "alias": "contact-reasons",
                    "label": "Are you happy for us to contact you occasionally in order to update you on one or all of the following?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "email",
                            "label": "Email"
                        },
                        {
                            "alias": "post",
                            "label": "Postal Address"
                        },
                        {
                            "alias": "whatsapp",
                            "label": "WhatsApp"
                        },
                        {
                            "alias": "text",
                            "label": "Text"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "18",
                    "alias": "contact-methods",
                    "label": "What is the best way of contacting you?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "sme",
                            "label": "SME (less than 250 employees and/or turnover less than £6.5m in last full year of trading)"
                        },
                        {
                            "alias": "corporate",
                            "label": "Corporate (more than 250 employees and/or turnover more than £6,500,000)"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "19",
                    "alias": "company-size",
                    "label": "Which of the following best describes you/your business/organisation?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "domestic-only",
                            "label": "Domestic only"
                        },
                        {
                            "alias": "domestic-with-plans-for-international",
                            "label": "Domestic but with plans to internationalise in the next 12 months"
                        },
                        {
                            "alias": "international",
                            "label": "International"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "20",
                    "alias": "domestic-or-international",
                    "label": "Is your business:",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "no-plans",
                            "label": "The business has no plans intention to internationalise"
                        },
                        {
                            "alias": "plan-over-6-months",
                            "label": "Plan to go international over the next 6 months"
                        },
                        {
                            "alias": "plan-over-12-months",
                            "label": "Plan to go international over the next 12 months"
                        },
                        {
                            "alias": "plan-over-2-3-years",
                            "label": "Plan to go international over the next 2-3 years"
                        },
                        {
                            "alias": "have-been-less-than-year",
                            "label": "Have been international for less than a year"
                        },
                        {
                            "alias": "have-been-3-5-years",
                            "label": "Have been international for 3-5 years"
                        },
                        {
                            "alias": "have-been-more-than-5-years",
                            "label": "Have been international for more than 5 years"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "21",
                    "alias": "domestic-or-international-detail",
                    "label": "Can you provide a bit more detail?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "AFG",
                            "label": "Afghanistan"
                        },
                        {
                            "alias": "ALB",
                            "label": "Albania"
                        },
                        {
                            "alias": "DZA",
                            "label": "Algeria"
                        },
                        {
                            "alias": "ARG",
                            "label": "Argentina"
                        },
                        {
                            "alias": "ARM",
                            "label": "Armenia"
                        },
                        {
                            "alias": "AUS",
                            "label": "Australia"
                        },
                        {
                            "alias": "AUT",
                            "label": "Austria"
                        },
                        {
                            "alias": "AZE",
                            "label": "Azerbaijan"
                        },
                        {
                            "alias": "BHR",
                            "label": "Bahrain"
                        },
                        {
                            "alias": "BGD",
                            "label": "Bangladesh"
                        },
                        {
                            "alias": "BLR",
                            "label": "Belarus"
                        },
                        {
                            "alias": "BEL",
                            "label": "Belgium"
                        },
                        {
                            "alias": "BLZ",
                            "label": "Belize"
                        },
                        {
                            "alias": "BTN",
                            "label": "Bhutan"
                        },
                        {
                            "alias": "BOL",
                            "label": "Bolivia"
                        },
                        {
                            "alias": "BIH",
                            "label": "Bosnia and Herzegovina"
                        },
                        {
                            "alias": "BWA",
                            "label": "Botswana"
                        },
                        {
                            "alias": "BRA",
                            "label": "Brazil"
                        },
                        {
                            "alias": "BRN",
                            "label": "Brunei"
                        },
                        {
                            "alias": "BGR",
                            "label": "Bulgaria"
                        },
                        {
                            "alias": "KHM",
                            "label": "Cambodia"
                        },
                        {
                            "alias": "CMR",
                            "label": "Cameroon"
                        },
                        {
                            "alias": "CAN",
                            "label": "Canada"
                        },
                        {
                            "alias": "029",
                            "label": "Caribbean"
                        },
                        {
                            "alias": "CHL",
                            "label": "Chile"
                        },
                        {
                            "alias": "CHN",
                            "label": "China"
                        },
                        {
                            "alias": "COL",
                            "label": "Colombia"
                        },
                        {
                            "alias": "COD",
                            "label": "Congo (DRC)"
                        },
                        {
                            "alias": "CRI",
                            "label": "Costa Rica"
                        },
                        {
                            "alias": "CIV",
                            "label": "Côte d’Ivoire"
                        },
                        {
                            "alias": "HRV",
                            "label": "Croatia"
                        },
                        {
                            "alias": "CUB",
                            "label": "Cuba"
                        },
                        {
                            "alias": "CZE",
                            "label": "Czech Republic"
                        },
                        {
                            "alias": "DNK",
                            "label": "Denmark"
                        },
                        {
                            "alias": "DJI",
                            "label": "Djibouti"
                        },
                        {
                            "alias": "DOM",
                            "label": "Dominican Republic"
                        },
                        {
                            "alias": "ECU",
                            "label": "Ecuador"
                        },
                        {
                            "alias": "EGY",
                            "label": "Egypt"
                        },
                        {
                            "alias": "SLV",
                            "label": "El Salvador"
                        },
                        {
                            "alias": "ERI",
                            "label": "Eritrea"
                        },
                        {
                            "alias": "EST",
                            "label": "Estonia"
                        },
                        {
                            "alias": "ETH",
                            "label": "Ethiopia"
                        },
                        {
                            "alias": "FRO",
                            "label": "Faroe Islands"
                        },
                        {
                            "alias": "FIN",
                            "label": "Finland"
                        },
                        {
                            "alias": "FRA",
                            "label": "France"
                        },
                        {
                            "alias": "GEO",
                            "label": "Georgia"
                        },
                        {
                            "alias": "DEU",
                            "label": "Germany"
                        },
                        {
                            "alias": "GRC",
                            "label": "Greece"
                        },
                        {
                            "alias": "GRL",
                            "label": "Greenland"
                        },
                        {
                            "alias": "GTM",
                            "label": "Guatemala"
                        },
                        {
                            "alias": "HTI",
                            "label": "Haiti"
                        },
                        {
                            "alias": "HND",
                            "label": "Honduras"
                        },
                        {
                            "alias": "HKG",
                            "label": "Hong Kong SAR"
                        },
                        {
                            "alias": "HUN",
                            "label": "Hungary"
                        },
                        {
                            "alias": "ISL",
                            "label": "Iceland"
                        },
                        {
                            "alias": "IND",
                            "label": "India"
                        },
                        {
                            "alias": "IDN",
                            "label": "Indonesia"
                        },
                        {
                            "alias": "IRN",
                            "label": "Iran"
                        },
                        {
                            "alias": "IRQ",
                            "label": "Iraq"
                        },
                        {
                            "alias": "IRL",
                            "label": "Ireland"
                        },
                        {
                            "alias": "ISR",
                            "label": "Israel"
                        },
                        {
                            "alias": "ITA",
                            "label": "Italy"
                        },
                        {
                            "alias": "JAM",
                            "label": "Jamaica"
                        },
                        {
                            "alias": "JPN",
                            "label": "Japan"
                        },
                        {
                            "alias": "JOR",
                            "label": "Jordan"
                        },
                        {
                            "alias": "KAZ",
                            "label": "Kazakhstan"
                        },
                        {
                            "alias": "KEN",
                            "label": "Kenya"
                        },
                        {
                            "alias": "KOR",
                            "label": "Korea"
                        },
                        {
                            "alias": "KWT",
                            "label": "Kuwait"
                        },
                        {
                            "alias": "KGZ",
                            "label": "Kyrgyzstan"
                        },
                        {
                            "alias": "LAO",
                            "label": "Laos"
                        },
                        {
                            "alias": "419",
                            "label": "Latin America"
                        },
                        {
                            "alias": "LVA",
                            "label": "Latvia"
                        },
                        {
                            "alias": "LBN",
                            "label": "Lebanon"
                        },
                        {
                            "alias": "LBY",
                            "label": "Libya"
                        },
                        {
                            "alias": "LIE",
                            "label": "Liechtenstein"
                        },
                        {
                            "alias": "LTU",
                            "label": "Lithuania"
                        },
                        {
                            "alias": "LUX",
                            "label": "Luxembourg"
                        },
                        {
                            "alias": "MAC",
                            "label": "Macao SAR"
                        },
                        {
                            "alias": "MKD",
                            "label": "Macedonia, FYRO"
                        },
                        {
                            "alias": "MYS",
                            "label": "Malaysia"
                        },
                        {
                            "alias": "MDV",
                            "label": "Maldives"
                        },
                        {
                            "alias": "MLI",
                            "label": "Mali"
                        },
                        {
                            "alias": "MLT",
                            "label": "Malta"
                        },
                        {
                            "alias": "MEX",
                            "label": "Mexico"
                        },
                        {
                            "alias": "MDA",
                            "label": "Moldova"
                        },
                        {
                            "alias": "MCO",
                            "label": "Monaco"
                        },
                        {
                            "alias": "MNG",
                            "label": "Mongolia"
                        },
                        {
                            "alias": "MNE",
                            "label": "Montenegro"
                        },
                        {
                            "alias": "MAR",
                            "label": "Morocco"
                        },
                        {
                            "alias": "MMR",
                            "label": "Myanmar"
                        },
                        {
                            "alias": "NPL",
                            "label": "Nepal"
                        },
                        {
                            "alias": "NLD",
                            "label": "Netherlands"
                        },
                        {
                            "alias": "NZL",
                            "label": "New Zealand"
                        },
                        {
                            "alias": "NIC",
                            "label": "Nicaragua"
                        },
                        {
                            "alias": "NGA",
                            "label": "Nigeria"
                        },
                        {
                            "alias": "NOR",
                            "label": "Norway"
                        },
                        {
                            "alias": "OMN",
                            "label": "Oman"
                        },
                        {
                            "alias": "PAK",
                            "label": "Pakistan"
                        },
                        {
                            "alias": "PAN",
                            "label": "Panama"
                        },
                        {
                            "alias": "PRY",
                            "label": "Paraguay"
                        },
                        {
                            "alias": "PER",
                            "label": "Peru"
                        },
                        {
                            "alias": "PHL",
                            "label": "Philippines"
                        },
                        {
                            "alias": "POL",
                            "label": "Poland"
                        },
                        {
                            "alias": "PRT",
                            "label": "Portugal"
                        },
                        {
                            "alias": "PRI",
                            "label": "Puerto Rico"
                        },
                        {
                            "alias": "QAT",
                            "label": "Qatar"
                        },
                        {
                            "alias": "REU",
                            "label": "Réunion"
                        },
                        {
                            "alias": "ROU",
                            "label": "Romania"
                        },
                        {
                            "alias": "RUS",
                            "label": "Russia"
                        },
                        {
                            "alias": "RWA",
                            "label": "Rwanda"
                        },
                        {
                            "alias": "SAU",
                            "label": "Saudi Arabia"
                        },
                        {
                            "alias": "SEN",
                            "label": "Senegal"
                        },
                        {
                            "alias": "SRB",
                            "label": "Serbia"
                        },
                        {
                            "alias": "SGP",
                            "label": "Singapore"
                        },
                        {
                            "alias": "SVK",
                            "label": "Slovakia"
                        },
                        {
                            "alias": "SVN",
                            "label": "Slovenia"
                        },
                        {
                            "alias": "SOM",
                            "label": "Somalia"
                        },
                        {
                            "alias": "ZAF",
                            "label": "South Africa"
                        },
                        {
                            "alias": "ESP",
                            "label": "Spain"
                        },
                        {
                            "alias": "LKA",
                            "label": "Sri Lanka"
                        },
                        {
                            "alias": "SWE",
                            "label": "Sweden"
                        },
                        {
                            "alias": "CHE",
                            "label": "Switzerland"
                        },
                        {
                            "alias": "SYR",
                            "label": "Syria"
                        },
                        {
                            "alias": "TWN",
                            "label": "Taiwan"
                        },
                        {
                            "alias": "TJK",
                            "label": "Tajikistan"
                        },
                        {
                            "alias": "THA",
                            "label": "Thailand"
                        },
                        {
                            "alias": "TTO",
                            "label": "Trinidad and Tobago"
                        },
                        {
                            "alias": "TUN",
                            "label": "Tunisia"
                        },
                        {
                            "alias": "TUR",
                            "label": "Turkey"
                        },
                        {
                            "alias": "TKM",
                            "label": "Turkmenistan"
                        },
                        {
                            "alias": "UKR",
                            "label": "Ukraine"
                        },
                        {
                            "alias": "ARE",
                            "label": "United Arab Emirates"
                        },
                        {
                            "alias": "GBR",
                            "label": "United Kingdom"
                        },
                        {
                            "alias": "USA",
                            "label": "United States"
                        },
                        {
                            "alias": "URY",
                            "label": "Uruguay"
                        },
                        {
                            "alias": "UZB",
                            "label": "Uzbekistan"
                        },
                        {
                            "alias": "VEN",
                            "label": "Venezuela"
                        },
                        {
                            "alias": "VNM",
                            "label": "Vietnam"
                        },
                        {
                            "alias": "001",
                            "label": "World"
                        },
                        {
                            "alias": "YEM",
                            "label": "Yemen"
                        },
                        {
                            "alias": "ZWE",
                            "label": "Zimbabwe"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "22",
                    "alias": "country-headquarters",
                    "label": "Which country is your company headquartered in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "agriculture-forestry-and-fishing",
                            "label": "Agriculture, Forestry and Fishing"
                        },
                        {
                            "alias": "mining-quarrying-drilling-incl-oil-and-gas",
                            "label": "Mining, quarrying & drilling (incl oil and gas)"
                        },
                        {
                            "alias": "manufacturing-aerospacedefenceadvanced",
                            "label": "Manufacturing: Aerospace/Defence/Advanced"
                        },
                        {
                            "alias": "manufacturing-automotiverailmarine",
                            "label": "Manufacturing: Automotive/Rail/Marine"
                        },
                        {
                            "alias": "manufacturing-life-scienceschemicalspharmaceuticals",
                            "label": "Manufacturing: Life Sciences/Chemicals/Pharmaceuticals"
                        },
                        {
                            "alias": "manufacturing-food-beverages-processing",
                            "label": "Manufacturing: Food, Beverages Processing"
                        },
                        {
                            "alias": "manufacturing-other",
                            "label": "Manufacturing: Other"
                        },
                        {
                            "alias": "electrical-gas-and-steam-supply-and-equipment-incl-air-conditioning",
                            "label": "Electrical, gas and steam supply and equipment (incl air-conditioning)"
                        },
                        {
                            "alias": "water-supply-sewerage-waste-management",
                            "label": "Water supply, sewerage, waste management"
                        },
                        {
                            "alias": "construction",
                            "label": "Construction"
                        },
                        {
                            "alias": "wholesale-retail-including-automotive-and-motor-bike-repairs",
                            "label": "Wholesale, Retail (including automotive and motor bike repairs)"
                        },
                        {
                            "alias": "transport-logistics-and-storage",
                            "label": "Transport, logistics and storage"
                        },
                        {
                            "alias": "food-beverages",
                            "label": "Food, beverages"
                        },
                        {
                            "alias": "information-and-communications-technology-incl-digital",
                            "label": "Information and Communications Technology (incl digital)"
                        },
                        {
                            "alias": "finance-and-insurance-services",
                            "label": "Finance and insurance services"
                        },
                        {
                            "alias": "real-estate",
                            "label": "Real estate"
                        },
                        {
                            "alias": "professional-scientific-and-technical-services-consultancy",
                            "label": "Professional, scientific and technical services & consultancy"
                        },
                        {
                            "alias": "administration-and-support",
                            "label": "Administration and support"
                        },
                        {
                            "alias": "public-administration-and-defence",
                            "label": "Public administration and defence"
                        },
                        {
                            "alias": "education",
                            "label": "Education"
                        },
                        {
                            "alias": "health-and-social-care",
                            "label": "Health and social care"
                        },
                        {
                            "alias": "arts-and-creativity",
                            "label": "Arts and creativity"
                        },
                        {
                            "alias": "travel-tourism-catering-hotels-and-leisure",
                            "label": "Travel, tourism, catering hotels and leisure"
                        },
                        {
                            "alias": "dont-know",
                            "label": "Don�t Know"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "23",
                    "alias": "sector",
                    "label": "What sector are you in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [
                {
                    "alias": "address",
                    "label": "Address",
                    "description": null
                }
            ],
            "alias": "getting-to-know-you",
            "label": "Getting to know you as a business",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "options": [
                        {
                            "alias": "hiring-new-staff",
                            "label": "Hiring new staff"
                        },
                        {
                            "alias": "product-development",
                            "label": "Product development"
                        },
                        {
                            "alias": "purchasing-new-equipment",
                            "label": "Purchasing new equipment / machinery"
                        },
                        {
                            "alias": "expansion-in-domestic-market",
                            "label": "Expansion in domestic market"
                        },
                        {
                            "alias": "expansion-abroad",
                            "label": "Expansion abroad"
                        },
                        {
                            "alias": "moving-to-new-business-premises",
                            "label": "Moving to new business premises"
                        },
                        {
                            "alias": "raising-money",
                            "label": "Raising money"
                        },
                        {
                            "alias": "other",
                            "label": "Other"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "1",
                    "alias": "business-investment-plans",
                    "label": "Do you have any of the following business investment plans over the next 12 months?",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "1.1",
                    "alias": "business-investment-plans-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "optionAlias": "other",
                            "conditionQuestionAlias": "business-investment-plans",
                            "type": "QuestionConditionMultipleChoiceDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "working-cap",
                            "label": "Working capital loan"
                        },
                        {
                            "alias": "invoice-financing",
                            "label": "Invoice financing"
                        },
                        {
                            "alias": "overdraft",
                            "label": "Overdraft"
                        },
                        {
                            "alias": "currency-hedging",
                            "label": "Currency hedging"
                        },
                        {
                            "alias": "foreign-currency-bank-account",
                            "label": "Foreign currency bank account"
                        },
                        {
                            "alias": "export-finance",
                            "label": "Export finance (eg letter of credit)"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "1.1",
                    "alias": "type-of-finance-needed",
                    "label": "To match you with the right opportunity, what type of finance do you need?",
                    "description": null,
                    "conditions": [
                        {
                            "optionAlias": "raising-money",
                            "conditionQuestionAlias": "business-investment-plans",
                            "type": "QuestionConditionMultipleChoiceDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "less-than-50000",
                            "label": "<50,000"
                        },
                        {
                            "alias": "50000-150000",
                            "label": "50,000-150,000"
                        },
                        {
                            "alias": "150000-300000",
                            "label": "150,000-300,000"
                        },
                        {
                            "alias": "300000-500000",
                            "label": "300,000-500,000"
                        },
                        {
                            "alias": "500000-1000000",
                            "label": "500,000-1,000,000"
                        },
                        {
                            "alias": "1000000-2000000",
                            "label": "1,000,000-2,000,000"
                        },
                        {
                            "alias": "2000000-3000000",
                            "label": "2,000,000-3,000,000"
                        },
                        {
                            "alias": "3000000-4000000",
                            "label": "3,000,000-4,000,000"
                        },
                        {
                            "alias": "4000000-5000000",
                            "label": "4,000,000-5,000,000"
                        },
                        {
                            "alias": "more-than-5000000",
                            "label": "5,000,000+"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "2",
                    "alias": "planned-investment-product-sustainability",
                    "label": "Do you have any planned investment in R&D to make your products more sustainable?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "product-new-to-some",
                            "label": "You deliver a product or have developed a service that is new to some or all of your customers"
                        },
                        {
                            "alias": "product-different-to-competitors",
                            "label": "You deliver a product or have developed a service that is different to that offered by your competitors"
                        },
                        {
                            "alias": "spending-on-r-and-d",
                            "label": "You spend a regular percentage of your turnover on R&D"
                        },
                        {
                            "alias": "new-approach",
                            "label": "You have a new approach to existing technologies or your sector"
                        },
                        {
                            "alias": "dont-know",
                            "label": "Don't know"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "3",
                    "alias": "product-novelty",
                    "label": "Which of the following apply to your business?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "max": 2147483647,
                    "min": 0,
                    "format": "Number",
                    "number": "4",
                    "alias": "employee-count",
                    "label": "How many people do you employ?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionNumberDto"
                },
                {
                    "options": [
                        {
                            "alias": "c-suite",
                            "label": "C-suite"
                        },
                        {
                            "alias": "management",
                            "label": "Management"
                        },
                        {
                            "alias": "it",
                            "label": "IT"
                        },
                        {
                            "alias": "marketing",
                            "label": "Marketing"
                        },
                        {
                            "alias": "administration",
                            "label": "Administration"
                        },
                        {
                            "alias": "productionservice-delivery",
                            "label": "Production/service delivery"
                        },
                        {
                            "alias": "r-and-d",
                            "label": "R&D"
                        },
                        {
                            "alias": "business-development-domestic",
                            "label": "Business development (domestic)"
                        },
                        {
                            "alias": "business-development-international",
                            "label": "Business development (international)"
                        },
                        {
                            "alias": "legalregulation",
                            "label": "Legal/regulation"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "5",
                    "alias": "function-of-staff",
                    "label": "In what functions are the majority of your staff employed?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "c-suite",
                            "label": "C-suite"
                        },
                        {
                            "alias": "management",
                            "label": "Management"
                        },
                        {
                            "alias": "it",
                            "label": "IT"
                        },
                        {
                            "alias": "marketing",
                            "label": "Marketing"
                        },
                        {
                            "alias": "administration",
                            "label": "Administration"
                        },
                        {
                            "alias": "productionservice-delivery",
                            "label": "Production/service delivery"
                        },
                        {
                            "alias": "r-and-d",
                            "label": "R&D"
                        },
                        {
                            "alias": "business-development-domestic",
                            "label": "Business development (domestic)"
                        },
                        {
                            "alias": "business-development-international",
                            "label": "Business development (international)"
                        },
                        {
                            "alias": "legalregulation",
                            "label": "Legal/regulation"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "6",
                    "alias": "biggest-skill-gap",
                    "label": "Where do you feel your biggest gaps are in terms of skills?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "number": "7",
                    "alias": "need-to-recruit-to-expand-abroad",
                    "label": "Will you need to recruit to help you expand abroad?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "7.1",
                    "alias": "need-to-recruit-to-expand-abroad-budget",
                    "label": "Have you put aside a budget for this?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "need-to-recruit-to-expand-abroad",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "8",
                    "alias": "have-go-to-market-plan",
                    "label": "Do you have a go-to-market plan?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "8.1",
                    "alias": "go-to-market-plan-for-each-country",
                    "label": "For each country/market identified?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [
                        "Currency"
                    ],
                    "number": "8.1",
                    "alias": "go-to-market-plan-market-size",
                    "label": "What is your estimated addressable market size?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null,
                    "number": "8.1",
                    "alias": "go-to-market-plan-competitors",
                    "label": "Who are the names of your competitors in that market?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextListDto"
                },
                {
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null,
                    "number": "8.1",
                    "alias": "go-to-market-plan-potential-clients",
                    "label": "Who are your potential clients?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextListDto"
                },
                {
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null,
                    "number": "8.1",
                    "alias": "go-to-market-plan-existing-clients",
                    "label": "Do you have existing clients?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextListDto"
                },
                {
                    "number": "8.1",
                    "alias": "go-to-market-plan-existing-contacts",
                    "label": "Do you have any existing partnerships or contacts?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "8.1",
                    "alias": "go-to-market-plan-market-developing",
                    "label": "How do you see the market developing over time?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "8.1",
                    "alias": "go-to-market-plan-sell-product",
                    "label": "How do you propose to sell your product (eg distributor, direct sales, agency, own office in the country)?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "yes",
                            "label": "Yes"
                        },
                        {
                            "alias": "no",
                            "label": "No"
                        },
                        {
                            "alias": "not-exported",
                            "label": "Not exported"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "8.1",
                    "alias": "go-to-market-plan-export-experiences",
                    "label": "Are there any export experiences you can use?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "import-goods-or-services",
                            "label": "Import goods or services"
                        },
                        {
                            "alias": "export-goods-or-services",
                            "label": "Export goods or services"
                        },
                        {
                            "alias": "import-and-export-goods-and-services",
                            "label": "Import and export goods and services"
                        },
                        {
                            "alias": "provide-services",
                            "label": "Provide services"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "9",
                    "alias": "what-do-you-do-import-export",
                    "label": "Do you do any or all of the following?",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "AFG",
                            "label": "Afghanistan"
                        },
                        {
                            "alias": "ALB",
                            "label": "Albania"
                        },
                        {
                            "alias": "DZA",
                            "label": "Algeria"
                        },
                        {
                            "alias": "ARG",
                            "label": "Argentina"
                        },
                        {
                            "alias": "ARM",
                            "label": "Armenia"
                        },
                        {
                            "alias": "AUS",
                            "label": "Australia"
                        },
                        {
                            "alias": "AUT",
                            "label": "Austria"
                        },
                        {
                            "alias": "AZE",
                            "label": "Azerbaijan"
                        },
                        {
                            "alias": "BHR",
                            "label": "Bahrain"
                        },
                        {
                            "alias": "BGD",
                            "label": "Bangladesh"
                        },
                        {
                            "alias": "BLR",
                            "label": "Belarus"
                        },
                        {
                            "alias": "BEL",
                            "label": "Belgium"
                        },
                        {
                            "alias": "BLZ",
                            "label": "Belize"
                        },
                        {
                            "alias": "BTN",
                            "label": "Bhutan"
                        },
                        {
                            "alias": "BOL",
                            "label": "Bolivia"
                        },
                        {
                            "alias": "BIH",
                            "label": "Bosnia and Herzegovina"
                        },
                        {
                            "alias": "BWA",
                            "label": "Botswana"
                        },
                        {
                            "alias": "BRA",
                            "label": "Brazil"
                        },
                        {
                            "alias": "BRN",
                            "label": "Brunei"
                        },
                        {
                            "alias": "BGR",
                            "label": "Bulgaria"
                        },
                        {
                            "alias": "KHM",
                            "label": "Cambodia"
                        },
                        {
                            "alias": "CMR",
                            "label": "Cameroon"
                        },
                        {
                            "alias": "CAN",
                            "label": "Canada"
                        },
                        {
                            "alias": "029",
                            "label": "Caribbean"
                        },
                        {
                            "alias": "CHL",
                            "label": "Chile"
                        },
                        {
                            "alias": "CHN",
                            "label": "China"
                        },
                        {
                            "alias": "COL",
                            "label": "Colombia"
                        },
                        {
                            "alias": "COD",
                            "label": "Congo (DRC)"
                        },
                        {
                            "alias": "CRI",
                            "label": "Costa Rica"
                        },
                        {
                            "alias": "CIV",
                            "label": "Côte d’Ivoire"
                        },
                        {
                            "alias": "HRV",
                            "label": "Croatia"
                        },
                        {
                            "alias": "CUB",
                            "label": "Cuba"
                        },
                        {
                            "alias": "CZE",
                            "label": "Czech Republic"
                        },
                        {
                            "alias": "DNK",
                            "label": "Denmark"
                        },
                        {
                            "alias": "DJI",
                            "label": "Djibouti"
                        },
                        {
                            "alias": "DOM",
                            "label": "Dominican Republic"
                        },
                        {
                            "alias": "ECU",
                            "label": "Ecuador"
                        },
                        {
                            "alias": "EGY",
                            "label": "Egypt"
                        },
                        {
                            "alias": "SLV",
                            "label": "El Salvador"
                        },
                        {
                            "alias": "ERI",
                            "label": "Eritrea"
                        },
                        {
                            "alias": "EST",
                            "label": "Estonia"
                        },
                        {
                            "alias": "ETH",
                            "label": "Ethiopia"
                        },
                        {
                            "alias": "FRO",
                            "label": "Faroe Islands"
                        },
                        {
                            "alias": "FIN",
                            "label": "Finland"
                        },
                        {
                            "alias": "FRA",
                            "label": "France"
                        },
                        {
                            "alias": "GEO",
                            "label": "Georgia"
                        },
                        {
                            "alias": "DEU",
                            "label": "Germany"
                        },
                        {
                            "alias": "GRC",
                            "label": "Greece"
                        },
                        {
                            "alias": "GRL",
                            "label": "Greenland"
                        },
                        {
                            "alias": "GTM",
                            "label": "Guatemala"
                        },
                        {
                            "alias": "HTI",
                            "label": "Haiti"
                        },
                        {
                            "alias": "HND",
                            "label": "Honduras"
                        },
                        {
                            "alias": "HKG",
                            "label": "Hong Kong SAR"
                        },
                        {
                            "alias": "HUN",
                            "label": "Hungary"
                        },
                        {
                            "alias": "ISL",
                            "label": "Iceland"
                        },
                        {
                            "alias": "IND",
                            "label": "India"
                        },
                        {
                            "alias": "IDN",
                            "label": "Indonesia"
                        },
                        {
                            "alias": "IRN",
                            "label": "Iran"
                        },
                        {
                            "alias": "IRQ",
                            "label": "Iraq"
                        },
                        {
                            "alias": "IRL",
                            "label": "Ireland"
                        },
                        {
                            "alias": "ISR",
                            "label": "Israel"
                        },
                        {
                            "alias": "ITA",
                            "label": "Italy"
                        },
                        {
                            "alias": "JAM",
                            "label": "Jamaica"
                        },
                        {
                            "alias": "JPN",
                            "label": "Japan"
                        },
                        {
                            "alias": "JOR",
                            "label": "Jordan"
                        },
                        {
                            "alias": "KAZ",
                            "label": "Kazakhstan"
                        },
                        {
                            "alias": "KEN",
                            "label": "Kenya"
                        },
                        {
                            "alias": "KOR",
                            "label": "Korea"
                        },
                        {
                            "alias": "KWT",
                            "label": "Kuwait"
                        },
                        {
                            "alias": "KGZ",
                            "label": "Kyrgyzstan"
                        },
                        {
                            "alias": "LAO",
                            "label": "Laos"
                        },
                        {
                            "alias": "419",
                            "label": "Latin America"
                        },
                        {
                            "alias": "LVA",
                            "label": "Latvia"
                        },
                        {
                            "alias": "LBN",
                            "label": "Lebanon"
                        },
                        {
                            "alias": "LBY",
                            "label": "Libya"
                        },
                        {
                            "alias": "LIE",
                            "label": "Liechtenstein"
                        },
                        {
                            "alias": "LTU",
                            "label": "Lithuania"
                        },
                        {
                            "alias": "LUX",
                            "label": "Luxembourg"
                        },
                        {
                            "alias": "MAC",
                            "label": "Macao SAR"
                        },
                        {
                            "alias": "MKD",
                            "label": "Macedonia, FYRO"
                        },
                        {
                            "alias": "MYS",
                            "label": "Malaysia"
                        },
                        {
                            "alias": "MDV",
                            "label": "Maldives"
                        },
                        {
                            "alias": "MLI",
                            "label": "Mali"
                        },
                        {
                            "alias": "MLT",
                            "label": "Malta"
                        },
                        {
                            "alias": "MEX",
                            "label": "Mexico"
                        },
                        {
                            "alias": "MDA",
                            "label": "Moldova"
                        },
                        {
                            "alias": "MCO",
                            "label": "Monaco"
                        },
                        {
                            "alias": "MNG",
                            "label": "Mongolia"
                        },
                        {
                            "alias": "MNE",
                            "label": "Montenegro"
                        },
                        {
                            "alias": "MAR",
                            "label": "Morocco"
                        },
                        {
                            "alias": "MMR",
                            "label": "Myanmar"
                        },
                        {
                            "alias": "NPL",
                            "label": "Nepal"
                        },
                        {
                            "alias": "NLD",
                            "label": "Netherlands"
                        },
                        {
                            "alias": "NZL",
                            "label": "New Zealand"
                        },
                        {
                            "alias": "NIC",
                            "label": "Nicaragua"
                        },
                        {
                            "alias": "NGA",
                            "label": "Nigeria"
                        },
                        {
                            "alias": "NOR",
                            "label": "Norway"
                        },
                        {
                            "alias": "OMN",
                            "label": "Oman"
                        },
                        {
                            "alias": "PAK",
                            "label": "Pakistan"
                        },
                        {
                            "alias": "PAN",
                            "label": "Panama"
                        },
                        {
                            "alias": "PRY",
                            "label": "Paraguay"
                        },
                        {
                            "alias": "PER",
                            "label": "Peru"
                        },
                        {
                            "alias": "PHL",
                            "label": "Philippines"
                        },
                        {
                            "alias": "POL",
                            "label": "Poland"
                        },
                        {
                            "alias": "PRT",
                            "label": "Portugal"
                        },
                        {
                            "alias": "PRI",
                            "label": "Puerto Rico"
                        },
                        {
                            "alias": "QAT",
                            "label": "Qatar"
                        },
                        {
                            "alias": "REU",
                            "label": "Réunion"
                        },
                        {
                            "alias": "ROU",
                            "label": "Romania"
                        },
                        {
                            "alias": "RUS",
                            "label": "Russia"
                        },
                        {
                            "alias": "RWA",
                            "label": "Rwanda"
                        },
                        {
                            "alias": "SAU",
                            "label": "Saudi Arabia"
                        },
                        {
                            "alias": "SEN",
                            "label": "Senegal"
                        },
                        {
                            "alias": "SRB",
                            "label": "Serbia"
                        },
                        {
                            "alias": "SGP",
                            "label": "Singapore"
                        },
                        {
                            "alias": "SVK",
                            "label": "Slovakia"
                        },
                        {
                            "alias": "SVN",
                            "label": "Slovenia"
                        },
                        {
                            "alias": "SOM",
                            "label": "Somalia"
                        },
                        {
                            "alias": "ZAF",
                            "label": "South Africa"
                        },
                        {
                            "alias": "ESP",
                            "label": "Spain"
                        },
                        {
                            "alias": "LKA",
                            "label": "Sri Lanka"
                        },
                        {
                            "alias": "SWE",
                            "label": "Sweden"
                        },
                        {
                            "alias": "CHE",
                            "label": "Switzerland"
                        },
                        {
                            "alias": "SYR",
                            "label": "Syria"
                        },
                        {
                            "alias": "TWN",
                            "label": "Taiwan"
                        },
                        {
                            "alias": "TJK",
                            "label": "Tajikistan"
                        },
                        {
                            "alias": "THA",
                            "label": "Thailand"
                        },
                        {
                            "alias": "TTO",
                            "label": "Trinidad and Tobago"
                        },
                        {
                            "alias": "TUN",
                            "label": "Tunisia"
                        },
                        {
                            "alias": "TUR",
                            "label": "Turkey"
                        },
                        {
                            "alias": "TKM",
                            "label": "Turkmenistan"
                        },
                        {
                            "alias": "UKR",
                            "label": "Ukraine"
                        },
                        {
                            "alias": "ARE",
                            "label": "United Arab Emirates"
                        },
                        {
                            "alias": "GBR",
                            "label": "United Kingdom"
                        },
                        {
                            "alias": "USA",
                            "label": "United States"
                        },
                        {
                            "alias": "URY",
                            "label": "Uruguay"
                        },
                        {
                            "alias": "UZB",
                            "label": "Uzbekistan"
                        },
                        {
                            "alias": "VEN",
                            "label": "Venezuela"
                        },
                        {
                            "alias": "VNM",
                            "label": "Vietnam"
                        },
                        {
                            "alias": "001",
                            "label": "World"
                        },
                        {
                            "alias": "YEM",
                            "label": "Yemen"
                        },
                        {
                            "alias": "ZWE",
                            "label": "Zimbabwe"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "10",
                    "alias": "which-markets-are-you-interested-in",
                    "label": "Which of the following markets are you interested in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "agriculture-forestry-and-fishing",
                            "label": "Agriculture, Forestry and Fishing"
                        },
                        {
                            "alias": "mining-quarrying-drilling-incl-oil-and-gas",
                            "label": "Mining, quarrying & drilling (incl oil and gas)"
                        },
                        {
                            "alias": "manufacturing-aerospacedefenceadvanced",
                            "label": "Manufacturing: Aerospace/Defence/Advanced"
                        },
                        {
                            "alias": "manufacturing-automotiverailmarine",
                            "label": "Manufacturing: Automotive/Rail/Marine"
                        },
                        {
                            "alias": "manufacturing-life-scienceschemicalspharmaceuticals",
                            "label": "Manufacturing: Life Sciences/Chemicals/Pharmaceuticals"
                        },
                        {
                            "alias": "manufacturing-food-beverages-processing",
                            "label": "Manufacturing: Food, Beverages Processing"
                        },
                        {
                            "alias": "manufacturing-other",
                            "label": "Manufacturing: Other"
                        },
                        {
                            "alias": "electrical-gas-and-steam-supply-and-equipment-incl-air-conditioning",
                            "label": "Electrical, gas and steam supply and equipment (incl air-conditioning)"
                        },
                        {
                            "alias": "water-supply-sewerage-waste-management",
                            "label": "Water supply, sewerage, waste management"
                        },
                        {
                            "alias": "construction",
                            "label": "Construction"
                        },
                        {
                            "alias": "wholesale-retail-including-automotive-and-motor-bike-repairs",
                            "label": "Wholesale, Retail (including automotive and motor bike repairs)"
                        },
                        {
                            "alias": "transport-logistics-and-storage",
                            "label": "Transport, logistics and storage"
                        },
                        {
                            "alias": "food-beverages",
                            "label": "Food, beverages"
                        },
                        {
                            "alias": "information-and-communications-technology-incl-digital",
                            "label": "Information and Communications Technology (incl digital)"
                        },
                        {
                            "alias": "finance-and-insurance-services",
                            "label": "Finance and insurance services"
                        },
                        {
                            "alias": "real-estate",
                            "label": "Real estate"
                        },
                        {
                            "alias": "professional-scientific-and-technical-services-consultancy",
                            "label": "Professional, scientific and technical services & consultancy"
                        },
                        {
                            "alias": "administration-and-support",
                            "label": "Administration and support"
                        },
                        {
                            "alias": "public-administration-and-defence",
                            "label": "Public administration and defence"
                        },
                        {
                            "alias": "education",
                            "label": "Education"
                        },
                        {
                            "alias": "health-and-social-care",
                            "label": "Health and social care"
                        },
                        {
                            "alias": "arts-and-creativity",
                            "label": "Arts and creativity"
                        },
                        {
                            "alias": "travel-tourism-catering-hotels-and-leisure",
                            "label": "Travel, tourism, catering hotels and leisure"
                        },
                        {
                            "alias": "dont-know",
                            "label": "Don�t Know"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "11",
                    "alias": "which-sectors-are-you-interested-in",
                    "label": "Which of the following products or sectors are you interested in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "options": [
                        {
                            "alias": "supply-chain",
                            "label": "Supply chain"
                        },
                        {
                            "alias": "buyers",
                            "label": "Buyers"
                        },
                        {
                            "alias": "export-agents",
                            "label": "Export agents"
                        },
                        {
                            "alias": "sellers",
                            "label": "Sellers"
                        },
                        {
                            "alias": "freight",
                            "label": "Freight"
                        },
                        {
                            "alias": "banks",
                            "label": "Banks"
                        },
                        {
                            "alias": "trade-finance",
                            "label": "Trade finance"
                        },
                        {
                            "alias": "ports",
                            "label": "Ports"
                        },
                        {
                            "alias": "marketing-opportunities",
                            "label": "Marketing opportunities"
                        },
                        {
                            "alias": "production",
                            "label": "Production"
                        },
                        {
                            "alias": "manufacturing",
                            "label": "Manufacturing"
                        },
                        {
                            "alias": "access-to-finance",
                            "label": "Access to finance"
                        },
                        {
                            "alias": "value-chain",
                            "label": "Value chain"
                        },
                        {
                            "alias": "trade-show",
                            "label": "Trade show"
                        },
                        {
                            "alias": "advertising-opportunities",
                            "label": "Advertising opportunities"
                        },
                        {
                            "alias": "importers",
                            "label": "Importers"
                        },
                        {
                            "alias": "prices",
                            "label": "Prices"
                        },
                        {
                            "alias": "trade-flow",
                            "label": "Trade flow"
                        },
                        {
                            "alias": "infrastructure",
                            "label": "Infrastructure"
                        },
                        {
                            "alias": "rail-freight",
                            "label": "Rail freight"
                        },
                        {
                            "alias": "distribution",
                            "label": "Distribution"
                        },
                        {
                            "alias": "logistics",
                            "label": "Logistics"
                        },
                        {
                            "alias": "insurance",
                            "label": "Insurance"
                        },
                        {
                            "alias": "political-risk",
                            "label": "Political risk"
                        },
                        {
                            "alias": "gdp",
                            "label": "GDP"
                        },
                        {
                            "alias": "inflation",
                            "label": "Inflation"
                        },
                        {
                            "alias": "market",
                            "label": "Market"
                        },
                        {
                            "alias": "courier",
                            "label": "Courier"
                        },
                        {
                            "alias": "freight-forwarder",
                            "label": "Freight forwarder"
                        },
                        {
                            "alias": "tariffs",
                            "label": "Tariff(s)"
                        },
                        {
                            "alias": "advertising",
                            "label": "Advertising"
                        },
                        {
                            "alias": "warehouse",
                            "label": "Warehouse"
                        },
                        {
                            "alias": "freight-hub",
                            "label": "Freight hub"
                        },
                        {
                            "alias": "exchange-rates",
                            "label": "Exchange rates"
                        },
                        {
                            "alias": "customs-brokers",
                            "label": "Customs brokers"
                        },
                        {
                            "alias": "translation",
                            "label": "Translation"
                        },
                        {
                            "alias": "regulations",
                            "label": "Regulations"
                        },
                        {
                            "alias": "value-added",
                            "label": "Value added"
                        },
                        {
                            "alias": "corruption",
                            "label": "Corruption"
                        },
                        {
                            "alias": "internal-conflict",
                            "label": "Internal conflict"
                        },
                        {
                            "alias": "external-conflict",
                            "label": "External conflict"
                        },
                        {
                            "alias": "regime-type",
                            "label": "Regime type"
                        },
                        {
                            "alias": "terror-threat",
                            "label": "Terror threat"
                        },
                        {
                            "alias": "foreign-policy",
                            "label": "Foreign policy"
                        },
                        {
                            "alias": "foreign-relations",
                            "label": "Foreign relations"
                        },
                        {
                            "alias": "trade-partner",
                            "label": "Trade partner"
                        },
                        {
                            "alias": "import-partner",
                            "label": "Import Partner"
                        },
                        {
                            "alias": "export-partner",
                            "label": "Export partner"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "12",
                    "alias": "which-areas-are-you-interested-in",
                    "label": "Which of the following are particular areas of interest?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-plan-your-business",
            "label": "To help you plan your business",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "max": 2147483647,
                    "min": 0,
                    "format": "Currency",
                    "number": "1",
                    "alias": "annual-turnover",
                    "label": "What was your annual turnover in your last financial year?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionNumberDto"
                },
                {
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ],
                    "number": "2",
                    "alias": "annual-accounts",
                    "label": "Please upload your annual accounts for the last 3 years",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                },
                {
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ],
                    "number": "3",
                    "alias": "cash-flow-forecast",
                    "label": "Please upload your annual accounts for the last 3 years",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                },
                {
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ],
                    "number": "4",
                    "alias": "other-information",
                    "label": "Please upload any other information that will help you plan your business growth and cashflow, trade finance or working capital needs",
                    "description": "For example, latest management accounts",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                },
                {
                    "max": 2147483647,
                    "min": 0,
                    "format": "Currency",
                    "number": "5",
                    "alias": "finance-needed",
                    "label": "Please give an indication of the amount of finance you think you would need to facilitate your exports",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionNumberDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-plan-your-finances",
            "label": "To help you plan your finances",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "number": "1",
                    "alias": "have-existing-clients-abroad",
                    "label": "Do you have any existing clients abroad?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "itemsMin": 1,
                    "itemsMax": 15,
                    "subSectionAlias": "client-contract",
                    "number": "1.1",
                    "alias": "existing-clients-abroad-details",
                    "label": "Please provide details",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "have-existing-clients-abroad",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionSubSectionListDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "2",
                    "alias": "fail-to-deliver-on-contract",
                    "label": "You fail to deliver on contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "2.1",
                    "alias": "fail-to-deliver-on-contract-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "fail-to-deliver-on-contract",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "3",
                    "alias": "client-cancels-contract",
                    "label": "The client cancels the contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "3.1",
                    "alias": "client-cancels-contract-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "client-cancels-contract",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "4",
                    "alias": "client-fails-to-pay",
                    "label": "The client fails to pay for delivery of the contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "4.1",
                    "alias": "client-fails-to-pay-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "client-fails-to-pay",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "5",
                    "alias": "payment-dispute",
                    "label": "You enter a dispute with the client on payment",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "5.1",
                    "alias": "payment-dispute-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "payment-dispute",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "6",
                    "alias": "market-is-smaller",
                    "label": "The market is smaller than you expected",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "6.1",
                    "alias": "market-is-smaller-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "market-is-smaller",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "7",
                    "alias": "slower-market-growth",
                    "label": "The market doesn’t grow as quickly as you expected",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "7.1",
                    "alias": "slower-market-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "slower-market-growth",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "8",
                    "alias": "cant-get-finance-for-growth",
                    "label": "You can’t get the finance to support your growth in that market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "8.1",
                    "alias": "cant-get-finance-for-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "cant-get-finance-for-growth",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "9",
                    "alias": "cant-recruit-skills-for-growth",
                    "label": "You can’t recruit the skills to support your growth in that market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "9.1",
                    "alias": "cant-recruit-skills-for-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "cant-recruit-skills-for-growth",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "10",
                    "alias": "competitors-are-too-strong",
                    "label": "The competitors are too strong and you can’t get a foothold in the market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "10.1",
                    "alias": "competitors-are-too-strong-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "competitors-are-too-strong",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "11",
                    "alias": "regulations-are-too-tight",
                    "label": "The regulations are too tight",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "11.1",
                    "alias": "regulations-are-too-tight-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "regulations-are-too-tight",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "12",
                    "alias": "tariffs-are-too-high",
                    "label": "The tariffs are too high",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionNumberDto"
                },
                {
                    "number": "12.1",
                    "alias": "tariffs-are-too-high-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "tariffs-are-too-high",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "type": "QuestionBoolDto"
                },
                {
                    "options": [
                        {
                            "alias": "sanctions-breaches",
                            "label": "Sanctions breaches"
                        },
                        {
                            "alias": "sanctioned-directors-or-clients",
                            "label": "Sanctioned Directors or clients"
                        },
                        {
                            "alias": "regulatory-breaches",
                            "label": "Regulatory breaches"
                        },
                        {
                            "alias": "modern-slavery-or-people-trafficking",
                            "label": "Modern slavery or people trafficking"
                        },
                        {
                            "alias": "environmental-standards-breaches",
                            "label": "Environmental standards breaches"
                        },
                        {
                            "alias": "other",
                            "label": "Other"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "13",
                    "alias": "client-activity-international-law",
                    "label": "Are you aware of any activity that your client has been involved with that may contravene international law such as:",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "13.1",
                    "alias": "client-activity-international-law-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "optionAlias": "other",
                            "conditionQuestionAlias": "client-activity-international-law",
                            "type": "QuestionConditionMultipleChoiceDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [
                {
                    "alias": "risks",
                    "label": null,
                    "description": "Please estimate the scale of the biggest risks for each market or client relationship that you can see at present? (1-5 where 1 is very low and 5 is very high)"
                }
            ],
            "alias": "help-you-manage-your-risks",
            "label": "To help you manage your risks",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "itemsMin": 0,
                    "itemsMax": 20,
                    "subSectionAlias": "supplier-contract",
                    "number": "1",
                    "alias": "supplier-contracts-list",
                    "label": "Please enter details for each supplier contract:",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionSubSectionListDto"
                },
                {
                    "number": "2",
                    "alias": "aware-of-regulations-sector",
                    "label": "Are you aware of any specific regulations that apply to your sector?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "2.1",
                    "alias": "aware-of-regulations-sector-details",
                    "label": "Please give details",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "aware-of-regulations-sector",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "3",
                    "alias": "aware-of-regulations-country",
                    "label": "Are you aware of any specific regulations that apply to the country you are trading with?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "3.1",
                    "alias": "aware-of-regulations-country-details",
                    "label": "Please give details",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "aware-of-regulations-country",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "understand-your-esg-score",
            "label": "Understand your ESG score",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "filesMin": 0,
                    "filesMax": 20,
                    "extensions": [
                        "pdf",
                        "txt"
                    ],
                    "number": "1",
                    "alias": "insurance-or-business-policies",
                    "label": "Do you have any or all of the following insurance or business policies?",
                    "description": "\n- Trade credit insurance\n- Employers liability insurance\n- Public indemnity insurance\n- Contract value insurance\n -Other business insurance (eg against pandemics, natural disasters)\n -IT policy\n- Anti bullying policy\n- Anti-corruption and bribery policy\n- Data protection policy\n- Equal opportunities policy\n- Health and safety policy\n- Modern Slavery policy\n- Social media use policy\n- Environmental and impact policy",
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                },
                {
                    "number": "2",
                    "alias": "environmental-and-social-targets",
                    "label": "Do you have environmental and social targets and goals?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "filesMin": 0,
                    "filesMax": 20,
                    "extensions": [
                        "pdf",
                        "txt"
                    ],
                    "number": "2.1",
                    "alias": "environmental-and-social-targets-documentation",
                    "label": "Do you have any or all of the following insurance or business policies?",
                    "description": "Please specify and upload any documentation to support that",
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "environmental-and-social-targets",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-get-through-onboarding",
            "label": "To help you get through onboarding easily",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "number": "1",
                    "alias": "know-what-inco-terms-are",
                    "label": "Do you know what INCO Terms are?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "1.1",
                    "alias": "do-you-know-how-to-comply-with-inco-terms",
                    "label": "Do you know how to comply with INCO Terms?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-what-inco-terms-are",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "2",
                    "alias": "know-what-correspondent-bank-is",
                    "label": "Do you know what a correspondent bank is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "2.1",
                    "alias": "use-a-correspondent-bank",
                    "label": "Do you use a correspondent bank?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-what-correspondent-bank-is",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": 50,
                    "number": "2.1.1",
                    "alias": "which-correspondent-bankbanks-do-you-use",
                    "label": "Which correspondent bank/banks do you use?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "use-a-correspondent-bank",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "type": "QuestionTextListDto"
                },
                {
                    "number": "3",
                    "alias": "know-rules-and-regulations-of-sector",
                    "label": "Do you know the rules and regulations for your particular sector and markets?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "3.1",
                    "alias": "know-rules-and-regulations-of-sector-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-rules-and-regulations-of-sector",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "4",
                    "alias": "know-what-dual-use-good-is",
                    "label": "Do you know what a dual use good is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "number": "4.1",
                    "alias": "supplying-a-dual-use-good",
                    "label": "Are there any circumstances under which your business might be seen as supplying a dual use good?",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-what-dual-use-good-is",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "4.1.1",
                    "alias": "supplying-a-dual-use-good-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "supplying-a-dual-use-good",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "4.1.1",
                    "alias": "supplying-a-dual-use-good-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "supplying-a-dual-use-good",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "5",
                    "alias": "clients-buy-or-sell-dual-use-goods",
                    "label": "Do your clients buy or sell dual use goods?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "5.1",
                    "alias": "clients-buy-or-sell-dual-use-goods-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "clients-buy-or-sell-dual-use-goods",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "5.1",
                    "alias": "clients-buy-or-sell-dual-use-goods-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "clients-buy-or-sell-dual-use-goods",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "6",
                    "alias": "suppliers-buy-or-sell-dual-use-goods",
                    "label": "Do your suppliers buy or sell dual use goods?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "6.1",
                    "alias": "suppliers-buy-or-sell-dual-use-goods-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "suppliers-buy-or-sell-dual-use-goods",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "6.1",
                    "alias": "suppliers-buy-or-sell-dual-use-goods-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "suppliers-buy-or-sell-dual-use-goods",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "7",
                    "alias": "know-what-aml-kyc-is",
                    "label": "Do you know what AML/KYC is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "7.1",
                    "alias": "know-what-aml-kyc-is-describe",
                    "label": "Please describe what you think this is",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-what-aml-kyc-is",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "number": "8",
                    "alias": "know-what-kyt-is",
                    "label": "Do you know what KYT is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": 15,
                    "characterMax": 2000,
                    "validation": [],
                    "number": "8.1",
                    "alias": "know-what-kyt-is-describe",
                    "label": "Please describe what you think this is",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "know-what-kyt-is",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-understand-language-of-trade",
            "label": "To help you understand the language and practice of trade",
            "sectionResponseState": "NotStarted"
        },
        {
            "questions": [
                {
                    "number": "1",
                    "alias": "bool-example",
                    "label": "Bool example question",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "1.1",
                    "alias": "bool-condition-example",
                    "label": "Bool condition example",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "bool-example",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "max": 5,
                    "min": 1,
                    "format": "Range",
                    "number": "2",
                    "alias": "range-example",
                    "label": "Range example",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionNumberDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "2.1",
                    "alias": "range-condition-example",
                    "label": "Range condition example",
                    "description": null,
                    "conditions": [
                        {
                            "value": 2,
                            "operator": "GreaterThan",
                            "conditionQuestionAlias": "range-example",
                            "type": "QuestionConditionNumberDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "characterMin": 10,
                    "characterMax": 125,
                    "validation": [],
                    "number": "3",
                    "alias": "text-example",
                    "label": "Text example",
                    "description": "Some additional description text",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "a",
                            "label": "Apple"
                        },
                        {
                            "alias": "b",
                            "label": "Pineapple"
                        },
                        {
                            "alias": "c",
                            "label": "Pen"
                        },
                        {
                            "alias": "other",
                            "label": "Other"
                        }
                    ],
                    "allowMultiple": true,
                    "number": "4",
                    "alias": "select-example-multiple",
                    "label": "Select example (multiple, other)",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "4.1",
                    "alias": "select-example-multiple-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "optionAlias": "other",
                            "conditionQuestionAlias": "select-example-multiple",
                            "type": "QuestionConditionMultipleChoiceDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "options": [
                        {
                            "alias": "a",
                            "label": "Apple"
                        },
                        {
                            "alias": "b",
                            "label": "Pineapple"
                        },
                        {
                            "alias": "c",
                            "label": "Pen"
                        }
                    ],
                    "allowMultiple": false,
                    "number": "5",
                    "alias": "select-example-single",
                    "label": "Select example (single)",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionMultipleChoiceDto"
                },
                {
                    "number": "5.1",
                    "alias": "multiple-choice-condition-example",
                    "label": "Multiple choice condition example",
                    "description": null,
                    "conditions": [
                        {
                            "optionAlias": "c",
                            "conditionQuestionAlias": "select-example-single",
                            "type": "QuestionConditionMultipleChoiceDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionBoolDto"
                },
                {
                    "characterMin": null,
                    "characterMax": null,
                    "validation": [],
                    "number": "5.1.1",
                    "alias": "nested-condition-example",
                    "label": "Nested condition example",
                    "description": null,
                    "conditions": [
                        {
                            "value": true,
                            "conditionQuestionAlias": "multiple-choice-condition-example",
                            "type": "QuestionConditionBoolDto"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                },
                {
                    "filesMin": 1,
                    "filesMax": 5,
                    "extensions": [
                        "pdf",
                        "txt"
                    ],
                    "number": "6",
                    "alias": "file-list-example",
                    "label": "File list example",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionFileListDto"
                },
                {
                    "itemsMin": 1,
                    "itemsMax": 15,
                    "subSectionAlias": "client-contract-test",
                    "number": "7",
                    "alias": "existing-clients-abroad-details",
                    "label": "Please provide details",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionSubSectionListDto"
                },
                {
                    "characterMin": null,
                    "characterMax": 10,
                    "validation": [
                        "HsCode"
                    ],
                    "number": "8",
                    "alias": "sector-you-are-supplying-in",
                    "label": "The detailed sector that you are supplying in",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "type": "QuestionTextDto"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "test-questionnaire",
            "label": "Test questionnaire",
            "sectionResponseState": "NotStarted"
        }
    ]
    this.smeForm1=this.fb.group({'smeForm1':this.fb.array([this.buildFormData()])})
    // this.smeForm2=this.fb.group({'smeForm2':this.fb.array([])})
    // this.smeForm3=this.fb.group({'smeForm3':this.fb.array([])})
    // this.smeForm4=this.fb.group({'smeForm4':this.fb.array([])})
    // this.smeForm5=this.fb.group({'smeForm5':this.fb.array([])})
    // this.smeForm6=this.fb.group({'smeForm6':this.fb.array([])})
    // this.smeForm7=this.fb.group({'smeForm7':this.fb.array([])})
    // this.smeForm8=this.fb.group({'smeForm8':this.fb.array([])})

    // this.smeForm=this.fb.group(this.groupForm())
      // smeFormDetails:this.fb.array([])
   
    // this.getFormInput=this.formService.render()
    this.cities = [
      { item_id: 1, item_text: "India" },
      { item_id: 2, item_text: "Australia" },
{ item_id: 3, item_text: "America" },
{ item_id: 4, item_text: "Singapore" }
      
    ];
    this.selectedItems = [
      { item_id: 4, item_text: "Pune" },
      { item_id: 6, item_text: "Navsari" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3
    };
    this.questionnaireSections.forEach((secItem,secIndex)=>{
      secItem && secItem.questions.map((quesItem,quesIndex)=>{
          if((quesItem.number - Math.floor(quesItem.number)) !== 0 && this.checkParentresp(secIndex,parseInt(quesItem.number))){
            quesItem.show=false
            quesItem.parentNumber=parseInt(quesItem.number)
            quesItem.response=''
            // quesItem.itHasValue=quesItem.required ? false : true
            quesItem.itHasValue=true
          }
          else{
            quesItem.show=true
            quesItem.parentNumber= (quesItem.number - Math.floor(quesItem.number)) !== 0 ? parseInt(quesItem.number) : ''
            quesItem.response=''
            quesItem.itHasValue=quesItem.required ? false : true
          }
         quesItem.sectionType = secIndex == 0 && quesIndex < 10 ? 'personal' : 'other'
      })
      secItem.itHasValue=false
    })
    console.log(this.questionnaireSections)
    // if(this.sectionIndex == 0){
    //     let tempArr=this.questionnaireSections[0].questions
    //     this.questions= tempArr.slice(0,11)
    // }
  }
//   ngDoCheck(){
//        this.checkForm()
//   }
  checkParentresp(secIndex,parNum){
    let itHasResp=false
   this.questionnaireSections[secIndex].questions.forEach((item) => { 
     if(item.number == parNum && !item.response){
       itHasResp=true
    }
    })
    return itHasResp
  }
  groupForm(){
    let formSections=[];
    this.questionnaireSections.map((item,index)=>{
      // let obj={}
      // obj['smeSectionForm' + (index+1)] = this.fb.array([this.buildFormData()])
      // formSections.push(obj)
      
      var value='smeSectionForm' + (index+1) 
      // formSections.push()
    // formSections[index]=value : this.fb.array([this.buildFormData()])
    })
    return formSections;
  }
  buildFormData(){
    let obj={}
    // this.questions.map((item,index)=>{
    //   obj[item.alias] = [""]
    // })
    return this.fb.group(obj)
  }
  // get formSections(){
  //   return this.smeForm.controls[0].value['smeSectionForm1'] as FormArray
  // }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }

  onSubmit() {
    this.toastr.success("Onboard Sucessfully")
    if (this.sName.valueOf() !== '' || this.taxId.valueOf() !== '') {
      if (this.state.valueOf() !== '' || this.state.valueOf() !== '') {
        this.router.navigate(['sme-dashboard']);
        this.invalidLogin = false;
      }
    } else {
      this.invalidLogin = true
    }
  }
  onTextBoxChange(data,secIndex,quesIndex){
    data.questionDatas.type == 'QuestionNumberDto' && this.questionnaireSections[secIndex].questions.map((item)=>{
        if(data.number == item.parentNumber && (item.conditions.length && item.conditions[0]['conditionQuestionAlias'] ==  data.questionDatas.alias) ){
            if(item.conditions[0]['operator'] == "GreaterThan"){
                item.show =  data.value > item.conditions[0]['value'] ? true : false
            }
            else if(item.conditions[0]['operator'] == "LesserThan"){
                item.show =  data.value < item.conditions[0]['value'] ? true : false
            }
        }
    })
    this.questionnaireSections[secIndex].questions[quesIndex]['response']=data.value
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=data.value ? true : false
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)
  }
  onDropdownChange(data,secIndex,quesIndex){
    this.questionnaireSections[secIndex].questions.map((item)=>{
        if(data.number == item.parentNumber ){
           item.show = this.checkDropdownCond(data.selectedItems,item.conditions && item.conditions.length && item.conditions[0]['optionAlias'])
        }
    })
    let respArr=[]
    data.selectedItems && data.selectedItems.length && data.selectedItems.map((selItem)=>{
        respArr.push(selItem.id)
    })
    this.questionnaireSections[secIndex].questions[quesIndex].response=respArr
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=respArr && respArr.length ? true : false
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)

  }
  checkDropdownCond(selectedItems,conditionAlias){
      let returnValue=false
    selectedItems.length &&  selectedItems.map((item)=>{
        if(item.id == conditionAlias){
            returnValue=true
        }
    })
    return returnValue
  }
  onRadioChange(data,secIndex,quesIndex){
    this.radioChecked={
      isTrue:data.condition,
      secIndex:data.secIndex,
      quesIndex:data.quesIndex
     }

     this.questionnaireSections[secIndex].questions.map((item)=>{
      if(data.questionDatas.number == item.parentNumber && (item.number - Math.floor(item.number)) !== 0){
        item.show = data.condition == "true" ? true : false
        return true;
      }
    })
    this.questionnaireSections[secIndex].questions[quesIndex].response=data.condition == "true" ? "true" : "false"
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=true
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)
    //  this.radioChecked && this.radioChecked['isTrue'] && this.checkCon(data,data.secIndex,data.quesIndex)
}
  onFileChange(data,secIndex,quesIndex){

  }
  onDateChange(data,secIndex,quesIndex){
    this.questionnaireSections[secIndex].questions[quesIndex].response=data
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=data ? true : false
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)
  }
  checkCon(data,secIndex,questionIndex){
    let number=parseFloat(data.number)
    if(!Number.isInteger(number)){
      if(data.questionDatas){
        if((this.radioChecked['secIndex'] == secIndex) && this.radioChecked['isTrue'] == "true"){
          this.questionnaireSections[secIndex].questions.map((item)=>{
            if(data.questionDatas.number == item.parentNumber){
              item.show = true
              return true;
            }
          })
        }
      }
      else{
        return false
      }
        
    }
    else{
    return true
    }
  }

  onSectionClick(index){
    //   let questionLength=this.questionnaireSections[index].questions.length
    //   if(index == 0 && !this.subSection){
    //     this.questions= this.questionnaireSections[0].questions.slice(0,11)
    //   }
    //   else if(index !=0){
    //       this.subSection=false
    //     this.questions=this.questionnaireSections[this.sectionIndex].questions
    //   }
    if(this.sectionIndex < index){
    for(let i=0;i<this.questionnaireSections.length;i++){
        if(index > i){
            this.questionnaireSections[i]['isStepChange']=true
        }
    }
    }
    else{
        for(let i=0;i<this.questionnaireSections.length;i++){
            if(index <= i){
                this.questionnaireSections[i]['isStepChange']=false
            }
        }
    }

    this.sectionIndex=index
      console.log(this.questionnaireSections)

  }
  checkForm(){
      this.questionnaireSections.forEach((item)=>{
          item.questions.forEach((quesItem)=>{
              if(quesItem.required && !quesItem.response){
                    this.disableSubbtn=true
              }
              else{
                  this.disableSubbtn= false
              }
          })
      })
  }
  onTextListChange(event,secIndex,quesIndex){
    this.questionnaireSections[secIndex].questions[quesIndex].response=event.value
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=true
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)
  }

  checkFormComp(sectionIndex){
      let isFormComp = false
    // if(this.sectionIndex == sectionIndex){
    // this.questionnaireSections[sectionIndex].questions.map((item,index)=>{
    //     if(item.required &&  item.response.length ){
    //         isFormComp = true
    //     }
    //     else{
    //         isFormComp = false
    //     }
    // })
    let cond= this.questionnaireSections[sectionIndex].questions
    for(let i=0;i<cond.length;i++){
        if(!cond[i].itHasValue){
            isFormComp=false
            break;
        }
        // if(cond[i].required && cond[i].response.length || (!cond[i].required)){
        //      isFormComp=true
        // }
        // else if(!cond[i].required){
        //      isFormComp=true
        // }
        else{
            isFormComp=true
        }
    }
    return isFormComp
  }
  checkData(){

  }
  onSubSection(type){
      if(type == 'personal'){
          this.subSection=false
        let tempArr=this.questionnaireSections[0].questions
        this.questions= tempArr.slice(0,11)
      }
      else{
          this.subSection=true
        let tempArr=this.questionnaireSections[0].questions
        this.questions= tempArr.slice(11)
        console.log(this.questions)
      }
  }
}