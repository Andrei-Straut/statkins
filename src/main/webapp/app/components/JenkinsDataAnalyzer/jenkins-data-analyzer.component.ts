import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { IJenkinsData } from 'jenkins-api-ts-typings';

import { JenkinsBuildTimelineComponent } from '../JenkinsDataAnalyzer_JenkinsBuildTimeline/jenkins-build-timeline.component';
import { JenkinsJobBuildGraphComponent } from '../JenkinsDataAnalyzer_JenkinsJobBuildGraph/jenkins-job-build-graph.component';

/**
 * Root component for statistics subcomponents
 */
@Component({
    selector: 'jenkins-data-analyzer',
    templateUrl: 'app/components/JenkinsDataAnalyzer/templates/jenkinsdataanalyzer.template.html',
    providers: [ Logger ],
    entryComponents: [ JenkinsBuildTimelineComponent, JenkinsJobBuildGraphComponent ],
})
export class JenkinsDataAnalyzerComponent implements OnInit {
    
    @Input('jenkinsData')
    jenkinsData: IJenkinsData;
    @Input('dataAvailable')
    dataAvailable: boolean;
    
    constructor(private LOGGER:Logger) {}
    
    ngOnInit() {}
    
    analyze(data:IJenkinsData) {}
}