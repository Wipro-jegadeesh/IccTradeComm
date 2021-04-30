import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeUserCreationComponent } from './sme-user-creation.component';

describe('SmeUserCreationComponent', () => {
  let component: SmeUserCreationComponent;
  let fixture: ComponentFixture<SmeUserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeUserCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
