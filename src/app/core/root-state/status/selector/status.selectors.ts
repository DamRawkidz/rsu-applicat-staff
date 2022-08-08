import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app-reducer';
import { StatusState } from '../reducer/status.reducer';

const selectStatus  = createFeatureSelector<AppState,StatusState>(
    'status'
)

export const selectStatusState = createSelector(
    selectStatus,
    (state: StatusState) => state
)

export const selectStatuePayload = createSelector(
    selectStatus,
    (state: StatusState) => state.payload
)