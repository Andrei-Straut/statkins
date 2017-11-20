import { TestBed, inject } from '@angular/core/testing';

import { JenkinsViewService } from './jenkins-view.service';

describe('JenkinsViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsViewService]
    });
  });

  it('should be created', inject([JenkinsViewService], (service: JenkinsViewService) => {
    expect(service).toBeTruthy();
  }));
});
