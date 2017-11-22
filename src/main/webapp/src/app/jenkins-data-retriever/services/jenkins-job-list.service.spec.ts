import {TestBed} from '@angular/core/testing';

import {JenkinsJobListService} from './jenkins-job-list.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyMockService = new ProxyMockService();

describe('JenkinsJobListService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsJobListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsJobListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.JobList);
    });
});

function createService(data: any): JenkinsJobListService {
    let service: JenkinsJobListService = new JenkinsJobListService(configService, proxyService, loggerService, data);
    return service;
}
