import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import {JenkinsDataRetrieverModule} from './jenkins-data-retriever/jenkins-data-retriever.module';
import {JenkinsDataAnalyzerModule} from './jenkins-data-analyzer/jenkins-data-analyzer.module';

import {IJenkinsDataMockService} from './test-mock/services/jenkins-data.mock.service';

describe('AppComponent', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule, FormsModule, HttpModule, JenkinsDataRetrieverModule, JenkinsDataAnalyzerModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));
    
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app:AppComponent = fixture.debugElement.componentInstance;
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
