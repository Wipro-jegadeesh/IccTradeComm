import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IccFundingRequestComponent } from './icc-funding-request.component';

describe('IccFundingRequestComponent', () => {
  let component: IccFundingRequestComponent;
  let fixture: ComponentFixture<IccFundingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IccFundingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IccFundingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
