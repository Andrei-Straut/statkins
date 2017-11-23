import {TestBed} from '@angular/core/testing';

import {JenkinsChangeSetService} from './jenkins-change-set.service';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();

describe('JenkinsChangeSetService', () => {
    
    let expectedNumberOfBuilds = 7;
    let expectedNumberOfChangeSets = 8;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        if (loggerService == undefined || loggerService == null) {
            loggerService = TestBed.get(Logger);
            loggerService.level = 0;
        }
    });

    it('should be created', () => {
        let service: JenkinsChangeSetService = createService(new Map<any, Array<any>>(), new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsChangeSetService = createService(new Map<any, Array<any>>(), new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Changesets);
    });

    it('getData should return empty for undefined build list and empty user list', async () => {
        let service: JenkinsChangeSetService = createService(undefined, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for null build list and empty user list', async () => {
        let service: JenkinsChangeSetService = createService(null, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for empty build list and empty user list', async () => {
        let service: JenkinsChangeSetService = createService(new Map<any, Array<any>>(), new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for job without builds and empty user list', async () => {
        let emptyJob: IJenkinsJob = new JenkinsJob();
        let buildMap: Map<any, Array<any>> = new Map<any, Array<any>>();
        buildMap.set(emptyJob, emptyJob.builds);
        
        let service: JenkinsChangeSetService = createService(buildMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return correct values for input and empty user list', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        
        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();
        
        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfChangeSets);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });
});

function createService(builds: any, users:any): JenkinsChangeSetService {
    let service: JenkinsChangeSetService = new JenkinsChangeSetService(utilService, loggerService, builds, users);
    return service;
}
