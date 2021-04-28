import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierLimitMaintanaceComponent } from './financier-limit-maintanace.component';

describe('FinancierLimitMaintanaceComponent', () => {
  let component: FinancierLimitMaintanaceComponent;
  let fixture: ComponentFixture<FinancierLimitMaintanaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierLimitMaintanaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierLimitMaintanaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
