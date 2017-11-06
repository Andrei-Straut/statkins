import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ConfigModule} from './Config/config.module';
import {ProxyModule} from './Proxy/proxy.module';
import {UtilModule} from './Util/util.module';

import {Logger} from 'angular2-logger/core';

import {AppComponent} from './app.component';

import {JenkinsDataRetrieverComponent} from './components/JenkinsDataRetriever/jenkins-data-retriever.component';
import {JenkinsDataAnalyzerComponent} from './components/JenkinsDataAnalyzer/jenkins-data-analyzer.component';
import {JenkinsBasicStatisticsComponent} from './components/JenkinsDataAnalyzer_BasicStatistics/jenkins-basic-statistics.component';
import {JenkinsJobBuildGraphComponent} from './components/JenkinsDataAnalyzer_JenkinsJobBuildGraph/jenkins-job-build-graph.component';
import {JenkinsFileChangesGraphComponent} from './components/JenkinsDataAnalyzer_JenkinsFileChangesGraph/jenkins-file-changes-graph.component';
import {JenkinsAverageBuildDurationGraphComponent} from './components/JenkinsDataAnalyzer_JenkinsAverageBuildDurationGraph/jenkins-average-build-duration-graph.component';
import {JenkinsBuildTimelineComponent} from './components/JenkinsDataAnalyzer_JenkinsBuildTimeline/jenkins-build-timeline.component';
import {JenkinsChangeSetTimelineComponent} from './components/JenkinsDataAnalyzer_JenkinsChangeSetTimeline/jenkins-changeset-timeline.component';
import {JenkinsJobRelationshipNetworkComponent} from './components/JenkinsDataAnalyzer_JobRelationshipNetwork/jenkins-job-relationship-network.component';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule,
        ConfigModule, ProxyModule, UtilModule
    ],
    declarations: [
        AppComponent,
        JenkinsDataRetrieverComponent,
        JenkinsDataAnalyzerComponent,
        JenkinsBasicStatisticsComponent,
        JenkinsJobBuildGraphComponent,
        JenkinsFileChangesGraphComponent,
        JenkinsAverageBuildDurationGraphComponent,
        JenkinsBuildTimelineComponent,
        JenkinsChangeSetTimelineComponent,
        JenkinsJobRelationshipNetworkComponent,],
    bootstrap: [AppComponent],
    providers: [Logger]
})
export class AppModule {}
