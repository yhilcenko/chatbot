import { IntentsModule } from './intents.module';

describe('IntentsModule', () => {
  let intentsModule: IntentsModule;

  beforeEach(() => {
    intentsModule = new IntentsModule();
  });

  it('should create an instance', () => {
    expect(intentsModule).toBeTruthy();
  });
});
