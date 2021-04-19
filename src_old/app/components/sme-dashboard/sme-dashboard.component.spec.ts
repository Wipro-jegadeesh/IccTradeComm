import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeDashboardComponent } from './sme-dashboard.component';

describe('SmeDashboardComponent', () => {
  let component: SmeDashboardComponent;
  let fixture: ComponentFixture<SmeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
