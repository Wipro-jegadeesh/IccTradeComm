import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repayment_overdueComponent } from './sme-repayment-overdue.component';

describe('Repayment_todayComponent', () => {
  let component: Repayment_overdueComponent;
  let fixture: ComponentFixture<Repayment_overdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Repayment_overdueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Repayment_overdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
