import { TestBed, inject } from '@angular/core/testing';

import { JenkinsActionService } from './jenkins-action.service';

describe('JenkinsActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsActionService]
    });
  });

  it('should be created', inject([JenkinsActionService], (service: JenkinsActionService) => {
    expect(service).toBeTruthy();
  }));
});
