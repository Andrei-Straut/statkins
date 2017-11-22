import {TestBed} from '@angular/core/testing';

import {JenkinsBuildService} from './jenkins-build.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;

describe('JenkinsBuildService', () => {

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        expect(service.getServiceId() === JenkinsServiceId.Builds);
    });
});

function createService(data: any): JenkinsBuildService {
    let service: JenkinsBuildService = new JenkinsBuildService(new ConfigMockService(), new ProxyMockService(), new UtilMockService(), loggerService, data);
    return service;
}
