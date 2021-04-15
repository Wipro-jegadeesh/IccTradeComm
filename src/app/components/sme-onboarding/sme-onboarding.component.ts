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
                    "type": "QuestionTextDto",
                    "number": "1",
                    "alias": "name",
                    "label": "Name",
                    "description": "Name of the person accountable for the information provided",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 30,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "2",
                    "alias": "job-title",
                    "label": "Job title",
                    "description": "Job title of the person accountable for the information provided",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 30,
                    "format": "Email"
                },
                {
                    "type": "QuestionDateDto",
                    "number": "3",
                    "alias": "date-founded",
                    "label": "Date founded",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "company",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "dateMin": null,
                    "dateMax": null
                },
                {
                    "type": "QuestionTextDto",
                    "number": "4",
                    "alias": "address-line-1",
                    "label": "Address line 1",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 50,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "5",
                    "alias": "address-line-2",
                    "label": "Address line 2",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": "address",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 50,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "6",
                    "alias": "city",
                    "label": "Town/city",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 100,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "7",
                    "alias": "postcode",
                    "label": "ZIP/Postcode",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "address",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 30,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "8",
                    "alias": "website",
                    "label": "Website",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Url"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "9",
                    "alias": "email",
                    "label": "Email",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "10",
                    "alias": "telephone-mobile",
                    "label": "Mobile",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Phone"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "11",
                    "alias": "social-linked-in",
                    "label": "LinkedIn",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Url"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "12",
                    "alias": "social-twitter",
                    "label": "Twitter",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Url"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "13",
                    "alias": "contact-reasons",
                    "label": "Are you happy for us to contact you occasionally in order to update you on one or all of the following?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "14",
                    "alias": "contact-methods",
                    "label": "What is the best way of contacting you?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "15",
                    "alias": "company-size",
                    "label": "Which of the following best describes you/your business/organisation?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "16",
                    "alias": "domestic-or-international",
                    "label": "Is your business:",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "17",
                    "alias": "domestic-or-international-detail",
                    "label": "Can you provide a bit more detail?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "18",
                    "alias": "country-headquarters",
                    "label": "Which country is your company headquartered in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "options": [
                        {
                            "alias": "AFG",
                            "label": "Afghanistan"
                        },
                        {
                            "alias": "ALA",
                            "label": "Åland Islands"
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
                            "alias": "ASM",
                            "label": "American Samoa"
                        },
                        {
                            "alias": "AND",
                            "label": "Andorra"
                        },
                        {
                            "alias": "AGO",
                            "label": "Angola"
                        },
                        {
                            "alias": "AIA",
                            "label": "Anguilla"
                        },
                        {
                            "alias": "ATG",
                            "label": "Antigua and Barbuda"
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
                            "alias": "ABW",
                            "label": "Aruba"
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
                            "alias": "BHS",
                            "label": "Bahamas"
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
                            "alias": "BRB",
                            "label": "Barbados"
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
                            "alias": "BEN",
                            "label": "Benin"
                        },
                        {
                            "alias": "BMU",
                            "label": "Bermuda"
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
                            "alias": "BES",
                            "label": "Bonaire, Sint Eustatius and Saba"
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
                            "alias": "IOT",
                            "label": "British Indian Ocean Territory"
                        },
                        {
                            "alias": "VGB",
                            "label": "British Virgin Islands"
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
                            "alias": "BFA",
                            "label": "Burkina Faso"
                        },
                        {
                            "alias": "BDI",
                            "label": "Burundi"
                        },
                        {
                            "alias": "CPV",
                            "label": "Cabo Verde"
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
                            "alias": "CYM",
                            "label": "Cayman Islands"
                        },
                        {
                            "alias": "CAF",
                            "label": "Central African Republic"
                        },
                        {
                            "alias": "TCD",
                            "label": "Chad"
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
                            "alias": "CXR",
                            "label": "Christmas Island"
                        },
                        {
                            "alias": "CCK",
                            "label": "Cocos (Keeling) Islands"
                        },
                        {
                            "alias": "COL",
                            "label": "Colombia"
                        },
                        {
                            "alias": "COM",
                            "label": "Comoros"
                        },
                        {
                            "alias": "COG",
                            "label": "Congo"
                        },
                        {
                            "alias": "COD",
                            "label": "Congo (DRC)"
                        },
                        {
                            "alias": "COK",
                            "label": "Cook Islands"
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
                            "alias": "CUW",
                            "label": "Curaçao"
                        },
                        {
                            "alias": "CYP",
                            "label": "Cyprus"
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
                            "alias": "DMA",
                            "label": "Dominica"
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
                            "alias": "GNQ",
                            "label": "Equatorial Guinea"
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
                            "alias": "150",
                            "label": "Europe"
                        },
                        {
                            "alias": "FLK",
                            "label": "Falkland Islands"
                        },
                        {
                            "alias": "FRO",
                            "label": "Faroe Islands"
                        },
                        {
                            "alias": "FJI",
                            "label": "Fiji"
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
                            "alias": "GUF",
                            "label": "French Guiana"
                        },
                        {
                            "alias": "PYF",
                            "label": "French Polynesia"
                        },
                        {
                            "alias": "GAB",
                            "label": "Gabon"
                        },
                        {
                            "alias": "GMB",
                            "label": "Gambia"
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
                            "alias": "GHA",
                            "label": "Ghana"
                        },
                        {
                            "alias": "GIB",
                            "label": "Gibraltar"
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
                            "alias": "GRD",
                            "label": "Grenada"
                        },
                        {
                            "alias": "GLP",
                            "label": "Guadeloupe"
                        },
                        {
                            "alias": "GUM",
                            "label": "Guam"
                        },
                        {
                            "alias": "GTM",
                            "label": "Guatemala"
                        },
                        {
                            "alias": "GGY",
                            "label": "Guernsey"
                        },
                        {
                            "alias": "GIN",
                            "label": "Guinea"
                        },
                        {
                            "alias": "GNB",
                            "label": "Guinea-Bissau"
                        },
                        {
                            "alias": "GUY",
                            "label": "Guyana"
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
                            "alias": "IMN",
                            "label": "Isle of Man"
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
                            "alias": "JEY",
                            "label": "Jersey"
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
                            "alias": "KIR",
                            "label": "Kiribati"
                        },
                        {
                            "alias": "KOR",
                            "label": "Korea"
                        },
                        {
                            "alias": "XKS",
                            "label": "Kosovo"
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
                            "alias": "LSO",
                            "label": "Lesotho"
                        },
                        {
                            "alias": "LBR",
                            "label": "Liberia"
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
                            "alias": "MDG",
                            "label": "Madagascar"
                        },
                        {
                            "alias": "MWI",
                            "label": "Malawi"
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
                            "alias": "MHL",
                            "label": "Marshall Islands"
                        },
                        {
                            "alias": "MTQ",
                            "label": "Martinique"
                        },
                        {
                            "alias": "MRT",
                            "label": "Mauritania"
                        },
                        {
                            "alias": "MUS",
                            "label": "Mauritius"
                        },
                        {
                            "alias": "MYT",
                            "label": "Mayotte"
                        },
                        {
                            "alias": "MEX",
                            "label": "Mexico"
                        },
                        {
                            "alias": "FSM",
                            "label": "Micronesia"
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
                            "alias": "MSR",
                            "label": "Montserrat"
                        },
                        {
                            "alias": "MAR",
                            "label": "Morocco"
                        },
                        {
                            "alias": "MOZ",
                            "label": "Mozambique"
                        },
                        {
                            "alias": "MMR",
                            "label": "Myanmar"
                        },
                        {
                            "alias": "NAM",
                            "label": "Namibia"
                        },
                        {
                            "alias": "NRU",
                            "label": "Nauru"
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
                            "alias": "NCL",
                            "label": "New Caledonia"
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
                            "alias": "NER",
                            "label": "Niger"
                        },
                        {
                            "alias": "NGA",
                            "label": "Nigeria"
                        },
                        {
                            "alias": "NIU",
                            "label": "Niue"
                        },
                        {
                            "alias": "NFK",
                            "label": "Norfolk Island"
                        },
                        {
                            "alias": "PRK",
                            "label": "North Korea"
                        },
                        {
                            "alias": "MNP",
                            "label": "Northern Mariana Islands"
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
                            "alias": "PLW",
                            "label": "Palau"
                        },
                        {
                            "alias": "PSE",
                            "label": "Palestinian Authority"
                        },
                        {
                            "alias": "PAN",
                            "label": "Panama"
                        },
                        {
                            "alias": "PNG",
                            "label": "Papua New Guinea"
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
                            "alias": "PCN",
                            "label": "Pitcairn Islands"
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
                            "alias": "BLM",
                            "label": "Saint Barthélemy"
                        },
                        {
                            "alias": "KNA",
                            "label": "Saint Kitts and Nevis"
                        },
                        {
                            "alias": "LCA",
                            "label": "Saint Lucia"
                        },
                        {
                            "alias": "MAF",
                            "label": "Saint Martin"
                        },
                        {
                            "alias": "SPM",
                            "label": "Saint Pierre and Miquelon"
                        },
                        {
                            "alias": "VCT",
                            "label": "Saint Vincent and the Grenadines"
                        },
                        {
                            "alias": "WSM",
                            "label": "Samoa"
                        },
                        {
                            "alias": "SMR",
                            "label": "San Marino"
                        },
                        {
                            "alias": "STP",
                            "label": "São Tomé and Príncipe"
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
                            "alias": "SYC",
                            "label": "Seychelles"
                        },
                        {
                            "alias": "SLE",
                            "label": "Sierra Leone"
                        },
                        {
                            "alias": "SGP",
                            "label": "Singapore"
                        },
                        {
                            "alias": "SXM",
                            "label": "Sint Maarten"
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
                            "alias": "SLB",
                            "label": "Solomon Islands"
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
                            "alias": "SSD",
                            "label": "South Sudan"
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
                            "alias": "SHN",
                            "label": "St Helena, Ascension, Tristan da Cunha"
                        },
                        {
                            "alias": "SDN",
                            "label": "Sudan"
                        },
                        {
                            "alias": "SUR",
                            "label": "Suriname"
                        },
                        {
                            "alias": "SJM",
                            "label": "Svalbard and Jan Mayen"
                        },
                        {
                            "alias": "SWZ",
                            "label": "Swaziland"
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
                            "alias": "TZA",
                            "label": "Tanzania"
                        },
                        {
                            "alias": "THA",
                            "label": "Thailand"
                        },
                        {
                            "alias": "TLS",
                            "label": "Timor-Leste"
                        },
                        {
                            "alias": "TGO",
                            "label": "Togo"
                        },
                        {
                            "alias": "TKL",
                            "label": "Tokelau"
                        },
                        {
                            "alias": "TON",
                            "label": "Tonga"
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
                            "alias": "TCA",
                            "label": "Turks and Caicos Islands"
                        },
                        {
                            "alias": "TUV",
                            "label": "Tuvalu"
                        },
                        {
                            "alias": "UMI",
                            "label": "U.S. Outlying Islands"
                        },
                        {
                            "alias": "VIR",
                            "label": "U.S. Virgin Islands"
                        },
                        {
                            "alias": "UGA",
                            "label": "Uganda"
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
                            "alias": "VUT",
                            "label": "Vanuatu"
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
                            "alias": "WLF",
                            "label": "Wallis and Futuna"
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
                            "alias": "ZMB",
                            "label": "Zambia"
                        },
                        {
                            "alias": "ZWE",
                            "label": "Zimbabwe"
                        }
                    ],
                    "allowMultiple": false,
                    "format": "Select"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "19",
                    "alias": "sector",
                    "label": "What sector are you in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                            "label": "Don't know"
                        }
                    ],
                    "allowMultiple": false,
                    "format": "Select"
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
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "1",
                    "alias": "business-investment-plans",
                    "label": "Do you have any of the following business investment plans over the next 12 months?",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "1.1",
                    "alias": "business-investment-plans-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionMultipleChoiceDto",
                            "conditionQuestionAlias": "business-investment-plans",
                            "optionAlias": "other"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "1.1",
                    "alias": "type-of-finance-needed",
                    "label": "To match you with the right opportunity, what type of finance do you need?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionMultipleChoiceDto",
                            "conditionQuestionAlias": "business-investment-plans",
                            "optionAlias": "raising-money"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "2",
                    "alias": "planned-investment-product-sustainability",
                    "label": "Do you have any planned investment in R&D to make your products more sustainable?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "3",
                    "alias": "product-novelty",
                    "label": "Which of the following apply to your business?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "4",
                    "alias": "employee-count",
                    "label": "How many people do you employ?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 2147483647,
                    "min": 0,
                    "format": "Number"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "5",
                    "alias": "function-of-staff",
                    "label": "In what functions are the majority of your staff employed?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "6",
                    "alias": "biggest-skill-gap",
                    "label": "Where do you feel your biggest gaps are in terms of skills?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "7",
                    "alias": "need-to-recruit-to-expand-abroad",
                    "label": "Will you need to recruit to help you expand abroad?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "7.1",
                    "alias": "need-to-recruit-to-expand-abroad-budget",
                    "label": "Have you put aside a budget for this?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "need-to-recruit-to-expand-abroad",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "8",
                    "alias": "have-go-to-market-plan",
                    "label": "Do you have a go-to-market plan?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-for-each-country",
                    "label": "For each country/market identified?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-market-size",
                    "label": "What is your estimated addressable market size?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 2147483647,
                    "min": 0,
                    "format": "Currency"
                },
                {
                    "type": "QuestionTextListDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-competitors",
                    "label": "Who are the names of your competitors in that market?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null
                },
                {
                    "type": "QuestionTextListDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-potential-clients",
                    "label": "Who are your potential clients?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null
                },
                {
                    "type": "QuestionTextListDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-existing-clients",
                    "label": "Do you have existing clients?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": null
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-existing-contacts",
                    "label": "Do you have any existing partnerships or contacts?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-market-developing",
                    "label": "How do you see the market developing over time?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-sell-product",
                    "label": "How do you propose to sell your product (eg distributor, direct sales, agency, own office in the country)?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "8.1",
                    "alias": "go-to-market-plan-export-experiences",
                    "label": "Are there any export experiences you can use?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "have-go-to-market-plan",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "9",
                    "alias": "what-do-you-do-import-export",
                    "label": "Do you do any or all of the following?",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "10",
                    "alias": "which-markets-are-you-interested-in",
                    "label": "Which of the following markets are you interested in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "options": [
                        {
                            "alias": "AFG",
                            "label": "Afghanistan"
                        },
                        {
                            "alias": "ALA",
                            "label": "Åland Islands"
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
                            "alias": "ASM",
                            "label": "American Samoa"
                        },
                        {
                            "alias": "AND",
                            "label": "Andorra"
                        },
                        {
                            "alias": "AGO",
                            "label": "Angola"
                        },
                        {
                            "alias": "AIA",
                            "label": "Anguilla"
                        },
                        {
                            "alias": "ATG",
                            "label": "Antigua and Barbuda"
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
                            "alias": "ABW",
                            "label": "Aruba"
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
                            "alias": "BHS",
                            "label": "Bahamas"
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
                            "alias": "BRB",
                            "label": "Barbados"
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
                            "alias": "BEN",
                            "label": "Benin"
                        },
                        {
                            "alias": "BMU",
                            "label": "Bermuda"
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
                            "alias": "BES",
                            "label": "Bonaire, Sint Eustatius and Saba"
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
                            "alias": "IOT",
                            "label": "British Indian Ocean Territory"
                        },
                        {
                            "alias": "VGB",
                            "label": "British Virgin Islands"
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
                            "alias": "BFA",
                            "label": "Burkina Faso"
                        },
                        {
                            "alias": "BDI",
                            "label": "Burundi"
                        },
                        {
                            "alias": "CPV",
                            "label": "Cabo Verde"
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
                            "alias": "CYM",
                            "label": "Cayman Islands"
                        },
                        {
                            "alias": "CAF",
                            "label": "Central African Republic"
                        },
                        {
                            "alias": "TCD",
                            "label": "Chad"
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
                            "alias": "CXR",
                            "label": "Christmas Island"
                        },
                        {
                            "alias": "CCK",
                            "label": "Cocos (Keeling) Islands"
                        },
                        {
                            "alias": "COL",
                            "label": "Colombia"
                        },
                        {
                            "alias": "COM",
                            "label": "Comoros"
                        },
                        {
                            "alias": "COG",
                            "label": "Congo"
                        },
                        {
                            "alias": "COD",
                            "label": "Congo (DRC)"
                        },
                        {
                            "alias": "COK",
                            "label": "Cook Islands"
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
                            "alias": "CUW",
                            "label": "Curaçao"
                        },
                        {
                            "alias": "CYP",
                            "label": "Cyprus"
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
                            "alias": "DMA",
                            "label": "Dominica"
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
                            "alias": "GNQ",
                            "label": "Equatorial Guinea"
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
                            "alias": "150",
                            "label": "Europe"
                        },
                        {
                            "alias": "FLK",
                            "label": "Falkland Islands"
                        },
                        {
                            "alias": "FRO",
                            "label": "Faroe Islands"
                        },
                        {
                            "alias": "FJI",
                            "label": "Fiji"
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
                            "alias": "GUF",
                            "label": "French Guiana"
                        },
                        {
                            "alias": "PYF",
                            "label": "French Polynesia"
                        },
                        {
                            "alias": "GAB",
                            "label": "Gabon"
                        },
                        {
                            "alias": "GMB",
                            "label": "Gambia"
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
                            "alias": "GHA",
                            "label": "Ghana"
                        },
                        {
                            "alias": "GIB",
                            "label": "Gibraltar"
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
                            "alias": "GRD",
                            "label": "Grenada"
                        },
                        {
                            "alias": "GLP",
                            "label": "Guadeloupe"
                        },
                        {
                            "alias": "GUM",
                            "label": "Guam"
                        },
                        {
                            "alias": "GTM",
                            "label": "Guatemala"
                        },
                        {
                            "alias": "GGY",
                            "label": "Guernsey"
                        },
                        {
                            "alias": "GIN",
                            "label": "Guinea"
                        },
                        {
                            "alias": "GNB",
                            "label": "Guinea-Bissau"
                        },
                        {
                            "alias": "GUY",
                            "label": "Guyana"
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
                            "alias": "IMN",
                            "label": "Isle of Man"
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
                            "alias": "JEY",
                            "label": "Jersey"
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
                            "alias": "KIR",
                            "label": "Kiribati"
                        },
                        {
                            "alias": "KOR",
                            "label": "Korea"
                        },
                        {
                            "alias": "XKS",
                            "label": "Kosovo"
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
                            "alias": "LSO",
                            "label": "Lesotho"
                        },
                        {
                            "alias": "LBR",
                            "label": "Liberia"
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
                            "alias": "MDG",
                            "label": "Madagascar"
                        },
                        {
                            "alias": "MWI",
                            "label": "Malawi"
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
                            "alias": "MHL",
                            "label": "Marshall Islands"
                        },
                        {
                            "alias": "MTQ",
                            "label": "Martinique"
                        },
                        {
                            "alias": "MRT",
                            "label": "Mauritania"
                        },
                        {
                            "alias": "MUS",
                            "label": "Mauritius"
                        },
                        {
                            "alias": "MYT",
                            "label": "Mayotte"
                        },
                        {
                            "alias": "MEX",
                            "label": "Mexico"
                        },
                        {
                            "alias": "FSM",
                            "label": "Micronesia"
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
                            "alias": "MSR",
                            "label": "Montserrat"
                        },
                        {
                            "alias": "MAR",
                            "label": "Morocco"
                        },
                        {
                            "alias": "MOZ",
                            "label": "Mozambique"
                        },
                        {
                            "alias": "MMR",
                            "label": "Myanmar"
                        },
                        {
                            "alias": "NAM",
                            "label": "Namibia"
                        },
                        {
                            "alias": "NRU",
                            "label": "Nauru"
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
                            "alias": "NCL",
                            "label": "New Caledonia"
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
                            "alias": "NER",
                            "label": "Niger"
                        },
                        {
                            "alias": "NGA",
                            "label": "Nigeria"
                        },
                        {
                            "alias": "NIU",
                            "label": "Niue"
                        },
                        {
                            "alias": "NFK",
                            "label": "Norfolk Island"
                        },
                        {
                            "alias": "PRK",
                            "label": "North Korea"
                        },
                        {
                            "alias": "MNP",
                            "label": "Northern Mariana Islands"
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
                            "alias": "PLW",
                            "label": "Palau"
                        },
                        {
                            "alias": "PSE",
                            "label": "Palestinian Authority"
                        },
                        {
                            "alias": "PAN",
                            "label": "Panama"
                        },
                        {
                            "alias": "PNG",
                            "label": "Papua New Guinea"
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
                            "alias": "PCN",
                            "label": "Pitcairn Islands"
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
                            "alias": "BLM",
                            "label": "Saint Barthélemy"
                        },
                        {
                            "alias": "KNA",
                            "label": "Saint Kitts and Nevis"
                        },
                        {
                            "alias": "LCA",
                            "label": "Saint Lucia"
                        },
                        {
                            "alias": "MAF",
                            "label": "Saint Martin"
                        },
                        {
                            "alias": "SPM",
                            "label": "Saint Pierre and Miquelon"
                        },
                        {
                            "alias": "VCT",
                            "label": "Saint Vincent and the Grenadines"
                        },
                        {
                            "alias": "WSM",
                            "label": "Samoa"
                        },
                        {
                            "alias": "SMR",
                            "label": "San Marino"
                        },
                        {
                            "alias": "STP",
                            "label": "São Tomé and Príncipe"
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
                            "alias": "SYC",
                            "label": "Seychelles"
                        },
                        {
                            "alias": "SLE",
                            "label": "Sierra Leone"
                        },
                        {
                            "alias": "SGP",
                            "label": "Singapore"
                        },
                        {
                            "alias": "SXM",
                            "label": "Sint Maarten"
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
                            "alias": "SLB",
                            "label": "Solomon Islands"
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
                            "alias": "SSD",
                            "label": "South Sudan"
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
                            "alias": "SHN",
                            "label": "St Helena, Ascension, Tristan da Cunha"
                        },
                        {
                            "alias": "SDN",
                            "label": "Sudan"
                        },
                        {
                            "alias": "SUR",
                            "label": "Suriname"
                        },
                        {
                            "alias": "SJM",
                            "label": "Svalbard and Jan Mayen"
                        },
                        {
                            "alias": "SWZ",
                            "label": "Swaziland"
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
                            "alias": "TZA",
                            "label": "Tanzania"
                        },
                        {
                            "alias": "THA",
                            "label": "Thailand"
                        },
                        {
                            "alias": "TLS",
                            "label": "Timor-Leste"
                        },
                        {
                            "alias": "TGO",
                            "label": "Togo"
                        },
                        {
                            "alias": "TKL",
                            "label": "Tokelau"
                        },
                        {
                            "alias": "TON",
                            "label": "Tonga"
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
                            "alias": "TCA",
                            "label": "Turks and Caicos Islands"
                        },
                        {
                            "alias": "TUV",
                            "label": "Tuvalu"
                        },
                        {
                            "alias": "UMI",
                            "label": "U.S. Outlying Islands"
                        },
                        {
                            "alias": "VIR",
                            "label": "U.S. Virgin Islands"
                        },
                        {
                            "alias": "UGA",
                            "label": "Uganda"
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
                            "alias": "VUT",
                            "label": "Vanuatu"
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
                            "alias": "WLF",
                            "label": "Wallis and Futuna"
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
                            "alias": "ZMB",
                            "label": "Zambia"
                        },
                        {
                            "alias": "ZWE",
                            "label": "Zimbabwe"
                        }
                    ],
                    "allowMultiple": true,
                    "format": "Select"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "11",
                    "alias": "which-sectors-are-you-interested-in",
                    "label": "Which of the following products or sectors are you interested in?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                            "label": "Don't know"
                        }
                    ],
                    "allowMultiple": true,
                    "format": "Select"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "12",
                    "alias": "which-areas-are-you-interested-in",
                    "label": "Which of the following are particular areas of interest?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "Select"
                }
            ],
            "subSections": [],
            "sectionResponse": {
                "sectionAlias": "help-plan-your-business",
                "id": "280e1609-1b62-488f-4ded-08d8ff73c870",
                "state": "Partial",
                "responses": [
                    {
                        "type": "QuestionResponseMultipleChoiceDto",
                        "questionAlias": "business-investment-plans",
                        "optionAliases": [
                            "product-development"
                        ],
                        "otherValue": null
                    },
                    {
                        "type": "QuestionResponseMultipleChoiceDto",
                        "questionAlias": "type-of-finance-needed",
                        "optionAliases": [
                            "working-cap"
                        ],
                        "otherValue": null
                    }
                ],
                "subSectionResponses": [],
                "unsatisfiedQuestions": [
                    "planned-investment-product-sustainability",
                    "product-novelty",
                    "employee-count",
                    "function-of-staff",
                    "biggest-skill-gap",
                    "need-to-recruit-to-expand-abroad",
                    "have-go-to-market-plan",
                    "which-markets-are-you-interested-in",
                    "which-sectors-are-you-interested-in",
                    "which-areas-are-you-interested-in"
                ]
            },
            "questionGroups": [],
            "alias": "help-plan-your-business",
            "label": "To help you plan your business",
            "sectionResponseState": "Partial",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionNumberDto",
                    "number": "1",
                    "alias": "annual-turnover",
                    "label": "What was your annual turnover in your last financial year?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 2147483647,
                    "min": 0,
                    "format": "Currency"
                },
                {
                    "type": "QuestionFileListDto",
                    "number": "2",
                    "alias": "annual-accounts",
                    "label": "Please upload your annual accounts for the last 3 years",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ]
                },
                {
                    "type": "QuestionFileListDto",
                    "number": "3",
                    "alias": "cash-flow-forecast",
                    "label": "Please upload your annual accounts for the last 3 years",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ]
                },
                {
                    "type": "QuestionFileListDto",
                    "number": "4",
                    "alias": "other-information",
                    "label": "Please upload any other information that will help you plan your business growth and cashflow, trade finance or working capital needs",
                    "description": "For example, latest management accounts",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 3,
                    "filesMax": 3,
                    "extensions": [
                        "pdf"
                    ]
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "5",
                    "alias": "finance-needed",
                    "label": "Please give an indication of the amount of finance you think you would need to facilitate your exports",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 2147483647,
                    "min": 0,
                    "format": "Currency"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-plan-your-finances",
            "label": "To help you plan your finances",
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionBoolDto",
                    "number": "1",
                    "alias": "have-existing-clients-abroad",
                    "label": "Do you have any existing clients abroad?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "2",
                    "alias": "fail-to-deliver-on-contract",
                    "label": "You fail to deliver on contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "2.1",
                    "alias": "fail-to-deliver-on-contract-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "fail-to-deliver-on-contract",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "3",
                    "alias": "client-cancels-contract",
                    "label": "The client cancels the contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "3.1",
                    "alias": "client-cancels-contract-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "client-cancels-contract",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "4",
                    "alias": "client-fails-to-pay",
                    "label": "The client fails to pay for delivery of the contract",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "4.1",
                    "alias": "client-fails-to-pay-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "client-fails-to-pay",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "5",
                    "alias": "payment-dispute",
                    "label": "You enter a dispute with the client on payment",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "5.1",
                    "alias": "payment-dispute-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "payment-dispute",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "6",
                    "alias": "market-is-smaller",
                    "label": "The market is smaller than you expected",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "6.1",
                    "alias": "market-is-smaller-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "market-is-smaller",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "7",
                    "alias": "slower-market-growth",
                    "label": "The market doesn’t grow as quickly as you expected",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "7.1",
                    "alias": "slower-market-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "slower-market-growth",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "8",
                    "alias": "cant-get-finance-for-growth",
                    "label": "You can’t get the finance to support your growth in that market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "8.1",
                    "alias": "cant-get-finance-for-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "cant-get-finance-for-growth",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "9",
                    "alias": "cant-recruit-skills-for-growth",
                    "label": "You can’t recruit the skills to support your growth in that market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "9.1",
                    "alias": "cant-recruit-skills-for-growth-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "cant-recruit-skills-for-growth",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "10",
                    "alias": "competitors-are-too-strong",
                    "label": "The competitors are too strong and you can’t get a foothold in the market",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "10.1",
                    "alias": "competitors-are-too-strong-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "competitors-are-too-strong",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "11",
                    "alias": "regulations-are-too-tight",
                    "label": "The regulations are too tight",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "11.1",
                    "alias": "regulations-are-too-tight-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "regulations-are-too-tight",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "12",
                    "alias": "tariffs-are-too-high",
                    "label": "The tariffs are too high",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "12.1",
                    "alias": "tariffs-are-too-high-mitigations",
                    "label": "Do you have mitigations?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "tariffs-are-too-high",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": "risks",
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "13",
                    "alias": "client-activity-international-law",
                    "label": "Are you aware of any activity that your client has been involved with that may contravene international law such as:",
                    "description": null,
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "13.1",
                    "alias": "client-activity-international-law-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionMultipleChoiceDto",
                            "conditionQuestionAlias": "client-activity-international-law",
                            "optionAlias": "other"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                }
            ],
            "subSections": [
                {
                    "alias": "client-contract",
                    "questions": [
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "customer-business-name",
                            "label": "Customer business name",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 200,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "address-line-1",
                            "label": "Address line 1",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 50,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "address-line-2",
                            "label": "Address line 2",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 50,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "city",
                            "label": "Town/city",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 100,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "postcode",
                            "label": "Postcode",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 30,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionMultipleChoiceDto",
                            "number": null,
                            "alias": "country",
                            "label": "Country",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "options": [
                                {
                                    "alias": "AFG",
                                    "label": "Afghanistan"
                                },
                                {
                                    "alias": "ALA",
                                    "label": "Åland Islands"
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
                                    "alias": "ASM",
                                    "label": "American Samoa"
                                },
                                {
                                    "alias": "AND",
                                    "label": "Andorra"
                                },
                                {
                                    "alias": "AGO",
                                    "label": "Angola"
                                },
                                {
                                    "alias": "AIA",
                                    "label": "Anguilla"
                                },
                                {
                                    "alias": "ATG",
                                    "label": "Antigua and Barbuda"
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
                                    "alias": "ABW",
                                    "label": "Aruba"
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
                                    "alias": "BHS",
                                    "label": "Bahamas"
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
                                    "alias": "BRB",
                                    "label": "Barbados"
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
                                    "alias": "BEN",
                                    "label": "Benin"
                                },
                                {
                                    "alias": "BMU",
                                    "label": "Bermuda"
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
                                    "alias": "BES",
                                    "label": "Bonaire, Sint Eustatius and Saba"
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
                                    "alias": "IOT",
                                    "label": "British Indian Ocean Territory"
                                },
                                {
                                    "alias": "VGB",
                                    "label": "British Virgin Islands"
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
                                    "alias": "BFA",
                                    "label": "Burkina Faso"
                                },
                                {
                                    "alias": "BDI",
                                    "label": "Burundi"
                                },
                                {
                                    "alias": "CPV",
                                    "label": "Cabo Verde"
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
                                    "alias": "CYM",
                                    "label": "Cayman Islands"
                                },
                                {
                                    "alias": "CAF",
                                    "label": "Central African Republic"
                                },
                                {
                                    "alias": "TCD",
                                    "label": "Chad"
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
                                    "alias": "CXR",
                                    "label": "Christmas Island"
                                },
                                {
                                    "alias": "CCK",
                                    "label": "Cocos (Keeling) Islands"
                                },
                                {
                                    "alias": "COL",
                                    "label": "Colombia"
                                },
                                {
                                    "alias": "COM",
                                    "label": "Comoros"
                                },
                                {
                                    "alias": "COG",
                                    "label": "Congo"
                                },
                                {
                                    "alias": "COD",
                                    "label": "Congo (DRC)"
                                },
                                {
                                    "alias": "COK",
                                    "label": "Cook Islands"
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
                                    "alias": "CUW",
                                    "label": "Curaçao"
                                },
                                {
                                    "alias": "CYP",
                                    "label": "Cyprus"
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
                                    "alias": "DMA",
                                    "label": "Dominica"
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
                                    "alias": "GNQ",
                                    "label": "Equatorial Guinea"
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
                                    "alias": "150",
                                    "label": "Europe"
                                },
                                {
                                    "alias": "FLK",
                                    "label": "Falkland Islands"
                                },
                                {
                                    "alias": "FRO",
                                    "label": "Faroe Islands"
                                },
                                {
                                    "alias": "FJI",
                                    "label": "Fiji"
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
                                    "alias": "GUF",
                                    "label": "French Guiana"
                                },
                                {
                                    "alias": "PYF",
                                    "label": "French Polynesia"
                                },
                                {
                                    "alias": "GAB",
                                    "label": "Gabon"
                                },
                                {
                                    "alias": "GMB",
                                    "label": "Gambia"
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
                                    "alias": "GHA",
                                    "label": "Ghana"
                                },
                                {
                                    "alias": "GIB",
                                    "label": "Gibraltar"
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
                                    "alias": "GRD",
                                    "label": "Grenada"
                                },
                                {
                                    "alias": "GLP",
                                    "label": "Guadeloupe"
                                },
                                {
                                    "alias": "GUM",
                                    "label": "Guam"
                                },
                                {
                                    "alias": "GTM",
                                    "label": "Guatemala"
                                },
                                {
                                    "alias": "GGY",
                                    "label": "Guernsey"
                                },
                                {
                                    "alias": "GIN",
                                    "label": "Guinea"
                                },
                                {
                                    "alias": "GNB",
                                    "label": "Guinea-Bissau"
                                },
                                {
                                    "alias": "GUY",
                                    "label": "Guyana"
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
                                    "alias": "IMN",
                                    "label": "Isle of Man"
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
                                    "alias": "JEY",
                                    "label": "Jersey"
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
                                    "alias": "KIR",
                                    "label": "Kiribati"
                                },
                                {
                                    "alias": "KOR",
                                    "label": "Korea"
                                },
                                {
                                    "alias": "XKS",
                                    "label": "Kosovo"
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
                                    "alias": "LSO",
                                    "label": "Lesotho"
                                },
                                {
                                    "alias": "LBR",
                                    "label": "Liberia"
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
                                    "alias": "MDG",
                                    "label": "Madagascar"
                                },
                                {
                                    "alias": "MWI",
                                    "label": "Malawi"
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
                                    "alias": "MHL",
                                    "label": "Marshall Islands"
                                },
                                {
                                    "alias": "MTQ",
                                    "label": "Martinique"
                                },
                                {
                                    "alias": "MRT",
                                    "label": "Mauritania"
                                },
                                {
                                    "alias": "MUS",
                                    "label": "Mauritius"
                                },
                                {
                                    "alias": "MYT",
                                    "label": "Mayotte"
                                },
                                {
                                    "alias": "MEX",
                                    "label": "Mexico"
                                },
                                {
                                    "alias": "FSM",
                                    "label": "Micronesia"
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
                                    "alias": "MSR",
                                    "label": "Montserrat"
                                },
                                {
                                    "alias": "MAR",
                                    "label": "Morocco"
                                },
                                {
                                    "alias": "MOZ",
                                    "label": "Mozambique"
                                },
                                {
                                    "alias": "MMR",
                                    "label": "Myanmar"
                                },
                                {
                                    "alias": "NAM",
                                    "label": "Namibia"
                                },
                                {
                                    "alias": "NRU",
                                    "label": "Nauru"
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
                                    "alias": "NCL",
                                    "label": "New Caledonia"
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
                                    "alias": "NER",
                                    "label": "Niger"
                                },
                                {
                                    "alias": "NGA",
                                    "label": "Nigeria"
                                },
                                {
                                    "alias": "NIU",
                                    "label": "Niue"
                                },
                                {
                                    "alias": "NFK",
                                    "label": "Norfolk Island"
                                },
                                {
                                    "alias": "PRK",
                                    "label": "North Korea"
                                },
                                {
                                    "alias": "MNP",
                                    "label": "Northern Mariana Islands"
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
                                    "alias": "PLW",
                                    "label": "Palau"
                                },
                                {
                                    "alias": "PSE",
                                    "label": "Palestinian Authority"
                                },
                                {
                                    "alias": "PAN",
                                    "label": "Panama"
                                },
                                {
                                    "alias": "PNG",
                                    "label": "Papua New Guinea"
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
                                    "alias": "PCN",
                                    "label": "Pitcairn Islands"
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
                                    "alias": "BLM",
                                    "label": "Saint Barthélemy"
                                },
                                {
                                    "alias": "KNA",
                                    "label": "Saint Kitts and Nevis"
                                },
                                {
                                    "alias": "LCA",
                                    "label": "Saint Lucia"
                                },
                                {
                                    "alias": "MAF",
                                    "label": "Saint Martin"
                                },
                                {
                                    "alias": "SPM",
                                    "label": "Saint Pierre and Miquelon"
                                },
                                {
                                    "alias": "VCT",
                                    "label": "Saint Vincent and the Grenadines"
                                },
                                {
                                    "alias": "WSM",
                                    "label": "Samoa"
                                },
                                {
                                    "alias": "SMR",
                                    "label": "San Marino"
                                },
                                {
                                    "alias": "STP",
                                    "label": "São Tomé and Príncipe"
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
                                    "alias": "SYC",
                                    "label": "Seychelles"
                                },
                                {
                                    "alias": "SLE",
                                    "label": "Sierra Leone"
                                },
                                {
                                    "alias": "SGP",
                                    "label": "Singapore"
                                },
                                {
                                    "alias": "SXM",
                                    "label": "Sint Maarten"
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
                                    "alias": "SLB",
                                    "label": "Solomon Islands"
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
                                    "alias": "SSD",
                                    "label": "South Sudan"
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
                                    "alias": "SHN",
                                    "label": "St Helena, Ascension, Tristan da Cunha"
                                },
                                {
                                    "alias": "SDN",
                                    "label": "Sudan"
                                },
                                {
                                    "alias": "SUR",
                                    "label": "Suriname"
                                },
                                {
                                    "alias": "SJM",
                                    "label": "Svalbard and Jan Mayen"
                                },
                                {
                                    "alias": "SWZ",
                                    "label": "Swaziland"
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
                                    "alias": "TZA",
                                    "label": "Tanzania"
                                },
                                {
                                    "alias": "THA",
                                    "label": "Thailand"
                                },
                                {
                                    "alias": "TLS",
                                    "label": "Timor-Leste"
                                },
                                {
                                    "alias": "TGO",
                                    "label": "Togo"
                                },
                                {
                                    "alias": "TKL",
                                    "label": "Tokelau"
                                },
                                {
                                    "alias": "TON",
                                    "label": "Tonga"
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
                                    "alias": "TCA",
                                    "label": "Turks and Caicos Islands"
                                },
                                {
                                    "alias": "TUV",
                                    "label": "Tuvalu"
                                },
                                {
                                    "alias": "UMI",
                                    "label": "U.S. Outlying Islands"
                                },
                                {
                                    "alias": "VIR",
                                    "label": "U.S. Virgin Islands"
                                },
                                {
                                    "alias": "UGA",
                                    "label": "Uganda"
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
                                    "alias": "VUT",
                                    "label": "Vanuatu"
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
                                    "alias": "WLF",
                                    "label": "Wallis and Futuna"
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
                                    "alias": "ZMB",
                                    "label": "Zambia"
                                },
                                {
                                    "alias": "ZWE",
                                    "label": "Zimbabwe"
                                }
                            ],
                            "allowMultiple": false,
                            "format": "Select"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "contact-name",
                            "label": "Contact name",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 100,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "contact-email",
                            "label": "Contact email",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 100,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "contact-telephone",
                            "label": "Contact telephone",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 100,
                            "format": "Phone"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "customer-company-registration-number",
                            "label": "Customer company registration number",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 100,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "customer-company-accounts",
                            "label": "Customer company accounts",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "copy-of-contract",
                            "label": "Copy of contract",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "copy-of-deliverables-agreement",
                            "label": "A copy of any milestone or deliverable agreements (eg Scheme of Work, or delivery dates)",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "copy-of-retainer-agreements",
                            "label": "Any retainer agreements (for example are you paid a regular maintenance fee)",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "any-other-documentation",
                            "label": "Any other documentation (eg Memorandum of Understanding, Director details etc)",
                            "description": null,
                            "conditions": [],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        }
                    ],
                    "questionGroups": []
                }
            ],
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
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionBoolDto",
                    "number": "2",
                    "alias": "aware-of-regulations-sector",
                    "label": "Are you aware of any specific regulations that apply to your sector?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "2.1",
                    "alias": "aware-of-regulations-sector-details",
                    "label": "Please give details",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "aware-of-regulations-sector",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "3",
                    "alias": "aware-of-regulations-country",
                    "label": "Are you aware of any specific regulations that apply to the country you are trading with?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "3.1",
                    "alias": "aware-of-regulations-country-details",
                    "label": "Please give details",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "aware-of-regulations-country",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 2000,
                    "format": "Email"
                }
            ],
            "subSections": [
                {
                    "alias": "supplier-contract",
                    "questions": [
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "sector-you-are-supplying-in",
                            "label": "The detailed sector that you are supplying in",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 10,
                            "format": "HsCode"
                        },
                        {
                            "type": "QuestionMultipleChoiceDto",
                            "number": null,
                            "alias": "country-you-are-supplying-in",
                            "label": "The country that you are supplying in",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "options": [
                                {
                                    "alias": "AFG",
                                    "label": "Afghanistan"
                                },
                                {
                                    "alias": "ALA",
                                    "label": "Åland Islands"
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
                                    "alias": "ASM",
                                    "label": "American Samoa"
                                },
                                {
                                    "alias": "AND",
                                    "label": "Andorra"
                                },
                                {
                                    "alias": "AGO",
                                    "label": "Angola"
                                },
                                {
                                    "alias": "AIA",
                                    "label": "Anguilla"
                                },
                                {
                                    "alias": "ATG",
                                    "label": "Antigua and Barbuda"
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
                                    "alias": "ABW",
                                    "label": "Aruba"
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
                                    "alias": "BHS",
                                    "label": "Bahamas"
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
                                    "alias": "BRB",
                                    "label": "Barbados"
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
                                    "alias": "BEN",
                                    "label": "Benin"
                                },
                                {
                                    "alias": "BMU",
                                    "label": "Bermuda"
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
                                    "alias": "BES",
                                    "label": "Bonaire, Sint Eustatius and Saba"
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
                                    "alias": "IOT",
                                    "label": "British Indian Ocean Territory"
                                },
                                {
                                    "alias": "VGB",
                                    "label": "British Virgin Islands"
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
                                    "alias": "BFA",
                                    "label": "Burkina Faso"
                                },
                                {
                                    "alias": "BDI",
                                    "label": "Burundi"
                                },
                                {
                                    "alias": "CPV",
                                    "label": "Cabo Verde"
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
                                    "alias": "CYM",
                                    "label": "Cayman Islands"
                                },
                                {
                                    "alias": "CAF",
                                    "label": "Central African Republic"
                                },
                                {
                                    "alias": "TCD",
                                    "label": "Chad"
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
                                    "alias": "CXR",
                                    "label": "Christmas Island"
                                },
                                {
                                    "alias": "CCK",
                                    "label": "Cocos (Keeling) Islands"
                                },
                                {
                                    "alias": "COL",
                                    "label": "Colombia"
                                },
                                {
                                    "alias": "COM",
                                    "label": "Comoros"
                                },
                                {
                                    "alias": "COG",
                                    "label": "Congo"
                                },
                                {
                                    "alias": "COD",
                                    "label": "Congo (DRC)"
                                },
                                {
                                    "alias": "COK",
                                    "label": "Cook Islands"
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
                                    "alias": "CUW",
                                    "label": "Curaçao"
                                },
                                {
                                    "alias": "CYP",
                                    "label": "Cyprus"
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
                                    "alias": "DMA",
                                    "label": "Dominica"
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
                                    "alias": "GNQ",
                                    "label": "Equatorial Guinea"
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
                                    "alias": "150",
                                    "label": "Europe"
                                },
                                {
                                    "alias": "FLK",
                                    "label": "Falkland Islands"
                                },
                                {
                                    "alias": "FRO",
                                    "label": "Faroe Islands"
                                },
                                {
                                    "alias": "FJI",
                                    "label": "Fiji"
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
                                    "alias": "GUF",
                                    "label": "French Guiana"
                                },
                                {
                                    "alias": "PYF",
                                    "label": "French Polynesia"
                                },
                                {
                                    "alias": "GAB",
                                    "label": "Gabon"
                                },
                                {
                                    "alias": "GMB",
                                    "label": "Gambia"
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
                                    "alias": "GHA",
                                    "label": "Ghana"
                                },
                                {
                                    "alias": "GIB",
                                    "label": "Gibraltar"
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
                                    "alias": "GRD",
                                    "label": "Grenada"
                                },
                                {
                                    "alias": "GLP",
                                    "label": "Guadeloupe"
                                },
                                {
                                    "alias": "GUM",
                                    "label": "Guam"
                                },
                                {
                                    "alias": "GTM",
                                    "label": "Guatemala"
                                },
                                {
                                    "alias": "GGY",
                                    "label": "Guernsey"
                                },
                                {
                                    "alias": "GIN",
                                    "label": "Guinea"
                                },
                                {
                                    "alias": "GNB",
                                    "label": "Guinea-Bissau"
                                },
                                {
                                    "alias": "GUY",
                                    "label": "Guyana"
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
                                    "alias": "IMN",
                                    "label": "Isle of Man"
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
                                    "alias": "JEY",
                                    "label": "Jersey"
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
                                    "alias": "KIR",
                                    "label": "Kiribati"
                                },
                                {
                                    "alias": "KOR",
                                    "label": "Korea"
                                },
                                {
                                    "alias": "XKS",
                                    "label": "Kosovo"
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
                                    "alias": "LSO",
                                    "label": "Lesotho"
                                },
                                {
                                    "alias": "LBR",
                                    "label": "Liberia"
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
                                    "alias": "MDG",
                                    "label": "Madagascar"
                                },
                                {
                                    "alias": "MWI",
                                    "label": "Malawi"
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
                                    "alias": "MHL",
                                    "label": "Marshall Islands"
                                },
                                {
                                    "alias": "MTQ",
                                    "label": "Martinique"
                                },
                                {
                                    "alias": "MRT",
                                    "label": "Mauritania"
                                },
                                {
                                    "alias": "MUS",
                                    "label": "Mauritius"
                                },
                                {
                                    "alias": "MYT",
                                    "label": "Mayotte"
                                },
                                {
                                    "alias": "MEX",
                                    "label": "Mexico"
                                },
                                {
                                    "alias": "FSM",
                                    "label": "Micronesia"
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
                                    "alias": "MSR",
                                    "label": "Montserrat"
                                },
                                {
                                    "alias": "MAR",
                                    "label": "Morocco"
                                },
                                {
                                    "alias": "MOZ",
                                    "label": "Mozambique"
                                },
                                {
                                    "alias": "MMR",
                                    "label": "Myanmar"
                                },
                                {
                                    "alias": "NAM",
                                    "label": "Namibia"
                                },
                                {
                                    "alias": "NRU",
                                    "label": "Nauru"
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
                                    "alias": "NCL",
                                    "label": "New Caledonia"
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
                                    "alias": "NER",
                                    "label": "Niger"
                                },
                                {
                                    "alias": "NGA",
                                    "label": "Nigeria"
                                },
                                {
                                    "alias": "NIU",
                                    "label": "Niue"
                                },
                                {
                                    "alias": "NFK",
                                    "label": "Norfolk Island"
                                },
                                {
                                    "alias": "PRK",
                                    "label": "North Korea"
                                },
                                {
                                    "alias": "MNP",
                                    "label": "Northern Mariana Islands"
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
                                    "alias": "PLW",
                                    "label": "Palau"
                                },
                                {
                                    "alias": "PSE",
                                    "label": "Palestinian Authority"
                                },
                                {
                                    "alias": "PAN",
                                    "label": "Panama"
                                },
                                {
                                    "alias": "PNG",
                                    "label": "Papua New Guinea"
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
                                    "alias": "PCN",
                                    "label": "Pitcairn Islands"
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
                                    "alias": "BLM",
                                    "label": "Saint Barthélemy"
                                },
                                {
                                    "alias": "KNA",
                                    "label": "Saint Kitts and Nevis"
                                },
                                {
                                    "alias": "LCA",
                                    "label": "Saint Lucia"
                                },
                                {
                                    "alias": "MAF",
                                    "label": "Saint Martin"
                                },
                                {
                                    "alias": "SPM",
                                    "label": "Saint Pierre and Miquelon"
                                },
                                {
                                    "alias": "VCT",
                                    "label": "Saint Vincent and the Grenadines"
                                },
                                {
                                    "alias": "WSM",
                                    "label": "Samoa"
                                },
                                {
                                    "alias": "SMR",
                                    "label": "San Marino"
                                },
                                {
                                    "alias": "STP",
                                    "label": "São Tomé and Príncipe"
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
                                    "alias": "SYC",
                                    "label": "Seychelles"
                                },
                                {
                                    "alias": "SLE",
                                    "label": "Sierra Leone"
                                },
                                {
                                    "alias": "SGP",
                                    "label": "Singapore"
                                },
                                {
                                    "alias": "SXM",
                                    "label": "Sint Maarten"
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
                                    "alias": "SLB",
                                    "label": "Solomon Islands"
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
                                    "alias": "SSD",
                                    "label": "South Sudan"
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
                                    "alias": "SHN",
                                    "label": "St Helena, Ascension, Tristan da Cunha"
                                },
                                {
                                    "alias": "SDN",
                                    "label": "Sudan"
                                },
                                {
                                    "alias": "SUR",
                                    "label": "Suriname"
                                },
                                {
                                    "alias": "SJM",
                                    "label": "Svalbard and Jan Mayen"
                                },
                                {
                                    "alias": "SWZ",
                                    "label": "Swaziland"
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
                                    "alias": "TZA",
                                    "label": "Tanzania"
                                },
                                {
                                    "alias": "THA",
                                    "label": "Thailand"
                                },
                                {
                                    "alias": "TLS",
                                    "label": "Timor-Leste"
                                },
                                {
                                    "alias": "TGO",
                                    "label": "Togo"
                                },
                                {
                                    "alias": "TKL",
                                    "label": "Tokelau"
                                },
                                {
                                    "alias": "TON",
                                    "label": "Tonga"
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
                                    "alias": "TCA",
                                    "label": "Turks and Caicos Islands"
                                },
                                {
                                    "alias": "TUV",
                                    "label": "Tuvalu"
                                },
                                {
                                    "alias": "UMI",
                                    "label": "U.S. Outlying Islands"
                                },
                                {
                                    "alias": "VIR",
                                    "label": "U.S. Virgin Islands"
                                },
                                {
                                    "alias": "UGA",
                                    "label": "Uganda"
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
                                    "alias": "VUT",
                                    "label": "Vanuatu"
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
                                    "alias": "WLF",
                                    "label": "Wallis and Futuna"
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
                                    "alias": "ZMB",
                                    "label": "Zambia"
                                },
                                {
                                    "alias": "ZWE",
                                    "label": "Zimbabwe"
                                }
                            ],
                            "allowMultiple": false,
                            "format": "Select"
                        },
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "sector-client-operates-in",
                            "label": "The detailed sector that your contracting client operates in",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": null,
                            "characterMax": 10,
                            "format": "HsCode"
                        },
                        {
                            "type": "QuestionMultipleChoiceDto",
                            "number": null,
                            "alias": "country-client-operates-in",
                            "label": "The country that your contracting client operates in",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "options": [
                                {
                                    "alias": "AFG",
                                    "label": "Afghanistan"
                                },
                                {
                                    "alias": "ALA",
                                    "label": "Åland Islands"
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
                                    "alias": "ASM",
                                    "label": "American Samoa"
                                },
                                {
                                    "alias": "AND",
                                    "label": "Andorra"
                                },
                                {
                                    "alias": "AGO",
                                    "label": "Angola"
                                },
                                {
                                    "alias": "AIA",
                                    "label": "Anguilla"
                                },
                                {
                                    "alias": "ATG",
                                    "label": "Antigua and Barbuda"
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
                                    "alias": "ABW",
                                    "label": "Aruba"
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
                                    "alias": "BHS",
                                    "label": "Bahamas"
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
                                    "alias": "BRB",
                                    "label": "Barbados"
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
                                    "alias": "BEN",
                                    "label": "Benin"
                                },
                                {
                                    "alias": "BMU",
                                    "label": "Bermuda"
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
                                    "alias": "BES",
                                    "label": "Bonaire, Sint Eustatius and Saba"
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
                                    "alias": "IOT",
                                    "label": "British Indian Ocean Territory"
                                },
                                {
                                    "alias": "VGB",
                                    "label": "British Virgin Islands"
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
                                    "alias": "BFA",
                                    "label": "Burkina Faso"
                                },
                                {
                                    "alias": "BDI",
                                    "label": "Burundi"
                                },
                                {
                                    "alias": "CPV",
                                    "label": "Cabo Verde"
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
                                    "alias": "CYM",
                                    "label": "Cayman Islands"
                                },
                                {
                                    "alias": "CAF",
                                    "label": "Central African Republic"
                                },
                                {
                                    "alias": "TCD",
                                    "label": "Chad"
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
                                    "alias": "CXR",
                                    "label": "Christmas Island"
                                },
                                {
                                    "alias": "CCK",
                                    "label": "Cocos (Keeling) Islands"
                                },
                                {
                                    "alias": "COL",
                                    "label": "Colombia"
                                },
                                {
                                    "alias": "COM",
                                    "label": "Comoros"
                                },
                                {
                                    "alias": "COG",
                                    "label": "Congo"
                                },
                                {
                                    "alias": "COD",
                                    "label": "Congo (DRC)"
                                },
                                {
                                    "alias": "COK",
                                    "label": "Cook Islands"
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
                                    "alias": "CUW",
                                    "label": "Curaçao"
                                },
                                {
                                    "alias": "CYP",
                                    "label": "Cyprus"
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
                                    "alias": "DMA",
                                    "label": "Dominica"
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
                                    "alias": "GNQ",
                                    "label": "Equatorial Guinea"
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
                                    "alias": "150",
                                    "label": "Europe"
                                },
                                {
                                    "alias": "FLK",
                                    "label": "Falkland Islands"
                                },
                                {
                                    "alias": "FRO",
                                    "label": "Faroe Islands"
                                },
                                {
                                    "alias": "FJI",
                                    "label": "Fiji"
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
                                    "alias": "GUF",
                                    "label": "French Guiana"
                                },
                                {
                                    "alias": "PYF",
                                    "label": "French Polynesia"
                                },
                                {
                                    "alias": "GAB",
                                    "label": "Gabon"
                                },
                                {
                                    "alias": "GMB",
                                    "label": "Gambia"
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
                                    "alias": "GHA",
                                    "label": "Ghana"
                                },
                                {
                                    "alias": "GIB",
                                    "label": "Gibraltar"
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
                                    "alias": "GRD",
                                    "label": "Grenada"
                                },
                                {
                                    "alias": "GLP",
                                    "label": "Guadeloupe"
                                },
                                {
                                    "alias": "GUM",
                                    "label": "Guam"
                                },
                                {
                                    "alias": "GTM",
                                    "label": "Guatemala"
                                },
                                {
                                    "alias": "GGY",
                                    "label": "Guernsey"
                                },
                                {
                                    "alias": "GIN",
                                    "label": "Guinea"
                                },
                                {
                                    "alias": "GNB",
                                    "label": "Guinea-Bissau"
                                },
                                {
                                    "alias": "GUY",
                                    "label": "Guyana"
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
                                    "alias": "IMN",
                                    "label": "Isle of Man"
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
                                    "alias": "JEY",
                                    "label": "Jersey"
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
                                    "alias": "KIR",
                                    "label": "Kiribati"
                                },
                                {
                                    "alias": "KOR",
                                    "label": "Korea"
                                },
                                {
                                    "alias": "XKS",
                                    "label": "Kosovo"
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
                                    "alias": "LSO",
                                    "label": "Lesotho"
                                },
                                {
                                    "alias": "LBR",
                                    "label": "Liberia"
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
                                    "alias": "MDG",
                                    "label": "Madagascar"
                                },
                                {
                                    "alias": "MWI",
                                    "label": "Malawi"
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
                                    "alias": "MHL",
                                    "label": "Marshall Islands"
                                },
                                {
                                    "alias": "MTQ",
                                    "label": "Martinique"
                                },
                                {
                                    "alias": "MRT",
                                    "label": "Mauritania"
                                },
                                {
                                    "alias": "MUS",
                                    "label": "Mauritius"
                                },
                                {
                                    "alias": "MYT",
                                    "label": "Mayotte"
                                },
                                {
                                    "alias": "MEX",
                                    "label": "Mexico"
                                },
                                {
                                    "alias": "FSM",
                                    "label": "Micronesia"
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
                                    "alias": "MSR",
                                    "label": "Montserrat"
                                },
                                {
                                    "alias": "MAR",
                                    "label": "Morocco"
                                },
                                {
                                    "alias": "MOZ",
                                    "label": "Mozambique"
                                },
                                {
                                    "alias": "MMR",
                                    "label": "Myanmar"
                                },
                                {
                                    "alias": "NAM",
                                    "label": "Namibia"
                                },
                                {
                                    "alias": "NRU",
                                    "label": "Nauru"
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
                                    "alias": "NCL",
                                    "label": "New Caledonia"
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
                                    "alias": "NER",
                                    "label": "Niger"
                                },
                                {
                                    "alias": "NGA",
                                    "label": "Nigeria"
                                },
                                {
                                    "alias": "NIU",
                                    "label": "Niue"
                                },
                                {
                                    "alias": "NFK",
                                    "label": "Norfolk Island"
                                },
                                {
                                    "alias": "PRK",
                                    "label": "North Korea"
                                },
                                {
                                    "alias": "MNP",
                                    "label": "Northern Mariana Islands"
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
                                    "alias": "PLW",
                                    "label": "Palau"
                                },
                                {
                                    "alias": "PSE",
                                    "label": "Palestinian Authority"
                                },
                                {
                                    "alias": "PAN",
                                    "label": "Panama"
                                },
                                {
                                    "alias": "PNG",
                                    "label": "Papua New Guinea"
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
                                    "alias": "PCN",
                                    "label": "Pitcairn Islands"
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
                                    "alias": "BLM",
                                    "label": "Saint Barthélemy"
                                },
                                {
                                    "alias": "KNA",
                                    "label": "Saint Kitts and Nevis"
                                },
                                {
                                    "alias": "LCA",
                                    "label": "Saint Lucia"
                                },
                                {
                                    "alias": "MAF",
                                    "label": "Saint Martin"
                                },
                                {
                                    "alias": "SPM",
                                    "label": "Saint Pierre and Miquelon"
                                },
                                {
                                    "alias": "VCT",
                                    "label": "Saint Vincent and the Grenadines"
                                },
                                {
                                    "alias": "WSM",
                                    "label": "Samoa"
                                },
                                {
                                    "alias": "SMR",
                                    "label": "San Marino"
                                },
                                {
                                    "alias": "STP",
                                    "label": "São Tomé and Príncipe"
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
                                    "alias": "SYC",
                                    "label": "Seychelles"
                                },
                                {
                                    "alias": "SLE",
                                    "label": "Sierra Leone"
                                },
                                {
                                    "alias": "SGP",
                                    "label": "Singapore"
                                },
                                {
                                    "alias": "SXM",
                                    "label": "Sint Maarten"
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
                                    "alias": "SLB",
                                    "label": "Solomon Islands"
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
                                    "alias": "SSD",
                                    "label": "South Sudan"
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
                                    "alias": "SHN",
                                    "label": "St Helena, Ascension, Tristan da Cunha"
                                },
                                {
                                    "alias": "SDN",
                                    "label": "Sudan"
                                },
                                {
                                    "alias": "SUR",
                                    "label": "Suriname"
                                },
                                {
                                    "alias": "SJM",
                                    "label": "Svalbard and Jan Mayen"
                                },
                                {
                                    "alias": "SWZ",
                                    "label": "Swaziland"
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
                                    "alias": "TZA",
                                    "label": "Tanzania"
                                },
                                {
                                    "alias": "THA",
                                    "label": "Thailand"
                                },
                                {
                                    "alias": "TLS",
                                    "label": "Timor-Leste"
                                },
                                {
                                    "alias": "TGO",
                                    "label": "Togo"
                                },
                                {
                                    "alias": "TKL",
                                    "label": "Tokelau"
                                },
                                {
                                    "alias": "TON",
                                    "label": "Tonga"
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
                                    "alias": "TCA",
                                    "label": "Turks and Caicos Islands"
                                },
                                {
                                    "alias": "TUV",
                                    "label": "Tuvalu"
                                },
                                {
                                    "alias": "UMI",
                                    "label": "U.S. Outlying Islands"
                                },
                                {
                                    "alias": "VIR",
                                    "label": "U.S. Virgin Islands"
                                },
                                {
                                    "alias": "UGA",
                                    "label": "Uganda"
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
                                    "alias": "VUT",
                                    "label": "Vanuatu"
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
                                    "alias": "WLF",
                                    "label": "Wallis and Futuna"
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
                                    "alias": "ZMB",
                                    "label": "Zambia"
                                },
                                {
                                    "alias": "ZWE",
                                    "label": "Zimbabwe"
                                }
                            ],
                            "allowMultiple": false,
                            "format": "Select"
                        },
                        {
                            "type": "QuestionMultipleChoiceDto",
                            "number": null,
                            "alias": "how-do-you-deliver-your-goods-or-services",
                            "label": "How do you deliver your goods or services?",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "options": [
                                {
                                    "alias": "freight-land",
                                    "label": "Freight - Land"
                                },
                                {
                                    "alias": "freight-air",
                                    "label": "Freight - Air"
                                },
                                {
                                    "alias": "freight-sea",
                                    "label": "Freight - Sea"
                                },
                                {
                                    "alias": "freight-rail",
                                    "label": "Freight - Rail"
                                },
                                {
                                    "alias": "freight-other",
                                    "label": "Freight - Other"
                                },
                                {
                                    "alias": "digital-ftp",
                                    "label": "Digital - FTP"
                                },
                                {
                                    "alias": "digital-cloud",
                                    "label": "Digital - Cloud"
                                },
                                {
                                    "alias": "digital-csv",
                                    "label": "Digital - CSV"
                                },
                                {
                                    "alias": "digital-e-commerce",
                                    "label": "Digital - E-commerce"
                                },
                                {
                                    "alias": "digital-fintech",
                                    "label": "Digital - Fintech"
                                },
                                {
                                    "alias": "digital-other",
                                    "label": "Digital - Other"
                                }
                            ],
                            "allowMultiple": false,
                            "format": "Select"
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "understanding-your-social-and-environmental-impact",
                            "label": "Understand your Social and Environmental Impact",
                            "description": "Please upload your Bill of Material, including quantities, country of origin and supplier details.",
                            "conditions": [
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "freight-land"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "freight-air"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "freight-sea"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "freight-rail"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "freight-other"
                                }
                            ],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 0,
                            "filesMax": 20,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "digital-security-certificates-and-agreements",
                            "label": "Please provide security certificates, and any agreements around user acceptance testing, receipts for payment or receipt of materials)",
                            "description": "Please provide Intellectual Property agreements as required",
                            "conditions": [
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-ftp"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-cloud"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-csv"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-e-commerce"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-fintech"
                                },
                                {
                                    "type": "QuestionConditionMultipleChoiceDto",
                                    "conditionQuestionAlias": "how-do-you-deliver-your-goods-or-services",
                                    "optionAlias": "digital-other"
                                }
                            ],
                            "required": false,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 0,
                            "filesMax": 20,
                            "extensions": [
                                "pdf"
                            ]
                        }
                    ],
                    "questionGroups": []
                }
            ],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "understand-your-esg-score",
            "label": "Understand your ESG score",
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionFileListDto",
                    "number": "1",
                    "alias": "insurance-or-business-policies",
                    "label": "Do you have any or all of the following insurance or business policies?",
                    "description": "\n- Trade credit insurance\n- Employers liability insurance\n- Public indemnity insurance\n- Contract value insurance\n -Other business insurance (eg against pandemics, natural disasters)\n -IT policy\n- Anti bullying policy\n- Anti-corruption and bribery policy\n- Data protection policy\n- Equal opportunities policy\n- Health and safety policy\n- Modern Slavery policy\n- Social media use policy\n- Environmental and impact policy",
                    "conditions": [],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 0,
                    "filesMax": 20,
                    "extensions": [
                        "pdf",
                        "txt"
                    ]
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "2",
                    "alias": "environmental-and-social-targets",
                    "label": "Do you have environmental and social targets and goals?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionFileListDto",
                    "number": "2.1",
                    "alias": "environmental-and-social-targets-documentation",
                    "label": "Do you have any or all of the following insurance or business policies?",
                    "description": "Please specify and upload any documentation to support that",
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "environmental-and-social-targets",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 0,
                    "filesMax": 20,
                    "extensions": [
                        "pdf",
                        "txt"
                    ]
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-get-through-onboarding",
            "label": "To help you get through onboarding easily",
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionBoolDto",
                    "number": "1",
                    "alias": "know-what-inco-terms-are",
                    "label": "Do you know what INCO Terms are?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "1.1",
                    "alias": "do-you-know-how-to-comply-with-inco-terms",
                    "label": "Do you know how to comply with INCO Terms?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-what-inco-terms-are",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "2",
                    "alias": "know-what-correspondent-bank-is",
                    "label": "Do you know what a correspondent bank is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "2.1",
                    "alias": "use-a-correspondent-bank",
                    "label": "Do you use a correspondent bank?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-what-correspondent-bank-is",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextListDto",
                    "number": "2.1.1",
                    "alias": "which-correspondent-bankbanks-do-you-use",
                    "label": "Which correspondent bank/banks do you use?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "use-a-correspondent-bank",
                            "value": true
                        }
                    ],
                    "required": false,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "itemsMin": null,
                    "itemsMax": null,
                    "characterMax": 50
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "3",
                    "alias": "know-rules-and-regulations-of-sector",
                    "label": "Do you know the rules and regulations for your particular sector and markets?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "3.1",
                    "alias": "know-rules-and-regulations-of-sector-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-rules-and-regulations-of-sector",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "4",
                    "alias": "know-what-dual-use-good-is",
                    "label": "Do you know what a dual use good is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "4.1",
                    "alias": "supplying-a-dual-use-good",
                    "label": "Are there any circumstances under which your business might be seen as supplying a dual use good?",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-what-dual-use-good-is",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "4.1.1",
                    "alias": "supplying-a-dual-use-good-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "supplying-a-dual-use-good",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "4.1.1",
                    "alias": "supplying-a-dual-use-good-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "supplying-a-dual-use-good",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "5",
                    "alias": "clients-buy-or-sell-dual-use-goods",
                    "label": "Do your clients buy or sell dual use goods?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "5.1",
                    "alias": "clients-buy-or-sell-dual-use-goods-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "clients-buy-or-sell-dual-use-goods",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "5.1",
                    "alias": "clients-buy-or-sell-dual-use-goods-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "clients-buy-or-sell-dual-use-goods",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "6",
                    "alias": "suppliers-buy-or-sell-dual-use-goods",
                    "label": "Do your suppliers buy or sell dual use goods?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "6.1",
                    "alias": "suppliers-buy-or-sell-dual-use-goods-specify",
                    "label": "Please specify",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "suppliers-buy-or-sell-dual-use-goods",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "6.1",
                    "alias": "suppliers-buy-or-sell-dual-use-goods-specify-regulations",
                    "label": "Please specify any regulations or restrictions that apply",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "suppliers-buy-or-sell-dual-use-goods",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "7",
                    "alias": "know-what-aml-kyc-is",
                    "label": "Do you know what AML/KYC is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "7.1",
                    "alias": "know-what-aml-kyc-is-describe",
                    "label": "Please describe what you think this is",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-what-aml-kyc-is",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "8",
                    "alias": "know-what-kyt-is",
                    "label": "Do you know what KYT is?",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "8.1",
                    "alias": "know-what-kyt-is-describe",
                    "label": "Please describe what you think this is",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "know-what-kyt-is",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 15,
                    "characterMax": 2000,
                    "format": "Email"
                }
            ],
            "subSections": [],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "help-you-understand-language-of-trade",
            "label": "To help you understand the language and practice of trade",
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
        },
        {
            "questions": [
                {
                    "type": "QuestionBoolDto",
                    "number": "1",
                    "alias": "bool-example",
                    "label": "Bool example question",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "1.1",
                    "alias": "bool-condition-example",
                    "label": "Bool condition example",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "bool-example",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionNumberDto",
                    "number": "2",
                    "alias": "range-example",
                    "label": "Range example",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "max": 5,
                    "min": 1,
                    "format": "Range"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "2.1",
                    "alias": "range-condition-example",
                    "label": "Range condition example",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionNumberDto",
                            "conditionQuestionAlias": "range-example",
                            "value": 2,
                            "operator": "GreaterThan"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "3",
                    "alias": "text-example",
                    "label": "Text example",
                    "description": "Some additional description text",
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": 10,
                    "characterMax": 125,
                    "format": "Email"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "4",
                    "alias": "select-example-multiple",
                    "label": "Select example (multiple, other)",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "CheckboxList"
                },
                {
                    "type": "QuestionTextDto",
                    "number": "4.1",
                    "alias": "select-example-multiple-other",
                    "label": "Other",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionMultipleChoiceDto",
                            "conditionQuestionAlias": "select-example-multiple",
                            "optionAlias": "other"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionMultipleChoiceDto",
                    "number": "5",
                    "alias": "select-example-single",
                    "label": "Select example (single)",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
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
                    "format": "RadioList"
                },
                {
                    "type": "QuestionBoolDto",
                    "number": "5.1",
                    "alias": "multiple-choice-condition-example",
                    "label": "Multiple choice condition example",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionMultipleChoiceDto",
                            "conditionQuestionAlias": "select-example-single",
                            "optionAlias": "c"
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": []
                },
                {
                    "type": "QuestionTextDto",
                    "number": "5.1.1",
                    "alias": "nested-condition-example",
                    "label": "Nested condition example",
                    "description": null,
                    "conditions": [
                        {
                            "type": "QuestionConditionBoolDto",
                            "conditionQuestionAlias": "multiple-choice-condition-example",
                            "value": true
                        }
                    ],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": null,
                    "format": "Email"
                },
                {
                    "type": "QuestionFileListDto",
                    "number": "6",
                    "alias": "file-list-example",
                    "label": "File list example",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "filesMin": 1,
                    "filesMax": 5,
                    "extensions": [
                        "pdf",
                        "txt"
                    ]
                },
                {
                    "type": "QuestionTextDto",
                    "number": "8",
                    "alias": "sector-you-are-supplying-in",
                    "label": "The detailed sector that you are supplying in",
                    "description": null,
                    "conditions": [],
                    "required": true,
                    "questionGroupAlias": null,
                    "readOnly": false,
                    "validationContextQuestionAliases": [],
                    "characterMin": null,
                    "characterMax": 10,
                    "format": "HsCode"
                }
            ],
            "subSections": [
                {
                    "alias": "client-contract-test",
                    "questions": [
                        {
                            "type": "QuestionTextDto",
                            "number": null,
                            "alias": "text-example-2",
                            "label": "Text example",
                            "description": "Some additional description text",
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "characterMin": 10,
                            "characterMax": 125,
                            "format": "Email"
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "copy-of-deliverables-agreement",
                            "label": "A copy of any milestone or deliverable agreements (eg Scheme of Work, or delivery dates)",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "copy-of-retainer-agreements",
                            "label": "Any retainer agreements (for example are you paid a regular maintenance fee)",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 4,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        },
                        {
                            "type": "QuestionFileListDto",
                            "number": null,
                            "alias": "any-other-documentation",
                            "label": "Any other documentation (eg Memorandum of Understanding, Director details etc)",
                            "description": null,
                            "conditions": [],
                            "required": true,
                            "questionGroupAlias": null,
                            "readOnly": false,
                            "validationContextQuestionAliases": [],
                            "filesMin": 1,
                            "filesMax": 5,
                            "extensions": [
                                "pdf"
                            ]
                        }
                    ],
                    "questionGroups": []
                }
            ],
            "sectionResponse": null,
            "questionGroups": [],
            "alias": "test-questionnaire",
            "label": "Test questionnaire",
            "sectionResponseState": "NotStarted",
            "prerequisiteSections": []
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
      if(secItem.sectionResponseState == "Partial"){
            secItem.questions.map((secResp,index)=>{
                let resp=  secItem.sectionResponse.responses.filter(x => x.questionAlias == secResp.alias)
                if(resp && resp.length){
                this.questionnaireSections[secIndex].questions[index].response=resp[0].optionAliases
                }
            })
      }
      secItem && secItem.subSections.map((subSecItem,subSecIndex)=>{
        subSecItem.questions.forEach((subQuesItem,subQuesIndex)=>{
            subQuesItem.show=true
            subQuesItem.response=''
            subQuesItem.itHasValue=subQuesItem.required ? false : true
        })
      })
    })
    // if(this.sectionIndex == 0){
    //     let tempArr=this.questionnaireSections[0].questions
    //     this.questions= tempArr.slice(0,11)
    // }
    console.log(this.questionnaireSections)
    localStorage.setItem('questionSections',JSON.stringify(this.questionnaireSections))
  }
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
    this.questionnaireSections[secIndex].questions[quesIndex].response=data.value
    this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=true
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex)
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
    if(this.questionnaireSections[index]['subSections'].length){
        this.questionnaireSections=JSON.parse(localStorage.getItem('questionSections'))
    }
    if(this.sectionIndex < index){
    for(let i=0;i<this.questionnaireSections.length;i++){
        if(index > i){
            this.questionnaireSections[i]['isStepChange']=true
        }
    }
    }
    else if(this.sectionIndex == index){
        for(let i=0;i<this.questionnaireSections.length;i++){
            if(index > i){
                this.questionnaireSections[i]['isStepChange']=true
            }
        } 
    }
    else{
        for(let i=0;i<this.questionnaireSections.length;i++){
            if(index < i){
                this.questionnaireSections[i]['isStepChange']=true
            }
            else{
                this.questionnaireSections[i]['isStepChange']=false
            }
        }
    }

    this.sectionIndex=index
      console.log(this.questionnaireSections)

  }
  checkSectionComp(){
    //   this.questionnaireSections.forEach((item)=>{
    //       item.questions.forEach((quesItem)=>{
    //           if(quesItem.required && !quesItem.response){
    //                 this.disableSubbtn=true
    //           }
    //           else{
    //               this.disableSubbtn= false
    //           }
    //       })
    //   })
      let result=this.questionnaireSections.filter(x=> !x.itHasValue)
      if(result && result.length){
          return true
      }
      else{
          return false
      }
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
  onSubSection(index,type){
    if(type == 'subSection'){
        this.questionnaireSections[index].questions=this.questionnaireSections[index].subSections[0].questions
    }

    //   if(type == 'personal'){
    //       this.subSection=false
    //     let tempArr=this.questionnaireSections[0].questions
    //     this.questions= tempArr.slice(0,11)
    //   }
    //   else{
    //       this.subSection=true
    //     let tempArr=this.questionnaireSections[0].questions
    //     this.questions= tempArr.slice(11)
    //     console.log(this.questions)
    //   }

  }

  onSubmit() {

    
    // this.toastr.success("Onboard Sucessfully")
    // if (this.sName.valueOf() !== '' || this.taxId.valueOf() !== '') {
    //   if (this.state.valueOf() !== '' || this.state.valueOf() !== '') {
    //     this.router.navigate(['sme-dashboard']);
    //     this.invalidLogin = false;
    //   }
    // } else {
    //   this.invalidLogin = true
    // }

    let onboardingResp=[]
    this.questionnaireSections.map((item)=>{
    let compSecObj={
        "sectionAlias":item.alias,
        "companyId":"",
    }
        let questionResponses=[]
        item.questions.map((quesItem)=>{
            switch(quesItem.type){
                case 'QuestionBoolDto':
                    questionResponses.push(this.boolRespBuild(quesItem))
                case 'QuestionTextDto':
                    questionResponses.push(this.textRespBuild(quesItem))
                case 'QuestionFileListDto':
                    questionResponses.push(this.filesRespBuild(quesItem))
                case 'QuestionNumberDto':
                    questionResponses.push(this.numberRespBuild(quesItem))
                case 'QuestionMultipleChoiceDto':
                    questionResponses.push(this.dropdownRespBuild(quesItem))
                case 'QuestionDateDto':
                    questionResponses.push(this.dateRespBuild(quesItem))
                case 'QuestionTextListDto':
                    questionResponses.push(this.textListRespBuild(quesItem))
                
            }
        })
        compSecObj['questionResponses']=questionResponses
        onboardingResp.push(compSecObj)
    })


    console.log(onboardingResp)
  }
  boolRespBuild(Data){
    let obj={
        "type":'QuestionResponseBoolDto',
        "questionAlias":Data.alias,
        "value":Data.response == "true" ? true : false
    }
    return obj
  }
  textRespBuild(Data){
      let obj={
          "type":'QuestionResponseTextDto',
          "questionAlias":Data.alias,
          "value":Data.response
      }
      return obj
  }
  filesRespBuild(Data){
    let obj={
        "type":'QuestionResponseFileDto',
        "questionAlias":Data.alias,
        "fileName":Data.response,
        "data":'',
        "extension":Data.extension
    }
    return obj
  }
  numberRespBuild(Data){
    let obj={
        "type":'QuestionResponseNumberDto',
        "questionAlias":Data.alias,
        "value":Data.response
    }
    return obj
  }
  dropdownRespBuild(Data){
    let obj={
        "type":'QuestionResponseMultipleChoiceDto',
        "questionAlias":Data.alias,
        "optionAliases":Data.response
    }
    return obj 
  }
  dateRespBuild(Data){
    let obj={
        "type":'QuestionResponseDateDto',
        "questionAlias":Data.alias,
        "value":Data.response
    }
    return obj
  }
  textListRespBuild(Data){
    let obj={
        "type":'QuestionResponseTextListDto',
        "questionAlias":Data.alias,
        "values":Data.response
    }
    return obj
  }
}