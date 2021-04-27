import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBulkUploadComponent } from './invoice-bulk-upload.component';

describe('InvoiceBulkUploadComponent', () => {
  let component: InvoiceBulkUploadComponent;
  let fixture: ComponentFixture<InvoiceBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceBulkUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
