import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppComponent} from '../app.component';

import {ConfigModule} from '../config/config.module';
import {ProxyModule} from '../proxy/proxy.module';
import {UtilModule} from '../util/util.module';

import {JenkinsDataAnalyzerComponent} from './components/jenkins-data-analyzer.component';
import {JenkinsAverageBuildDurationGraphComponent} from './components/jenkins-average-build-duration-graph.component';
import {JenkinsBasicStatisticsComponent} from './components/jenkins-basic-statistics.component';
import {JenkinsBuildTimelineComponent} from './components/jenkins-build-timeline.component';
import {JenkinsChangeSetTimelineComponent} from './components/jenkins-changeset-timeline.component';
import {JenkinsFileChangesGraphComponent} from './components/jenkins-file-changes-graph.component';
import {JenkinsJobBuildGraphComponent} from './components/jenkins-job-build-graph.component';
import {JenkinsJobRelationshipNetworkComponent} from './components/jenkins-job-relationship-network.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule
    ],
    exports: [
        JenkinsDataAnalyzerComponent
    ],
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
    bootstrap: [AppComponent],
    providers: []
})
export class JenkinsDataAnalyzerModule {}
