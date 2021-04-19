import _ from 'lodash';
// import {Enums} from '../../utils/enums';

export const Validation = {
required: (value, form, component) => {
if (value === undefined || value === null || (_.isString(value) && value.trim() === '')) {
return "required";
} else if (value instanceof Array && value.length === 0) {
return "required";
}
},
email:(value, form, component) => {
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(!emailRegex.test(value)){
return "invalidEmial"
}
},
dateValidate:(value, form, component) => {
var dateReg = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
if (dateReg.test(value)) {
let date = value.split('/');
if (date[0] === "00" || date[0] > 12) {
return "invalidMonth"
}
if (date[1] === "00" || new Date(date[2], date[0], 0).getDate() < date[1]) {
return 'invalidDate'
}
if (date[2] === "0000" || date[2] < 1900) {
return 'invalidYear'
}
} else {
return "invalidDate"
}
},
onlyAlphabet : (value, form, component) => {
var charReg = /^[a-zA-ZÀ-úÀ-ÿ-,]+(\s{0,1}[a-zA-Z-\-\s'_.À-úÀ-ÿ])*$/; // /^[a-zA-Z, ]+$/;
if(value && !charReg.test(value)){
return "onlyAlphabet"
}
},
telephone:(value, form, component) => {
var numberReg = /^[0-9]{3} [0-9]{4} [0-9]{4}$/;
if(value && !numberReg.test(value)){
let length = component.props.mask.split(" ").length - 1
return 'mobileNumberLengthValidate' + (component.props.mask.length - length) + 'digit'
}
},
mobile:(value, form, component) => {
var numberReg = /^[0-9]{2} [0-9]{4} [0-9]{4}$/;
if(value && !numberReg.test(value)){
let length = component.props.mask.split(" ").length - 1
return "mobileNumberLengthValidate"
}
},
passwordCombination:(value, form, component) => {
var passwordReg = /^.*(?=.{8,256})(?=.*\d)(?=.*[a-zA-Z]).*$/;
if(value && !passwordReg.test(value)){
return "newPasswordError"
}
},
confirmPass:(value, form, component) => {
var pass = form.refs.password.refsObj.value;
if(!_.isEqual(value,pass)){
return "confirmPasswordValid"
}
},


// confirmPass:(value, form, component) => {
// var pass = form.refs.password.refsObj.value;
// if(!_.isEqual(value,pass)){
// return "confirmPasswordValid"
// }
// },

enableSpouse: (value, form, component) => {
if(value === "1"){
component.props.enableSpouseInfo();
} else {
delete form.state.Errors['spouseName'];
delete form.state.Errors['spouseOccupation'];
form.state.FormData["spouseName"] = "";
form.state.FormData["spouseOccupation"] = "";
component.props.disabledSpouseInfo();
}
},
spouseValidate: (value, form, component) => {
if (form.state.FormData["maritalStatus"] === "0") {
delete form.state.Errors['spouseName'];
delete form.state.Errors['spouseOccupation'];
}else {
let charReg = /^[a-zA-ZÀ-úÀ-ÿ-,]+(\s{0,1}[a-zA-Z-\-\s'_.À-úÀ-ÿ])*$/
if (value === undefined || value === '') {
return 'required'
}
}
},
onlyPositive:(value, form, component) => {
if(parseInt(value) < 0){
return "onlyPositive"
}
},
onlyNumber:(value, form, component) => {
var numberReg = new RegExp('^[0-9]+$');
if(!numberReg.test(value)){
return "onlyNumer"
}
},
onlyLetterNumber: (value, form, component) => {
var alphaNumericReg = /^[0-9a-zA-Z]+$/;
if (!alphaNumericReg.test(value)) {
return "onlyAlphaNumeric";
}
},

curpNumberLengthValidate: (value, form, component) => {
if(value.length < 18 || value.length >= 19){
return 'curpLengthValidate';
}
},

rfcNumberLengthValidate: (value, form, component) => {
if(value.length < 10 || value.length >= 11){
return 'rfcLengthValidate';
}
},

officialIdLengthValidate: (value, form, component) => {
if (value.length < 13 || value.length >= 14) {
return 'officialIdLengthValidate';
}
},


percentageValidate: (value, form, component) => {
if (parseFloat(value) > 101) {
return "invalidPercentage";
}
},

fieldLengthValidate : (value, form, component) => {
if(component.props.hasOwnProperty("charLength")){
let charLength = parseInt(component.props.charLength);
if(value.length > charLength){
return 'fieldLengthValidate' + ' ' + charLength + ' ' + 'characters';
}
}
},
prePaymentValidate : (value, form, component) => {
if (value === "1") {
component.props.enablePrepaymentInfo();
} else {
delete form.state.Errors['prePaymentDate'];
delete form.state.Errors['prePaymentValue'];
delete form.state.Errors['prePaymentResources'];
form.state.FormData['prePaymentDate'] = "";
form.state.FormData['prePaymentValue'] = "";
form.state.FormData['prePaymentResources'] = "";
component.props.disabledPrepaymentInfo();
}
},
// validateWithPrePayment: (value, form, component) => {
// if (form.state.FormData["prePayment"] === "0") {
// delete form.state.Errors[component.props._ref];
// } else {
// if (value === undefined || value.trim() === "") {
// return 'required';
// } else {
// if (component.props._ref === "prePaymentDate") {
// return validationRules.dateValidate(value, form, component);
// } else if (component.props._ref === "prePaymentValue") {
// return validationRules.onlyNumber(value, form, component);
// } else if (component.props._ref === "prePaymentResources") {
// return validationRules.onlyAlphabet(value, form, component);
// }
// }
// }
// },
validateOwnerResource: (value, form, component) => {
if(value === "0"){
component.props.enableOwnerInfo();
} else {
delete form.state.Errors['ownerName'];
delete form.state.Errors['ownerFTPNumber'];
delete form.state.Errors['ownerAddress'];
form.state.FormData['ownerName'] = "";
form.state.FormData['ownerFTPNumber'] = "";
form.state.FormData['ownerAddress'] = "";
component.props.disbledOwnerInfo();
}
},
validateWithOwnerResource : (value, form, component) => {
if(form.state.FormData["ownerResource"] === "0"){
if(value === undefined || value.trim() === ""){
return 'required';
}
} else {
delete form.state.Errors[component.props._ref];
}
},
validateCustomRegx: (obj, value, form, component) => {
if (obj.hasOwnProperty("regex")) {
let regex = new RegExp(obj.regex);
if (regex.test(value) === false) {
return obj.msg
}
}
},
validationPasswordRegx:(value) => {
if(value){
let passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
if(passReg.test(value)){
return true;
}else{
return false;
}
}
},
dateFormatValidation(value){
// var dateReg = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
// debugger;
// if (dateReg.test(value)) {
// let date = value.split('-');
// if (date[0] === "00" || date[0] > 12) {
// return "invalidMonth"
// }
// if (date[1] === "00" || new Date(date[2], date[0], 0).getDate() < date[1]) {
// return 'invalidDate'
// }
// if (date[2] === "0000" || date[2] < 1900) {
// return 'invalidYear'
// }
// return true
// } else {
// return false
// }
// }
return "Validators.pattern('/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/')"
}
}

// export default validationRules;