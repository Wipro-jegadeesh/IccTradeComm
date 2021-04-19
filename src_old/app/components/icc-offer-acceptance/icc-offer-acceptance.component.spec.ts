import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccOfferAcceptanceComponent } from './icc-offer-acceptance.component';

describe('IccOfferAcceptanceComponent', () => {
  let component: IccOfferAcceptanceComponent;
  let fixture: ComponentFixture<IccOfferAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccOfferAcceptanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccOfferAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
