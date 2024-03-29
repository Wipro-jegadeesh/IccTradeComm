import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CoriolisService } from './coriolis.service';

@Component({
  selector: 'app-sme-onboarding',
  templateUrl: './sme-onboarding.component.html',
  styleUrls: ['./sme-onboarding.component.scss']
})
export class SmeOnboardingComponent implements OnInit {

  invalidLogin = false
  getFormInput
  questions = []
  questionnaireSections = []
  sectionIndex = 0
  smeForm1: FormGroup
  disableSubbtn = true
  subSection = false
  dynamicquestionnaireSections = []
  smeForm: FormGroup

  constructor(public translate: TranslateService, private router: Router, private apiService: ApiService,
    private fb: FormBuilder, private toastr: ToastrService, private coriolisService: CoriolisService) { }

  radioChecked = {}

  ngOnInit() {
    this.getQuestionnaireSection()
    this.sectionIndex = 0
    // ***Form group functionality****
    // this.smeForm1=this.fb.group({'smeForm1':this.fb.array([this.buildFormData()])})
    // this.smeForm=this.fb.group(this.groupForm())
    //   smeFormDetails:this.fb.array([])
    // this.getFormInput=this.formService.render()
  }
  //get questionnaire section
  getQuestionnaireSection() {
    let data = JSON.parse(localStorage.getItem('userCred'))
    let paramObj = {
      'companyId': data.companyId,
      'companyName': data.companyName,
      'country': data.country
    }
    this.coriolisService.getQuestionnaireSection(paramObj).subscribe(resp => {
      if (resp) {
        this.questionnaireSections = resp.sectionDtoList
        localStorage.setItem('uuid', resp.uuid)

        this.questionnaireSections.forEach((secItem, secIndex) => {
          // QUESTION ARRAY
          secItem && secItem.questions.map((quesItem, quesIndex) => {
            if ((quesItem.number - Math.floor(quesItem.number)) !== 0 && this.checkParentresp(secIndex, parseInt(quesItem.number))) {
              quesItem.show = false
              quesItem.parentNumber = parseInt(quesItem.number)
              quesItem.response = ''
              // quesItem.itHasValue=quesItem.required ? false : true
              quesItem.itHasValue = true
            }
            else {
              quesItem.show = true
              quesItem.parentNumber = (quesItem.number - Math.floor(quesItem.number)) !== 0 ? parseInt(quesItem.number) : ''
              switch (quesItem.alias) {
                case 'name':
                  quesItem.response = data.name
                  break;
                case 'address-line-1':
                  quesItem.response = data.address
                  break;
                case 'telephone-mobile':
                  quesItem.response = data.mobile
                  break;
                case 'email':
                  quesItem.response = data.email
                  break;
                case 'city':
                  quesItem.response = data.city
                  break;
                default:
                  quesItem.response = ''
              }
              //   quesItem.response=''
              quesItem.itHasValue = quesItem.required && !quesItem.response ? false :
                !quesItem.required && quesItem.response ? true : quesItem.required && quesItem.response ? true : false
              //    quesItem.itHasValue=quesItem.required ? false : true
              if (quesItem.type == "QuestionSubSectionListDto") {
                quesItem.itHasValue = true
              }
            }
            quesItem.sectionType = secIndex == 0 && quesIndex < 10 ? 'personal' : 'other'
          })
          secItem.itHasValue = false
          //PARTIAL RESPONSE & Completed Response

          if (secItem && secItem.sectionResponse) {
            secItem.questions.map((secResp, index) => {
              let fileAlias = []
              secItem.sectionResponse.responses.map((item) => {
                if (item.questionAlias == secResp.alias) {
                  if (item.optionAliases) {
                    secResp.response = item.optionAliases
                  }
                  else if (item.fileName) {
                    if (!fileAlias.includes(item.questionAlias)) {
                      fileAlias.push(item.questionAlias)
                      let obj = {
                        'name': item.fileName
                      }
                      secResp.response = []
                      secResp.response.push(obj)
                    }
                    else {
                      let resp = secItem.questions.filter(x => x.alias == item.questionAlias)
                      let obj = {
                        'name': item.fileName
                      }
                      resp[0].response.push(obj)
                    }
                  }
                  else if (item.type == "QuestionResponseBoolDto") {
                    secResp.response = item.value == true ? 'true' : 'false'
                  }
                  else {
                    secResp.response = item.value
                  }
                }
                // secResp.itHasValue=true
                secResp.itHasValue = secResp.required && !secResp.response ? false :
                  !secResp.required && secResp.response ? true : secResp.required && secResp.response ? true : false
              })
              //   this.questionnaireSections.map((questionItem)=>{
              //     questionItem.questions.map((item)=>{
              //         if(item.alias ==)
              //     })
              //   })

              //   let resp=  secItem.sectionResponse.responses.filter(x => x.questionAlias == secResp.alias)
              //   if(resp && resp.length){
              //   this.questionnaireSections[secIndex].questions[index].response=resp[0].optionAliases
              //   }
            })
          }

          //SUBSECTION ARRAY
          secItem.subSections.length && secItem.subSections.map((subSecItem, subSecIndex) => {
            subSecItem.questions.forEach((subQuesItem, subQuesIndex) => {
              subQuesItem.show = true
              subQuesItem.response = ''
              subQuesItem.isSubSection = true
              subQuesItem.itHasValue = subQuesItem.required ? false : true
              subQuesItem.subSecIndex = subSecIndex
            })
            subSecItem.isSelected = false
          })
          this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
        })
        this.questions = this.questionnaireSections[this.sectionIndex].questions
        localStorage.setItem('questionSections', JSON.stringify(this.questionnaireSections))
        //console.log(this.questionnaireSections) Dont remove this.It is for debugging purpose...
      }
    })
  }
  //function to check to parent filed has response or not..
  checkParentresp(secIndex, parNum) {
    let itHasResp = false
    this.questionnaireSections[secIndex].questions.forEach((item) => {
      if (item.number == parNum && !item.response) {
        itHasResp = true
      }
    })
    return itHasResp
  }
  //**For form group purpose */
  // groupForm(){
  //   let formSections=[];
  //   this.questionnaireSections.map((item,index)=>{
  //     // let obj={}
  //     // obj['smeSectionForm' + (index+1)] = this.fb.array([this.buildFormData()])
  //     // formSections.push(obj)

  //     var value='smeSectionForm' + (index+1) 
  //     // formSections.push()
  //   // formSections[index]=value : this.fb.array([this.buildFormData()])
  //   })
  //   return formSections;
  // }
  // buildFormData(){
  //   let obj={}
  //   // this.questions.map((item,index)=>{
  //   //   obj[item.alias] = [""]
  //   // })
  //   return this.fb.group(obj)
  // }
  // get formSections(){
  //   return this.smeForm.controls[0].value['smeSectionForm1'] as FormArray
  // }
  // on change function to handle textbox values
  onTextBoxChange(data, secIndex, quesIndex) {
    if (data.questionDatas.isSubSection) {
      let subIndex = data.questionDatas.subSecIndex
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = data.value ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      data.questionDatas.type == 'QuestionNumberDto' && this.questionnaireSections[secIndex].questions.forEach((item) => {
        if (data.number == item.parentNumber && (item.conditions.length && item.conditions[0]['conditionQuestionAlias'] == data.questionDatas.alias)) {
          if (item.conditions[0]['operator'] == "GreaterThan") {
            item.show = data.value > item.conditions[0]['value'] ? true : false
          }
          else if (item.conditions[0]['operator'] == "LesserThan") {
            item.show = data.value < item.conditions[0]['value'] ? true : false
          }
        }
      })
      this.questionnaireSections[secIndex].questions[quesIndex]['response'] = data.value
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = data.value ? true : false
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
  }
  // on change function to handle dropdown values
  onDropdownChange(data, secIndex, quesIndex) {
    if (data.questionDatas.isSubSection) {
      let subIndex = data.questionDatas.subSecIndex
      let respArr = []
      data.selectedItems && data.selectedItems.length && data.selectedItems.map((selItem) => {
        respArr.push(selItem.id)
      })
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = respArr
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = respArr && respArr.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      this.questionnaireSections[secIndex].questions.map((item) => {
        if (data.number == item.parentNumber) {
          item.show = this.checkDropdownCond(data.selectedItems, item.conditions && item.conditions.length && item.conditions[0]['optionAlias'])
        }
      })
      let respArr = []
      data.selectedItems && data.selectedItems.length && data.selectedItems.map((selItem) => {
        respArr.push(selItem.id)
      })
      this.questionnaireSections[secIndex].questions[quesIndex].response = respArr
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = respArr && respArr.length ? true : false
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
    console.log(this.questionnaireSections)
  }
  //function to check dropdown condition to enable child fields
  checkDropdownCond(selectedItems, conditionAlias) {
    let returnValue = false
    selectedItems.length && selectedItems.map((item) => {
      if (item.id == conditionAlias) {
        returnValue = true
      }
    })
    return returnValue
  }
  //function to handle radio input values
  onRadioChange(data, secIndex, quesIndex) {
    let subIndex = data.questionDatas.subSecIndex
    this.radioChecked = {
      isTrue: data.condition,
      secIndex: data.secIndex,
      quesIndex: data.quesIndex
    }
    if (data.questionDatas.isSubSection) {
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = data.condition == "true" ? "true" : "false"
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = true
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      this.questionnaireSections[secIndex].questions.map((item) => {
        if (data.questionDatas.number == item.parentNumber && (item.number - Math.floor(item.number)) !== 0) {
          item.show = data.condition == "true" ? true : false
          return true;
        }
      })
      this.questionnaireSections[secIndex].questions[quesIndex].response = data.condition == "true" ? "true" : "false"
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = true
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
    //  this.radioChecked && this.radioChecked['isTrue'] && this.checkCon(data,data.secIndex,data.quesIndex)
  }
  //function to handle file input values(Files)
  onFileChange(data, secIndex, quesIndex) {
    let subIndex = data.questionDatas.subSecIndex
    if (data.questionDatas.isSubSection) {
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = data.value && data.value.length ? data.value : ''
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      this.questionnaireSections[secIndex].questions[quesIndex].response = data.value && data.value.length ? data.value : ''
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
    console.log(this.questionnaireSections)
  }
  //function to handle date input values
  onDateChange(data, secIndex, quesIndex) {
    let subIndex = data.questionDatas.subSecIndex
    if (data.questionDatas.isSubSection) {
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = data.value ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      this.questionnaireSections[secIndex].questions[quesIndex].response = data.value
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = data.value ? true : false
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
  }
  //function to enable child fields 
  checkCon(data, secIndex, questionIndex) {
    let number = parseFloat(data.number)
    if (!Number.isInteger(number)) {
      if (data.questionDatas) {
        if ((this.radioChecked['secIndex'] == secIndex) && this.radioChecked['isTrue'] == "true") {
          this.questionnaireSections[secIndex].questions.map((item) => {
            if (data.questionDatas.number == item.parentNumber) {
              item.show = true
              return true;
            }
          })
        }
      }
      else {
        return false
      }
    }
    else {
      return true
    }
  }
  //function to click particular question section
  onSectionClick(index) {
    this.questionnaireSections[index].subSections &&
      this.questionnaireSections[index].subSections.forEach((item) => {
        item.isSelected = false
      })
    this.questions = this.questionnaireSections[index].questions
    if (this.sectionIndex < index) {
      for (let i = 0; i < this.questionnaireSections.length; i++) {
        if (index > i) {
          this.questionnaireSections[i]['isStepChange'] = true
        }
      }
    }
    else {
      for (let i = 0; i < this.questionnaireSections.length; i++) {
        if (index <= i) {
          this.questionnaireSections[i]['isStepChange'] = false
        }
      }
    }
    this.sectionIndex = index
  }
  //function to check subsection questions
  onSubSection(index, subIndex) {
    this.questions = this.questionnaireSections[index].subSections[subIndex].questions
    this.questionnaireSections[index].subSections.forEach((item, secIndex) => {
      item.isSelected = secIndex == subIndex ? true : false
    })
    //   this.questionnaireSections[index].subSections[subIndex]['isSelected']=true
  }
  //function to check section completion
  checkSectionComp() {
    let isCondCheck = true
    let cond = this.questionnaireSections
    for (let i = 0; i < cond.length; i++) {
      if (!cond[i].itHasValue) {
        isCondCheck = true
        break;
      }
      else {
        isCondCheck = false
      }
    }
    return isCondCheck
  }
  //function to handle textlist input values(CHIP SET)
  onTextListChange(data, secIndex, quesIndex) {
    let subIndex = data.questionDatas.subSecIndex
    if (data.questionDatas.isSubSection) {
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response'] = data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue = data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue = this.checkFormComp(secIndex, 'subSec', subIndex)
    }
    else {
      this.questionnaireSections[secIndex].questions[quesIndex].response = data.value
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue = data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].itHasValue = this.checkFormComp(secIndex, 'mainSec', null)
    }
  }
  //function to check form completion
  checkFormComp(sectionIndex, type, subIndex) {
    let isFormComp = false
    let cond = type == 'mainSec' ? this.questionnaireSections[sectionIndex].questions
      : this.questionnaireSections[sectionIndex].subSections[subIndex].questions
    for (let i = 0; i < cond.length; i++) {
      if (!cond[i].itHasValue) {
        isFormComp = false
        break;
      }
      else {
        isFormComp = true
      }
    }
    return isFormComp
  }
  //submit function
  onSubmit() {
    this.onSave('')
  }
  //save function
  onSave(type) {
    let onboardingResp = []
    let userCred = JSON.parse(localStorage.getItem('userCred'))
    this.questionnaireSections.forEach((item) => {
      let compSecObj = {
        "sectionAlias": item.alias,
        "companyId": localStorage.getItem('uuid'),
      }
      let subSectionResponseDto = []
      if (item.subSections && item.subSections.length) {
        item.subSections.forEach((subItem) => {
          subSectionResponseDto.push(this.buildSubSecResp(subItem))
        })
      }

      let questionResponses = []
      item.questions.forEach((quesItem) => {
        if (quesItem.response) {
          switch (quesItem.type) {
            case 'QuestionBoolDto':
              questionResponses.push(this.boolRespBuild(quesItem))
              break;
            case 'QuestionTextDto':
              questionResponses.push(this.textRespBuild(quesItem))
              break;
            case 'QuestionFileListDto':
              quesItem.response.length && quesItem.response.forEach((fileItem) => {
                if (fileItem.base64data) {
                  questionResponses.push(this.filesRespBuild(quesItem, fileItem))
                }
              })
              break;
            case 'QuestionNumberDto':
              questionResponses.push(this.numberRespBuild(quesItem))
              break;
            case 'QuestionMultipleChoiceDto':
              questionResponses.push(this.dropdownRespBuild(quesItem))
              break;
            case 'QuestionDateDto':
              questionResponses.push(this.dateRespBuild(quesItem))
              break;
            case 'QuestionTextListDto':
              questionResponses.push(this.textListRespBuild(quesItem))
              break;
            default:
          }
        }
      })
      compSecObj['questionResponses'] = questionResponses
      compSecObj['subSectionResponseDto'] = subSectionResponseDto
      onboardingResp.push(compSecObj)
    })
    let obj = {
      'sectionList': onboardingResp,
      'uuid': localStorage.getItem('uuid')
    }
    this.coriolisService.submitQuestionnaire(obj).subscribe(resp => {
      if (resp) {
        // alert('Questionnaire Section Submitted Successfully')
        // type &&
        this.toastr.success('Questionnaire Section Submitted Successfully')

        let data = JSON.parse(localStorage.getItem('userCred'))
        let reqData=data.companyId + '/' + data.companyName + '/' + data.country
        this.coriolisService.getScore(reqData).subscribe(resp => {
          if(resp){
          let obj = {
            "smeRating": resp.score,
          }

          this.apiService.put(environment.financierServicePath + 'sme-profile/smeRating/' + userCred.companyId, obj).subscribe(scoreUpdateResp => {

          })

          if (resp && resp.score >= 900) {
            !type && this.apiService.put(environment.financierServicePath + 'sme-profile/questionnairestatus/' + data.companyId, {}).subscribe(resp => {
            })
            let obj = {
              status: 'A'
            }
            this.apiService.put(environment.financierServicePath + 'sme-profile/smeprofilestatus/' + data.companyId, obj).subscribe(resp => {
              this.toastr.success('Status Update Sucessfully')
            })
            this.router.navigateByUrl('/sme-dashboard')
          }
          else {
            !type && this.toastr.info(this.translate.instant('Kindly check your questionnaire section.'))
            this.router.navigateByUrl('/score-received')
          }
        }
        }, error => {
          this.toastr.error('Error')
        })


      }
    })
    console.log(onboardingResp)
  }
  //function to build question submission Object
  buildSubSecResp(Data) {
    let obj = {
      'subSectionAlias': Data.alias,
    }
    let questionResponses = []
    Data.questions.forEach((quesItem) => {
      if (quesItem.response) {
        switch (quesItem.type) {
          case 'QuestionBoolDto':
            questionResponses.push(this.boolRespBuild(quesItem))
            break;
          case 'QuestionTextDto':
            questionResponses.push(this.textRespBuild(quesItem))
            break;
          case 'QuestionFileListDto':
            quesItem.response.length && quesItem.response.forEach((fileItem) => {
              if (fileItem.base64data) {
                questionResponses.push(this.filesRespBuild(quesItem, fileItem))
              }
            })
            break;
          case 'QuestionNumberDto':
            questionResponses.push(this.numberRespBuild(quesItem))
            break;
          case 'QuestionMultipleChoiceDto':
            questionResponses.push(this.dropdownRespBuild(quesItem))
            break;
          case 'QuestionDateDto':
            questionResponses.push(this.dateRespBuild(quesItem))
            break;
          case 'QuestionTextListDto':
            questionResponses.push(this.textListRespBuild(quesItem))
            break;
          default:
        }
      }
    })
    obj['questionResponses'] = questionResponses
    return obj
  }
  //function to build boolean submission Object
  boolRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseBoolDto',
      "questionAlias": Data.alias,
      "value": Data.response == "true" ? true : false
    }
    return obj
  }
  //function to build text input submission Object
  textRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseTextDto',
      "questionAlias": Data.alias,
      "value": Data.response
    }
    return obj
  }
  //function to build files input submission Object
  filesRespBuild(Data, fileData) {
    let validData = fileData.base64data.split('base64,')
    let obj = {
      "type": 'QuestionResponseFileDto',
      "questionAlias": Data.alias,
      "fileName": fileData.name, //fileName.toString(),
      "data": validData[1],//data.toString(),
      "extension": fileData.fileExt
    }
    return obj
  }
  //function to build number field submission Object
  numberRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseNumberDto',
      "questionAlias": Data.alias,
      "value": Data.response
    }
    return obj
  }
  //function to build dropdown submission Object
  dropdownRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseMultipleChoiceDto',
      "questionAlias": Data.alias,
      "optionAliases": Data.response
    }
    return obj
  }
  //function to build date submission Object
  dateRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseDateDto',
      "questionAlias": Data.alias,
      "value": moment(Data.response).format("YYYY-MM-DD")
      // this.datePipe.transform(Data.response,"YYYY-MM-dd")
    }
    return obj
  }
  //function to build text list(chips) submission Object
  textListRespBuild(Data) {
    let obj = {
      "type": 'QuestionResponseTextListDto',
      "questionAlias": Data.alias,
      "values": Data.response
    }
    return obj
  }
}