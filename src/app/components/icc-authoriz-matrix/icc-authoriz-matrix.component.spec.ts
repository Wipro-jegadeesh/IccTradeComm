import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccAuthorizMatrixComponent } from './icc-authoriz-matrix.component';

describe('IccAuthorizMatrixComponent', () => {
  let component: IccAuthorizMatrixComponent;
  let fixture: ComponentFixture<IccAuthorizMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccAuthorizMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccAuthorizMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
