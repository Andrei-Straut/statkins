import { TestBed, inject } from '@angular/core/testing';

import { JenkinsNodeService } from './jenkins-node.service';

describe('JenkinsNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsNodeService]
    });
  });

  it('should be created', inject([JenkinsNodeService], (service: JenkinsNodeService) => {
    expect(service).toBeTruthy();
  }));
});
