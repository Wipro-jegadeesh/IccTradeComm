import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeFinanceforBiddingComponent } from './sme-financefor-bidding.component';

describe('SmeFinanceforBiddingComponent', () => {
  let component: SmeFinanceforBiddingComponent;
  let fixture: ComponentFixture<SmeFinanceforBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeFinanceforBiddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeFinanceforBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
