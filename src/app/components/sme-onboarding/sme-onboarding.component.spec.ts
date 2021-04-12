import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeOnboardingComponent } from './sme-onboarding.component';

describe('SmeOnboardingComponent', () => {
  let component: SmeOnboardingComponent;
  let fixture: ComponentFixture<SmeOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
