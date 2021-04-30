import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeUserDetailsComponent } from './sme-user-details.component';

describe('SmeUserDetailsComponent', () => {
  let component: SmeUserDetailsComponent;
  let fixture: ComponentFixture<SmeUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
