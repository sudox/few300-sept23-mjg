import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: string;
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name'
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, (state) => ({ ...state, showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, (state) => ({ ...state, showAll: false })),
  on(sortFilterActions.sortByName, (state) => ({ ...state, sortHolidaysBy: 'name' })),
  on(sortFilterActions.sortByDate, (state) => ({ ...state, sortHolidaysBy: 'date' }))
);

export function reducer(state: any, action: any) {
  return myReducer(state, action);
}
