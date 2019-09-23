export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducers';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { HolidayListItem } from '../models';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer
};

// Feature Selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);

// Selector Per Branch (e.g., one for 'holidays')
const selectHolidaysBranch = createSelector(selectFeature, b => b.holidays);
const selectUiHintsBranch = createSelector(selectFeature, b => b.uiHints);

// 'Helpers'
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, b => b.showAll);

// Then what your components need.

// - we need one that returns a HolidayListItem[] for our holidaylist component.

const selectHolidayListItemsUnfiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date()
  } as HolidayListItem))
);

export const selectHolidayListItems = createSelector(selectShowAllHolidays, selectHolidayListItemsUnfiltered, (all, holidays) =>
  holidays.filter(h => all ? true : !h.past)
);
