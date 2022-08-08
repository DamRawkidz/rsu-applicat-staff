import { TestBed } from '@angular/core/testing';

import { ApplicationSecurityService } from './application-security.service';

describe('ApplicationSecurityService', () => {
  let service: ApplicationSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
