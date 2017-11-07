import {AppComponent} from './app.component';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ConfigModule} from './Config/config.module';
import {ConfigService} from './Config/services/config.service';
import {ProxyModule} from './Proxy/proxy.module';
import {ProxyService} from './Proxy/services/proxy.service';
import {UtilModule} from './Util/util.module';
import {UtilService} from './Util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {JenkinsDataRetrieverModule} from './JenkinsDataRetriever/jenkins-data-retriever.module';
import {JenkinsDataRetrieverComponent} from './JenkinsDataRetriever/components/jenkins-data-retriever.component';

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
        ConfigModule, ProxyModule, UtilModule, JenkinsDataRetrieverModule
    ],
    declarations: [
        AppComponent,
        
        JenkinsDataAnalyzerComponent,
        JenkinsBasicStatisticsComponent,
        JenkinsJobBuildGraphComponent,
        JenkinsFileChangesGraphComponent,
        JenkinsAverageBuildDurationGraphComponent,
        JenkinsBuildTimelineComponent,
        JenkinsChangeSetTimelineComponent,
        JenkinsJobRelationshipNetworkComponent,],
    bootstrap: [ AppComponent ],
    providers: [ ConfigService, ProxyService, UtilService, Logger ]
})
export class AppModule {}
