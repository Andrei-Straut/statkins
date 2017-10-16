import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { Functions } from '../Helper/Functions'
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';

import { JenkinsBasicJobStatistics } from './services/JenkinsBasicJobStatistics';
import { JenkinsBasicBuildStatistics } from './services/JenkinsBasicBuildStatistics';
import { JenkinsChangeSetStatistics } from './services/JenkinsChangeSetStatistics';

import { StatisticsCardEntry } from '../JenkinsDataAnalyzer/model/StatisticsCardEntry';
    
@Component({
    selector: 'jenkins-basic-statistics',
    templateUrl: 'app/components/JenkinsDataAnalyzer_BasicStatistics/templates/jenkinsbasicstatistics.template.html',
    providers: [],
})
export class JenkinsBasicStatisticsComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Functions.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    public dataAvailable: boolean;
    public analyzerData: Array<StatisticsCardEntry> = new Array<StatisticsCardEntry>();
    
    basicStatistics: StatisticsCardEntry;
    basicBuildStatistics: StatisticsCardEntry;
    basicCommitStatistics: StatisticsCardEntry;
    
    constructor(private LOGGER: Logger) {}
    
    ngOnInit() {
    }
    
    analyze(jenkinsData: IJenkinsData):void {
        
        this.analyzerData = new Array<StatisticsCardEntry>();
        this.dataAvailable = true;
        
        this.basicStatistics = new JenkinsBasicJobStatistics(this.LOGGER, jenkinsData).getStatistics();
        this.basicBuildStatistics = new JenkinsBasicBuildStatistics(this.LOGGER, jenkinsData).getStatistics();
        this.basicCommitStatistics = new JenkinsChangeSetStatistics(this.LOGGER, jenkinsData).getStatistics();
        
        this.LOGGER.info("Basic Job Statistics", this.basicStatistics);
        this.LOGGER.info("Basic Build Statistics", this.basicBuildStatistics);
        this.LOGGER.info("Basic Commit Statistics", this.basicCommitStatistics);
        
        this.analyzerData.push(this.basicStatistics);
        this.analyzerData.push(this.basicBuildStatistics);
        this.analyzerData.push(this.basicCommitStatistics);
    }
}