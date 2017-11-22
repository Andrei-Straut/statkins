import {TestBed} from '@angular/core/testing';
import {JenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';

import {JenkinsActionService} from './jenkins-action.service';
import {JenkinsServiceId} from './JenkinsServiceId';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';
import {IJenkinsDataMockService} from '../../test-mock/services/jenkins-data.mock.service';

import {AndreiStrautInfoMasterBuild02DataProvider} from '../../test-mock/data-provider/build/andrei-straut-info-master-build-02-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();

describe('JenkinsActionService', () => {

    let expectedMapSize: number = 9;
    let expectedNumberOfActions: number = 46;

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
        let service: JenkinsActionService = createService(new Map<any, Array<any>>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsActionService = createService(new Map<any, Array<any>>());
        expect(service.getServiceId() === JenkinsServiceId.Actions);
    });

    it('getData should return empty when there\'s no builds in build list', () => {
        let service: JenkinsActionService = createService(new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for undefined build list', () => {
        let service: JenkinsActionService = createService(new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for null build list', () => {
        let service: JenkinsActionService = createService(new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct values for input', () => {
        let utilService = new UtilMockService();
        let service: JenkinsActionService = createService(new JenkinsDataProviderService().getData().builds);
        service.execute();

        expect(service.getData().size).toBe(expectedMapSize);
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfActions);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('all builds should have actions', () => {
        let utilService = new UtilMockService();
        let service: JenkinsActionService = createService(new JenkinsDataProviderService().getData().builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();

        Array.from(buildData.keys()).forEach(function(build: IJenkinsBuild) {
            expect(build).toBeDefined("Build was undefined");
            expect(build.actions).toBeDefined("Build " + build.url + " had no actions");
            expect(build.actions.length).toBeGreaterThanOrEqual(0);
        });
    });

    it('timeInQueueAction should be properly parsed', () => {
        let utilService = new UtilMockService();
        
        let build = new JenkinsBuild();
        let job = new JenkinsJob();
        let jenkinsDataService = new IJenkinsDataMockService();
        
        build.fromJson(new AndreiStrautInfoMasterBuild02DataProvider().getBuildData());
        job.builds.push(build);
        jenkinsDataService.jobs.push(job);
        jenkinsDataService.builds.set(job, Array.of(build));
        
        let service: JenkinsActionService = createService(jenkinsDataService.builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();
        let actions = utilService.mapToArray(buildData);
        expect(buildData.size === 1);
        expect(actions.length === 1);
        expect((actions[0]).isTimeInQueueActionClass()).toBeTruthy();
    });

    it('build without actions property should be skipped', () => {
        let utilService = new UtilMockService();
        
        let emptyBuild = new JenkinsBuild();
        let emptyJob = new JenkinsJob();
        let jenkinsDataService = new IJenkinsDataMockService();
        let jsonData = new AndreiStrautInfoMasterBuild02DataProvider().getBuildData();
        delete jsonData["actions"];
        
        emptyBuild.fromJson(jsonData);
        emptyJob.builds.push(emptyBuild);
        jenkinsDataService.jobs.push(emptyJob);
        jenkinsDataService.builds.set(emptyJob, Array.of(emptyBuild));
        
        let service: JenkinsActionService = createService(jenkinsDataService.builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();
        let actions = utilService.mapToArray(buildData);
        expect(buildData.size === 1);
        expect(actions.length === 0);
    });

    it('build without actions should be skipped', () => {
        let utilService = new UtilMockService();
        
        let emptyBuild = new JenkinsBuild();
        let emptyJob = new JenkinsJob();
        let jenkinsDataService = new IJenkinsDataMockService();
        let jsonData = new AndreiStrautInfoMasterBuild02DataProvider().getBuildData();
        jsonData["actions"] = [];
        
        emptyBuild.fromJson(jsonData);
        emptyJob.builds.push(emptyBuild);
        jenkinsDataService.jobs.push(emptyJob);
        jenkinsDataService.builds.set(emptyJob, Array.of(emptyBuild));
        
        let service: JenkinsActionService = createService(jenkinsDataService.builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();
        let actions = utilService.mapToArray(buildData);
        expect(buildData.size === 1);
        expect(actions.length === 0);
    });

    it('build without buildData should be skipped', () => {
        let utilService = new UtilMockService();
        
        let emptyBuild = new JenkinsBuild();
        let job = new JenkinsJob();
        let jenkinsDataService = new IJenkinsDataMockService();
        
        job.builds.push(emptyBuild);
        jenkinsDataService.jobs.push(job);
        jenkinsDataService.builds.set(job, Array.of(emptyBuild));
        
        let service: JenkinsActionService = createService(jenkinsDataService.builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();
        let actions = utilService.mapToArray(buildData);
        expect(buildData.size === 1);
        expect(actions.length === 0);
    });
});

function createService(data: any): JenkinsActionService {
    let service: JenkinsActionService = new JenkinsActionService(configService, utilService, loggerService, data);
    return service;
}
