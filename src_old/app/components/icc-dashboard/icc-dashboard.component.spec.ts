import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccDashboardComponent } from './icc-dashboard.component';

describe('IccDashboardComponent', () => {
  let component: IccDashboardComponent;
  let fixture: ComponentFixture<IccDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
