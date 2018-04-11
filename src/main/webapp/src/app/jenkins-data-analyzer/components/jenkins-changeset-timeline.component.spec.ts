import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {Timeline} from 'vis';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

import {JenkinsChangeSetTimelineComponent} from './jenkins-changeset-timeline.component';

describe('JenkinsChangesetTimelineComponent', () => {
    let component: JenkinsChangeSetTimelineComponent;
    let fixture: ComponentFixture<JenkinsChangeSetTimelineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsChangeSetTimelineComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsChangeSetTimelineComponent);
        component = fixture.componentInstance;
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('groupVisibility.stack should be true by default', () => {
        expect(component.groupVisibility).toBeTruthy();
        expect(component.groupVisibility.stack).toBeTruthy();
    });

    it('toggleOverlap should toggle stack state', () => {
        component.toggleOverlap();
        expect(component.groupVisibility.stack).toBeFalsy();
    });
    
    it('groupVisibility.success should be true by default', () => {
        expect(component.groupVisibility.success).toBeTruthy();
    });

    it('toggleSuccessful should toggle successful', () => {
        component.toggleSuccessful();
        expect(component.groupVisibility.success).toBeFalsy();
    });
    
    it('groupVisibility.unstable should be true by default', () => {
        expect(component.groupVisibility.unstable).toBeTruthy();
    });

    it('toggleUnstable should toggle unstable', () => {
        component.toggleUnstable();
        expect(component.groupVisibility.unstable).toBeFalsy();
    });
    
    it('groupVisibility.failed should be true by default', () => {
        expect(component.groupVisibility.failed).toBeTruthy();
    });

    it('toggleFailed should toggle failed', () => {
        component.toggleFailed();
        expect(component.groupVisibility.failed).toBeFalsy();
    });
    
    it('groupVisibility.defaultGroup should be true by default', () => {
        expect(component.groupVisibility.defaultGroup).toBeTruthy();
    });

    it('toggleDefault should toggle default group', () => {
        component.toggleDefault();
        expect(component.groupVisibility.defaultGroup).toBeFalsy();
    });
    
    it('groupVisibility.isFullscreen should be false by default', () => {
        expect(component.groupVisibility.isFullscreen).toBeFalsy();
    });

    it('groupVisibility should toggle fullscreen', () => {
        component.toggleFullscreen();
        expect(component.groupVisibility.isFullscreen).toBeTruthy();
    });
    
    it('analyze should return a valid timeline', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        let timeline: Timeline = component.analyze(data);
        expect(timeline).toBeDefined();
    });

});
