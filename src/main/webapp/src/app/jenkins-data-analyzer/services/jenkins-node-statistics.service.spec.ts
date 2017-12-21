import {TestBed} from '@angular/core/testing';

import {JenkinsNodeStatisticsService} from './jenkins-node-statistics.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {IJenkinsDataMockService} from '../../test-mock/services/jenkins-data.mock.service';

describe('JenkinsNodeStatisticsService', () => {

    let loggerService: Logger = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        loggerService = TestBed.get(Logger);
    });

    it('should be created', () => {
        let service: JenkinsNodeStatisticsService = new JenkinsNodeStatisticsService(new UtilMockService(), loggerService, new IJenkinsDataMockService());
        expect(service).toBeTruthy();
    });

    it('getStatistics should return a value with empty mock Jenkins Data', () => {
        let service: JenkinsNodeStatisticsService = new JenkinsNodeStatisticsService(new UtilMockService(), loggerService, new IJenkinsDataMockService());
        expect(service.getStatistics()).toBeTruthy();
        
        expect(service.getStatistics().title).toBe("Nodes");
        expect(service.getStatistics().subTitle).toBe("Number Of Nodes: N/A");
        expect(service.getStatistics().contents.length).toBe(6);
    });
});
