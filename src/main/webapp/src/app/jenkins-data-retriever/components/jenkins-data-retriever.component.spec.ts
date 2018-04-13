import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsDataRetrieverComponent} from './jenkins-data-retriever.component';
import {Logger} from '../../../../node_modules/angular2-logger/core';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

import {IJenkinsDataRetrieverService} from '../services/IJenkinsDataRetrieverService'
import {JenkinsNodeService} from '../services/jenkins-node.service';
import {JenkinsUserListService} from '../services/jenkins-user-list.service';
import {JenkinsUserService} from '../services/jenkins-user.service';
import {JenkinsJobListService} from '../services/jenkins-job-list.service';
import {JenkinsJobService} from '../services/jenkins-job.service';
import {JenkinsViewListService} from '../services/jenkins-view-list.service';
import {JenkinsViewService} from '../services/jenkins-view.service';
import {JenkinsBuildListService} from '../services/jenkins-build-list.service';
import {JenkinsBuildService} from '../services/jenkins-build.service';
import {JenkinsChangeSetService} from '../services/jenkins-change-set.service';
import {JenkinsActionService} from '../services/jenkins-action.service';

import {AndreiStrautInfoMasterNodeDataProvider} from '../../test-mock/data-provider/node/andrei-straut-info-master-node-data-provider';

let loggerService: Logger = undefined;
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();
let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
let utilService: UtilMockService = new UtilMockService();

describe('JenkinsDataRetrieverComponent', () => {
    let component: JenkinsDataRetrieverComponent;
    let fixture: ComponentFixture<JenkinsDataRetrieverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, ConfigModule, ProxyModule, UtilModule],
            declarations: [JenkinsDataRetrieverComponent]
        }).compileComponents();

        if (loggerService == undefined || loggerService == null) {
            loggerService = TestBed.get(Logger);
            loggerService.level = 0;
        }
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsDataRetrieverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('getData should return an object if analyze() was not called', () => {
        expect(component.getData()).toBeDefined();
    });

    it('isHideUrlCheckLoadingLabel should return false if analyze() was not called', () => {
        expect(component.isHideUrlCheckLoadingLabel()).toBeFalsy();
    });

    it('isHideUrlCheckLoadingLabel should return false if urlCheckStarted = true and urlCheckFinished = false', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = false;
        expect(component.isHideUrlCheckLoadingLabel()).toBeFalsy();
    });

    it('isHideUrlCheckLoadingLabel should return true if urlCheckStarted = true and urlCheckFinished = true', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = true;
        expect(component.isHideUrlCheckLoadingLabel()).toBeTruthy();
    });

    it('isHideUrlCheckSuccessfulLabel should return false if analyze() was not called', () => {
        expect(component.isHideUrlCheckLoadingLabel()).toBeFalsy();
    });

    it('isHideUrlCheckSuccessfulLabel should return true if urlCheckStarted = true and urlCheckFinished = false', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = false;
        expect(component.isHideUrlCheckSuccessfulLabel()).toBeTruthy();
    });

    it('isHideUrlCheckSuccessfulLabel should return false if urlCheckStarted = true, urlCheckFinished = true and urlCheckSuccessful = true', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = true;
        component.urlCheckSuccessful = true;
        expect(component.isHideUrlCheckSuccessfulLabel()).toBe(!component.urlCheckSuccessful);
    });

    it('isHideUrlCheckSuccessfulLabel should return false if urlCheckStarted = true, urlCheckFinished = true and urlCheckSuccessful = false', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = true;
        component.urlCheckSuccessful = false;
        expect(component.isHideUrlCheckSuccessfulLabel()).toBe(!component.urlCheckSuccessful);
    });

    it('isHideUrlCheckSuccessfulLabel should return true if urlCheckStarted = false and urlCheckFinished = false', () => {
        component.urlCheckStarted = false;
        component.urlCheckFinished = false;
        expect(component.isHideUrlCheckSuccessfulLabel()).toBeTruthy();
    });
    
    it('isHideUrlCheckErrorLabel should return true if analyze() was not called', () => {
        expect(component.isHideUrlCheckErrorLabel()).toBeTruthy();
    });

    it('isHideUrlCheckErrorLabel should return true if urlCheckStarted = true and urlCheckFinished = false', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = false;
        expect(component.isHideUrlCheckErrorLabel()).toBeTruthy();
    });

    it('isHideUrlCheckErrorLabel should return false if urlCheckStarted = true, urlCheckFinished = true and urlCheckSuccessful = true', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = true;
        component.urlCheckSuccessful = true;
        expect(component.isHideUrlCheckErrorLabel()).toBe(component.urlCheckSuccessful);
    });

    it('isHideUrlCheckErrorLabel should return false if urlCheckStarted = true, urlCheckFinished = true and urlCheckSuccessful = false', () => {
        component.urlCheckStarted = true;
        component.urlCheckFinished = true;
        component.urlCheckSuccessful = false;
        expect(component.isHideUrlCheckErrorLabel()).toBe(component.urlCheckSuccessful);
    });

    it('isHideUrlCheckErrorLabel should return true if urlCheckStarted = false and urlCheckFinished = false', () => {
        component.urlCheckStarted = false;
        component.urlCheckFinished = false;
        expect(component.isHideUrlCheckErrorLabel()).toBeTruthy();
    });

    it('isHideLoadingLabel should return false for all services if analyze() was not called', () => {
        expect(component.isHideLoadingLabel(new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsUserListService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsUserService(configService, proxyService, utilService, loggerService, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsJobListService(configService, proxyService, loggerService, "someUrl"))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsJobService(configService, proxyService, utilService, loggerService, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsViewListService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsViewService(configService, proxyService, utilService, loggerService, "someUrl", undefined, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsBuildListService(utilService, loggerService, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsBuildService(configService, proxyService, utilService, loggerService, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsChangeSetService(utilService, loggerService, undefined, undefined))).toBeFalsy();
        expect(component.isHideLoadingLabel(new JenkinsActionService(configService, utilService, loggerService, undefined))).toBeFalsy();
    });

    it('isHideLoadingLabel should return true for all services when retrieval is finished', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideLoadingLabel(new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsUserListService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsUserService(configService, proxyService, utilService, loggerService, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsJobListService(configService, proxyService, loggerService, "someUrl"))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsJobService(configService, proxyService, utilService, loggerService, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsViewListService(configService, proxyService, utilService, loggerService, "someUrl"))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsViewService(configService, proxyService, utilService, loggerService, "someUrl", undefined, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsBuildListService(utilService, loggerService, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsBuildService(configService, proxyService, utilService, loggerService, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsChangeSetService(utilService, loggerService, undefined, undefined))).toBeTruthy();
        expect(component.isHideLoadingLabel(new JenkinsActionService(configService, utilService, loggerService, undefined))).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return true if service is undefined', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideSuccessfulLabel(undefined)).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return true if service is null', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideSuccessfulLabel(null)).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return true if analyze was not called', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideSuccessfulLabel(service)).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return true if service is not finished', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideSuccessfulLabel(service)).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return true if isDataComplete is false', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        await service.execute();
        
        expect(component.isHideSuccessfulLabel(service)).toBeTruthy();
    });

    it('isHideSuccessfulLabel should return false if isDataComplete is true', async () => {
        let data: JSON = new AndreiStrautInfoMasterNodeDataProvider().getNodeData();
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setDefaultResponse(data);
        
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();
        
        expect(component.isHideSuccessfulLabel(service)).toBeFalsy();
    });

    it('isHideIncompleteLabel should return true if service is undefined', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideIncompleteLabel(undefined)).toBeTruthy();
    });

    it('isHideIncompleteLabel should return true if service is null', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideIncompleteLabel(undefined)).toBeTruthy();
    });

    it('isHideIncompleteLabel should return true if analyze was not called', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideIncompleteLabel(service)).toBeTruthy();
    });

    it('isHideIncompleteLabel should return true if service is not finished', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideIncompleteLabel(service)).toBeTruthy();
    });

    it('isHideIncompleteLabel should return true if isDataComplete is false', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        await service.execute();
        
        expect(component.isHideIncompleteLabel(service)).toBeTruthy();
    });

    it('isHideIncompleteLabel should return true if isDataComplete is true', async () => {
        let data: JSON = new AndreiStrautInfoMasterNodeDataProvider().getNodeData();
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setDefaultResponse(data);
        
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();
        
        expect(component.isHideIncompleteLabel(service)).toBeTruthy();
    });
    
    it('isHideErrorLabel should return true if service is undefined', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideErrorLabel(undefined)).toBeTruthy();
    });

    it('isHideErrorLabel should return true if service is null', () => {
        component.retrievalStarted = true;
        component.retrievalFinished = true;
        
        expect(component.isHideErrorLabel(undefined)).toBeTruthy();
    });

    it('isHideErrorLabel should return true if analyze was not called', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideErrorLabel(service)).toBeTruthy();
    });

    it('isHideErrorLabel should return true if service is not finished', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        
        expect(component.isHideErrorLabel(service)).toBeTruthy();
    });

    it('isHideErrorLabel should return false if isDataComplete is false', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        await service.execute();
        
        expect(component.isHideErrorLabel(service)).toBeFalsy();
    });

    it('isHideErrorLabel should return true if isDataComplete is true', async () => {
        let data: JSON = new AndreiStrautInfoMasterNodeDataProvider().getNodeData();
        let proxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        proxyService.setDefaultResponse(data);
        
        let service: JenkinsNodeService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "SomeUrl");
        await service.execute();
        
        expect(component.isHideErrorLabel(service)).toBeTruthy();
    });

    it('hasRetrieveErrors should return false if analyze() was not called', () => {
        expect(component.hasRetrieveErrors()).toBeFalsy();
    });

    it('hasRetrieveErrors should return true if nodeService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyErrorService, utilService, loggerService, "someUrl");
        component.services.nodeService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if nodeService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsNodeService(configService, proxyService, utilService, loggerService, "someUrl");
        component.services.nodeService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if userListService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsUserListService(configService, proxyErrorService, utilService, loggerService, "someUrl");
        component.services.userListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if userListService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsUserListService(configService, proxyService, utilService, loggerService, "someUrl");
        component.services.userListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if userService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsUserService(configService, proxyErrorService, utilService, loggerService, undefined);
        component.services.userService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if userService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsUserService(configService, proxyService, utilService, loggerService, undefined);
        component.services.userService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if jobListService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsJobListService(configService, proxyErrorService, loggerService, "someUrl");
        component.services.jobListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if jobListService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsJobListService(configService, proxyService, loggerService, "someUrl");
        component.services.jobListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if jobService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsJobService(configService, proxyErrorService, utilService, loggerService, undefined);
        component.services.jobService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if jobService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsJobService(configService, proxyService, utilService, loggerService, undefined);
        component.services.jobService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if viewListService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsViewListService(configService, proxyErrorService, utilService, loggerService, "someUrl");
        component.services.viewListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if viewListService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsViewListService(configService, proxyService, utilService, loggerService, "someUrl");
        component.services.viewListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if viewService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsViewService(configService, proxyErrorService, utilService, loggerService, "someUrl", undefined, undefined);
        component.services.viewService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if viewService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsViewService(configService, proxyService, utilService, loggerService, "someUrl", undefined, undefined);
        component.services.viewService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if buildListService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsBuildListService(utilService, loggerService, undefined);
        component.services.buildListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if buildListService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsBuildListService(utilService, loggerService, undefined);
        component.services.buildListService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if buildService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService =  new JenkinsBuildService(configService, proxyErrorService, utilService, loggerService, undefined);
        component.services.buildService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if buildService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService =  new JenkinsBuildService(configService, proxyService, utilService, loggerService, undefined);
        component.services.buildService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if changeSetService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsChangeSetService(utilService, loggerService, undefined, undefined);
        component.services.changeSetService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if changeSetService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsChangeSetService(utilService, loggerService, undefined, undefined);
        component.services.changeSetService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
    
    it('hasRetrieveErrors should return true if actionService ended with errors', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsActionService(configService, utilService, loggerService, undefined);
        component.services.actionService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });

    it('hasRetrieveErrors should return true if actionService has data incomplete', async () => {
        let service: IJenkinsDataRetrieverService = new JenkinsActionService(configService, utilService, loggerService, undefined);
        component.services.actionService = service;
        await service.execute();
        
        expect(component.hasRetrieveErrors()).toBeTruthy();
    });
});
