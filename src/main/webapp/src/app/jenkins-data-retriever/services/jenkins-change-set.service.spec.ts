import { TestBed, inject } from '@angular/core/testing';

import { JenkinsChangeSetService } from './jenkins-change-set.service';

describe('JenkinsChangeSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsChangeSetService]
    });
  });

  it('should be created', inject([JenkinsChangeSetService], (service: JenkinsChangeSetService) => {
    expect(service).toBeTruthy();
  }));
});
