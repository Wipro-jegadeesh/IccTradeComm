import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SkeletonTextModule } from '@ffdc/uxg-angular-components/skeleton-text';
import { ToastrModule } from 'ngx-toastr';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AccountCardModule } from '@ffdc/uxg-angular-components/cards/account-card';
import { UxgTableModule } from '@ffdc/uxg-angular-components/table';
import { InlineSVGModule } from 'ng-inline-svg';
import { ChartsModule } from 'ng2-charts';
import {MatChipsModule} from '@angular/material/chips';
import {ModalDialogService} from './service/modal-dialog.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {DatePipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import { LoaderService } from './service/loader.service';
import {MatSelectModule} from '@angular/material/select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSortModule } from '@angular/material/sort';

import {ApiService} from './service/api.service';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SmeOnboardingComponent } from './components/sme-onboarding/sme-onboarding.component';
import { FinancierOnboardingComponent } from './components/financier-onboarding/financier-onboarding.component';
import { FinancierOnboardingListComponent } from './components/financier-onboarding/financier-onboarding-list/financier-onboarding-list.component';
import { CustomerService } from './service/customer/customer.service';
import { FinancierDashboardComponent } from './components/financier-dashboard/financier-dashboard.component';
import { SmeDashboardComponent } from './components/sme-dashboard/sme-dashboard.component';
import { SmeBiddingComponent } from './components/sme-bidding/sme-bidding.component';
import { SmeBiddingDetailsComponent } from './components/sme-bidding/sme-bidding-details/sme-bidding-details.component';
import {InvoiceRequestServices} from '../app/components/invoice-request/invoice-service';
import {FinanceRequestServices} from '../app/components/finance-bidding/finance-service';
import { ModalComponent } from './shared/modals';
import { InvoiceRequestComponent } from './components/invoice-request/invoice-request.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { IccDashboardComponent } from './components/icc-dashboard/icc-dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FinancierService } from './service/financier/financier.service';
import { FinanceBiddingService } from './service/finance_bidding/finance-bidding.service';
import { SmeFinanceforBiddingComponent } from './components/sme-financefor-bidding/sme-financefor-bidding.component';
import { SmeFinancierForBiddingServices } from './components/sme-financefor-bidding/sme-financefor-bidding-service';
import { SmeDashboardServices } from './components/sme-dashboard/sme-dashboard-service';
import { FinancierDashboardServices } from './components/financier-dashboard/financier-dashboard-services';
import { IccDashboardServices } from './components/icc-dashboard/icc-dashboard-services';
import { AcceptedFinanceComponent } from './components/accepted-finance/accepted-finance.component';
import {AcceptedFinanceServices} from './components/accepted-finance/accepted-finance-service'
import { SmeBiddingServices } from './components/sme-bidding/sme-bidding-services';
import { FinancierOnboardingService } from './components/financier-onboarding/financier-onboarding.service';
import { FinanceBiddingAcceptsComponent } from './components/finance-bids-accept/finance-bids-accept.component';
import { FinancebidsRequestServices } from './components/finance-bids-accept/finance-bids-accept';
import { FinanceBiddingAcceptsDetailsComponent } from './components/finance-bids-accept/finance-bids-accept-details/finance-bids-accept-details.component';
import { Repayment_todayServices } from './components/sme-repayment-today/sme-repayment-today-service';
import { Repayment_todayComponent } from './components/sme-repayment-today/sme-repayment-today.component';

import { Repayment_overdueServices } from './components/sme-repayment-overdue/sme-repayment-overdue-service';
import { Repayment_overdueComponent } from './components/sme-repayment-overdue/sme-repayment-overdue.component';
import { FinanceBiddingComponent } from './components/finance-bidding/finance-bidding.component';
import { InvoiceDetailsComponent } from './components/finance-bidding/invoice-details/invoice-details.component';
import { FinanceBiddingExpiredComponent } from './components/finance-bidding-expired/finance-bidding-expired.component';
import { InvoiceDetailsExpiredComponent } from './components/finance-bidding-expired/invoice-details-expired/invoice-details-expired.component';
import {FinanceBiddingExpiryServices} from './components/finance-bidding-expired/finance-bidding-expiry-service';
import { FinanceBiddingRejectedComponent } from './components/finance-bidding-rejected/finance-bidding-rejected.component';
import { ICCacceptancedetailsComponent } from './components/icc-offer-acceptance/icc-acceptance-details/icc-acceptance-details.component';
import { InvoiceDetailsRejectedComponent } from './components/finance-bidding-rejected/invoice-details-rejected/invoice-details-rejected.component'
import {FinanceBiddingRejectedServices} from './components/finance-bidding-rejected/finance-bidding-rejected-service'
import {IccFundingServices} from './components/icc-funding-request/icc-funding-service'
import {IccOfferAcceptServices} from './components/icc-offer-acceptance/icc-offer-accept-service'

// import { DynamicFormService } from './shared/constants/dynamicForm';
import { TextboxComponent } from './shared/textBox/textBox.component';
import { MultiSelectDropdown } from './shared/multiSelectDropdown/multiSelectDropdown.component';
import { RadioButtonComponent } from './shared/radioButton/radioButton.component';
import { DateFieldComponent } from './shared/dateField/dateField.component';
import { FileUploadComponent } from './shared/fileUpload/fileUpload.component';
import { IccFinanceTodayComponent } from './components/icc-finance-today/icc-finance-today.component';
import { IccFinanceTodayServices } from './components/icc-finance-today/icc-finance-today-service';
import { IccFinanceMasterComponent } from './components/icc-finance-master/icc-finance-master.component';
import { IccFinanceMasterServices } from './components/icc-finance-master/icc-finance-master-service';
import { IccInvoiceMasterComponent } from './components/icc-invoice-master/icc-invoice-master.component';
import { IccInvoiceMasterServices } from './components/icc-invoice-master/icc-invoice-master-service';
import { IccFundingRequestComponent } from './components/icc-funding-request/icc-funding-request.component';
import { IccOfferAcceptanceComponent } from './components/icc-offer-acceptance/icc-offer-acceptance.component';

import {FinancierFundedServices} from './components/financier-funded/financier-funded-service'

import { TextAreaComponent } from './shared/textArea/textArea.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { TextListComponent } from './shared/textList/textList.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FinancierFundedComponent } from './components/financier-funded/financier-funded.component';
import { IccUserCreationComponent } from './components/icc-user-creation/icc-user-creation.component';
import { IccUserDetailsComponent } from './components/icc-user-creation/icc-user-details/icc-user-details.component';
import {IccUserCreationService} from './components/icc-user-creation/icc-user-creation.service'


import { SignupService } from './components/signup/signup.service';
import { IccGroupsComponent } from './components/icc-groups/icc-groups.component';
import { IccRolesComponent } from './components/icc-roles/icc-roles.component';
import { IccAuthorizMatrixComponent } from './components/icc-authoriz-matrix/icc-authoriz-matrix.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SmeOnboardingComponent,
    FinancierOnboardingComponent,
    FinancierOnboardingListComponent,
    FinancierDashboardComponent,
    SmeDashboardComponent,
    SmeBiddingComponent,
    SmeBiddingDetailsComponent,
    FinanceBiddingComponent,
    InvoiceDetailsComponent,
    InvoiceRequestComponent,
    IccDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    SmeFinanceforBiddingComponent,
    AcceptedFinanceComponent,
    FinanceBiddingAcceptsComponent,
    FinanceBiddingAcceptsDetailsComponent,
    TextboxComponent,
    MultiSelectDropdown,
    RadioButtonComponent,
    DateFieldComponent,
    FileUploadComponent,
    TextAreaComponent,
    TextListComponent,
    Repayment_todayComponent,
    Repayment_overdueComponent,
    FinanceBiddingExpiredComponent,
    InvoiceDetailsExpiredComponent,
    FinanceBiddingRejectedComponent,
    ICCacceptancedetailsComponent,
    InvoiceDetailsRejectedComponent,
    IccFinanceTodayComponent,
    IccFinanceMasterComponent,
    IccInvoiceMasterComponent,
    IccFundingRequestComponent,
    IccOfferAcceptanceComponent,
    FinancierFundedComponent,
    IccUserCreationComponent,
    IccUserDetailsComponent,
    IccGroupsComponent,
    IccRolesComponent,
    IccAuthorizMatrixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxSliderModule,
    ChartsModule,
    MatTabsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    SkeletonTextModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    // UxgUserProfileMenuModule,
    AccountCardModule,
    UxgTableModule,
    InlineSVGModule.forRoot(),
    MatChipsModule,
    ModalModule.forRoot(),
    MatSlideToggleModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    TextFieldModule,
    MatSliderModule,
    PerfectScrollbarModule,
    MatSelectModule,
    MatSortModule
  ],

  providers: [LoaderService,FinancebidsRequestServices,CustomerService, SmeDashboardComponent, ModalDialogService,ApiService,InvoiceRequestServices,MatRadioModule,
    FinanceRequestServices,FinanceBiddingRejectedServices,FinanceBiddingExpiryServices,DatePipe,FinancierService,FinanceBiddingService,SmeFinancierForBiddingServices,SmeDashboardServices,
    FinancierDashboardServices,IccDashboardServices,AcceptedFinanceServices,SmeBiddingServices,FinancierOnboardingService,IccFinanceTodayServices,IccFinanceMasterServices,IccInvoiceMasterServices,IccFundingServices,IccOfferAcceptServices,
    FinancierFundedServices,Repayment_todayServices,Repayment_overdueServices,SignupService,IccUserCreationService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],

  exports:[ MatInputModule],
  bootstrap: [AppComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [ModalComponent]
})
export class AppModule { }
