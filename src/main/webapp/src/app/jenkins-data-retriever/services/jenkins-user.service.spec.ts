import {TestBed} from '@angular/core/testing';

import {JenkinsUserService} from './jenkins-user.service';

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

describe('JenkinsUserService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsUserService = createService(new Array());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsUserService = createService(new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Users);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsUserService = createService(new Array<any>());
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });
});

function createService(data: any): JenkinsUserService {
    let service: JenkinsUserService = new JenkinsUserService(configService, proxyService, utilService, loggerService, data);
    return service;
}
