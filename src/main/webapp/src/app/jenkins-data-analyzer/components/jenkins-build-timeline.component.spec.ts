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

import {JenkinsBuildTimelineComponent} from './jenkins-build-timeline.component';

describe('JenkinsBuildTimelineComponent', () => {
    let component: JenkinsBuildTimelineComponent;
    let fixture: ComponentFixture<JenkinsBuildTimelineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule],
            declarations: [JenkinsBuildTimelineComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsBuildTimelineComponent);
        component = fixture.componentInstance;
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('buildVisibility.stack should be true by default', () => {
        expect(component.buildVisibility).toBeTruthy();
        expect(component.buildVisibility.stack).toBeTruthy();
    });

    it('toggleOverlap should toggle stack state', () => {
        component.toggleOverlap();
        expect(component.buildVisibility.stack).toBeFalsy();
    });

    it('buildVisibility.queueTimes should be true by default', () => {
        expect(component.buildVisibility.queueTimes).toBeTruthy();
    });

    it('toggleQueueTimes should toggle queue times', () => {
        component.toggleQueueTimes();
        expect(component.buildVisibility.queueTimes).toBeFalsy();
    });
    
    it('buildVisibility.buildWithQTime should be true by default', () => {
        expect(component.buildVisibility.buildWithQTime).toBeTruthy();
    });

    it('toggleBuildWithQTime should toggle build with queue time', () => {
        component.toggleBuildWithQTime();
        expect(component.buildVisibility.buildWithQTime).toBeFalsy();
    });
    
    it('buildVisibility.buildWithoutQTime should be true by default', () => {
        expect(component.buildVisibility.buildWithoutQTime).toBeTruthy();
    });

    it('toggleBuildWithQTime should toggle build with queue time', () => {
        component.toggleBuildWithoutQTime();
        expect(component.buildVisibility.buildWithoutQTime).toBeFalsy();
    });
    
    it('buildVisibility.success should be true by default', () => {
        expect(component.buildVisibility.success).toBeTruthy();
    });

    it('toggleSuccessful should toggle successful', () => {
        component.toggleSuccessful();
        expect(component.buildVisibility.success).toBeFalsy();
    });
    
    it('buildVisibility.unstable should be true by default', () => {
        expect(component.buildVisibility.unstable).toBeTruthy();
    });

    it('toggleUnstable should toggle unstable', () => {
        component.toggleUnstable();
        expect(component.buildVisibility.unstable).toBeFalsy();
    });
    
    it('buildVisibility.failed should be true by default', () => {
        expect(component.buildVisibility.failed).toBeTruthy();
    });

    it('toggleFailed should toggle failed', () => {
        component.toggleFailed();
        expect(component.buildVisibility.failed).toBeFalsy();
    });
    
    it('buildVisibility.defaultGroup should be true by default', () => {
        expect(component.buildVisibility.defaultGroup).toBeTruthy();
    });

    it('toggleDefault should toggle default group', () => {
        component.toggleDefault();
        expect(component.buildVisibility.defaultGroup).toBeFalsy();
    });
    
    it('buildVisibility.isFullscreen should be false by default', () => {
        expect(component.buildVisibility.isFullscreen).toBeFalsy();
    });

    it('toggleFullscreen should toggle fullscreen', () => {
        component.toggleFullscreen();
        expect(component.buildVisibility.isFullscreen).toBeTruthy();
    });
    
    it('analyze should return a valid timeline', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        let timeline: Timeline = component.analyze(data);
        expect(timeline).toBeDefined();
    });
});
