import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccSmeDetailsComponent } from './icc-sme-details.component';

describe('IccSmeDetailsComponent', () => {
  let component: IccSmeDetailsComponent;
  let fixture: ComponentFixture<IccSmeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccSmeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccSmeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
