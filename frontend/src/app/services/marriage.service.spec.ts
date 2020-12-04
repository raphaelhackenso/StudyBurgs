import { TestBed } from '@angular/core/testing';

import { MarriageService } from './marriage.service';

describe('MarriageService', () => {
  let service: MarriageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarriageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
