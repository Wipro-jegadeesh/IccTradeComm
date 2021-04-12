import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBiddingExpiredComponent } from './finance-bidding-expired.component';

describe('FinanceBiddingExpiredComponent', () => {
  let component: FinanceBiddingExpiredComponent;
  let fixture: ComponentFixture<FinanceBiddingExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBiddingExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBiddingExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
