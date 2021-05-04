import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierUserCreationComponent } from './financier-user-creation.component';

describe('FinancierUserCreationComponent', () => {
  let component: FinancierUserCreationComponent;
  let fixture: ComponentFixture<FinancierUserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierUserCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
