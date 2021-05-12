import { Component, OnInit, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { IccDashboardServices } from './icc-dashboard-services'
import {ICCDASHBOARDCONSTANTS} from '../../shared/constants/constants'
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['financierId', 'financierName', 'regNumber','action'];
  dataSource;
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
  financeMasterCount
  constructor(public router: Router,private authenticationService: AuthenticationService,private iccDashboardServices: IccDashboardServices ) { }

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.getIccDashDetails()
    this.getDashboardDetailsDetails()
    // this.dataSource=[]
    // this.getFinancierDetails()
    // this.dataSource=[];
    this.getInvoiceMasterCount();
    this.getAllfinTdyCount();
    this.getFinanceMasterCount();


    
    this.dataSource = new MatTableDataSource([{profileID : "4","financierType" : "Praj","regNumber" : "TT$%$%"}
    // ,{profileID : "5","financierName" : "Praj","regNumber" : "TT$%$%"}
    // ,{profileID : "4","financierName" : "Praj","regNumber" : "TT$%$%"} 
  ]);
 
    this.getFinancierDetails()
    

  }

  getFinancierDetails(){
    this.iccDashboardServices.getFinancierList().subscribe(resp=>{
      if(resp){
        let respData = []
        resp.map((item,index) => {
          if(index <= 4){
            respData.push(item)
          }
        })
        this.dataSource = new MatTableDataSource(respData);
        // this.dataSource.paginator = this.paginator
        // console.log(this.dataSource,"this.dataSource")
      }
    })
  }

  
  getDashboardDetailsDetails(){
    // this.iccDashboardServices.getFundingRequestTileList().subscribe(resp=>{
    //   if(resp){
    //     FINANACIERLIST = [] 
    //     let response = resp.splice(0,5)     
    //     response.length && response.map((item=>{
    //         let obj={
    //           "financierId":'FIN' + item.namedPKKey,
    //           "financierName":item.financierNameConstitution,
    //           "regNumber":item.locregno,
    //           "action":'edit'
    //         }
    //         FINANACIERLIST.push(obj)
    //         this.dataSource=FINANACIERLIST
    //       }))
    //   }
    // })



        this.iccDashboardServices.getFundingRequestTileList().subscribe(resp=>{
          this.fundingRequestObj = resp

        })

        this.iccDashboardServices.getOfferAcceptanceTileList().subscribe(resp=>{
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

  isOpenHandle(isTrue) {
    this.isOpen = isTrue == "inActive" ? "active" : "inActive";
  }

  chartType = "line";
  chartOptions = {
    responsive: true,
  };
  chartData = [
    { data: [350, 600, 260, 700, 650, 416, 400, 300, 556, 500, 600, 580], label: "Funding Requested" },
    { data: [500, 410, 450, 600, 550, 680, 720, 380, 350, 450, 650, 700], label: "Actual Funding" },
    { data: [120, 200, 700], label: "Repayment" },
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
  
  logout(){
    this.authenticationService.logout()
    }
    
    navigatePages(path){
      this.router.navigateByUrl(path);
    }

    navigateToSmeList(path){
      this.router.navigateByUrl(path);
    }
    getIccDashDetails(){     
      // this.iccDashboardServices.getIccDashDetails().subscribe(resp => {
      //   // const ELEMENT_DATA: financeForBiddingData[] = resp;
      //   // this.dataSource = new MatTableDataSource(resp);
      // })
    }
  
    editFinancier(id,type){
      if(type == 'edit'){
        this.router.navigateByUrl('/financier-onboarding/edit/' + id)
      }
      else{
        this.router.navigateByUrl('/financier-onboarding/view/' + id)
      }
    }

    financierOnBoardingList(){
      this.router.navigateByUrl('/financier-onboarding-list')
    }
    navigatefinancedToday(){
      this.router.navigateByUrl('/icc-finance-today');
      }
      navigatefinancedMaster(){
      this.router.navigateByUrl('/icc-finance-master');
      }
      navigateinvoiceMaster(){
      this.router.navigateByUrl('/icc-invoice-master');
      }
      

    naviageTiles(path){
      this.router.navigateByUrl(path)
    }

      getInvoiceMasterCount(){
        this.iccDashboardServices.getInvoiceMasterCount().subscribe(resp => {
        this.getSumInvoiceMasterCount = resp;
      })
      }
      getAllfinTdyCount(){
        this.iccDashboardServices.getAllfinTdyCount().subscribe(resp => {
        this.getSumAllfinTdyCount = resp;
      })
      }
      getFinanceMasterCount(){
        this.iccDashboardServices.getFinanceMasterCount().subscribe(resp => {
        this.financeMasterCount=resp
        })
      }

}
