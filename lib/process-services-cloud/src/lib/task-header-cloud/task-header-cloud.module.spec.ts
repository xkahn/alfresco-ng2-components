import { TaskHeaderCloudModule } from './task-header-cloud.module';

describe('TaskHeaderCloudModule', () => {
  let taskHeaderCloudModule: TaskHeaderCloudModule;

  beforeEach(() => {
    taskHeaderCloudModule = new TaskHeaderCloudModule();
  });

  it('should create an instance', () => {
    expect(taskHeaderCloudModule).toBeTruthy();
  });
});
