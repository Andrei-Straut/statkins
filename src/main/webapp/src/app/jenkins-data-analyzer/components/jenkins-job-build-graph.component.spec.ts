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

import {JenkinsJobBuildGraphComponent} from './jenkins-job-build-graph.component';

describe('JenkinsJobBuildGraphComponent', () => {
    let component: JenkinsJobBuildGraphComponent;
    let fixture: ComponentFixture<JenkinsJobBuildGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsJobBuildGraphComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsJobBuildGraphComponent);
        component = fixture.componentInstance;
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('analyze should return a valid timeline', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        let timeline: Timeline = component.analyze(data);
        expect(timeline).toBeDefined();
    });
});
