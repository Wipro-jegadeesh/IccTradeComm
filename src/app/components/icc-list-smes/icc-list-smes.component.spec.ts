import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccListSmesComponent } from './icc-list-smes.component';

describe('IccListSmesComponent', () => {
  let component: IccListSmesComponent;
  let fixture: ComponentFixture<IccListSmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccListSmesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccListSmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
