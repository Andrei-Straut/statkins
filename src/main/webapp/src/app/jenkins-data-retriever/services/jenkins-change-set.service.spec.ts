import {TestBed} from '@angular/core/testing';

import {JenkinsChangeSetService} from './jenkins-change-set.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

describe('JenkinsChangeSetService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsChangeSetService = new JenkinsChangeSetService(new UtilMockService(), loggerService, new Map<any, Array<any>>(), new Array<any>());
        expect(service).toBeTruthy();
    });
});
