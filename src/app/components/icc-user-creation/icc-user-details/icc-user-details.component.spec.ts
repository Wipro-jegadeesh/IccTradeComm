import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccUserDetailsComponent } from './icc-user-details.component';

describe('IccUserDetailsComponent', () => {
  let component: IccUserDetailsComponent;
  let fixture: ComponentFixture<IccUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
