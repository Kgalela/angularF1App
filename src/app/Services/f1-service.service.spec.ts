import { TestBed } from '@angular/core/testing';

import { F1ServiceService } from './f1-service.service';

describe('F1ServiceService', () => {
  let service: F1ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
