import {TestBed} from '@angular/core/testing';

import {JenkinsViewListService} from './jenkins-view-list.service';
import {IJenkinsView} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {AndreiStrautInfoMasterViewListDataProvider} from '../../test-mock/data-provider/viewList/andrei-straut-info-view-list-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();

describe('JenkinsViewListService', () => {
    
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
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service.getServiceId() === JenkinsServiceId.ViewList);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is undefined', async () => {
        let service: JenkinsViewListService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is null', async () => {
        let service: JenkinsViewListService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is empty', async () => {
        let service: JenkinsViewListService = createService("");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when url is invalid', async () => {
        let service: JenkinsViewListService = createService("SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when response is empty', async () => {
        let service: JenkinsViewListService = new JenkinsViewListService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct values for response with views', async () => {
        let data: JSON = new AndreiStrautInfoMasterViewListDataProvider().getViewListData();
        
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setResponse(data);
        
        let service: JenkinsViewListService = new JenkinsViewListService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();

        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        
        expect(service.getData().length).toBe(9);
        
        expect((service.getData()[0] as IJenkinsView).name).toBe("DRP");
        expect((service.getData()[1] as IJenkinsView).name).toBe("GAPS");
        expect((service.getData()[2] as IJenkinsView).name).toBe("Jenkins API Typings");
        expect((service.getData()[8] as IJenkinsView).name).toBe("andreistraut.info");
        expect((service.getData()[0] as IJenkinsView).url).toBe("https://www.andreistraut.info/jenkins/view/DRP/");
        expect((service.getData()[1] as IJenkinsView).url).toBe("https://www.andreistraut.info/jenkins/view/GAPS/");
        expect((service.getData()[2] as IJenkinsView).url).toBe("https://www.andreistraut.info/jenkins/view/Jenkins%20API%20Typings/");
        expect((service.getData()[8] as IJenkinsView).url).toBe("https://www.andreistraut.info/jenkins/view/andreistraut.info/");
    });
});

function createService(url: any): JenkinsViewListService {
    let service: JenkinsViewListService = new JenkinsViewListService(configService, proxyErrorService, utilService, loggerService, url);
    return service;
}
