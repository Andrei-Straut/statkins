import {TestBed} from '@angular/core/testing';

import {JenkinsChangeSetService} from './jenkins-change-set.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();

describe('JenkinsChangeSetService', () => {
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsChangeSetService = createService(new Map<any, Array<any>>(), new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsChangeSetService = createService(new Map<any, Array<any>>(), new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Changesets);
    });
});

function createService(builds: any, users:any): JenkinsChangeSetService {
    let service: JenkinsChangeSetService = new JenkinsChangeSetService(utilService, loggerService, builds, users);
    return service;
}
