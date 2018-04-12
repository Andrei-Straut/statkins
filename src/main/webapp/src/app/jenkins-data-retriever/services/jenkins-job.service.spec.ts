import {TestBed} from '@angular/core/testing';

import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJobService} from './jenkins-job.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();

describe('JenkinsJobService', () => {
    
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
        let service: JenkinsJobService = createService(new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsJobService = createService(new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Jobs);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsJobService = createService(new Array<any>());
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when job list is undefined', async () => {
        let service: JenkinsJobService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return empty when job list is null', async () => {
        let service: JenkinsJobService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return empty when job list is empty', async () => {
        let service: JenkinsJobService = createService(new Array<any>());
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return correct values for response with jobs', async () => {
        let jobData: Array<IJenkinsJob> = new JenkinsDataProviderService().getData().jobs;
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let service: JenkinsJobService = new JenkinsJobService(configService, proxyCustomResponseService, utilService, loggerService, jobData);
        proxyCustomResponseService.setResponse(JSON.parse(jobData[0].getJsonData()));
        
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.getData()[0].name).toBe("andreistraut.info-master");
        expect(service.getData()[0].url).toBe("https://www.andreistraut.info/jenkins/job/andreistraut.info-master/"),
        expect(service.getData()[0].upstreamProjects.length).toBe(1);
        expect(service.getData()[0].downstreamProjects.length).toBe(1);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeTruthy();
    });

    it('getData should return correct values for response without upstream / downstream jobs', async () => {
        let jobData: Array<IJenkinsJob> = new JenkinsDataProviderService().getData().jobs;
        delete jobData[0].upstreamProjects;
        delete jobData[0].downstreamProjects;
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyCustomResponseService.setResponse(JSON.parse(JSON.stringify(jobData[0])));
        let service: JenkinsJobService = new JenkinsJobService(configService, proxyCustomResponseService, utilService, loggerService, jobData);
        
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.getData()[0].upstreamProjects.length).toBe(0);
        expect(service.getData()[0].downstreamProjects.length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeTruthy();
    });

    it('getData should skip values and continue for response with empty jobs', async () => {
        let jobData: Array<IJenkinsJob> = new JenkinsDataProviderService().getData().jobs;
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyCustomResponseService.setResponse(JSON.parse("{}"));
        let service: JenkinsJobService = new JenkinsJobService(configService, proxyCustomResponseService, utilService, loggerService, jobData);
        
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should skip values and continue for response with jobs without name field', async () => {
        let jobData: Array<IJenkinsJob> = new JenkinsDataProviderService().getData().jobs;
        delete jobData[0].name;
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyCustomResponseService.setResponse(JSON.parse(jobData[0].getJsonData()));
        let service: JenkinsJobService = new JenkinsJobService(configService, proxyCustomResponseService, utilService, loggerService, jobData);
        
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should skip values and continue for response with job name not found', async () => {
        let jobData: Array<IJenkinsJob> = new JenkinsDataProviderService().getData().jobs;
        jobData[0].name = "SomeJobNameThatDoesntExist";
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let service: JenkinsJobService = new JenkinsJobService(configService, proxyCustomResponseService, utilService, loggerService, jobData);
        
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
});

function createService(data: any): JenkinsJobService {
    let service: JenkinsJobService = new JenkinsJobService(configService, proxyService, utilService, loggerService, data);
    return service;
}