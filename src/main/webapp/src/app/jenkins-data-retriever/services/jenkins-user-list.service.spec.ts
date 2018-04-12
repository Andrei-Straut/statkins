import {TestBed} from '@angular/core/testing';

import {JenkinsUserListService} from './jenkins-user-list.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();

describe('JenkinsUserListService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.UserList);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });
});

function createService(data: any): JenkinsUserListService {
    let service: JenkinsUserListService = new JenkinsUserListService(configService, proxyService, utilService, loggerService, data);
    return service;
}
