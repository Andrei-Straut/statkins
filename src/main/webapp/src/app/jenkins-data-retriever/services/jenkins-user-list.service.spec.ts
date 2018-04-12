import {TestBed} from '@angular/core/testing';

import {JenkinsUserListService} from './jenkins-user-list.service';
import {IJenkinsUser} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {AndreiStrautInfoMasterUserListDataProvider} from '../../test-mock/data-provider/userList/andrei-straut-info-user-list-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();

describe('JenkinsUserListService', () => {
    
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
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.UserList);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is undefined', async () => {
        let service: JenkinsUserListService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is null', async () => {
        let service: JenkinsUserListService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is empty', async () => {
        let service: JenkinsUserListService = createService("");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is invalid', async () => {
        let service: JenkinsUserListService = createService("SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when response is empty', async () => {
        let service: JenkinsUserListService = new JenkinsUserListService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct values for response with users', async () => {
        let data: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setResponse(data);
        
        let service: JenkinsUserListService = new JenkinsUserListService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        
        expect(service.getData().length).toBe(3);
        
        expect((service.getData()[0] as IJenkinsUser).fullName).toBe("Andrei Straut");
        expect((service.getData()[1] as IJenkinsUser).fullName).toBe("andrei.straut");
        expect((service.getData()[2] as IJenkinsUser).fullName).toBe("noreply");
        expect((service.getData()[0] as IJenkinsUser).absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/andreistraut");
        expect((service.getData()[1] as IJenkinsUser).absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/andrei.straut");
        expect((service.getData()[2] as IJenkinsUser).absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/noreply");
    });
});

function createService(url: any): JenkinsUserListService {
    let service: JenkinsUserListService = new JenkinsUserListService(configService, proxyErrorService, utilService, loggerService, url);
    return service;
}
