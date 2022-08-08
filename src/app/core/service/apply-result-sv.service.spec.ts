import { TestBed } from '@angular/core/testing';

import { ApplyResultSvService } from './apply-result-sv.service';

describe('ApplyResultSvService', () => {
  let service: ApplyResultSvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyResultSvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
