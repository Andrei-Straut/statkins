import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsDataRetrieverComponent} from './jenkins-data-retriever.component';
import {Logger} from '../../../../node_modules/angular2-logger/core';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

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

let loggerService: Logger = undefined;
let configService: ConfigMockService = new ConfigMockService();
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsDataRetrieverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
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
    
    // TODO: 
    // isHideLoadingLabel
    // isHideSuccessfulLabel
    // isHideErrorLabel

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

    it('hasRetrieveErrors should return false if analyze() was not called', () => {
        expect(component.hasRetrieveErrors()).toBeFalsy();
    });
});
