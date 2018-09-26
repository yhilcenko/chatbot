import { Action } from '@ngrx/store';
import { Intent } from '../shared/domain/intent';

export const GET_INTENTS = '[ALL] Intents';
export const GET_INTENTS_SUCCESS = '[ALL] Intents Success';
export const GET_INTENTS_ERROR = '[ALL] Intents Error';

export const GET_INTENT = '[GET] Intent';
export const GET_INTENT_SUCCESS = '[GET] Intent Success';
export const GET_INTENT_ERROR = '[GET] Intent Error';

export const CREATE_INTENT = '[CREATE] Intent';
export const CREATE_INTENT_SUCCESS = '[CREATE] Intent Success';
export const CREATE_INTENT_ERROR = '[CREATE] Intent Error';


/****************************************
 * GET all the intents
 ****************************************/
export class GetAllIntents implements Action {
  readonly type = GET_INTENTS;
}

export class GetAllIntentsSuccess implements Action {
  readonly type = GET_INTENTS_SUCCESS;

  constructor(public payload: Intent[]) {
  }
}

export class GetAllIntentsError implements Action {
  readonly type = GET_INTENTS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET intent by id
 ****************************************/
export class GetIntent implements Action {
  readonly type = GET_INTENT;

  constructor(public payload: number) {
  }
}

export class GetIntentSuccess implements Action {
  readonly type = GET_INTENT_SUCCESS;

  constructor(public payload: Intent) {
  }
}

export class GetIntentError implements Action {
  readonly type = GET_INTENT_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new intent
 ****************************************/
export class AddIntent implements Action {
  readonly type = CREATE_INTENT;

  constructor(public payload: Intent) {
  }
}

export class AddIntentSuccess implements Action {
  readonly type = CREATE_INTENT_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddIntentError implements Action {
  readonly type = CREATE_INTENT_ERROR;

  constructor(public payload: Error) {
  }
}

