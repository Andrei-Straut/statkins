import {TestBed} from '@angular/core/testing';

import {JenkinsJobListService} from './jenkins-job-list.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';

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
        let service: JenkinsJobListService = new JenkinsJobListService(new ConfigMockService(), new ProxyMockService(), loggerService, "SomeUrl");
        expect(service).toBeTruthy();
    });
});
