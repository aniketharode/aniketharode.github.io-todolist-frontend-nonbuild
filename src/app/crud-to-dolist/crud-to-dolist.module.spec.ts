import { CrudToDolistModule } from './crud-to-dolist.module';

describe('CrudToDolistModule', () => {
  let crudToDolistModule: CrudToDolistModule;

  beforeEach(() => {
    crudToDolistModule = new CrudToDolistModule();
  });

  it('should create an instance', () => {
    expect(crudToDolistModule).toBeTruthy();
  });
});
