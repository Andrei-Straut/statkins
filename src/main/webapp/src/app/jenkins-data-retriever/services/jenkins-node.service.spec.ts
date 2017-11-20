import {TestBed} from '@angular/core/testing';

import {JenkinsNodeService} from './jenkins-node.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';

describe('JenkinsNodeService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsNodeService = new JenkinsNodeService(new ConfigMockService(), new ProxyMockService(), new UtilMockService(), loggerService, "SomeUrl");
        expect(service).toBeTruthy();
    });
});
