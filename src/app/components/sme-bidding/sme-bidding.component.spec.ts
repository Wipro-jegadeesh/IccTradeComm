import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierBiddingComponent } from './financier-bidding.component';

describe('FinancierBiddingComponent', () => {
  let component: FinancierBiddingComponent;
  let fixture: ComponentFixture<FinancierBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierBiddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
