import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsExpiredComponent } from './invoice-details-expired.component';

describe('InvoiceDetailsExpiredComponent', () => {
  let component: InvoiceDetailsExpiredComponent;
  let fixture: ComponentFixture<InvoiceDetailsExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
