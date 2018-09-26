import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { Intent } from '../shared/domain/intent';
import {
  AddIntentError,
  AddIntentSuccess,
  CREATE_INTENT,
  GET_INTENT,
  GET_INTENTS,
  GetAllIntentsError,
  GetAllIntentsSuccess, GetIntentError, GetIntentSuccess
} from './intents.actions';
import { IntentEffects } from './intents.effects';

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

describe('IntentEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IntentEffects
      ]
    });
    service = jasmine.createSpyObj('service', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllIntents$', () => {
    it('should return a GET_INTENTS_SUCCESS action, with the intents, on success', () => {
      service.findAll.and.returnValue(of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_INTENTS}});
      const effects = new IntentEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllIntentsSuccess(MOCK_DATA)});

      expect(effects.getAllIntents$).toBeObservable(expected);
    });

    it('should return a GET_INTENTS_ERROR action, with the error', () => {
      const error = new Error('Error loading intents');
      service.findAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_INTENTS}});
      const effects = new IntentEffects(new Actions(source), service);

      effects.getAllIntents$.subscribe(result => {
        expect(result).toEqual(new GetAllIntentsError(error));
      });
    });
  });

  describe('getIntent$', () => {
    it('should return a GET_INTENT_SUCCESS action, with the intent found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(of(data));
      const source = cold('a', {a: {type: GET_INTENT}});
      const effects = new IntentEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetIntentSuccess(data)});

      expect(effects.getIntent$).toBeObservable(expected);
    });

    it('should return a GET_INTENT_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the intent with id ${data.id}`);
      service.findById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_INTENT}});
      const effects = new IntentEffects(new Actions(source), service);

      effects.getIntent$.subscribe(result => {
        expect(result).toEqual(new GetIntentError(error));
      });
    });
  });

  describe('createIntent$', () => {
    it('should return a CREATE_INTENT_SUCCESS action, with the intent inserted, on success', () => {
      const data = {
        id: 3,
        formulations: ['My new Answer'],
        answer: 'Answer 3'
      };
      service.insert.and.returnValue(of(data));
      const source = cold('a', {a: {type: CREATE_INTENT}});
      const effects = new IntentEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddIntentSuccess(data.id)});

      expect(effects.createIntent$).toBeObservable(expected);
    });

    it('should return a CREATE_INTENT_ERROR action, with the error', () => {
      const data = {
        id: 3,
        formulations: ['My new Answer'],
        answer: 'Answer 3'
      };
      const error = new Error(`Error adding new intent with id ${data.id}`);
      service.insert.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: CREATE_INTENT}});
      const effects = new IntentEffects(new Actions(source), service);

      effects.createIntent$.subscribe(result => {
        expect(result).toEqual(new AddIntentError(error));
      });
    });
  });

});
