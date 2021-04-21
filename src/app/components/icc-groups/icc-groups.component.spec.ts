import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccGroupsComponent } from './icc-groups.component';

describe('IccGroupsComponent', () => {
  let component: IccGroupsComponent;
  let fixture: ComponentFixture<IccGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
