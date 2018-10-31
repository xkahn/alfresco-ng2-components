import { UserInfoCloudModule } from './user-info-cloud.module';

describe('UserInfoCloudModule', () => {
  let userInfoCloudModule: UserInfoCloudModule;

  beforeEach(() => {
    userInfoCloudModule = new UserInfoCloudModule();
  });

  it('should create an instance', () => {
    expect(userInfoCloudModule).toBeTruthy();
  });
});
