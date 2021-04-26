import { Component, OnInit } from '@angular/core';
import { FUNDINGREQUESTCONSTANTS } from '../../shared/constants/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface invoiceData {
  invref: any;
  invDueDate: any;
  invId: any;
  id: String;
  RefNo: String;
  invoiceId: String;
  invoiceDate: String;
  buyerName: String;
  InvoiceAmount: String;

}
const INVOICE_ARRAY: invoiceData[] = [];

@Component({
  selector: 'app-invoice-bulk-upload',
  templateUrl: './invoice-bulk-upload.component.html',
  styleUrls: ['./invoice-bulk-upload.component.scss']
})
export class InvoiceBulkUploadComponent implements OnInit {

  tooltipPosition= "below";
  fundingTooltip = FUNDINGREQUESTCONSTANTS;
  displayedColumns: string[] = ['select', 'DateTime','InvoiceRefNo', 'DateOfInvoice', 'Seller', 'buyerName', 'InvoiceAmount','Ccy','Status'];
  selection = new SelectionModel(true, []);
  dataSource = new MatTableDataSource(INVOICE_ARRAY);
  fileNames=[]
  isOpen=''
  
  constructor() { }

  ngOnInit(): void {
  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
      this.selection.selected.forEach(s => console.log(s.name));
    }
    isOpenHandle(isTrue) {
      this.isOpen = isTrue == "inActive" ? "active" : "inActive"
    }
  
    onChange(event){
      this.fileNames.push(<File>event.target.files[0].name)
      // for(let i = 0; i < event.target.files.length; i++) {
      //     var reader = new FileReader();
      //     reader.readAsDataURL(<File>event.target.files[i]);
      //     reader.onload =function () {
      //         baseData.push(reader.result)
      //     };
      //     this.fileNames.push(<File>event.target.files[i].name)
      // }
  }  
  onFileRemove(index){
    this.fileNames.splice(index,1)
  }
  authoriseInvoice() {
    let invoiceIds = []
    this.selection.selected.forEach(s =>
      invoiceIds.push(s.id)
    );
    // this.updateInvoice(invoiceIds)
    console.log("invoiceIds", invoiceIds);
  }
}
