import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierOnboardingListComponent } from './financier-onboarding-list.component';

describe('FinancierOnboardingComponent', () => {
  let component: FinancierOnboardingListComponent;
  let fixture: ComponentFixture<FinancierOnboardingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierOnboardingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierOnboardingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
