import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBiddingAcceptsDetailsComponent } from './finance-bids-accept-details.component';

describe('FinanceBiddingAcceptsDetailsComponent', () => {
  let component: FinanceBiddingAcceptsDetailsComponent;
  let fixture: ComponentFixture<FinanceBiddingAcceptsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBiddingAcceptsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBiddingAcceptsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
