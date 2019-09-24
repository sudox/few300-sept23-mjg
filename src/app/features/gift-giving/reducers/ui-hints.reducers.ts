import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';
import * as holidaysActions from '../actions/holidays.actions';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: string;
  holidaysLoaded: boolean;
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name',
  holidaysLoaded: false
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, (state) => ({ ...state, showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, (state) => ({ ...state, showAll: false })),
  on(sortFilterActions.sortByName, (state) => ({ ...state, sortHolidaysBy: 'name' })),
  on(sortFilterActions.sortByDate, (state) => ({ ...state, sortHolidaysBy: 'date' })),
  on(holidaysActions.loadHolidayData, (state) => ({ ...state, holidaysLoaded: false })),
  on(holidaysActions.loadDataSucceeded, (state) => ({ ...state, holidaysLoaded: true }))
);

export function reducer(state: any, action: any) {
  return myReducer(state, action);
}
