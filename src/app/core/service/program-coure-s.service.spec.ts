import { TestBed } from '@angular/core/testing';

import { ProgramCoureSService } from './program-coure-s.service';

describe('ProgramCoureSService', () => {
  let service: ProgramCoureSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCoureSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
