import { TestBed, inject } from '@angular/core/testing';

import { JenkinsJobService } from './jenkins-job.service';

describe('JenkinsJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsJobService]
    });
  });

  it('should be created', inject([JenkinsJobService], (service: JenkinsJobService) => {
    expect(service).toBeTruthy();
  }));
});
