import {Component, Input, SimpleChanges, OnInit} from '@angular/core';

import {Logger} from 'angular2-logger/core';
import {UtilService} from '../../util/services/util.service';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import {JenkinsBasicJobStatisticsService} from '../services/jenkins-basic-job-statistics.service';
import {JenkinsBasicBuildStatisticsService} from '../services/jenkins-basic-build-statistics.service';
import {JenkinsChangeSetStatisticsService} from '../services/jenkins-change-set-statistics.service';
import {JenkinsNodeStatisticsService} from '../services/jenkins-node-statistics.service';

import {StatisticsCardEntry} from '../services/StatisticsCardEntry';

@Component({
    selector: 'jenkins-basic-statistics',
    templateUrl: '../templates/jenkins-basic-statistics.template.html'
})
export class JenkinsBasicStatisticsComponent implements OnInit {
    @Input('utilService')
    utilService: UtilService;

    @Input('jenkinsData')
    jenkinsData = <IJenkinsData>null;

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

    analyze(jenkinsData: IJenkinsData): void {

        this.analyzerData = new Array<StatisticsCardEntry>();
        this.dataAvailable = true;

        this.basicStatistics = new JenkinsBasicJobStatisticsService(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicBuildStatistics = new JenkinsBasicBuildStatisticsService(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicCommitStatistics = new JenkinsChangeSetStatisticsService(this.utilService, this.LOGGER, jenkinsData).getStatistics();
        this.basicNodeStatistics = new JenkinsNodeStatisticsService(this.utilService, this.LOGGER, jenkinsData).getStatistics();

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