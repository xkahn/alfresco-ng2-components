import { TestBed } from '@angular/core/testing';

import { UserCloudService } from './user-cloud.service';

describe('UserCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCloudService = TestBed.get(UserCloudService);
    expect(service).toBeTruthy();
  });
});
