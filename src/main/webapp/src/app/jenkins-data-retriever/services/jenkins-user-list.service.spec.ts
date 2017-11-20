import {TestBed} from '@angular/core/testing';

import {JenkinsUserListService} from './jenkins-user-list.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';

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
        let service: JenkinsUserListService = new JenkinsUserListService(new ConfigMockService(), new ProxyMockService(), new UtilMockService(), loggerService, "SomeUrl");
        expect(service).toBeTruthy();
    });
});
