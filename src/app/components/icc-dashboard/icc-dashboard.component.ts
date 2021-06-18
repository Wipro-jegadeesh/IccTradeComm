import { Component, OnInit, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router,NavigationExtras } from "@angular/router";
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccDashboardServices } from './icc-dashboard-services'
import { ICCDASHBOARDCONSTANTS } from '../../shared/constants/constants'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-icc-dashboard",
  templateUrl: "./icc-dashboard.component.html",
  styleUrls: ["./icc-dashboard.component.scss"],
})
export class IccDashboardComponent implements OnInit {
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = "active";
  displayedColumns: string[] = ['financierId', 'financierName', 'regNumber', 'action'];
  displayedSMEColumns: string[] = ['smeprofileID','registrationNumber','companyId','action'];
  dataSource;
  dataSMESource;
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
  dashboardTooltip = ICCDASHBOARDCONSTANTS
  getSumInvoiceMasterCount;
  getSumAllfinTdyCount;
  financeMasterCount
  constructor(public router: Router, private authenticationService: AuthenticationService, private iccDashboardServices: IccDashboardServices) { }

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getDashboardDetailsDetails()
    this.getInvoiceMasterCount();
    this.getAllfinTdyCount();
    this.getFinanceMasterCount();
    this.dataSource = new MatTableDataSource([{ profileID: "4", financierType: "Praj", regNumber: "TT$%$%" }]);
    this.getFinancierDetails();
    this.getSMEDetails();
  }
  getFinancierDetails() {
    this.iccDashboardServices.getFinancierList().subscribe(resp => {
      if (resp) {
        let respData = []
        resp.map((item, index) => {
          if (index <= 4) {
            respData.push(item)
          }
        })
        this.dataSource = new MatTableDataSource(respData);
      }
    })
  }
  getSMEDetails() {
    this.iccDashboardServices.getallSmeProfileDetails().subscribe(resp => {
      if (resp) {
        let respData = []
        resp.map((item, index) => {
          if (index <= 4) {
            respData.push(item)
          }
        })
        this.dataSMESource = new MatTableDataSource(respData);
      }
    })
  }
  getDashboardDetailsDetails() {
    this.iccDashboardServices.getFundingRequestTileList().subscribe(resp => {
      this.fundingRequestObj = resp
    })
    this.iccDashboardServices.getOfferAcceptanceTileList().subscribe(resp => {
      this.OfferAcceptanceObj = resp
    })
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
  navigatePages(path) {
    this.router.navigateByUrl(path);
  }
  navigateToSmeList(path) {
    this.router.navigateByUrl(path);
  }
  editFinancier(id, type) {
    if (type == 'edit') {
      this.router.navigateByUrl('/financier-onboarding/edit/' + id)
    }
    else {
      this.router.navigateByUrl('/financier-onboarding/view/' + id)
    }
  }
  financierOnBoardingList() {
    this.router.navigateByUrl('/financier-onboarding-list')
  }
  navigatefinancedToday() {
    this.router.navigateByUrl('/icc-finance-today');
  }
  navigatefinancedMaster() {
    this.router.navigateByUrl('/icc-finance-master');
  }
  navigateinvoiceMaster() {
    this.router.navigateByUrl('/icc-invoice-master');
  }
  naviageTiles(path) {
    this.router.navigateByUrl(path)
  }
  getInvoiceMasterCount() {
    this.iccDashboardServices.getInvoiceMasterCount().subscribe(resp => {
      this.getSumInvoiceMasterCount = resp;
    })
  }
  getAllfinTdyCount() {
    this.iccDashboardServices.getAllfinTdyCount().subscribe(resp => {
      this.getSumAllfinTdyCount = resp;
    })
  }
  getFinanceMasterCount() {
    this.iccDashboardServices.getFinanceMasterCount().subscribe(resp => {
      this.financeMasterCount = resp
    })
  }
  navigateToSmeDetails(path,smeData){
    let data: NavigationExtras = {
      queryParams: {
      "companyId":smeData.registrationNumber, 
      "companyName":smeData.name,
      "country": "SGP"
      }
    }
    this.router.navigate([path], { state: { smeData: data } });
  }
}
