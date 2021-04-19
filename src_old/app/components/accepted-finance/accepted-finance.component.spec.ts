import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedFinanceComponent } from './accepted-finance.component';

describe('AcceptedFinanceComponent', () => {
  let component: AcceptedFinanceComponent;
  let fixture: ComponentFixture<AcceptedFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
