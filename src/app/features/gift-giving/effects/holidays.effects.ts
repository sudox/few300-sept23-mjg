import { Injectable } from '@angular/core';
import * as holidayActions from '../actions/holidays.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class HolidaysEffects {

  postHoliday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidayActions.holidayAdded),
      map(a => a.entity),
      switchMap((originalEntity) =>
        this.client.post<HolidayEntity>(environment.holidayUrl, { name: originalEntity.name, date: originalEntity.date })
          .pipe(
            map(response => holidayActions.holidayAddedSuccess({ oldId: originalEntity.id, newEntity: response })),
            catchError(err => of(holidayActions.holidayAddedFailure({ message: 'Could not add that', entity: originalEntity })))
          )
      ))
  );

  loadHolidayData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidayActions.loadHolidayData),
      switchMap(() => this.client.get<{ holidays: HolidayEntity[] }>(environment.holidayUrl)
        .pipe(
          map(response => response.holidays),
          map(holidays => holidayActions.loadDataSucceeded({ data: holidays }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private client: HttpClient) {

  }
}
