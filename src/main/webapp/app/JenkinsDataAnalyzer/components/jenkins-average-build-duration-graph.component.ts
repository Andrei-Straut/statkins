import {Component, Input, SimpleChanges, OnInit} from '@angular/core';
import {Graph2dOptions, Graph2d, DataSet} from 'vis';
import * as moment from 'moment';

import {UtilService} from '../../Util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {VisDataSetItem} from '../services/VisDataSetItem';

@Component({
    selector: 'jenkins-average-build-duration',
    templateUrl: 'app/JenkinsDataAnalyzer/templates/jenkins-average-build-duration-graph.template.html',
    providers: [],
})
export class JenkinsAverageBuildDurationGraphComponent implements OnInit {
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

    private BUILD_GREEN_THRESHOLD = 10;
    private BUILD_YELLOW_THRESHOLD = 20;

    private readonly graphElementId = "jobBuildAverageDurationGraph";
    private visGraphContainer: HTMLElement;
    private visGraphOptions: Graph2dOptions;
    private visGraph: Graph2d;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visJobsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visGraphContainer = document.getElementById(this.graphElementId);
        this.visGraphOptions = this.getGraphSettings();
        this.visGroups.add(this.getGroups());
    }

    analyze(jenkinsData: IJenkinsData): Graph2d {
        this.visJobsData = new DataSet(this.getJobsData(jenkinsData));
        this.visGraph = new Graph2d(this.visGraphContainer, this.visJobsData, this.visGroups, this.visGraphOptions);

        this.LOGGER.debug("Average Build Duration Data", this.visJobsData);

        return this.visGraph;
    }

    private getJobsData(data: IJenkinsData): Array<any> {
        let jobsData: Array<any> = new Array<any>();
        let counter: number = 0;
        let parent = this;

        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.jobs)) {
            return jobsData;
        }
        
        let averageWeightedDuration: number = parent.utilService.getBuildAverageWeightedDuration(parent.utilService.getBuildArray(data.builds));
        this.BUILD_GREEN_THRESHOLD = averageWeightedDuration - Math.round(averageWeightedDuration / 3);
        this.BUILD_YELLOW_THRESHOLD = averageWeightedDuration + Math.round(averageWeightedDuration / 3);

        data.jobs
            .sort(function (jobA, jobB) {return (parent.utilService.getBuildAverageDuration(jobA.builds) - parent.utilService.getBuildAverageDuration(jobB.builds)) * -1})
            .forEach(function (job) {
                let averageBuildDuration = Math.ceil(moment.duration(parent.utilService.getBuildAverageDuration(job.builds), "milliseconds").asMinutes());

                if (isNaN(averageBuildDuration)) {
                    return;
                }

                let jobData = parent.mapToVisJob(job, averageBuildDuration, counter);

                counter++;
                jobsData.push(jobData);
            });

        return jobsData;
    }

    private mapToVisJob(job: IJenkinsJob, averageBuildDuration: number, order: number) {
        return {
            label: {
                content: job.name,
                xOffset: 0,
                yOffset: 0,
            },
            title: job.name + ":" + averageBuildDuration + " minutes",
            content: job.name,
            x: order,
            y: averageBuildDuration,
            group: this.getGroup(averageBuildDuration)
        };
    }

    private getGroup(buildDurationMinutes: number) {
        if (buildDurationMinutes <= this.BUILD_GREEN_THRESHOLD) {
            return 0;
        } else if (buildDurationMinutes > this.BUILD_GREEN_THRESHOLD
            && buildDurationMinutes <= this.BUILD_YELLOW_THRESHOLD) {
            return 1;
        } else {
            return 2;
        }
    }

    private getGraphSettings(): Graph2dOptions {
        return {
            height: '400px',
            clickToUse: true,
            style: "bar",
            barChart: {
                width: 150,
                align: "center",
                sideBySide: true
            },
            drawPoints: {
                style: 'circle'
            },
            showMajorLabels: false,
            showMinorLabels: false,
            min: -50,
            max: 100,
            start: -50,
            end: 100
        };
    }

    private getGroups(): Array<any> {
        return [{
            id: 0,
            className: 'vis-group-green',
            options: {
                drawPoints: true
            }
        },
        {
            id: 1,
            className: 'vis-group-yellow',
            options: {
                drawPoints: true
            }
        },
        {
            id: 2,
            className: 'vis-group-red',
            options: {
                drawPoints: true
            }
        }];
    }
}