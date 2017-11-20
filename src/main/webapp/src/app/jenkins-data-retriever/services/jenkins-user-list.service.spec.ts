import { TestBed, inject } from '@angular/core/testing';

import { JenkinsUserListService } from './jenkins-user-list.service';

describe('JenkinsUserListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsUserListService]
    });
  });

  it('should be created', inject([JenkinsUserListService], (service: JenkinsUserListService) => {
    expect(service).toBeTruthy();
  }));
});
