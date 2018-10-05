import { TestBed, inject } from '@angular/core/testing';

import { CloudProcessService } from './cloud-process.service';

describe('CloudProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudProcessService]
    });
  });

  it('should be created', inject([CloudProcessService], (service: CloudProcessService) => {
    expect(service).toBeTruthy();
  }));
});
