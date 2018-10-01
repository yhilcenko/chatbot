import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IntentsService } from '../shared/services/intents.service';
import * as intentActions from './intents.actions';
import {
  AddIntent,
  AddIntentError,
  AddIntentSuccess,
  GetAllIntentsError,
  GetAllIntentsSuccess,
  GetIntent, GetIntentError,
  GetIntentSuccess
} from './intents.actions';

@Injectable()
export class IntentEffects {
  constructor(private actions$: Actions,
              private service: IntentsService) {
  }

  @Effect()
  getAllIntents$: Observable<Action> = this.actions$
    .pipe(
      ofType(intentActions.GET_INTENTS),
      switchMap(() => this.service.findAll()),
      map(intents => new GetAllIntentsSuccess(intents)),
      catchError((err) => [new GetAllIntentsError(err)]
      )
    );

  @Effect()
  getIntent$ = this.actions$
    .pipe(
      ofType(intentActions.GET_INTENT),
      map((action: GetIntent) => action.payload),
      switchMap(id => this.service.findById(id)),
      map(intent => new GetIntentSuccess(intent)),
      catchError((err) => [new GetIntentError(err)])
    );

  @Effect()
  createIntent$ = this.actions$
    .pipe(
      ofType(intentActions.CREATE_INTENT),
      map((action: AddIntent) => action.payload),
      switchMap(newIntent => this.service.insert(newIntent)),
      map((response) => new AddIntentSuccess(response.id)),
      catchError((err) => [new AddIntentError(err)]
      )
    );
}
