import {TestBed} from '@angular/core/testing';

import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJobListService} from './jenkins-job-list.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyEmptyResponseMockService} from '../../test-mock/services/proxy.empty-response.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyEmptyResponseService: ProxyEmptyResponseMockService = new ProxyEmptyResponseMockService();

describe('JenkinsJobListService', () => {
    
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
        let service: JenkinsJobListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsJobListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.JobList);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsJobListService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is undefined', async () => {
        let service: JenkinsJobListService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is null', async () => {
        let service: JenkinsJobListService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is empty', async () => {
        let service: JenkinsJobListService = createService("");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is invalid', async () => {
        let service: JenkinsJobListService = createService("SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when response is empty', async () => {
        let service: JenkinsJobListService = new JenkinsJobListService(configService, proxyEmptyResponseService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct values for response with jobs', async () => {
        let response: any = {
            "jobs": [
                {
                    "_class": "hudson.maven.MavenModuleSet",
                    "name": "andreistraut.info-master",
                    "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/",
                    "color": "blue"
                },
                {
                    "_class": "hudson.maven.MavenModuleSet",
                    "name": "andreistraut.info-release",
                    "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-release/",
                    "color": "blue"
                },
                {
                    "_class": "hudson.maven.MavenModuleSet",
                    "name": "drp-master",
                    "url": "https://www.andreistraut.info/jenkins/job/drp-master/",
                    "color": "blue"
                }]
        };
        
        let proxyCustomResponseService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService(JSON.parse(JSON.stringify(response)));
        let service: JenkinsJobListService = new JenkinsJobListService(configService, proxyCustomResponseService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        
        expect(service.getData().length).toBe(3);
        expect((service.getData()[0] as IJenkinsJob).name).toBe("andreistraut.info-master");
        expect((service.getData()[1] as IJenkinsJob).name).toBe("andreistraut.info-release");
        expect((service.getData()[2] as IJenkinsJob).name).toBe("drp-master");
        expect((service.getData()[0] as IJenkinsJob).url).toBe("https://www.andreistraut.info/jenkins/job/andreistraut.info-master/");
        expect((service.getData()[1] as IJenkinsJob).url).toBe("https://www.andreistraut.info/jenkins/job/andreistraut.info-release/");
        expect((service.getData()[2] as IJenkinsJob).url).toBe("https://www.andreistraut.info/jenkins/job/drp-master/");
    });
});

function createService(url: any): JenkinsJobListService {
    let service: JenkinsJobListService = new JenkinsJobListService(configService, proxyErrorService, loggerService, url);
    return service;
}
