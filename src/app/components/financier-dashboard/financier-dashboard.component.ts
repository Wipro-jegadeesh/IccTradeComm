import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { FinancierDashboardServices } from './financier-dashboard-services';
import { FINANCEDASHBOARDCONSTANTS } from '../../shared/constants/constants'
@Component({
  selector: 'app-financier-dashboard',
  templateUrl: './financier-dashboard.component.html',
  styleUrls: ['./financier-dashboard.component.scss']
})
export class FinancierDashboardComponent implements OnInit {

  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';

  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;

  dashboardTooltip=FINANCEDASHBOARDCONSTANTS;
  getSumofexpeireOffer: any;
  getSumofrejectrOffer: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }

  getSumofgetOpenForOffer;
  getSumofgetbidsToBeAccepted;
  getSumofgetFinancierFunded;
  getFinMaturityData;
  getFinnSizeData
  constructor(public router: Router,public authenticationService: AuthenticationService,public financierDashboardServices: FinancierDashboardServices) { }
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getOpenForOffer();
    this.getbidsToBeAccepted();
    this.getFinancierFunded();
    this.getFinMatData();
    this.getFinSizeData();
    this.getChartData();
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
        behavior: 'smooth',
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
      behavior: 'smooth',
    });
  }

  
    navigateBiddingPage(path){
      this.router.navigateByUrl(path);
    }
    getOpenForOffer(){
      this.financierDashboardServices.getOpenForOffer().subscribe(resp => {
        this.getSumofgetOpenForOffer = resp;
      })
      this.financierDashboardServices.getExpireOffer().subscribe(resp => {
        this.getSumofexpeireOffer = resp;
      })
      this.financierDashboardServices.getRejectOffer().subscribe(resp => {
        this.getSumofrejectrOffer = resp;
      })
    }
    getbidsToBeAccepted(){
      this.financierDashboardServices.getbidsToBeAccepted().subscribe(resp => {
        this.getSumofgetbidsToBeAccepted = resp;
      })
    }
    getFinancierFunded(){
      this.financierDashboardServices.getFinancierFunded().subscribe(resp => {
        this.getSumofgetFinancierFunded = resp;
      })
    }
    getFinMatData(){
      this.financierDashboardServices.getFinMatData().subscribe(resp => {
      this.getFinMaturityData = resp;
    })
    }
    getFinSizeData(){
      this.financierDashboardServices.getFinSizeData().subscribe(resp => {
      this.getFinnSizeData = resp;
    })
    }
    
  //multiple line chart
  chartType = "line";
  chartOptions = {
  responsive: true,
  heigh:400,
  width :700
  };
  chartData = [
  // { data: [350, 600, 260, 700, 650, 416, 400, 300, 556, 500, 600, 580], label: "Funding Requested" },
  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0], label: "Actual Funding" },
  // { data: [120, 200, 700], label: "Repayment" },
  ];
  chartLabels = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  chartColors = [
  {
  backgroundColor: "rgba(193 55 162 1)",
  borderColor: "rgba(124 73 203 1)",
  },
  {
  backgroundColor: "rgba(193 55 162 1)",
  borderColor: "rgba(124 73 203 1)",
  },
  {
  backgroundColor: "rgba(193 55 162 1)",
  borderColor: "rgba(124 73 203 1)",
  }
  ];
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    }
  getChartData(){
      this.financierDashboardServices.getChartData().subscribe(resp => {
      this.chartData=[
        { data:Object.values(resp) , label: "Actual Funding" },
      ]
    })
    }
}
