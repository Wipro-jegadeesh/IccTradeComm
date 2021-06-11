import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MatTableDataSource } from "@angular/material/table";
import { IccFinanceTodayServices } from "./icc-finance-today-service";
import { BIDDINGCONSTANTS } from "../../shared/constants/constants";
import * as moment from "moment";
import { MatPaginator } from "@angular/material/paginator";

export interface financeForBiddingData {
  invId: String;
  invAmt: String;
  smeId: String;
  buyerName: String;
  invDate: String;
  invDueDate: String;
  status: String;
}
const ELEMENT_DATA: financeForBiddingData[] = [];
@Component({
  selector: "app-icc-finance-today",
  templateUrl: "./icc-finance-today.component.html",
  styleUrls: ["./icc-finance-today.component.scss"],
})
export class IccFinanceTodayComponent implements OnInit {
  displayedColumns: string[] = [
    "invoiceRef",
    "invoiceNo",
    "baseCcyAmt",
    "fundablePercent",
    "baseCcyFundingAmt",
    "baseCcyNetAmtPayable",
    "smeId",
    "action",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  modalRef: BsModalRef;
  biddingTooltip = BIDDINGCONSTANTS;
  moment: any = moment;

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  constructor(public router: Router,private IccFinanceTodayServices: IccFinanceTodayServices) {}

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.dataSource = new MatTableDataSource([
      {
        buyerAddr: "Singapore",
        buyerName: "Tata Steel",
        dispDate: "17/03/2021",
        id: 2,
        invAmt: "10000",
        invCcy: "SGD",
        invDate: "17/03/2021",
        invDueDate: "17/06/2021",
        invId: "INV102",
        smeId: "SME101",
        status: "I",
      },
    ]);

    this.IccFinanceTodayServices.getFinanceTodayLists().subscribe((resp) => {
      const ELEMENT_DATA: financeForBiddingData[] = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateInvoiceDetails(id) {
    this.router.navigateByUrl("/accepted-detail/" + id);
  }
}
