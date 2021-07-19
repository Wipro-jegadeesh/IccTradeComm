import { Component, OnInit, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
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
  displayedColumns: Array<string> = ['financierId', 'financierName', 'regNumber', 'action'];
  displayedSMEColumns: Array<string> = ['smeprofileID', 'registrationNumber', 'companyId', 'action'];
  dataSource;
  dataSMESource;
  @ViewChild("accountList", { read: ElementRef })
  public accountList: ElementRef<any>;
  fundingRequestObj;
  OfferAcceptanceObj;

  @HostListener("window:resize", [])
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
  constructor(public router: Router, private iccDashboardServices: IccDashboardServices) { }
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getDashboardDetailsDetails()
    this.getInvoiceMasterCount();
    this.getAllfinTdyCount();
    this.getFinanceMasterCount();
    this.dataSource = new MatTableDataSource([{ profileId: "4", financierType: "Praj", regNumber: "TT$%$%" }]);
    this.getFinancierDetails()
    this.getSMEDetails();
  }
  /** To get the top financier list **/
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
  /** To get the top sme list **/
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
  /** To get SGD of funding request and offer acceptance **/
  getDashboardDetailsDetails() {
    this.iccDashboardServices.getFundingRequestTileList().subscribe(resp => {
      this.fundingRequestObj = resp
    })
    this.iccDashboardServices.getOfferAcceptanceTileList().subscribe(resp => {
      this.OfferAcceptanceObj = resp
    })
  }
  /** To scroll the tiles right under the responsiveness **/
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
  /** To scroll the tiles left under the responsiveness **/
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
  /** To navigate to respective page based on tiles click events **/
  navigatePages(path) {
    this.router.navigateByUrl(path);
  }
  /** To navigate to respective page based on tiles click events **/
  navigateToSmeList(path) {
    this.router.navigateByUrl(path);
  }
  /** To navigate to respective individual financier page based on click events on edit or view icon **/
  editFinancier(id, type) {
    if (type == 'edit') {
      this.router.navigateByUrl('/financier-onboarding/edit/' + id)
    }
    else {
      this.router.navigateByUrl('/financier-onboarding/view/' + id)
    }
  }
  /** To navigate to respective page based on card click events **/
  financierOnBoardingList() {
    this.router.navigateByUrl('/financier-onboarding-list')
  }
  /** To navigate to respective page based on tiles click events **/
  navigatefinancedToday() {
    this.router.navigateByUrl('/icc-finance-today');
  }
  /** To navigate to respective page based on tiles click events **/
  navigatefinancedMaster() {
    this.router.navigateByUrl('/icc-finance-master');
  }
  /** To navigate to respective page based on tiles click events **/
  navigateinvoiceMaster() {
    this.router.navigateByUrl('/icc-invoice-master');
  }
  /** To navigate to respective page based on tiles click events **/
  naviageTiles(path) {
    this.router.navigateByUrl(path)
  }
  /** To get SGD of invoice master **/
  getInvoiceMasterCount() {
    this.iccDashboardServices.getInvoiceMasterCount().subscribe(resp => {
      this.getSumInvoiceMasterCount = resp;
    })
  }
  /** To get SGD of financed today **/
  getAllfinTdyCount() {
    this.iccDashboardServices.getAllfinTdyCount().subscribe(resp => {
      this.getSumAllfinTdyCount = resp;
    })
  }
  /** To get SGD of financed master **/
  getFinanceMasterCount() {
    this.iccDashboardServices.getFinanceMasterCount().subscribe(resp => {
      this.financeMasterCount = resp
    })
  }
  /** To navigate to respective individual sme details page based on click events on edit or view icon **/
  navigateToSmeDetails(path, smeData) {
    let data: NavigationExtras = {
      queryParams: {
        "companyId": smeData.registrationNumber,
        "companyName": smeData.name,
        "country": "SGP"
      }
    }
    this.router.navigate([path], { state: { smeData: data } });
  }
}
