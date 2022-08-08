import { TestBed } from '@angular/core/testing';

import { ProgramTypesService } from './program-types.service';

describe('ProgramTypesService', () => {
  let service: ProgramTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
