import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import {Logger} from '../../node_modules/angular2-logger/core';
import {ConfigService } from './config/services/config.service';
import {ProxyService } from './proxy/services/proxy.service';
import {UtilService } from './util/services/util.service';

import {JenkinsDataRetrieverModule} from './jenkins-data-retriever/jenkins-data-retriever.module';
import {JenkinsDataAnalyzerModule} from './jenkins-data-analyzer/jenkins-data-analyzer.module';

import {IJenkinsDataMockService} from './test-mock/services/jenkins-data.mock.service';
import {UtilMockService} from './test-mock/services/util.mock.service';
import {ConfigMockService} from './test-mock/services/config.mock.service';
import {ProxyMockService} from './test-mock/services/proxy.mock.service';

let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyService: ProxyMockService = new ProxyMockService();

describe('AppComponent', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule, FormsModule, HttpModule, JenkinsDataRetrieverModule, JenkinsDataAnalyzerModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [ConfigService, ProxyService, UtilService, Logger]
        }).compileComponents();
    }));
    
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    
    it('should create the app when all required parameters are provided', async(() => {
        const app:AppComponent = new AppComponent(undefined, configService, proxyService, utilService);
        expect(app).toBeTruthy();
    }));
    
    it(`should have as title 'Statkins'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app.name).toEqual('Statkins');
    }));
    
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Statkins');
    }));
    
    it('configService should be created', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app.configService).toBeTruthy();
    }));
    
    it('should throw error when configService not injected', async(() => {
        expect(function() {
            new AppComponent(undefined, undefined, proxyService, utilService);
        }).toThrow();
    }));
    
    it('proxyService should be created', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app.proxyService).toBeTruthy();
    }));
    
    it('should throw error when proxyService not injected', async(() => {
        expect(function() {
            new AppComponent(undefined, configService, undefined, utilService);
        }).toThrow();
    }));
    
    it('utilService should be created', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app.configService).toBeTruthy();
    }));
    
    it('should throw error when utilService not injected', async(() => {
        expect(function() {
            new AppComponent(undefined, configService, proxyService, undefined);
        }).toThrow();
    }));
    
    it('jenkinsData should be undefined when component is started', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        expect(app.jenkinsData).toBeUndefined();
    }));
    
    it('jenkinsData should have correct value when onDataRetrieved is triggered', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
        const data: IJenkinsData = new IJenkinsDataMockService();
        app.onDataRetrieved(data);
        expect(app.jenkinsData).toBeDefined();
        expect(app.jenkinsData).toBe(data);
    }));
});
