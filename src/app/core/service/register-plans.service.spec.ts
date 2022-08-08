import { TestBed } from '@angular/core/testing';

import { RegisterPlansService } from './register-plans.service';

describe('RegisterPlansService', () => {
  let service: RegisterPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
