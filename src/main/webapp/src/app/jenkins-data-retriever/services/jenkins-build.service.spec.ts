import {TestBed} from '@angular/core/testing';

import {JenkinsBuildService} from './jenkins-build.service';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyJenkinsJobMockService} from '../../test-mock/services/proxy.jenkins-build.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyJenkinsJobMockService = new ProxyJenkinsJobMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService(JSON.parse("{}"));

describe('JenkinsBuildService', () => {
    
    let expectedNumberOfJobs = 3;
    let expectedNumberOfBuilds = 9;

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
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', async () => {
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        expect(service.getServiceId() === JenkinsServiceId.Builds);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for undefined build list', async () => {
        let service: JenkinsBuildService = createService(undefined);
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for null build list', async () => {
        let service: JenkinsBuildService = createService(null);
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for empty build list', async () => {
        let service: JenkinsBuildService = createService(new Map<any, Array<any>>());
        await service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for job without builds', async () => {
        let emptyJob: IJenkinsJob = new JenkinsJob();
        let buildMap: Map<any, Array<any>> = new Map<any, Array<any>>();
        buildMap.set(emptyJob, emptyJob.builds);
        
        let service: JenkinsBuildService = createService(buildMap);
        await service.execute();

        expect(service.getData().size).toBe(1);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return correct values for input', async () => {
        let buildMap = new JenkinsDataProviderService().getData().builds;
        
        let service: JenkinsBuildService = createService(buildMap);
        await service.execute();
        
        expect(service.getData().size).toBe(expectedNumberOfJobs);
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfBuilds);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('service should not crash when proxy returns empty', async () => {
        let buildMap = new JenkinsDataProviderService().getData().builds;
        
        let service: JenkinsBuildService = createServiceWithProxyEmpty(buildMap);
        await service.execute();
        
        expect(service.getData().size).toBe(3);
        expect(utilService.mapToArray(service.getData()).length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('service should not crash when proxy observable throws error', async () => {
        let buildMap = new JenkinsDataProviderService().getData().builds;
        
        let service: JenkinsBuildService = createServiceWithProxyError(buildMap);
        await service.execute();
        
        expect(service.getData().size).toBe(3);
        expect(utilService.mapToArray(service.getData()).length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });
});

function createService(data: any): JenkinsBuildService {
    let service: JenkinsBuildService = new JenkinsBuildService(configService, proxyService, utilService, loggerService, data);
    return service;
}

function createServiceWithProxyError(data: any): JenkinsBuildService {
    let service: JenkinsBuildService = new JenkinsBuildService(configService, proxyErrorService, utilService, loggerService, data);
    return service;
}

function createServiceWithProxyEmpty(data: any): JenkinsBuildService {
    let service: JenkinsBuildService = new JenkinsBuildService(configService, proxyCustomResponseService, utilService, loggerService, data);
    return service;
}
