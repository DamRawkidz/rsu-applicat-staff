import { createAction, props } from '@ngrx/store';


export const LOAD_STATUS = createAction(
  '[Status] Load Statuss'
);

export const LOAD_STATUS_SUCCESS = createAction(
  '[Status] Load Statuss Success',
  props<{ data: any[] }>()
);

export const LOAD_STATUS_FAILURE = createAction(
  '[Status] Load Statuss Failure',
  props<{ error: any }>()
);
