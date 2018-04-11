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

import {JenkinsFileChangesGraphComponent} from './jenkins-file-changes-graph.component';

describe('JenkinsFileChangesGraphComponent', () => {
    let component: JenkinsFileChangesGraphComponent;
    let fixture: ComponentFixture<JenkinsFileChangesGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsFileChangesGraphComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsFileChangesGraphComponent);
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
        expect(timeline).toBeTruthy();
    });
});
