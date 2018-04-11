import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {Graph2d} from 'vis';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';
import {JenkinsAverageBuildDurationGraphComponent} from './jenkins-average-build-duration-graph.component';

describe('JenkinsAverageBuildDurationGraphComponent', () => {
    let component: JenkinsAverageBuildDurationGraphComponent;
    let fixture: ComponentFixture<JenkinsAverageBuildDurationGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsAverageBuildDurationGraphComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsAverageBuildDurationGraphComponent);
        component = fixture.componentInstance;
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('analyze should return a valid graph', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        let graph: Graph2d = component.analyze(data);
        expect(graph).toBeDefined();
    });
});
