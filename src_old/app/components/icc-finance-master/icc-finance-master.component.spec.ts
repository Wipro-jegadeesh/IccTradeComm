import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccFinanceMasterComponent } from './icc-finance-master.component';

describe('SmeFinanceforBiddingComponent', () => {
  let component: IccFinanceMasterComponent;
  let fixture: ComponentFixture<IccFinanceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccFinanceMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccFinanceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
