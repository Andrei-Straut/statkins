import {TestBed} from '@angular/core/testing';

import {JenkinsChangeSetService} from './jenkins-change-set.service';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

import {AndreiStrautInfoMasterBuild12DataProvider} from '../../test-mock/data-provider/build/andrei-straut-info-master-build-12-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();

describe('JenkinsChangeSetService', () => {

    let expectedNumberOfBuilds = 9;
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

    it('getData should return empty for build with undefined json data', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();
            (build as JenkinsBuild).jsonData = undefined;
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return empty for build with null json data', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();
            (build as JenkinsBuild).jsonData = undefined;
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return empty for build with no changeset object', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();

            if ((JSON.parse(build.getJsonData()) as JSON).hasOwnProperty("changeSet")) {
                let jsonData: JSON = JSON.parse(build.getJsonData());
                delete jsonData["changeSet"];
                build.fromJson(jsonData);
            }
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return empty for build with empty changeset object', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();

            if ((JSON.parse(build.getJsonData()) as JSON).hasOwnProperty("changeSet")) {
                let jsonData: JSON = JSON.parse(build.getJsonData());
                jsonData["changeSet"] = {};
                build.fromJson(jsonData);
            }
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return empty for build with empty changeset items', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();

            if ((JSON.parse(build.getJsonData()) as JSON).hasOwnProperty("changeSet") && ((JSON.parse(build.getJsonData())["changeSet"]) as JSON).hasOwnProperty("items")) {
                JSON.parse(build.getJsonData())["changeSet"]["items"] = [];
            }
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfChangeSets);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return empty for build with no changeset items', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();

            if ((JSON.parse(build.getJsonData()) as JSON).hasOwnProperty("changeSet") && ((JSON.parse(build.getJsonData())["changeSet"]) as JSON).hasOwnProperty("items")) {
                let jsonData: JSON = JSON.parse(build.getJsonData());
                delete jsonData["changeSet"]["items"];
                build.fromJson(jsonData);
            }
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
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

    it('getData should return correct values for cached change set and empty user list', async () => {
        let buildsMap = new JenkinsDataProviderService().getData().builds;
        let changeSetItems = ((new AndreiStrautInfoMasterBuild12DataProvider().getBuildData()["changeSet"])["items"]) as Array<JSON>;
        changeSetItems.splice(1);

        utilService.mapToArray(buildsMap).forEach(function (build: IJenkinsBuild) {
            build.changeSets = new Array<IJenkinsChangeSet>();
            let jsonData: JSON = JSON.parse(build.getJsonData());
            jsonData["changeSet"] = {};
            jsonData["changeSet"]["items"] = changeSetItems;
            build.fromJson(jsonData);
        });

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();

        expect(service.getData().size).toBe(expectedNumberOfBuilds);
         // 1 commit per build, meaning that the # of commits expected is same as number of builds
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfBuilds);
        // Check that the commit is the same for all builds
        utilService.mapToArray(service.getData()).reduce(function(first, second) {
            expect(first).toBe(second);
            return first;
        });
        
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('getData should return correct values for commit without date and empty user list', async () => {
        let buildsMap: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();
        let job: IJenkinsJob = new JenkinsJob();
        let build: IJenkinsBuild = new JenkinsBuild();
        let buildData = new AndreiStrautInfoMasterBuild12DataProvider().getBuildData();
        let timestamp = ((buildData["changeSet"]["items"])[0])["timestamp"];
        
        delete ((buildData["changeSet"]["items"])[0])["date"];
        build.fromJson(buildData);
        job.builds = Array.of(build);
        buildsMap.set(job, Array.of(build));

        let service: JenkinsChangeSetService = createService(buildsMap, new Array<any>());
        await service.execute();
        
        let changeSetTimeStamp = (utilService.mapToArray(service.getData())[0] as IJenkinsChangeSet).date.getTime();
        let changeSetStampWithLestPrecision = Math.floor(changeSetTimeStamp / 1e7);
        let timestampWithLestPrecision = Math.floor(timestamp / 1e7);

        expect(service.getData().size).toBe(1);
        expect(utilService.mapToArray(service.getData()).length).toBe(1);
        expect(changeSetStampWithLestPrecision).toBe(timestampWithLestPrecision);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });
});

function createService(builds: any, users: any): JenkinsChangeSetService {
    let service: JenkinsChangeSetService = new JenkinsChangeSetService(utilService, loggerService, builds, users);
    return service;
}
