import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBiddingRejectedComponent } from './finance-bidding-rejected.component';

describe('FinanceBiddingRejectedComponent', () => {
  let component: FinanceBiddingRejectedComponent;
  let fixture: ComponentFixture<FinanceBiddingRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBiddingRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBiddingRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
