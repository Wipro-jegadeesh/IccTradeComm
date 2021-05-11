import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinananceLimitMaintananceComponent } from './finanance-limit-maintanance.component';

describe('FinananceLimitMaintananceComponent', () => {
  let component: FinananceLimitMaintananceComponent;
  let fixture: ComponentFixture<FinananceLimitMaintananceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinananceLimitMaintananceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinananceLimitMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
