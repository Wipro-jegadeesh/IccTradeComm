
import { Component, OnInit, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccDashboardServices } from '../icc-dashboard/icc-dashboard-services'
import {ICCDASHBOARDCONSTANTS} from '../../shared/constants/constants'
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IccListSmeServices } from "../icc-list-smes/icc-list-smes.service";
import { ToastrService } from 'ngx-toastr';
import { IccUserCreationService } from '../icc-user-creation/icc-user-creation.service'
import { MatPaginator } from '@angular/material/paginator';
import { BIDDINGCONSTANTS } from '../../shared/constants/constants'
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { QuestionaireScoreServices } from "../questionaire-score/questionaire-score-services";
@Component({
  selector: 'app-icc-sme-details',
  templateUrl: './icc-sme-details.component.html',
  styleUrls: ['./icc-sme-details.component.scss']
})
export class IccSmeDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = "active";
  filterDivOpen: boolean;
  searchDivOpen: boolean;
  displayedColumns: string[] = ['scoreName', 'score', 'information'];
  displayedColumns1: string[] = ['userId','firstName', 'lastName', 'companyName', 'emailId', 'phoneNumber', 'action'];
  dataSource = [];
  @ViewChild("accountList", { read: ElementRef })
  public accountList: ElementRef<any>;
  fundingRequestObj;
  OfferAcceptanceObj;
  companyid: any;
  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  dashboardTooltip=ICCDASHBOARDCONSTANTS
  financierListDatas=[];
  getSumInvoiceMasterCount;
  getSumAllfinTdyCount;
  financeMasterCount;
  questionnaireSections=[];
  sectionIndex;
  questions;
  radioChecked;
  groupsForm: FormGroup;
  userForm: FormGroup;
  smeData;
  biddingTooltip = BIDDINGCONSTANTS;
  sectors: any;
  constructor(private toastr: ToastrService,private iccListSmeServices: IccListSmeServices,private fb: FormBuilder,public router: Router,
    private apiService:ApiService,public IccUserCreationService:IccUserCreationService,public translate: TranslateService,
    private questionnaireService:QuestionaireScoreServices) { 
    const smeData= this.router.getCurrentNavigation().extras.state;
    this.smeData = smeData
    this.invoiceFormBuild()
  }
  ngOnInit() {//Initially works after constructor
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource=[]
    this.sectionIndex=0;
    this.getQuestionnaireSection()
    this.getscore();
    this.getIccRelaterUsers();
    this.groupsFormBuild()
    this.iccListSmeServices.getAllSector().subscribe(listResp => {
      if(listResp){
        this.sectors = listResp
      }
    })
    this.companyid =this.smeData.smeData.queryParams.companyId
    this.iccListSmeServices.getUserSMEDetails(this.smeData.smeData.queryParams.companyId).subscribe(resp => {
      if(resp){
    this.userForm.patchValue({
    nationalId:resp[0].companyid,
    address: resp[0].address,
    email: resp[0].email,
    address1: resp[0].address1,
    contactNo: resp[0].contactnum,
    companyName: resp[0].companyname,
    country:resp[0].country,
    status:resp[0].status,
    postalCode:resp[0].postalCode,
    locale:resp[0].locale,
    state:resp[0].state,
    sector:resp[0].state
      });
    }
    })
  }
  groupsFormBuild() { //Set Form build for add and edit form
    this.groupsForm = this.fb.group({
      state: ['', Validators.required], 
      score: ['', Validators.required],
    });
  }
  invoiceFormBuild() {//Set Form build for add and edit form
    this.userForm = this.fb.group({
      address: [''],
      address1:[''],
      email: [''],
      contactNo: [''],
      status: ['',Validators.required],
      country:[''],
      companyName:[''],
      nationalId:[''],
      postalCode:[''],
      locale:[''],
      state:[''],
      sector:['']
    });
  }
  public hasError = (controlName: string, errorName: string) =>{ //Checking Validation for forms
    return this.userForm.controls[controlName].hasError(errorName);
  }
  onSubmitInvoiceForm() { // Form submit for sme-details
    try {
      if (this.userForm.status === "INVALID"){
      }
      let obj = {
        status: this.userForm.value.status
      }
      this.iccListSmeServices.statusChange(this.smeData.smeData.queryParams.companyId,obj).subscribe(resp => {
        this.toastr.success('Status Update Sucessfully')
        })
    } catch (err) {
    }
  }
    navigatePages(path){ //Navaiagtion based on path name
      this.router.navigateByUrl(path);
    }
      getQuestionnaireSection(){  //Get questionare details
        let data=JSON.parse(localStorage.getItem('userCred'))
      this.apiService.generalServiceget(environment.coriolisServicePath +'coriolis/getallquestionaire/'+this.smeData.smeData.queryParams.companyId + '/' + this.smeData.smeData.queryParams.companyName + '/' + this.smeData.smeData.queryParams.country).subscribe(resp=>{
          if(resp){
            this.questionnaireSections=resp.sectionDtoList
            localStorage.setItem('uuid',resp.uuid)
            
  this.questionnaireSections.forEach((secItem,secIndex)=>{
      // QUESTION ARRAY
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
          quesItem.itHasValue=quesItem.required && !quesItem.response ? false :
           !quesItem.required && quesItem.response ? true : quesItem.required && quesItem.response ? true : false
        //    quesItem.itHasValue=quesItem.required ? false : true
        if(quesItem.type == "QuestionSubSectionListDto"){
          quesItem.itHasValue=true
        }
                }
       quesItem.sectionType = secIndex == 0 && quesIndex < 10 ? 'personal' : 'other'
    })
    secItem.itHasValue=false
    //PARTIAL RESPONSE & Completed Response
        if(secItem && secItem.sectionResponse){
          secItem.questions.map((secResp,index)=>{
            let fileAlias=[]
            secItem.sectionResponse.responses.map((item)=>{
                if(item.questionAlias == secResp.alias){
                    if(item.optionAliases){
                        secResp.response=item.optionAliases
                    }
                    else if(item.fileName){
                      if(!fileAlias.includes(item.questionAlias)){
                        fileAlias.push(item.questionAlias)
                        let obj={
                          'name':item.fileName
                        }
                        secResp.response=[]
                        secResp.response.push(obj)
                      }
                      else{
                        let resp=  secItem.questions.filter(x => x.alias == item.questionAlias)
                        let obj={
                          'name':item.fileName
                        }
                        resp[0].response.push(obj)
                      }
                    }
                    else if(item.type == "QuestionResponseBoolDto"){
                        secResp.response=item.value == true ? 'true' : 'false'
                    }
                    else{
                        secResp.response= item.value
                      }
                    }
                    secResp.itHasValue= secResp.required && !secResp.response ? false :
           !secResp.required && secResp.response ? true : secResp.required && secResp.response ? true : false
            })
          })
        }
    //SUBSECTION ARRAY
    secItem.subSections.length && secItem.subSections.map((subSecItem,subSecIndex)=>{
      subSecItem.questions.forEach((subQuesItem,subQuesIndex)=>{
          subQuesItem.show=true
          subQuesItem.response=''
          subQuesItem.isSubSection=true
          subQuesItem.itHasValue=subQuesItem.required ? false : true
          subQuesItem.subSecIndex=subSecIndex
      })
      subSecItem.isSelected=false
    })
    this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
  })
  this.questions=this.questionnaireSections[this.sectionIndex].questions
  localStorage.setItem('questionSections',JSON.stringify(this.questionnaireSections))
        }
        })
    }
    getscore(){  //Get score data from api call
      let paramsObj={
        'companyId':this.smeData.smeData.queryParams.companyId,
        'companyName':this.smeData.smeData.queryParams.companyName,
        'country':this.smeData.smeData.queryParams.country
      }
      this.questionnaireService.getScore(paramsObj).subscribe(listResp=>{
        if(listResp){
          this.dataSource2 = new MatTableDataSource(listResp.scores);
           this.groupsForm.patchValue({  
            state : listResp.state,
            score : listResp.score
          })
        }

      })
    }
    getIccRelaterUsers(){  //Get icc related users
      let regNo = this.smeData.smeData.queryParams.companyId
      this.IccUserCreationService.getParticularSmeUser(regNo).subscribe(resp => {
        this.dataSource1 = new MatTableDataSource(resp);
        this.dataSource1.paginator = this.paginator
      })    
    }
      checkParentresp(secIndex,parNum){ //check resp when get questionaire
        let itHasResp=false
       this.questionnaireSections[secIndex].questions.forEach((item) => { 
         if(item.number == parNum && !item.response){
           itHasResp=true
        }
        })
        return itHasResp
      }
      
      onTextBoxChange(data,secIndex,quesIndex){  //onchange when typing in text field
        if(data.questionDatas.isSubSection){
            let subIndex=data.questionDatas.subSecIndex
          this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.value
          this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=data.value ? true : false
          this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
        }
        else{
      data.questionDatas.type == 'QuestionNumberDto' && this.questionnaireSections[secIndex].questions.forEach((item)=>{
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
      this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
    }
    onDropdownChange(data,secIndex,quesIndex){  //calls when select option in droopdown
        if(data.questionDatas.isSubSection){
          let subIndex=data.questionDatas.subSecIndex
      let respArr=[]
      data.selectedItems && data.selectedItems.length && data.selectedItems.map((selItem)=>{
          respArr.push(selItem.id)
      })
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=respArr
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=respArr && respArr.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
        }
        else{
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
      this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
    }
    checkDropdownCond(selectedItems,conditionAlias){ //check dropdown condition inside onDropdownChange function 
        let returnValue=false
      selectedItems.length &&  selectedItems.map((item)=>{
          if(item.id == conditionAlias){
              returnValue=true
          }
      })
      return returnValue
    }
    onRadioChange(data,secIndex,quesIndex){ //calls when changing radio button option
      let subIndex=data && data.questionDatas && data.questionDatas.subSecIndex
      this.radioChecked={
        isTrue:data.condition,
        secIndex:data.secIndex,
        quesIndex:data.quesIndex
       }
       if(data && data.questionDatas && data.questionDatas.isSubSection){
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.condition == "true" ? "true" : "false"
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=true 
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
       }
       else{
       this.questionnaireSections[secIndex].questions.map((item)=>{
        if(data.questionDatas.number == item.parentNumber && (item.number - Math.floor(item.number)) !== 0){
          item.show = data.condition == "true" ? true : false
          return true;
        }
      })
      this.questionnaireSections[secIndex].questions[quesIndex].response=data.condition == "true" ? "true" : "false"
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=true
      this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
      //  this.radioChecked && this.radioChecked['isTrue'] && this.checkCon(data,data.secIndex,data.quesIndex)
  }
    onFileChange(data,secIndex,quesIndex){ //Calls when file upload
      let subIndex=data.questionDatas.subSecIndex
      if(data.questionDatas.isSubSection){
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.value && data.value.length ? data.value : ''
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
      }
      else{     
          this.questionnaireSections[secIndex].questions[quesIndex].response=data.value && data.value.length ? data.value : ''
          this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=data.value && data.value.length ? true : false
          this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
    }
    onDateChange(data,secIndex,quesIndex){//Calls when date change
      let subIndex=data.questionDatas.subSecIndex
      if(data.questionDatas.isSubSection){
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=data.value ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
      }
      else{
      this.questionnaireSections[secIndex].questions[quesIndex].response=data.value
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=data.value ? true : false
      this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
    }
    checkCon(data,secIndex,questionIndex){//check condition radio button change
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
  
    onSectionClick(index){ //when calls clicking section 
        this.questionnaireSections[index].subSections && 
         this.questionnaireSections[index].subSections.forEach((item)=>{
          item.isSelected=false
        })
      this.questions=this.questionnaireSections[index].questions
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
    }
    onSubSection(index,subIndex){ //when calls clicking in subsection 
        this.questions=this.questionnaireSections[index].subSections[subIndex].questions
        this.questionnaireSections[index].subSections.forEach((item,secIndex)=>{
                  item.isSelected= secIndex == subIndex ? true : false
        })
      //   this.questionnaireSections[index].subSections[subIndex]['isSelected']=true
    }
  
    checkSectionComp(){
        let isCondCheck=true
        let cond=this.questionnaireSections
        for(let i=0;i < cond.length;i++){
            if(!cond[i].itHasValue){
              isCondCheck=true
              break;
            }
            else{
              isCondCheck=false 
            }
        }
      return isCondCheck
    }
    onTextListChange(data,secIndex,quesIndex){
      let subIndex=data.questionDatas.subSecIndex
      if(data.questionDatas.isSubSection){
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
      }
      else{
      this.questionnaireSections[secIndex].questions[quesIndex].response=data.value
      this.questionnaireSections[secIndex].questions[quesIndex].itHasValue=data.value && data.value.length ? true : false
      this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
      }
    }
    checkFormComp(sectionIndex,type,subIndex){
        let isFormComp = false
      let cond=type == 'mainSec' ?  this.questionnaireSections[sectionIndex].questions 
      : this.questionnaireSections[sectionIndex].subSections[subIndex].questions
      for(let i=0;i<cond.length;i++){
          if(!cond[i].itHasValue){
              isFormComp=false
              break;
          }
          else{
             isFormComp=true
          }
      }
      return isFormComp
    }
onSubmit(){  //calls when submitting form
  this.router.navigateByUrl('/sme-dashboard')
}
onSave(type) { //when submitting coriolis part
  let onboardingResp=[]
  let userCred = JSON.parse(localStorage.getItem('userCred'))
  this.questionnaireSections.forEach((item)=>{
  let compSecObj={
      "sectionAlias":item.alias,
      "companyId":localStorage.getItem('uuid'),
  }
  let subSectionResponseDto=[]
  if(item.subSections && item.subSections.length){
      item.subSections.forEach((subItem)=>{
          subSectionResponseDto.push(this.buildSubSecResp(subItem))
      })
  }

      let questionResponses=[]
      item.questions.forEach((quesItem)=>{
          if(quesItem.response){
          switch(quesItem.type){
              case 'QuestionBoolDto':
                  questionResponses.push(this.boolRespBuild(quesItem))
                  break;
              case 'QuestionTextDto':
                  questionResponses.push(this.textRespBuild(quesItem))
                  break;
              case 'QuestionFileListDto':
                quesItem.response.length && quesItem.response.forEach((fileItem)=>{
                  if(fileItem.base64data){
                    questionResponses.push(this.filesRespBuild(quesItem,fileItem))
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
      compSecObj['questionResponses']=questionResponses
      compSecObj['subSectionResponseDto']=subSectionResponseDto
      onboardingResp.push(compSecObj)
  })
  let obj={
      'sectionList':onboardingResp,
      'uuid':localStorage.getItem('uuid')
  }
  this.apiService.post(environment.coriolisServicePath + 'coriolis/submitquestionaire',obj).subscribe(resp=>{
      if(resp){
          // alert('Questionnaire Section Submitted Successfully')
        // type &&
         this.toastr.success('Questionnaire Section Submitted Successfully')

        let data=JSON.parse(localStorage.getItem('userCred'))
        this.apiService.generalServiceget(environment.coriolisServicePath + 'coriolis/fetchScoreByCompany/' + data.companyId + '/' + data.companyName + '/' + data.country).subscribe(resp=>{
          let obj={
              "smeRating":resp.score,
          }
          
            this.apiService.put(environment.financierServicePath + 'sme-profile/smeRating/' + userCred.companyId , obj).subscribe(scoreUpdateResp=>{

            })
            
          if(resp && resp.score >= 900){
         !type && this.apiService.put(environment.financierServicePath + 'sme-profile/questionnairestatus/' + data.companyId , {} ).subscribe(resp=>{
          })
          let obj={
            status : 'A'
          }
          this.apiService.put(environment.financierServicePath+'sme-profile/smeprofilestatus/'+data.companyId,obj).subscribe(resp=>{
            this.toastr.success('Status Update Sucessfully')
          })
          this.router.navigateByUrl('/sme-dashboard')
        }
        else{
          !type && this.toastr.info(this.translate.instant('Kindly check your questionnaire section.'))
          this.router.navigateByUrl('/score-received')
        }
        },error=>{
          this.toastr.error('Error')
        })
    
     
      }
  })
}
buildSubSecResp(Data){ //Setting up resp for respective fields
  let obj={
      'subSectionAlias':Data.alias,
  }
  let questionResponses=[]
  Data.questions.forEach((quesItem)=>{
      if(quesItem.response){
      switch(quesItem.type){
          case 'QuestionBoolDto':
              questionResponses.push(this.boolRespBuild(quesItem))
              break;
          case 'QuestionTextDto':
              questionResponses.push(this.textRespBuild(quesItem))
              break;
          case 'QuestionFileListDto':
            quesItem.response.length && quesItem.response.forEach((fileItem)=>{
                if(fileItem.base64data){
                  questionResponses.push(this.filesRespBuild(quesItem,fileItem))
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
  obj['questionResponses']=questionResponses
  return obj
}

boolRespBuild(Data){ //object construct for submit
  let obj={
      "type":'QuestionResponseBoolDto',
      "questionAlias":Data.alias,
      "value":Data.response == "true" ? true : false
  }
  return obj
}
textRespBuild(Data){ //object construct for submit
    let obj={
        "type":'QuestionResponseTextDto',
        "questionAlias":Data.alias,
        "value":Data.response
    }
    return obj
}
filesRespBuild(Data,fileData){//object construct for submit
let validData=fileData.base64data.split('base64,')
  let obj={
      "type":'QuestionResponseFileDto',
      "questionAlias":Data.alias,
      "fileName":fileData.name, //fileName.toString(),
      "data":validData[1],//data.toString(),
      "extension":fileData.fileExt
  }
  return obj
}
numberRespBuild(Data){//object construct for submit
  let obj={
      "type":'QuestionResponseNumberDto',
      "questionAlias":Data.alias,
      "value":Data.response
  }
  return obj
}
dropdownRespBuild(Data){//object construct for submit
  let obj={
      "type":'QuestionResponseMultipleChoiceDto',
      "questionAlias":Data.alias,
      "optionAliases":Data.response
  }
  return obj 
}
dateRespBuild(Data){//object construct for submit
  let obj={
      "type":'QuestionResponseDateDto',
      "questionAlias":Data.alias,
      "value":moment(Data.response).format("YYYY-MM-DD")
      // this.datePipe.transform(Data.response,"YYYY-MM-dd")
  }
  return obj
}
textListRespBuild(Data){//object construct for submit
  let obj={
      "type":'QuestionResponseTextListDto',
      "questionAlias":Data.alias,
      "values":Data.response
  }
  return obj
}
navigateFinanceDetails(id,type) { //navigation to user details page
  this.router.navigateByUrl('/icc-user-details/'+id+'/'+type);
}
searchDiv(){// hide and show for filter section
  if(this.filterDivOpen === true){
  this.searchDivOpen = !this.searchDivOpen
  this.filterDivOpen = !this.filterDivOpen
  }else{
    this.searchDivOpen = !this.searchDivOpen
  }
}
filterDiv(){// hide and show for search section
  if(this.searchDivOpen === true){
    this.searchDivOpen = !this.searchDivOpen
    this.filterDivOpen = !this.filterDivOpen
  }else{
    this.filterDivOpen = !this.filterDivOpen
  }
}
}

