import { TestBed } from '@angular/core/testing';

import { ApplicationObjectService } from './application-object.service';

describe('ApplicationObjectService', () => {
  let service: ApplicationObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
