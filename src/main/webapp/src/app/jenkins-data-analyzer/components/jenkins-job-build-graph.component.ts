import {Component, Input, SimpleChanges, OnInit} from '@angular/core';
import {TimelineOptions, Timeline, DataSet} from 'vis';

import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {VisDataSetItem} from '../services/VisDataSetItem';

@Component({
    selector: 'jenkins-job-build-graph',
    templateUrl: '../templates/jenkins-job-build-graph.template.html'
})
export class JenkinsJobBuildGraphComponent implements OnInit {
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

    private readonly graphElementId = "jobBuildGraph";
    private visGraphContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visTimeline: Timeline;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visJobsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();

    maxNumberOfElements = 10;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visGraphContainer = document.getElementById(this.graphElementId);
        this.visTimelineOptions = {
            autoResize: true,
            clickToUse: false,
            start: 0,
            min: 0,
            max: 1000,
            showCurrentTime: false,
            showMajorLabels: false,
            showMinorLabels: true,
            moveable: false,
            zoomable: false
        };

        this.visGroups.add({
            id: 0,
            className: 'vis-group-green'
        });
    }

    analyze(jenkinsData: IJenkinsData): Timeline {
        this.visJobsData = this.getJobsData(jenkinsData);
        this.visTimeline = new Timeline(this.visGraphContainer, this.visJobsData, this.visGroups, this.visTimelineOptions);

        this.LOGGER.debug("Job Build Data", this.visJobsData);

        if (this.utilService.isInvalid(jenkinsData) || this.utilService.isInvalid(jenkinsData.jobs)) {
            return;
        }

        let maxNumber = jenkinsData.jobs.sort(function (job1, job2) {return (job1.builds.length - job2.builds.length) * -1});
        if (this.utilService.isInvalid(maxNumber)) {
            return;
        }
        this.visTimelineOptions.max = Math.round((maxNumber[0]).builds.length * 1.25);
        this.visTimelineOptions.end = Math.round((maxNumber[0]).builds.length * 1.25);
        this.visTimeline.setOptions(this.visTimelineOptions);

        return this.visTimeline;
    }

    private getJobsData(data: IJenkinsData): DataSet<any> {
        let jobsData: DataSet<any> = new DataSet<any>();
        let parent = this;

        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.jobs)) {
            return jobsData;
        }

        data.jobs.sort(function (job1, job2) {return (job1.builds.length - job2.builds.length) * -1}).forEach(function (job) {
            if (jobsData.length >= parent.maxNumberOfElements) {
                return;
            }

            if (job.builds.length !== 0) {
                let jobData: any = undefined;
                if (parent.utilService.isInvalid(jobsData.get(job.builds.length))) {
                    jobData = {
                        id: job.builds.length,
                        title: job.name + "<br/>",
                        content: job.builds.length + " builds",
                        start: 0,
                        end: job.builds.length,
                        group: 0,
                        className: 'green left-aligned'
                    };
                } else {
                    jobData = jobsData.get(job.builds.length);
                    let currentTitle = (jobData as VisDataSetItem).title;
                    (jobData as VisDataSetItem).title = currentTitle + job.name + "<br/>";
                }
                jobsData.update(jobData);
            }
        });

        return jobsData;
    }
}