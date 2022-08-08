import { TestBed } from '@angular/core/testing';

import { ApplicationPermissionService } from './application-permission.service';

describe('ApplicationPermissionService', () => {
  let service: ApplicationPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
