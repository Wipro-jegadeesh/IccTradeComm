import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierFundedComponent } from './financier-funded.component';

describe('FinancierFundedComponent', () => {
  let component: FinancierFundedComponent;
  let fixture: ComponentFixture<FinancierFundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierFundedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierFundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
