import { TestBed } from '@angular/core/testing';

import { RegisterReceiptsService } from './register-receipts.service';

describe('RegisterReceiptsService', () => {
  let service: RegisterReceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterReceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
