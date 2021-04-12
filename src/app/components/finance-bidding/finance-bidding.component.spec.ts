import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBiddingComponent } from './finance-bidding.component';

describe('FinanceBiddingComponent', () => {
  let component: FinanceBiddingComponent;
  let fixture: ComponentFixture<FinanceBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBiddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
