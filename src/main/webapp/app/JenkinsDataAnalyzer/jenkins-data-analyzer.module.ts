import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';

import { ConfigModule } from '../Config/config.module';
import { ProxyModule } from '../Proxy/proxy.module';
import { UtilModule } from '../Util/util.module';

import { JenkinsDataAnalyzerComponent } from './components/jenkins-data-analyzer.component';
import { JenkinsBasicStatisticsComponent } from './components/jenkins-basic-statistics.component';
import { JenkinsJobBuildGraphComponent } from './components/jenkins-job-build-graph.component';
import { JenkinsFileChangesGraphComponent } from './components/jenkins-file-changes-graph.component';
import { JenkinsAverageBuildDurationGraphComponent } from './components/jenkins-average-build-duration-graph.component';
import { JenkinsBuildTimelineComponent } from './components/jenkins-build-timeline.component';
import { JenkinsChangeSetTimelineComponent } from './components/jenkins-changeset-timeline.component';
import { JenkinsJobRelationshipNetworkComponent } from './components/jenkins-job-relationship-network.component';

@NgModule({
    imports: [ CommonModule, FormsModule, ConfigModule, ProxyModule, UtilModule ],
    declarations: [
        JenkinsDataAnalyzerComponent,
        JenkinsBasicStatisticsComponent,
        JenkinsJobBuildGraphComponent,
        JenkinsFileChangesGraphComponent,
        JenkinsAverageBuildDurationGraphComponent,
        JenkinsBuildTimelineComponent,
        JenkinsChangeSetTimelineComponent,
        JenkinsJobRelationshipNetworkComponent,
    ],
    exports: [
        JenkinsDataAnalyzerComponent
    ],
    bootstrap: [ AppComponent ],
    providers: []
})
export class JenkinsDataAnalyzerModule {}