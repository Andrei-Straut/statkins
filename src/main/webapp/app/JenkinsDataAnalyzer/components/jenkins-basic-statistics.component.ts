import { Component, Input, SimpleChanges, OnInit } from '@angular/core';

import { Logger } from 'angular2-logger/core';
import { UtilService } from '../../Util/services/util.service';
import { IJenkinsData } from 'jenkins-api-ts-typings';

import { JenkinsBasicJobStatistics } from '../services/JenkinsBasicJobStatistics';
import { JenkinsBasicBuildStatistics } from '../services/JenkinsBasicBuildStatistics';
import { JenkinsChangeSetStatistics } from '../services/JenkinsChangeSetStatistics';
import { JenkinsNodeStatistics } from '../services/JenkinsNodeStatistics';

import { StatisticsCardEntry } from '../services/StatisticsCardEntry';
    
@Component({
    selector: 'jenkins-basic-statistics',
    templateUrl: 'app/JenkinsDataAnalyzer/templates/jenkins-basic-statistics.template.html',
    providers: [],
})
export class JenkinsBasicStatisticsComponent implements OnInit {
    @Input('utilService')
    utilService: UtilService;
    
    @Input('jenkinsData')
    jenkinsData: IJenkinsData;
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["utilService"] !== undefined && changes["utilService"].currentValue !== undefined) {
            this.utilService = changes["utilService"].currentValue;
        }
        if (changes["jenkinsData"] !== undefined && changes["jenkinsData"].currentValue !== undefined) {
            this.jenkinsData = changes["jenkinsData"].currentValue;
        }
        
        if (this.utilService !== undefined && !this.utilService.isInvalid(this.jenkinsData)) {
            this.analyze(this.jenkinsData);
        }
    }
    
    public dataAvailable: boolean;
    public analyzerData: Array<StatisticsCardEntry> = new Array<StatisticsCardEntry>();
    
    basicStatistics: StatisticsCardEntry;
    basicBuildStatistics: StatisticsCardEntry;
    basicCommitStatistics: StatisticsCardEntry;
    basicNodeStatistics: StatisticsCardEntry;
    
    constructor(private LOGGER: Logger) {}
    
    ngOnInit() {}
    
    analyze(jenkinsData: IJenkinsData):void {
        
        this.analyzerData = new Array<StatisticsCardEntry>();
        this.dataAvailable = true;
        
        this.basicStatistics = new JenkinsBasicJobStatistics(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicBuildStatistics = new JenkinsBasicBuildStatistics(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicCommitStatistics = new JenkinsChangeSetStatistics(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicNodeStatistics = new JenkinsNodeStatistics(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        
        this.LOGGER.debug("Basic Job Statistics", this.basicStatistics);
        this.LOGGER.debug("Basic Build Statistics", this.basicBuildStatistics);
        this.LOGGER.debug("Basic Commit Statistics", this.basicCommitStatistics);
        this.LOGGER.debug("Basic Node Statistics", this.basicNodeStatistics);
        
        this.analyzerData.push(this.basicStatistics);
        this.analyzerData.push(this.basicBuildStatistics);
        this.analyzerData.push(this.basicCommitStatistics);
        this.analyzerData.push(this.basicNodeStatistics);
    }
}