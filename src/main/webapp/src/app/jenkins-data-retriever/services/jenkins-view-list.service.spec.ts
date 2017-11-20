import { TestBed, inject } from '@angular/core/testing';

import { JenkinsViewListService } from './jenkins-view-list.service';

describe('JenkinsViewListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsViewListService]
    });
  });

  it('should be created', inject([JenkinsViewListService], (service: JenkinsViewListService) => {
    expect(service).toBeTruthy();
  }));
});
