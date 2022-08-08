import { TestBed } from '@angular/core/testing';

import { InterviewResuleProcessService } from './interview-resule-process.service';

describe('InterviewResuleProcessService', () => {
  let service: InterviewResuleProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewResuleProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
