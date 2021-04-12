import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBiddingAcceptsComponent } from './finance-bids-accept.component';

describe('FinanceBiddingAcceptsComponent', () => {
  let component: FinanceBiddingAcceptsComponent;
  let fixture: ComponentFixture<FinanceBiddingAcceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBiddingAcceptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBiddingAcceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
