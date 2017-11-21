import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ConfigModule} from '../../config/config.module';
import {ProxyModule} from '../../proxy/proxy.module';
import {UtilModule} from '../../util/util.module';

import {JenkinsDataAnalyzerComponent} from './jenkins-data-analyzer.component';

import {JenkinsAverageBuildDurationGraphComponent} from './jenkins-average-build-duration-graph.component';
import {JenkinsBasicStatisticsComponent} from './jenkins-basic-statistics.component';
import {JenkinsBuildTimelineComponent} from './jenkins-build-timeline.component';
import {JenkinsChangeSetTimelineComponent} from './jenkins-changeset-timeline.component';
import {JenkinsFileChangesGraphComponent} from './jenkins-file-changes-graph.component';
import {JenkinsJobBuildGraphComponent} from './jenkins-job-build-graph.component';
import {JenkinsJobRelationshipNetworkComponent} from './jenkins-job-relationship-network.component';

describe('JenkinsDataAnalyzerComponent', () => {
    let component: JenkinsDataAnalyzerComponent;
    let fixture: ComponentFixture<JenkinsDataAnalyzerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule],
            declarations: [
                JenkinsDataAnalyzerComponent,
                JenkinsAverageBuildDurationGraphComponent,
                JenkinsBasicStatisticsComponent,
                JenkinsBuildTimelineComponent,
                JenkinsChangeSetTimelineComponent,
                JenkinsFileChangesGraphComponent,
                JenkinsJobBuildGraphComponent,
                JenkinsJobRelationshipNetworkComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JenkinsDataAnalyzerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
