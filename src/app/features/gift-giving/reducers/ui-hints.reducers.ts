import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';

export interface UiHintsState {
  showAll: boolean;
}

const initialState: UiHintsState = {
  showAll: true
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, () => ({ showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, () => ({ showAll: false }))
);

export function reducer(state: any, action: any) {
  return myReducer(state, action);
}
