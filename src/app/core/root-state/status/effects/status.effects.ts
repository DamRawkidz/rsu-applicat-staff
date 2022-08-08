import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StatusService } from 'src/app/core/service/status.service';
import { LOAD_STATUS, LOAD_STATUS_FAILURE, LOAD_STATUS_SUCCESS } from '../actions/status.actions';



@Injectable()
export class StatusEffects {
  loadStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_STATUS),
      switchMap(action => 
        this.statusSV.getAll<any>().pipe(
          map(res => LOAD_STATUS_SUCCESS({data: res})),
          // catchError(err => of(LOAD_STATUS_FAILURE({error: err.message})
        )
      )
    )
  }
)


  constructor(
    private actions$: Actions,
    private statusSV: StatusService
  ) {}

}
