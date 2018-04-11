import {TestBed} from '@angular/core/testing';

import {JenkinsViewListService} from './jenkins-view-list.service';

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

describe('JenkinsViewListService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.ViewList);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });
});

function createService(data: any): JenkinsViewListService {
    let service: JenkinsViewListService = new JenkinsViewListService(configService, proxyService, utilService, loggerService, data);
    return service;
}
