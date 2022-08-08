import { TestBed } from '@angular/core/testing';

import { GetPersonalService } from './get-personal.service';

describe('GetPersonalService', () => {
  let service: GetPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
