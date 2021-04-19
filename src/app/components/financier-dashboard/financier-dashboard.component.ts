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

  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  lineChartLabels = ['2013', '2014', '2014', '2015', '2016', '2017'];

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  barChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  barChartLabels = ['2013', '2014', '2014', '2015', '2016', '2017'];

  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  areaChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = ['2013', '2014', '2014', '2015', '2016', '2017'];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];


  doughnutPieChartData = [
    {
      data: [30, 40, 30],
    }
  ];

  doughnutPieChartLabels = ['Pink', 'Blue', 'Yellow'];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];


  scatterChartData = [
    {
      label: 'First Dataset',
      data: [{
          x: -10,
          y: 0
        },
        {
          x: 0,
          y: 3
        },
        {
          x: -25,
          y: 5
        },
        {
          x: 40,
          y: 5
        }
      ],
      borderWidth: 1
    },
    {
      label: 'Second Dataset',
      data: [{
          x: 10,
          y: 5
        },
        {
          x: 20,
          y: -30
        },
        {
          x: -25,
          y: 15
        },
        {
          x: -10,
          y: 5
        }
      ],
      borderWidth: 1
    }
  ];

  scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  scatterChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'      ]
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];

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

  isOpenHandle(isTrue){
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
    }
    navigateBiddingPage(path){
      this.router.navigateByUrl(path);
    }
    logout(){
      this.authenticationService.logout()
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
      this.getSumofgetFinancierFunded = {
        "INVCCY": "SGD",
        "INVTOTALAMT": 4151.64
    }
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
  backgroundColor: "rgba(204, 51, 0, .3)",
  borderColor: "rgba(204, 51, 0, .7)",
  },
  {
  backgroundColor: "rgba(0, 137, 132, .3)",
  borderColor: "rgba(0, 10, 130, .7)",
  },
  {
  backgroundColor: "rgba(0, 128, 43, .3)",
  borderColor: "rgba(0, 128, 43, .7)",
  }
  ];
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    }
    getChartData(){
      let FRresp;
      this.financierDashboardServices.getChartData().subscribe(resp => {
        let FRresp = resp;
      this.chartData=[
        { data:Object.values(resp) , label: "Actual Funding" },
        // { data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , label: "Actual Funding" },
      ]
    })
    }
}
