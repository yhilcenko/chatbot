import { Intent } from '../shared/domain/intent';
import {
  AddIntent,
  AddIntentError,
  AddIntentSuccess,
  CREATE_INTENT,
  CREATE_INTENT_ERROR,
  CREATE_INTENT_SUCCESS, GET_INTENT, GET_INTENT_ERROR, GET_INTENT_SUCCESS,
  GET_INTENTS,
  GET_INTENTS_ERROR,
  GET_INTENTS_SUCCESS,
  GetAllIntents,
  GetAllIntentsError,
  GetAllIntentsSuccess, GetIntent, GetIntentError, GetIntentSuccess
} from './intents.actions';

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
/****************************************
 * GET all the Intents
 ****************************************/
describe('Load All Intents ACTION', () => {
  it('should create the action GET_INTENTS', () => {
    const action = new GetAllIntents();
    expect({...action}).toEqual({type: GET_INTENTS});
  });
  it('should create the action GET_INTENTS_SUCCESS', () => {
    const payload = [...MOCK_DATA];
    const action = new GetAllIntentsSuccess(payload);
    expect({...action}).toEqual({type: GET_INTENTS_SUCCESS, payload});
  });
  it('should create the action GET_INTENTS_ERROR', () => {
    const payload = new Error('Error loading all intents');
    const action = new GetAllIntentsError(payload);
    expect({...action}).toEqual({
      type: GET_INTENTS_ERROR, payload
    });
  });
});

/****************************************
 * GET intent by id
 ****************************************/
describe('Load specific Intent ACTION', () => {
  it('should create the action GET_INTENT', () => {
    const payload = MOCK_DATA[0].id;
    const action = new GetIntent(payload);
    expect({...action}).toEqual({ type: GET_INTENT, payload });
  });
  it('should create the action GET_INTENT_SUCCESS', () => {
    const payload = MOCK_DATA[0];
    const action = new GetIntentSuccess(payload);
    expect({...action}).toEqual({ type: GET_INTENT_SUCCESS, payload });
  });
  it('should create the action GET_INTENT_ERROR', () => {
    const payload = new Error('Error loading the intent');
    const action = new GetIntentError(payload);
    expect({...action}).toEqual({
      type: GET_INTENT_ERROR, payload
    });
  });
});

/****************************************
 * ADD new intent
 ****************************************/
describe('Create new Intent ACTION', () => {
  it('should create the action CREATE_INTENT', () => {
    const payload = MOCK_DATA[1];
    const action = new AddIntent(payload);
    expect({...action}).toEqual({
      type: CREATE_INTENT, payload
    });
  });
  it('should create the action CREATE_INTENT_SUCCESS', () => {
    const payload = MOCK_DATA[1].id;
    const action = new AddIntentSuccess(payload);
    expect({...action}).toEqual({type: CREATE_INTENT_SUCCESS, payload});
  });
  it('should create the action CREATE_INTENT_ERROR', () => {
    const payload = new Error('Error while adding a new intent');
    const action = new AddIntentError(payload);
    expect({...action}).toEqual({type: CREATE_INTENT_ERROR, payload});
  });
});
