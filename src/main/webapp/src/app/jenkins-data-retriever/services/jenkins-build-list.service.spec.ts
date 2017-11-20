import { TestBed, inject } from '@angular/core/testing';

import { JenkinsBuildListService } from './jenkins-build-list.service';

describe('JenkinsBuildListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsBuildListService]
    });
  });

  it('should be created', inject([JenkinsBuildListService], (service: JenkinsBuildListService) => {
    expect(service).toBeTruthy();
  }));
});
