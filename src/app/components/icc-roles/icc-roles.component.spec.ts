import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccRolesComponent } from './icc-roles.component';

describe('IccRolesComponent', () => {
  let component: IccRolesComponent;
  let fixture: ComponentFixture<IccRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
