import {TestBed} from '@angular/core/testing';

import {JenkinsBasicBuildStatisticsService} from './jenkins-basic-build-statistics.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {IJenkinsDataMockService} from '../../test-mock/services/jenkinsdata.mock.service';

describe('JenkinsBasicBuildStatisticsService', () => {

    let loggerService: Logger = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsBasicBuildStatisticsService = new JenkinsBasicBuildStatisticsService(new UtilMockService(), loggerService, new IJenkinsDataMockService());
        expect(service).toBeTruthy();
    });
});
