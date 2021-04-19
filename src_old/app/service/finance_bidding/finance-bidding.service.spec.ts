import { TestBed } from '@angular/core/testing';

import { FinanceBiddingService } from './finance-bidding.service';

describe('FinanceBiddingService', () => {
  let service: FinanceBiddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceBiddingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
