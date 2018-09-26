import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  let coreModule: SharedModule;

  beforeEach(() => {
    coreModule = new SharedModule();
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });
});
