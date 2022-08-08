import { Action, createReducer, on } from '@ngrx/store';
import { statusSeedData } from 'src/app/core/data/seed';
import { LOAD_STATUS_FAILURE, LOAD_STATUS_SUCCESS } from '../actions/status.actions';


export const statusFeatureKey = 'status';

export interface StatusState {
  payload: any[],
  error: string
}

export const initialState: StatusState = {
  payload:[...statusSeedData],
  error: null  
};


export const reducer = createReducer(
  initialState,
  on(LOAD_STATUS_SUCCESS,(state,action) => ({
    ...state,
    payload:[...action.data]
  })),
  on(LOAD_STATUS_FAILURE,(state,action) => ({
    ...state,
    error: action.error
  }))
);


export function StatusReducer(state,action){
  return reducer(state,action)
}
