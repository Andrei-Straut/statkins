import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {JenkinsDataProviderService} from '../../test-mock/services/jenkins-data-provider.service';
import {StatisticsCardEntry} from '../services/StatisticsCardEntry';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';
import {UtilMockService} from '../../test-mock/services/util.mock.service';

import {JenkinsBasicStatisticsComponent} from './jenkins-basic-statistics.component';

describe('JenkinsBasicStatisticsComponent', () => {
    let component: JenkinsBasicStatisticsComponent;
    let fixture: ComponentFixture<JenkinsBasicStatisticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
            ],
            declarations: [JenkinsBasicStatisticsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsBasicStatisticsComponent);
        component = fixture.componentInstance;
        component.utilService = new UtilMockService();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    
    it('analyze should instantiate sub components', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        component.analyze(data);
        
        expect(component.basicJobStatistics).toBeDefined();
        expect(component.basicBuildStatistics).toBeDefined();
        expect(component.basicCommitStatistics).toBeDefined();
        expect(component.basicNodeStatistics).toBeDefined();
    });
    
    it('basicJobStatistics should have correct data after analyze', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        component.analyze(data);
        
        let basicJobEntry:StatisticsCardEntry = component.basicJobStatistics;
        expect(basicJobEntry.title).toBe("Jobs");
        expect(basicJobEntry.subTitle).toBe("Number Of Jobs: 3");
        expect(basicJobEntry.contents.length).toBe(7);
    });
    
    it('basicBuildStatistics should have correct data after analyze', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        component.analyze(data);
        
        let basicBuildEntry: StatisticsCardEntry = component.basicBuildStatistics;
        expect(basicBuildEntry.title).toBe("Builds");
        expect(basicBuildEntry.subTitle).toBe("Number Of Builds: 9");
        expect(basicBuildEntry.contents.length).toBe(7);
    });
    
    it('basicCommitStatistics should have correct data after analyze', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        component.analyze(data);
        
        let basicCommitEntry: StatisticsCardEntry = component.basicCommitStatistics;
        expect(basicCommitEntry.title).toBe("Commits");
        expect(basicCommitEntry.subTitle).toBe("Number Of Commits: 8");
        expect(basicCommitEntry.contents.length).toBe(6);
    });
    
    it('basicNodesStatistics should have correct data after analyze', () => {
        let data: IJenkinsData = new JenkinsDataProviderService().getData();
        component.jenkinsData = data;
        component.analyze(data);
        
        let basicNodeEntry: StatisticsCardEntry = component.basicNodeStatistics;
        expect(basicNodeEntry.title).toBe("Nodes");
        expect(basicNodeEntry.subTitle).toBe("Number Of Nodes: 1");
        expect(basicNodeEntry.contents.length).toBe(6);
    });
});
