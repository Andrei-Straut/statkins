import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { Logger }        from 'angular2-logger/core';

import { JenkinsDataRetrieverComponent } from './components/JenkinsDataRetriever/jenkins-data-retriever.component';
import { JenkinsDataAnalyzerComponent } from './components/JenkinsDataAnalyzer/jenkins-data-analyzer.component';
import { JenkinsBuildTimelineComponent } from './components/JenkinsDataAnalyzer_JenkinsBuildTimeline/jenkins-build-timeline.component';
import { JenkinsChangeSetTimelineComponent } from './components/JenkinsDataAnalyzer_JenkinsChangeSetTimeline/jenkins-changeset-timeline.component';
import { JenkinsJobBuildGraphComponent } from './components/JenkinsDataAnalyzer_JenkinsJobBuildGraph/jenkins-job-build-graph.component';
import { JenkinsJobAverageBuildDurationGraphComponent } from './components/JenkinsDataAnalyzer_JenkinsJobAverageBuildDuration/jenkins-job-average-build-duration.component';
import { JenkinsBasicStatisticsComponent } from './components/JenkinsDataAnalyzer_BasicStatistics/jenkins-basic-statistics.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, JenkinsDataRetrieverComponent, JenkinsDataAnalyzerComponent, 
      JenkinsBuildTimelineComponent, JenkinsChangeSetTimelineComponent, JenkinsJobBuildGraphComponent, 
      JenkinsJobAverageBuildDurationGraphComponent, JenkinsBasicStatisticsComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ Logger ]
})
export class AppModule { }
