import { TestBed } from '@angular/core/testing';

import { LearnedService } from './learned.service';

describe('LearnedService', () => {
  let service: LearnedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearnedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
