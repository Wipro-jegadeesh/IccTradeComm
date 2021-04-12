import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsRejectedComponent } from './invoice-details-rejected.component';

describe('InvoiceDetailsRejectedComponent', () => {
  let component: InvoiceDetailsRejectedComponent;
  let fixture: ComponentFixture<InvoiceDetailsRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
