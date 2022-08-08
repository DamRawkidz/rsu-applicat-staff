import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StatusEffects } from './status.effects';

describe('StatusEffects', () => {
  let actions$: Observable<any>;
  let effects: StatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StatusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
