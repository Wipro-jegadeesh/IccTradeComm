import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccFinanceTodayComponent } from './icc-finance-today.component';

describe('SmeFinanceforBiddingComponent', () => {
  let component: IccFinanceTodayComponent;
  let fixture: ComponentFixture<IccFinanceTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccFinanceTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccFinanceTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
