import {TestBed} from '@angular/core/testing';

import {JenkinsViewService} from './jenkins-view.service';
import {JenkinsViewListService} from './jenkins-view-list.service';
import {IJenkinsView} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';
import {AndreiStrautInfoMasterViewListDataProvider} from '../../test-mock/data-provider/viewList/andrei-straut-info-view-list-data-provider';
import {AndreiStrautInfoAllViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-all-view-data-provider';
import {AndreiStrautInfoAndreiStrautInfoViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-andrei-straut-info-view-data-provider';
import {AndreiStrautInfoDRPViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-drp-view-data-provider';
import {AndreiStrautInfoGAPSViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-gaps-view-data-provider';
import {AndreiStrautInfoJenkinsTSTypingsViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-jenkins-ts-typings-view-data-provider';
import {AndreiStrautInfoMonkinsViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-monkins-view-data-provider';
import {AndreiStrautInfoOtherViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-other-view-data-provider';
import {AndreiStrautInfoStatkinsViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-statkins-view-data-provider';
import {AndreiStrautInfoTLDRViewDataProvider} from '../../test-mock/data-provider/view/andrei-straut-info-tldr-view-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();

describe('JenkinsViewService', () => {
    
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
        let service: JenkinsViewService = createService("SomeUrl", new Array<any>(), new Array<any>());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsViewService = createService("SomeUrl", new Array<any>(), new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Views);
    });

    it('isComplete and completedSuccssfully should be false at initialization', () => {
        let service: JenkinsViewService = createService("SomeUrl", new Array<any>(), new Array<any>());
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when viewList is undefined', async () => {
        let service: JenkinsViewService = createService("SomeUrl", undefined, undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when viewList is null', async () => {
        let service: JenkinsViewService = createService("SomeUrl", null, undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when viewList is emtpy', async () => {
        let service: JenkinsViewService = createService("SomeUrl", new Array<IJenkinsView>(), undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return skip and continue on view proxy error', async () => {
        let viewListJsonData: JSON = new AndreiStrautInfoMasterViewListDataProvider().getViewListData();
        let proxyViewListService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyViewListService.setDefaultResponse(viewListJsonData);
        
        let viewListService: JenkinsViewListService = new JenkinsViewListService(
            configService, proxyViewListService, utilService, loggerService, configService.liveJenkinsURL);
        await viewListService.execute();
        let viewListData = viewListService.getData();
        
        let service: JenkinsViewService = new JenkinsViewService(
            configService, proxyErrorService, utilService, loggerService, configService.liveJenkinsURL, viewListData, new Array<IJenkinsJob>());
        await service.execute();

        expect(service.getData().length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return skip and continue on response with invalid views', async () => {
        let viewListJsonData: JSON = new AndreiStrautInfoMasterViewListDataProvider().getViewListData();
        let proxyViewListService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyViewListService.setDefaultResponse(viewListJsonData);
        
        let viewListService: JenkinsViewListService = new JenkinsViewListService(
            configService, proxyViewListService, utilService, loggerService, configService.liveJenkinsURL);
        await viewListService.execute();
        let viewListData = viewListService.getData();
        
        let allViewData = new AndreiStrautInfoAllViewDataProvider().getViewData();
        let andreiStrautInfoViewData = new AndreiStrautInfoAndreiStrautInfoViewDataProvider().getViewData();
        let drpViewData = new AndreiStrautInfoDRPViewDataProvider().getViewData();
        let gapsViewData = new AndreiStrautInfoGAPSViewDataProvider().getViewData();
        let jenkinsTSTypingsViewData = new AndreiStrautInfoJenkinsTSTypingsViewDataProvider().getViewData();
        let monkinsViewData = new AndreiStrautInfoMonkinsViewDataProvider().getViewData();
        let otherViewData = new AndreiStrautInfoOtherViewDataProvider().getViewData();
        let statkinsViewData = new AndreiStrautInfoStatkinsViewDataProvider().getViewData();
        let tldrViewData = new AndreiStrautInfoTLDRViewDataProvider().getViewData();
        
        let allViewDataName = allViewData["name"];
        let andreiStrautInfoViewDataName = andreiStrautInfoViewData["name"];
        let drpViewDataName = drpViewData["name"];
        let gapsViewDataName = gapsViewData["name"];
        let jenkinsTSTypingsViewDataName = jenkinsTSTypingsViewData["name"];
        let monkinsViewDataName = monkinsViewData["name"];
        let otherViewDataName = otherViewData["name"];
        let statkinsViewDataName = statkinsViewData["name"];
        let tldrViewDataName = tldrViewData["name"];
        
        allViewData["name"] = "SomeViewNameThatDoesntExist";
        andreiStrautInfoViewData["name"] = "SomeViewNameThatDoesntExist";
        drpViewData["name"] = "SomeViewNameThatDoesntExist";
        gapsViewData["name"] = "SomeViewNameThatDoesntExist";
        jenkinsTSTypingsViewData["name"] = "SomeViewNameThatDoesntExist";
        monkinsViewData["name"] = "SomeViewNameThatDoesntExist";
        otherViewData["name"] = "SomeViewNameThatDoesntExist";
        statkinsViewData["name"] = "SomeViewNameThatDoesntExist";
        tldrViewData["name"] = "SomeViewNameThatDoesntExist";

        let proxyViewService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyViewService.addResponse(replace(allViewDataName, allViewData["url"]), allViewData);
        proxyViewService.addResponse(replace(andreiStrautInfoViewDataName, andreiStrautInfoViewData["url"]), andreiStrautInfoViewData);
        proxyViewService.addResponse(replace(drpViewDataName, drpViewData["url"]), drpViewData);
        proxyViewService.addResponse(replace(gapsViewDataName, gapsViewData["url"]), gapsViewData);
        proxyViewService.addResponse(replace(jenkinsTSTypingsViewDataName, jenkinsTSTypingsViewData["url"]), jenkinsTSTypingsViewData);
        proxyViewService.addResponse(replace(monkinsViewDataName, monkinsViewData["url"]), monkinsViewData);
        proxyViewService.addResponse(replace(otherViewDataName, otherViewData["url"]), otherViewData);
        proxyViewService.addResponse(replace(statkinsViewDataName, statkinsViewData["url"]), statkinsViewData);
        proxyViewService.addResponse(replace(tldrViewDataName, tldrViewData["url"]), tldrViewData);

        let service: JenkinsViewService = new JenkinsViewService(
            configService, proxyViewService, utilService, loggerService, configService.liveJenkinsURL, viewListData, new Array<IJenkinsJob>());
        await service.execute();

        expect(service.getData().length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return correct results even when jobList is undefined', async () => {
        let viewListJsonData: JSON = new AndreiStrautInfoMasterViewListDataProvider().getViewListData();
        let proxyViewListService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyViewListService.setDefaultResponse(viewListJsonData);
        
        let viewListService: JenkinsViewListService = new JenkinsViewListService(
            configService, proxyViewListService, utilService, loggerService, configService.liveJenkinsURL);
        await viewListService.execute();
        let viewListData = viewListService.getData();
        
        let proxyViewService = configureViewProxy();
        let service: JenkinsViewService = new JenkinsViewService(
            configService, proxyViewService, utilService, loggerService, configService.liveJenkinsURL, viewListData, new Array<IJenkinsJob>());
        await service.execute();

        expect(service.getData().length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });

    it('getData should return correct results for response with views', async () => {
        let viewListJsonData: JSON = new AndreiStrautInfoMasterViewListDataProvider().getViewListData();
        let proxyViewListService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyViewListService.setDefaultResponse(viewListJsonData);
        
        let viewListService: JenkinsViewListService = new JenkinsViewListService(
            configService, proxyViewListService, utilService, loggerService, configService.liveJenkinsURL);
        await viewListService.execute();
        let viewListData = viewListService.getData();
        
        let jobsList = new JenkinsDataProviderService().getData().jobs;
        
        let proxyViewService = configureViewProxy();
        let service: JenkinsViewService = new JenkinsViewService(
            configService, proxyViewService, utilService, loggerService, configService.liveJenkinsURL, viewListData, jobsList);
        await service.execute();

        expect(service.getData().length).toBe(9);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
});

function createService(url: any, viewList: any, jobList: any): JenkinsViewService {
    let service: JenkinsViewService = new JenkinsViewService(configService, proxyErrorService, utilService, loggerService, url, viewList, jobList);
    return service;
}

function configureViewProxy(): ProxyCustomResponseMockService {

    let allViewData = new AndreiStrautInfoAllViewDataProvider().getViewData();
    let andreiStrautInfoViewData = new AndreiStrautInfoAndreiStrautInfoViewDataProvider().getViewData();
    let drpViewData = new AndreiStrautInfoDRPViewDataProvider().getViewData();
    let gapsViewData = new AndreiStrautInfoGAPSViewDataProvider().getViewData();
    let jenkinsTSTypingsViewData = new AndreiStrautInfoJenkinsTSTypingsViewDataProvider().getViewData();
    let monkinsViewData = new AndreiStrautInfoMonkinsViewDataProvider().getViewData();
    let otherViewData = new AndreiStrautInfoOtherViewDataProvider().getViewData();
    let statkinsViewData = new AndreiStrautInfoStatkinsViewDataProvider().getViewData();
    let tldrViewData = new AndreiStrautInfoTLDRViewDataProvider().getViewData();

    let proxyViewService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
    proxyViewService.addResponse(replace(allViewData["name"], allViewData["url"]), allViewData);
    proxyViewService.addResponse(replace(andreiStrautInfoViewData["name"], andreiStrautInfoViewData["url"]), andreiStrautInfoViewData);
    proxyViewService.addResponse(replace(drpViewData["name"], drpViewData["url"]), drpViewData);
    proxyViewService.addResponse(replace(gapsViewData["name"], gapsViewData["url"]), gapsViewData);
    proxyViewService.addResponse(replace(jenkinsTSTypingsViewData["name"], jenkinsTSTypingsViewData["url"]), jenkinsTSTypingsViewData);
    proxyViewService.addResponse(replace(monkinsViewData["name"], monkinsViewData["url"]), monkinsViewData);
    proxyViewService.addResponse(replace(otherViewData["name"], otherViewData["url"]), otherViewData);
    proxyViewService.addResponse(replace(statkinsViewData["name"], statkinsViewData["url"]), statkinsViewData);
    proxyViewService.addResponse(replace(tldrViewData["name"], tldrViewData["url"]), tldrViewData);

    return proxyViewService;
}

function replace(viewName: string, url: string) {
    return url.replace(/\/$/, "") + '/' + configService.viewSuffix + encodeURI(viewName) + "/" + configService.apiSuffix;
}
