import {TestBed} from '@angular/core/testing';

import {JenkinsJobService} from './jenkins-job.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyMockService = new ProxyMockService();

describe('JenkinsJobService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsJobService = createService(new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsJobService = createService(new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Jobs);
    });
});

function createService(data: any): JenkinsJobService {
    let service: JenkinsJobService = new JenkinsJobService(configService, proxyService, utilService, loggerService, data);
    return service;
}
