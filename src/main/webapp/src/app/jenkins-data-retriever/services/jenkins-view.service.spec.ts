import {TestBed} from '@angular/core/testing';

import {JenkinsViewService} from './jenkins-view.service';

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

describe('JenkinsViewService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsViewService = createService("SomeUrl", new Array<any>(), new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsViewService = createService("SomeUrl", new Array<any>(), new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Views);
    });
});

function createService(url: any, viewList: any, jobList: any): JenkinsViewService {
    let service: JenkinsViewService = new JenkinsViewService(configService, proxyService, utilService, loggerService, url, viewList, jobList);
    return service;
}
