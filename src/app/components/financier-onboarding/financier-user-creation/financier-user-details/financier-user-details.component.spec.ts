import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierUserDetailsComponent } from './financier-user-details.component';

describe('FinancierUserDetailsComponent', () => {
  let component: FinancierUserDetailsComponent;
  let fixture: ComponentFixture<FinancierUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
