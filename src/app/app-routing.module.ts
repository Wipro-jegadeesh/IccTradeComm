import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component'; 
import { SignupComponent } from './components/signup/signup.component';
import { SmeOnboardingComponent } from './components/sme-onboarding/sme-onboarding.component';
import { SmeDashboardComponent } from './components/sme-dashboard/sme-dashboard.component';
import { FinancierOnboardingComponent } from './components/financier-onboarding/financier-onboarding.component';
import { FinancierOnboardingListComponent } from './components/financier-onboarding/financier-onboarding-list/financier-onboarding-list.component';
import { FinancierDashboardComponent } from './components/financier-dashboard/financier-dashboard.component';
import { SmeBiddingComponent } from './components/sme-bidding/sme-bidding.component';
import { Repayment_todayComponent } from './components/sme-repayment-today/sme-repayment-today.component';
import { SmeBiddingDetailsComponent } from './components/sme-bidding/sme-bidding-details/sme-bidding-details.component';
import { InvoiceRequestComponent } from './components/invoice-request/invoice-request.component';
import { FinanceBiddingComponent } from './components/finance-bidding/finance-bidding.component';
import {FinanceBiddingExpiredComponent} from './components/finance-bidding-expired/finance-bidding-expired.component'
import { InvoiceDetailsComponent } from './components/finance-bidding/invoice-details/invoice-details.component';
import { IccDashboardComponent} from './components/icc-dashboard/icc-dashboard.component';
import {SmeFinanceforBiddingComponent} from './components/sme-financefor-bidding/sme-financefor-bidding.component'
import {AcceptedFinanceComponent} from './components/accepted-finance/accepted-finance.component'
import {FinanceBiddingAcceptsComponent} from './components/finance-bids-accept/finance-bids-accept.component'
import { FinanceBiddingAcceptsDetailsComponent } from './components/finance-bids-accept/finance-bids-accept-details/finance-bids-accept-details.component';
import {InvoiceDetailsExpiredComponent} from './components/finance-bidding-expired/invoice-details-expired/invoice-details-expired.component'
import {FinanceBiddingRejectedComponent} from './components/finance-bidding-rejected/finance-bidding-rejected.component'
import {InvoiceDetailsRejectedComponent} from './components/finance-bidding-rejected/invoice-details-rejected/invoice-details-rejected.component'
import {ICCacceptancedetailsComponent} from './components/icc-offer-acceptance/icc-acceptance-details/icc-acceptance-details.component'
import {IccFundingRequestComponent} from './components/icc-funding-request/icc-funding-request.component'
import {IccOfferAcceptanceComponent}  from './components/icc-offer-acceptance/icc-offer-acceptance.component'
import {IccFinanceMasterComponent} from './components/icc-finance-master/icc-finance-master.component';
import {IccInvoiceMasterComponent} from './components/icc-invoice-master/icc-invoice-master.component';
import {IccFinanceTodayComponent} from './components/icc-finance-today/icc-finance-today.component';
import {FinancierFundedComponent} from './components/financier-funded/financier-funded.component'
import {IccUserCreationComponent} from './components/icc-user-creation/icc-user-creation.component'
import {IccUserDetailsComponent} from './components/icc-user-creation/icc-user-details/icc-user-details.component'
import {IccGroupsComponent} from './components/icc-groups/icc-groups.component'
import {IccRolesComponent} from './components/icc-roles/icc-roles.component'
import {IccSectorComponent} from './components/icc-sector/icc-sector.component'
import {IccAuthorizMatrixComponent} from './components/icc-authoriz-matrix/icc-authoriz-matrix.component'
import {SignUpDetailsComponent} from './components/signup/sign-up-details/sign-up-details.component'
import {QuestionaireScoreComponent} from './components/questionaire-score/questionaire-score.component'
import { InvoiceBulkUploadComponent } from './components/invoice-bulk-upload/invoice-bulk-upload.component';
import { FinancierLimitMaintanaceComponent } from './components/financier-limit-maintanace/financier-limit-maintanace.component';
import { FinananceLimitMaintananceComponent } from './components/finanance-limit-maintanance/finanance-limit-maintanance.component';
import {IccCountryComponent} from './components/icc-country/icc-country.component'

import { SmeUserCreationComponent } from './components/sme-user-creation/sme-user-creation.component';
import { SmeUserDetailsComponent } from './components/sme-user-creation/sme-user-details/sme-user-details.component';
import { IccListSmesComponent } from './components/icc-list-smes/icc-list-smes.component';
import { IccSmeDetailsComponent } from './components/icc-sme-details/icc-sme-details.component';
import {FinancierUserCreationComponent} from './components/financier-onboarding/financier-user-creation/financier-user-creation.component'
import {FinancierUserDetailsComponent} from './components/financier-onboarding/financier-user-creation/financier-user-details/financier-user-details.component'
import { ViewProfileComponent } from './components/view-profile/view-profile.component'
import { StaticPageComponent } from './components/static-page/static-page.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'view-profile/:type', component: ViewProfileComponent },
  { path: 'signup-details', component: SignUpDetailsComponent },

  { path: 'sme-onboarding', component: SmeOnboardingComponent,  data : {"HeaderName" : "Sme Questionnaire", "headerPaths" : [{ path : "/login",pathName : "Login"}] } },
  { path: 'sme-dashboard', component: SmeDashboardComponent,  data : {"HeaderName" : "Seller Dashboard"} },
  { path: 'sme-bidding', component: SmeBiddingComponent ,  data : {"HeaderName" : "SME Bidding ", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}] }},
  { path: 'sme-bidding/:id', component: SmeBiddingDetailsComponent ,  data : {"HeaderName" : "SME Bidding", "headerPaths" : [{ path : "/sme-bidding",pathName : "SME Bidding Details"},{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  { path: 'sme-finance-for-bidding', component: SmeFinanceforBiddingComponent , data : {"HeaderName" : "Finance For Bidding", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  { path: 'accepted-finance', component: AcceptedFinanceComponent , data : {"HeaderName" : "Accepted Finance", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  { path: 'invoice-request', component: InvoiceRequestComponent , data : {"HeaderName" : "New Funding Request", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  { path: 'repayment_today', component: Repayment_todayComponent , data : {"HeaderName" : "Repayment Today", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  { path: 'repayment_overdue', component: Repayment_todayComponent , data : {"HeaderName" : "Repayment Over Due", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},
  
  { path: 'financier-onboarding', component: FinancierOnboardingComponent ,  data : {"HeaderName" : "Financier Onboarding","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'financier-onboarding-list', component: FinancierOnboardingListComponent ,  data : {"HeaderName" : "Financier Onboarding","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'financier-onboarding/:edit/:id', component: FinancierOnboardingComponent ,  data : {"HeaderName" : "Financier Onboarding","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'financier-onboarding/:view/:id', component: FinancierOnboardingComponent ,  data : {"HeaderName" : "Financier Onboarding","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},

  { path: 'financier-dashboard', component: FinancierDashboardComponent ,  data : {"HeaderName" : "Financier Dashboard"}},
  { path: 'financier-bids-accept', component: FinanceBiddingAcceptsComponent ,  data : {"HeaderName" : "Bids to be Accepted","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'financier-bids-accept-Details/:type/:id', component: FinanceBiddingAcceptsDetailsComponent ,  data : {"HeaderName" : "Accepted Details","headerPaths" : [{ path : "/financier-bids-accept",pathName : "Bids to be Accepted"},{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'finance-bidding', component: FinanceBiddingComponent, data : {"HeaderName" : "Financier Bidding","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },
  { path: 'finance-bidding/:id', component: InvoiceDetailsComponent , data : {"HeaderName" : "Invoice Details","headerPaths" : [{ path : "/finance-bidding",pathName : "Financier Bidding"},{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'invoice-request', component: InvoiceRequestComponent , data : {"HeaderName" : "New Funding Request","homePath" : "/financier-dashboard","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'finance-bidding-expired', component: FinanceBiddingExpiredComponent, data : {"HeaderName" : "Financier Offer Expired","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },
  { path: 'finance-bidding-expired-details/:type/:id', component: InvoiceDetailsExpiredComponent , data : {"HeaderName" : "Invoice Details", "headerPaths" : [{ path : "/finance-bidding-expired",pathName : "Financier Offer Expired"},{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'finance-bidding-rejected', component: FinanceBiddingRejectedComponent, data : {"HeaderName" : "Financier Offer Rejected","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },
  { path: 'finance-bidding-rejected/:type/:id', component: InvoiceDetailsRejectedComponent , data : {"HeaderName" : "Invoice Details","headerPaths" : [{ path : "/finance-bidding-rejected",pathName : "Financier Offer Rejected"},{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]}},
  { path: 'finance-funded', component: FinancierFundedComponent, data : {"HeaderName" : "Financier Funded","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },
  { path: 'limit-maintanance', component: FinancierLimitMaintanaceComponent, data : {"HeaderName" : "Financier Limit Maintance Component","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },
  { path: 'finanance-limit-maintanance', component: FinananceLimitMaintananceComponent, data : {"HeaderName" : "Financier Limit Maintance Component","headerPaths" : [{ path : "/financier-dashboard",pathName : "Financier Dashboard"}]} },

  

  { path: 'icc-dashboard', component: IccDashboardComponent , data : {"HeaderName" : "ICC TradeComm Administrator Dashboard"}},
  { path: 'icc-finance-today', component: IccFinanceTodayComponent , data : {"HeaderName" : "Finance-Today","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-finance-master', component: IccFinanceMasterComponent , data : {"HeaderName" : "Finance-Master","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-invoice-master', component: IccInvoiceMasterComponent , data : {"HeaderName" : "Invoice-Master","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  // { path: 'icc-dashboard', component: IccDashboardComponent , data : {"HeaderName" : ",
  { path: 'icc-funding-request', component: IccFundingRequestComponent , data : {"HeaderName" : "ICC Open Funding" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},  
  { path: 'icc-offer-acceptance', component: IccOfferAcceptanceComponent , data : {"HeaderName" : "ICC Offer Acceptance" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-offer-acceptance-details/:type/:id', component: ICCacceptancedetailsComponent , data : {"HeaderName" : "ICC Offer Acceptance Details" ,"headerPaths" : [{ path : "/icc-offer-acceptance",pathName : "ICC Offer Acceptance"},{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-user-creation', component: IccUserCreationComponent , data : {"HeaderName" : "User-List","headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-user-details/:id/:type', component: IccUserDetailsComponent , data : {"HeaderName" : "User Details" ,"headerPaths" : [{ path : "/icc-user-creation",pathName : "User List"},{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-group', component: IccGroupsComponent , data : {"HeaderName" : "Group" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-roles', component: IccRolesComponent , data : {"HeaderName" : "Roles" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-authorize', component: IccAuthorizMatrixComponent , data : {"HeaderName" : "Authorization Matrix" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-list-smes', component: IccListSmesComponent , data : {"HeaderName" : "Icc List Smes" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-sme-details/:id', component: IccSmeDetailsComponent , data : {"HeaderName" : "Icc Sme Details" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-sector', component: IccSectorComponent , data : {"HeaderName" : "Sector" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'icc-country', component: IccCountryComponent , data : {"HeaderName" : "Country" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},

  
  // { path: 'questionaire-scorePage', component: QuestionaireScoreComponent , data : {"HeaderName" : "Authorization Matrix" ,"headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  { path: 'score-received', component: QuestionaireScoreComponent,  data : {"HeaderName" : "Score Received ", "headerPaths" : [{ path : "/login",pathName : "Login"}] } },

  { path: 'invoice-request/bulk', component: InvoiceBulkUploadComponent , data : {"HeaderName" : "New Funding Request", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},

  { path: 'sme-user-creation', component: SmeUserCreationComponent , data : {"HeaderName" : "Sme User Creation", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},

  { path: 'sme-user-details/:id', component: SmeUserDetailsComponent , data : {"HeaderName" : "Sme User Creation", "headerPaths" : [{ path : "/sme-dashboard",pathName : "Seller Dashboard"}]}},


  { path: 'financier-user-creation/:finDetailId/:nationalId', component: FinancierUserCreationComponent , data : {"HeaderName" : "Financier User Creation", "headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},

  { path: 'financier-user-details/:finDetailId/:nationalId/', component: FinancierUserDetailsComponent , data : {"HeaderName" : "Financier User Creation", "headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},

  { path: 'financier-user-details/:finDetailId/:nationalId/:id', component: FinancierUserDetailsComponent , data : {"HeaderName" : "Financier User Creation", "headerPaths" : [{ path : "/icc-dashboard",pathName : "ICC TradeComm Administrator Dashboard"}]}},
  // questionaire-scorePage
  { path: 'notActivated', component: StaticPageComponent , data : {"HeaderName" : "notActivated"}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
