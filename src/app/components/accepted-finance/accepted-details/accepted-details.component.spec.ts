import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedDetailsComponent } from './accepted-details.component';

describe('AcceptedDetailsComponent', () => {
  let component: AcceptedDetailsComponent;
  let fixture: ComponentFixture<AcceptedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
