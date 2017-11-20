import {TestBed} from '@angular/core/testing';

import {JenkinsViewService} from './jenkins-view.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyMockService} from '../../test-mock/services/proxy.mock.service';

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
        let service: JenkinsViewService = new JenkinsViewService(new ConfigMockService(), new ProxyMockService(), new UtilMockService(), loggerService, 
            "SomeUrl", new Array<any>(), new Array<any>());
        expect(service).toBeTruthy();
    });
});
