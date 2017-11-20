import {TestBed} from '@angular/core/testing';

import {JenkinsActionService} from './jenkins-action.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

describe('JenkinsActionService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), new UtilMockService(), loggerService, new Map<any, Array<any>>())
        expect(service).toBeTruthy();
    });
});
