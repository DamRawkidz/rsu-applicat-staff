import { TestBed } from '@angular/core/testing';

import { ProgramScheduleService } from './program-schedule.service';

describe('ProgramScheduleService', () => {
  let service: ProgramScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
