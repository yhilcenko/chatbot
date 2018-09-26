import { Intent } from '../shared/domain/intent';
import {
  AddIntent,
  AddIntentError,
  AddIntentSuccess,
  CREATE_INTENT, GET_INTENT,
  GET_INTENTS,
  GetAllIntents,
  GetAllIntentsError,
  GetAllIntentsSuccess, GetIntent, GetIntentError, GetIntentSuccess
} from './intents.actions';
import { reducer, State } from './intents.reducers';

const MOCK_DATA: Intent[] = [
  {
    id: 1,
    formulations: ['Se coucher'],
    answer: 'Answer 1'
  }, {
    id: 2,
    formulations: ['Horaires'],
    answer: 'Answer 2'
  }
];
let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Intents REDUCER', () => {
    it('should reduce the action GET_INTENTS', () => {
        const action = new GetAllIntents();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_INTENTS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_INTENTS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllIntentsSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_INTENTS_ERROR', () => {
        const payload = new Error('Error loading all intents');
        const action = new GetAllIntentsError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET Intent by id REDUCER', () => {
  it('should reduce the action GET_INTENT', () => {
    const payload = MOCK_DATA[0].id;
    const action = new GetIntent(payload);
    const newState = reducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      action: GET_INTENT,
      done: false
    });
    state = newState;
  });
  it('should reduce the action GET_INTENT_SUCCESS', () => {
    const payload = MOCK_DATA[0];
    const action = new GetIntentSuccess(payload);
    const newState = reducer(state, action);
    expect({...newState}).toEqual({
      ...state,
      selected: payload,
      done: true
    });
    state = {...state, selected: null, done: true};
  });
  it('should reduce the action GET_INTENT_ERROR', () => {
    const payload = new Error('Error loading the intent');
    const action = new GetIntentError(payload);
    const newState = reducer(state, action);
    expect({...newState }).toEqual({
      ...state,
      done: true,
      error: action.payload
    });
  });
});

describe('Create new intent REDUCER', () => {
    it('should reduce the action CREATE_INTENT', () => {
        const payload = {
          id: 3,
          formulations: ['My new Answer'],
          answer: 'Answer 3'
        };
        const action = new AddIntent(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_INTENT,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_INTENT_SUCCESS', () => {
        const payload = 3;
        const action = new AddIntentSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_INTENT_ERROR', () => {
        const payload = new Error('Error creating the intent');
        const action = new AddIntentError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});
