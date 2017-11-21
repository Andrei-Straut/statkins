import {TestBed} from '@angular/core/testing';

import {JenkinsJobRelationshipNetworkService} from './jenkins-job-relationship-network.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {IJenkinsDataMockService} from '../../test-mock/services/jenkins-data.mock.service';

describe('JenkinsJobRelationshipNetworkService', () => {

    let loggerService: Logger = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsJobRelationshipNetworkService = new JenkinsJobRelationshipNetworkService(new UtilMockService(), new IJenkinsDataMockService(), 0, 0, 0, 0);
        expect(service).toBeTruthy();
    });
});
