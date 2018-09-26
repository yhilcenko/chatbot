import { AppAction } from '../../app-action';
import { Intent } from '../shared/domain/intent';
import * as intentActions from './intents.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  data: Intent[];
  selected: Intent;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    /*************************
     * GET all intents actions
     ************************/
    case intentActions.GET_INTENTS:
      return {
        ...state,
        action: intentActions.GET_INTENTS,
        done: false,
        selected: null,
        error: null
      };
    case intentActions.GET_INTENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case intentActions.GET_INTENTS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * GET intent by id actions
     ************************/
    case intentActions.GET_INTENT:
      return {
        ...state,
        action: intentActions.GET_INTENT,
        done: false,
        selected: null,
        error: null
      };
    case intentActions.GET_INTENT_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case intentActions.GET_INTENT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

    /*************************
     * CREATE intent actions
     ************************/
    case intentActions.CREATE_INTENT:
      return {
        ...state,
        selected: action.payload,
        action: intentActions.CREATE_INTENT,
        done: false,
        error: null
      };
    case intentActions.CREATE_INTENT_SUCCESS: {
      const newIntent = {
        ...state.selected,
        id: action.payload
      };
      const data = [
        ...state.data,
        newIntent
      ];
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true
      };
    }
    case intentActions.CREATE_INTENT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getIntentsState = createFeatureSelector<State>('intents');
export const getAllIntents = createSelector(getIntentsState, (state: State) => state.data);
export const getIntent = createSelector(getIntentsState, (state: State) => {
  if (state.action === intentActions.GET_INTENT && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isCreated = createSelector(getIntentsState, (state: State) =>
  state.action === intentActions.CREATE_INTENT && state.done && !state.error);
export const getCreateError = createSelector(getIntentsState, (state: State) => {
  return state.action === intentActions.CREATE_INTENT
    ? state.error
    : null;
});
export const getIntentsError = createSelector(getIntentsState, (state: State) => {
  return state.action === intentActions.GET_INTENTS
    ? state.error
    : null;
});

