import {TestBed} from '@angular/core/testing';
import {Logger} from '../../../../node_modules/angular2-logger/core';

import {JenkinsBuildListService} from './jenkins-build-list.service';

import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

describe('JenkinsBuildListService', () => {
    
    let loggerService: Logger = undefined;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });
        
        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsBuildListService = new JenkinsBuildListService(new UtilMockService(), loggerService, new Array<any>());
        expect(service).toBeTruthy();
    });
});
