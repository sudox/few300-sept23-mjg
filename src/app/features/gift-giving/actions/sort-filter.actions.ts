import { createAction } from '@ngrx/store';

export const filterShowAll = createAction(
  '[gift-giving] filter show all'
);

export const filterShowOnlyUpcoming = createAction(
  '[gift-giving] filter show only upcoming'
);

export const sortByName = createAction(
  '[gift-giving] sort by name'
);

export const sortByDate = createAction(
  '[gift-giving] sort by date'
);
