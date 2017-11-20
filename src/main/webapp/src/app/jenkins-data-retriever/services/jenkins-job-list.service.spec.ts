import { TestBed, inject } from '@angular/core/testing';

import { JenkinsJobListService } from './jenkins-job-list.service';

describe('JenkinsJobListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsJobListService]
    });
  });

  it('should be created', inject([JenkinsJobListService], (service: JenkinsJobListService) => {
    expect(service).toBeTruthy();
  }));
});
