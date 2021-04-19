import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierOnboardingComponent } from './financier-onboarding.component';

describe('FinancierOnboardingComponent', () => {
  let component: FinancierOnboardingComponent;
  let fixture: ComponentFixture<FinancierOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
