import {TestBed} from '@angular/core/testing';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';

import {JenkinsActionService} from './jenkins-action.service';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service'

describe('JenkinsActionService', () => {

    let loggerService: Logger = undefined;
    let expectedMapSize: number = 9;
    let expectedNumberOfActions: number = 45;

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
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), new UtilMockService(), loggerService, new Map<any, Array<any>>());
        expect(service).toBeTruthy();
    });

    it('getData should return empty when there\'s no builds in build list', () => {
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), new UtilMockService(), loggerService, new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for undefined build list', () => {
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), new UtilMockService(), loggerService, new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty for null build list', () => {
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), new UtilMockService(), loggerService, new Map<any, Array<any>>());
        service.execute();

        expect(service.getData().size).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct values for input', () => {
        let utilService = new UtilMockService();
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), utilService, loggerService, new JenkinsDataProviderService().getData().builds);
        service.execute();

        expect(service.getData().size).toBe(expectedMapSize);
        expect(utilService.mapToArray(service.getData()).length).toBe(expectedNumberOfActions);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
    });

    it('all builds should have actions', () => {
        let utilService = new UtilMockService();
        let service: JenkinsActionService = new JenkinsActionService(new ConfigMockService(), utilService, loggerService, new JenkinsDataProviderService().getData().builds);
        service.execute();
        
        let buildData: Map<IJenkinsBuild, Array<IJenkinsAction>> = service.getData();

        Array.from(buildData.keys()).forEach(function(build: IJenkinsBuild) {
            expect(build).toBeDefined("Build was undefined");
            expect(build.actions).toBeDefined("Build " + build.url + " had no actions");
            expect(build.actions.length).toBeGreaterThanOrEqual(0);
        });
    });
});
