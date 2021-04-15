import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repayment_todayComponent } from './sme-repayment-today.component';

describe('Repayment_todayComponent', () => {
  let component: Repayment_todayComponent;
  let fixture: ComponentFixture<Repayment_todayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Repayment_todayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Repayment_todayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
