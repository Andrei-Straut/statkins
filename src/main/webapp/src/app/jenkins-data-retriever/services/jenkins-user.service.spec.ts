import { TestBed, inject } from '@angular/core/testing';

import { JenkinsUserService } from './jenkins-user.service';

describe('JenkinsUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsUserService]
    });
  });

  it('should be created', inject([JenkinsUserService], (service: JenkinsUserService) => {
    expect(service).toBeTruthy();
  }));
});
