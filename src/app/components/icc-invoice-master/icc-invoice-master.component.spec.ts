import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccInvoiceMasterComponent } from './icc-invoice-master.component';

describe('SmeFinanceforBiddingComponent', () => {
  let component: IccInvoiceMasterComponent;
  let fixture: ComponentFixture<IccInvoiceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccInvoiceMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccInvoiceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
