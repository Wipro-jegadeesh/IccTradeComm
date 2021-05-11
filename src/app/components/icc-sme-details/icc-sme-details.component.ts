
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


export interface FinancierDatas {
  financierId: string;
  financierName: string;
  regNumber: number;
  action: string;
}
let FINANACIERLIST: FinancierDatas[] = [
  // {financierId: 1, financierName: 'Jack', regNumber: 1.0079, action: 'edit'},
]
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
  displayedColumns: string[] = ['scoreName', 'score', 'information'];
  displayedColumns1: string[] = ['userId','firstName', 'lastName', 'companyName', 'emailId', 'phoneNumber', 'action'];

  dataSource = [];
  // dataSource1 = [];
  @ViewChild("accountList", { read: ElementRef })
  public accountList: ElementRef<any>;
  fundingRequestObj;
  OfferAcceptanceObj;

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
  questionnaireSections;
  sectionIndex;
  questions;
  radioChecked;
  groupsForm: FormGroup;
  userForm: FormGroup;
  smeData;
  biddingTooltip = BIDDINGCONSTANTS;

  constructor(private toastr: ToastrService,private iccListSmeServices: IccListSmeServices,private fb: FormBuilder,public router: Router,private authenticationService: AuthenticationService,private iccDashboardServices: IccDashboardServices ,private apiService:ApiService,public IccUserCreationService:IccUserCreationService) { 
    const smeData= this.router.getCurrentNavigation().extras.state;
    this.smeData = smeData
    this.invoiceFormBuild()

//  console.log(this.smeData.smeData.queryParams,"smeDatasmeData");
  }

  ngOnInit() {
    // this.smeData = this.router.getCurrentNavigation().extras.state;
    // console.log(this.smeData,"smeDatasmeData");
   
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource=[]
    //  this.dataSource1=[]
    this.sectionIndex=0;
    this.dataSource1 = new MatTableDataSource([{'userId':1,
    'firstName':"11",
    'lastName':"980",
    'companyName':"lkjlk",
    'email':"jklk",
    'contactNo':"ipoip",
    'status':'A'
    },{'userId':1,
    'firstName':"11",
    'lastName':"980",
    'companyName':"lkjlk",
    'email':"jklk",
    'contactNo':"ipoip",
    'status':'R'
    }])
    this.dataSource2 = new MatTableDataSource([{
      // scoreName : 'Business Planning',
      // score: "586",
      // information: "Lot of Questions Not Answered",
    }])
    this.getQuestionnaireSection()
    this.getscore();
    this.getIccRelaterUsers();
    this.groupsFormBuild()
    this.iccListSmeServices.getUserSMEDetails(this.smeData.smeData.queryParams.companyId).subscribe(resp => {
      console.log(resp)
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
    state:resp[0].state
      });

    })
  }
  groupsFormBuild() {
    this.groupsForm = this.fb.group({
      state: ['', Validators.required], 
      score: ['', Validators.required],
      // groupDescription: ['', Validators.required]
    });

  }
  invoiceFormBuild() {
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
      state:['']
    });
  
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }
  onSubmitInvoiceForm() {
    try {
      if (this.userForm.status === "INVALID"){
        throw { "mes": "Please fill mendatory  fields" }
      }
      let obj = {
        status: this.userForm.value.status
      }
      this.iccListSmeServices.statusChange(this.smeData.smeData.queryParams.companyId,obj).subscribe(resp => {
        // this.invoiceFormBuild();
        this.toastr.success('Update Sucessfully')
                  }, error => {
                  })
                
     
    } catch (err) {
    }
  }
 
  public scrollRight(): void {
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: "smooth",
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: "smooth",
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue == "inActive" ? "active" : "inActive";
  }
    navigatePages(path){
      this.router.navigateByUrl(path);
    }
      getQuestionnaireSection(){
        let data=JSON.parse(localStorage.getItem('userCred'))
      this.apiService.generalServiceget(environment.coriolisServicePath +'/getallquestionaire/'+this.smeData.smeData.queryParams.companyId + '/' + this.smeData.smeData.queryParams.companyName + '/' + this.smeData.smeData.queryParams.country).subscribe(resp=>{
        // this.apiService.generalServiceget(environment.coriolisServicePath + 'getallquestionaire/' + data.companyId + '/' + data.companyName + '/' + data.country).subscribe(resp=>{
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
              // switch(quesItem&&quesItem.alias){
              //     case 'name':
              //       quesItem.response=data.name
              //       break;
              //     case 'address-line-1':
              //         quesItem.response=data.address
              //         break;
              //     case 'telephone-mobile':
              //       quesItem.response=data.mobile
              //       break;
              //     case 'email':
              //       quesItem.response=data.email
              //       break;
              //     case 'city':
              //       quesItem.response=data.city
              //       break;
              //   default:
              //       quesItem.response=''
              // }
            //   quesItem.response=''
              quesItem.itHasValue=quesItem.required && !quesItem.response ? false :
               !quesItem.required && quesItem.response ? true : quesItem.required && quesItem.response ? true : false
            //    quesItem.itHasValue=quesItem.required ? false : true
                    }
           quesItem.sectionType = secIndex == 0 && quesIndex < 10 ? 'personal' : 'other'
        })
        secItem.itHasValue=false
    
        //PARTIAL RESPONSE
        if(secItem.sectionResponseState == "Partial"){
              secItem.questions.map((secResp,index)=>{
                secItem.sectionResponse.responses.map((item)=>{
                    if(item.questionAlias == secResp.alias){
                        if(item.optionAliases){
                            secResp.response=item.optionAliases
                        }
                        else{
                        secResp.response=item.value
                        }
                        secResp.itHasValue=true
                    }
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
        secItem && secItem.subSections.map((subSecItem,subSecIndex)=>{
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
      console.log(this.questionnaireSections)
            }
        })
    }
    getscore(){
      this.apiService.generalServiceget( environment.coriolisServicePath + '/fetchScoreByCompany/'+this.smeData.smeData.queryParams.companyId + '/' + this.smeData.smeData.queryParams.companyName + '/' + this.smeData.smeData.queryParams.country).subscribe(listResp=>{
        if(listResp){
          this.dataSource2 = new MatTableDataSource(listResp.scores);
           this.groupsForm.patchValue({  
            state : listResp.state,
            score : listResp.score
          })
        }

      })
    }
    getIccRelaterUsers(){
      let regNo = this.smeData.smeData.queryParams.companyId
      console.log("regNo",regNo);
      this.IccUserCreationService.getIccRelaterUsers(regNo).subscribe(resp => {
        this.dataSource1 = new MatTableDataSource(resp);
        this.dataSource1.paginator = this.paginator
      })    
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
      
  onTextBoxChange(data,secIndex,quesIndex){
    if(data.questionDatas.isSubSection){
        let subIndex=data.questionDatas.subSecIndex
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex]['response']=data.value
      this.questionnaireSections[secIndex].subSections[subIndex].questions[quesIndex].itHasValue=data.value ? true : false
      this.questionnaireSections[secIndex].subSections[subIndex].itHasValue=this.checkFormComp(secIndex,'subSec',subIndex)
    }
    else{
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
  this.questionnaireSections[secIndex].itHasValue=this.checkFormComp(secIndex,'mainSec',null)
  }
}
onDropdownChange(data,secIndex,quesIndex){
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
  console.log(this.questionnaireSections)
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
  let subIndex=data.questionDatas.subSecIndex
  
  this.radioChecked={
    isTrue:data.condition,
    secIndex:data.secIndex,
    quesIndex:data.quesIndex
   }
   if(data.questionDatas.isSubSection){
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
onFileChange(data,secIndex,quesIndex){
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
  console.log(this.questionnaireSections)
}
onDateChange(data,secIndex,quesIndex){
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
onSubSection(index,subIndex){
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
onSubmit(){
  this.router.navigateByUrl('/sme-dashboard')
}
onSave() {
  let onboardingResp=[]
  this.questionnaireSections.map((item)=>{
  let compSecObj={
      "sectionAlias":item.alias,
      "companyId":localStorage.getItem('uuid'),
  }
  let subSectionResponseDto=[]
  if(item.subSections && item.subSections.length){
      item.subSections.map((subItem)=>{
          subSectionResponseDto.push(this.buildSubSecResp(subItem))
      })
  }

      let questionResponses=[]
      item.questions.map((quesItem)=>{
          if(quesItem.response){
          switch(quesItem.type){
              case 'QuestionBoolDto':
                  questionResponses.push(this.boolRespBuild(quesItem))
                  break;
              case 'QuestionTextDto':
                  questionResponses.push(this.textRespBuild(quesItem))
                  break;
              case 'QuestionFileListDto':
                  questionResponses.push(this.filesRespBuild(quesItem))
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
  this.apiService.post(environment.coriolisServicePath + 'submitquestionaire',obj).subscribe(resp=>{
      if(resp){
          // alert('Questionnaire Section Submitted Successfully')
          // this.toastr.success('Questionnaire Section Submitted Successfully')
      }
  })
  console.log(onboardingResp)
}
buildSubSecResp(Data){
  let obj={
      'subSectionAlias':Data.alias,
  }
  let questionResponses=[]
  Data.questions.map((quesItem)=>{
      if(quesItem.response){
      switch(quesItem.type){
          case 'QuestionBoolDto':
              questionResponses.push(this.boolRespBuild(quesItem))
              break;
          case 'QuestionTextDto':
              questionResponses.push(this.textRespBuild(quesItem))
              break;
          case 'QuestionFileListDto':
              questionResponses.push(this.filesRespBuild(quesItem))
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
  let fileName=[]
  let data=[]
 Data.response && Data.response.map((item)=>{
      fileName.push(item.name)
      data.push(item.base64data)
  })
  let obj={
      "type":'QuestionResponseFileDto',
      "questionAlias":Data.alias,
      "fileName":fileName,
      "data":data,
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
navigateFinanceDetails(id) {
  this.router.navigateByUrl('/icc-user-details/'+id);
}
}

