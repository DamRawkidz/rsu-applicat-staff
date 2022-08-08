import { ActionReducerMap } from '@ngrx/store';
import { StatusState, StatusReducer } from '../core/root-state/status/reducer/status.reducer';


export interface AppState {
    status: StatusState,
    // new state
}

export const appReducers: ActionReducerMap<AppState> = {
    status: StatusReducer,
}