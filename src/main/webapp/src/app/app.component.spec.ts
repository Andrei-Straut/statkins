import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {JenkinsDataRetrieverModule} from './jenkins-data-retriever/jenkins-data-retriever.module';

describe('AppComponent', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule, FormsModule, HttpModule, JenkinsDataRetrieverModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));
    
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    
    it(`should have as title 'Statkins'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.name).toEqual('Statkins');
    }));
    
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Statkins');
    }));
});
