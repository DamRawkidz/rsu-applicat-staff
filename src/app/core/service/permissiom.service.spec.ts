import { TestBed } from '@angular/core/testing';

import { PermissiomService } from './permissiom.service';

describe('PermissiomService', () => {
  let service: PermissiomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissiomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
