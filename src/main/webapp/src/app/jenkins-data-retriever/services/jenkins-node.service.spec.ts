import {TestBed} from '@angular/core/testing';

import {JenkinsNodeService} from './jenkins-node.service';
import {IJenkinsNode} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {AndreiStrautInfoMasterNodeDataProvider} from '../../test-mock/data-provider/node/andrei-straut-info-master-node-data-provider';
import {JenkinsServiceId} from './JenkinsServiceId';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();

describe('JenkinsNodeService', () => {
    
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
        let service: JenkinsNodeService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsNodeService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.Nodes);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsNodeService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is undefined', async () => {
        let service: JenkinsNodeService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is null', async () => {
        let service: JenkinsNodeService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is empty', async () => {
        let service: JenkinsNodeService = createService("");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is invalid', async () => {
        let service: JenkinsNodeService = createService("SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when response is empty', async () => {
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when response has no computer property', async () => {
        let data: JSON = new AndreiStrautInfoMasterNodeDataProvider().getNodeData();
        delete data["computer"];
        
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setDefaultResponse(data);
        
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return correct values for response with computer', async () => {
        let data: JSON = new AndreiStrautInfoMasterNodeDataProvider().getNodeData();
        
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setDefaultResponse(data);
        
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeTruthy();
        
        expect(service.getData().length).toBe(2);
        
        expect((service.getData()[0] as IJenkinsNode).displayName).toBe("master");
        expect((service.getData()[0] as IJenkinsNode).url).toBe("SomeUrl/computer/master");
        expect((service.getData()[0] as IJenkinsNode).executors.length).toBe(1);
        expect((service.getData()[0] as IJenkinsNode).offline).toBe(false);
        expect((service.getData()[0] as IJenkinsNode).actions.length).toBe(0);
        
        expect((service.getData()[1] as IJenkinsNode).displayName).toBe("master_secondary");
        expect((service.getData()[1] as IJenkinsNode).url).toBe("SomeUrl/computer/master_secondary");
        expect((service.getData()[1] as IJenkinsNode).executors.length).toBe(1);
        expect((service.getData()[1] as IJenkinsNode).offline).toBe(false);
        expect((service.getData()[1] as IJenkinsNode).actions.length).toBe(0);
    });
});

function createService(url: any): JenkinsNodeService {
    let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyErrorService, utilService, loggerService, url);
    return service;
}
