import * as fromIntents from './intents/store/intents.reducers';

export interface AppState {
  intents: fromIntents.State;
}
