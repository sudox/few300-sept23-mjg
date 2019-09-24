import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as sortFilterActions from '../actions/sort-filter.actions';

@Injectable()
export class AppEffects {

  applicationStartedStuff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => sortFilterActions.loadSavedPrefs())
    ), { dispatch: true }
  );

  constructor(private actions$: Actions) {

  }

}
