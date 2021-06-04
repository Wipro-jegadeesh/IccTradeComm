import { Component, OnInit, ElementRef, HostListener, ViewChild,EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SmeDashboardServices } from './sme-dashboard-service';
import { DASHBOARDCONSTANTS } from '../../shared/constants/constants';
import { COMMONCONSTANTS } from '../../shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from "xlsx";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-sme-dashboard',
  templateUrl: './sme-dashboard.component.html',
  styleUrls: ['./sme-dashboard.component.scss']
})
export class SmeDashboardComponent implements OnInit {

  @Output() public found = new EventEmitter<any>();

  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  lineChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

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

  barChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

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

  areaChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

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

  doughnutPieChartLabels = ["Pink", "Blue", "Yellow"];

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
  isOpen = "active"
  tooltipPosition="below"
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;

  dashboardTooltips=DASHBOARDCONSTANTS;
  commonTooltips=COMMONCONSTANTS;
  getSumOfOpenFinBidding;
  getSumofFundingBids;
  getsumOfFunded;
  getFinMaturityData;
  getFinnSizeData;
  getTblChartData
  FileType: any;
  PDFData: any;
  userDetails: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  invoicedata: any;



  constructor(public translate: TranslateService,public router: Router,public authenticationService: AuthenticationService, public smeDashboardServices: SmeDashboardServices ) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userCred')) ? JSON.parse(localStorage.getItem('userCred')) : {status : "D"}
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getFinForBid();
    this.getFundingBids();
    this.getFunded();
    // this.getFinDueTdy();
    // this.getFinPastDue();
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
    this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }
    navigateFinancierBidding(){
      this.router.navigateByUrl('/sme-bidding');
    }
    navigateFinancieForBidding(){
      this.router.navigateByUrl('/sme-finance-for-bidding');
    }
    navigateInvoiceCreation(){
      this.router.navigateByUrl('/invoice-request');
    }
    navigateAcceptedFinance(){
      this.router.navigateByUrl('/accepted-finance');
    }
    navigateAcceptedRepayment(){
      this.router.navigateByUrl('/repayment_today');
    }
    navigateRepaymentOverDue(){
      this.router.navigateByUrl('/repayment_overdue');
    }
    logout(){
      this.authenticationService.logout()
    }
    getFinForBid(){
      this.smeDashboardServices.getFinForBid().subscribe(resp => {
      this.getSumOfOpenFinBidding = resp;
    })
    }
    getFundingBids(){
      this.smeDashboardServices.getFundingBids().subscribe(resp => {
      this.getSumofFundingBids = resp;
    })
    }
    getFunded(){
      this.getsumOfFunded = {INVCCY: "SGD",
      INVTOTALAMT: 144}
      this.smeDashboardServices.getFunded().subscribe(resp => {
      this.getsumOfFunded = resp;
    })
    }
    getFinDueTdy(){
      this.smeDashboardServices.getFinDueTdy().subscribe(resp => {
    })
    }
    getFinPastDue(){
      this.smeDashboardServices.getFinPastDue().subscribe(resp => {
    })
    }
    getFinMatData(){
      this.smeDashboardServices.getFinMatData().subscribe(resp => {
      this.getFinMaturityData = resp;
    })
    }
    getFinSizeData(){
      this.smeDashboardServices.getFinSizeData().subscribe(resp => {
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
{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.translate.instant('Funding Requested') },
{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: this.translate.instant('Actual Funding')  },
// { data: [120, 200, 700], label: "Repayment" },
];
chartLabels = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
chartColors = [
  {
    backgroundColor: "rgba(0, 137, 132, .3)",
    borderColor: "rgba(0, 10, 130, .7)",
    },
{
backgroundColor: "#2ca92c",
borderColor:  "green",
},
{
  backgroundColor: "rgba(0, 137, 132, .3)",
  borderColor: "rgba(0, 10, 130, .7)",
  },
];
public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
  }
    getChartData(){
      let FRresp;
      this.smeDashboardServices.getChartData().subscribe(resp => {
        let FRresp = resp;
      this.chartData=[
        { data:Object.values(resp) , label: this.translate.instant('Funding Requested') },
        // { data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , label: "Actual Funding" },
      ]
    })
    this.smeDashboardServices.getActualFundingChartData().subscribe(AFresp => {
      this.chartData.push( { data:Object.values(AFresp) , label: this.translate.instant('Actual Funding') })
    })
    // this.chartData=[
    //   { data:Object.values(FRresp) , label: "Funding Requested" },
    //   { data:Object.values(AFresp) , label: "Actual Funding" },
    //  ]
    }

    onRequestChange(event){
      if(event == 'manual'){
        this.navigateInvoiceCreation()
      }else{
        // this.router.navigateByUrl('/invoice-request/bulk')
      }
    }
    navigateToSmeDetails(){
      let path = '/invoice-request/bulk'
      let data: NavigationExtras = {
        queryParams: {
        "invoicedata":this.invoicedata, 
        "uploadType": this.FileType,
        "PDFData": this.PDFData 
        }
      }
      this.router.navigate([path], { state: { FileData: data } });
    }
    onFileChange(ev) {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      console.log(file, "file")
      console.log(file.type, "file")
      this.FileType = file.type
      if (file.type === "text/csv") {
        this.PDFData = ''
        this.onChangess(file)
      } else if (file.type === "application/pdf") {
        this.getBase64(<File>ev.target.files[0]).then((data) => {
          let flName = file.name
          console.log(flName, "flName")
          // console.log(ev.target.files, "ev.target.files")
          this.PDFData = data
          let fileName = {
            'fileName': file.name,
            'data': (<string>data).split(',')[1],
            'extension': flName.substring(flName.lastIndexOf('.') + 1, flName.length) || flName
          }
          this.invoicedata = fileName
          console.log(this.invoicedata, "this.fileNames")
          this.navigateToSmeDetails()
        });
  
      } else {
        this.PDFData = ''
        reader.onload = event => {
          const data = reader.result;
          workBook = XLSX.read(data, { type: "binary" });
          console.log(workBook);
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            console.log(name)
            const sheet = workBook.Sheets[name];
            console.log(sheet, "sheet")
            initial['invoice'] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          console.log(jsonData, "jsonData")
          this.invoicedata = jsonData.invoice
          this.navigateToSmeDetails()
        };
        reader.readAsBinaryString(file);
      }
    }
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    onChangess(files: File[]) {
      console.log(files, "files")
      if (files) {
        console.log(files);
        Papa.parse(files, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            console.log(result, "sksksk");
            this.invoicedata = result.data
            this.navigateToSmeDetails()
            // this.dataSource = new MatTableDataSource(result);
            // this.dataList = result.data;
          }
        });
      }
    }
    
}

