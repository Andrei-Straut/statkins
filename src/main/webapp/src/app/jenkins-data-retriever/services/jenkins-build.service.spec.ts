import { TestBed, inject } from '@angular/core/testing';

import { JenkinsBuildService } from './jenkins-build.service';

describe('JenkinsBuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsBuildService]
    });
  });

  it('should be created', inject([JenkinsBuildService], (service: JenkinsBuildService) => {
    expect(service).toBeTruthy();
  }));
});
