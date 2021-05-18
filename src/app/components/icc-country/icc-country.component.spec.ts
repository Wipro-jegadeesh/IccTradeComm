import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccCountryComponent } from './icc-country.component';

describe('IccCountryComponent', () => {
  let component: IccCountryComponent;
  let fixture: ComponentFixture<IccCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
