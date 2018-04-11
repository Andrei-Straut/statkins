import {Component, Input, SimpleChanges, OnInit} from '@angular/core';
import {TimelineOptions, Timeline, DataSet} from 'vis';
import * as moment from 'moment';

import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsBuildStatus} from 'jenkins-api-ts-typings';

import {VisDataSetItem} from '../services/VisDataSetItem';
import {VisEventProperties} from '../services/VisEventProperties';
import {VisBuildTimelineBuildVisibility} from '../services/VisBuildTimelineBuildVisibility';

@Component({
    selector: 'jenkins-build-timeline',
    templateUrl: '../templates/jenkins-build-timeline.template.html'
})
export class JenkinsBuildTimelineComponent implements OnInit {
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

    private readonly visTimelineElementId = "buildTimeline";
    private visTimelineContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visJobsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
    private visGroups = new DataSet<any>();
    private visTimeline: Timeline;

    startTimeLimit: number = 8;
    endTimeLimit: number = 1;
    timeLimitUnit = "days";
    private readonly defaultGraphHeightPx = 600;

    private static readonly DEFAULT_GROUP = 0;
    private static readonly SUCCESS_GROUP = 1;
    private static readonly UNSTABLE_GROUP = 2;
    private static readonly FAILED_GROUP = 3;

    buildVisibility: VisBuildTimelineBuildVisibility = {
        isFullscreen: false,
        stack: true,
        queueTimes: true,
        buildWithQTime: true,
        buildWithoutQTime: true,
        success: true,
        unstable: true,
        failed: true,
        defaultGroup: true,
    };

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        let today = new Date();
        let startDate = new Date(today);
        startDate.setDate(today.getDate() - this.startTimeLimit);
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        let endDate = new Date(today);
        endDate.setDate(today.getDate() + this.endTimeLimit);

        this.visTimelineContainer = document.getElementById(this.visTimelineElementId);
        this.visTimelineOptions = {
            height: this.defaultGraphHeightPx + 'px',
            autoResize: true,
            clickToUse: true,
            start: yesterday,
            end: today,
            min: startDate,
            max: endDate,
            stack: this.buildVisibility.stack,
            showCurrentTime: true,
            showMajorLabels: true,
            showMinorLabels: true,
            zoomMin: 1000 * 60 * 60,             // 1h in milliseconds
            zoomMax: 1000 * 60 * 60 * 24 * 3,     // 3d in milliseconds
            visibleFrameTemplate: function (item: VisDataSetItem) {
                if (item.visibleFrameTemplate) {
                    return item.visibleFrameTemplate;
                }
                return undefined;
            }
        };

        this.visGroups.add({
            id: 0,
            content: "Aborted / Running",
            subgroupStack: false,
        });
        this.visGroups.add({
            id: 1,
            content: "Successful",
            subgroupStack: false,
        });
        this.visGroups.add({
            id: 2,
            content: "Unstable",
            subgroupStack: false,
        });
        this.visGroups.add({
            id: 3,
            content: "Failed",
            subgroupStack: false,
        });
    }

    analyze(jenkinsData: IJenkinsData): Timeline {

        this.visJobsData = this.getJobsData(jenkinsData, this.buildVisibility);
        this.visTimeline = new Timeline(this.visTimelineContainer, this.visJobsData, this.visGroups, this.visTimelineOptions);

        this.LOGGER.debug("Build Timeline Data", this.visJobsData);

        if (this.utilService.isInvalid(jenkinsData) || this.utilService.isInvalid(jenkinsData.jobs)) {
            return this.visTimeline;
        }

        let parent = this;
        let visDataSet: DataSet<VisDataSetItem> = this.visJobsData;
        this.visTimeline.on('doubleClick', function (properties: VisEventProperties) {
            if (parent.utilService.isInvalid(properties) || parent.utilService.isInvalid(properties.item)) {
                return;
            }

            let item: VisDataSetItem = visDataSet.get(properties.item);
            if (parent.utilService.isInvalid(item)) {
                return;
            }

            window.open(item.url, '_blank');
        });
        
        return this.visTimeline;
    }

    toggleOverlap() {
        this.buildVisibility.stack = !this.buildVisibility.stack;
        this.visTimelineOptions.stack = this.buildVisibility.stack;
        
        if (!this.utilService.isInvalid(this.visTimeline)) {
            this.visTimeline.setOptions(this.visTimelineOptions);
        }
    }

    toggleQueueTimes() {
        this.buildVisibility.queueTimes = !this.buildVisibility.queueTimes;
        this.visJobsData = this.getJobsData(this.jenkinsData, this.buildVisibility);
        
        if (!this.utilService.isInvalid(this.visTimeline)) {
            this.visTimeline.setData({groups: this.visGroups, items: this.visJobsData});
        }
    }

    toggleBuildWithQTime() {
        this.buildVisibility.buildWithQTime = !this.buildVisibility.buildWithQTime;
        this.visJobsData = this.getJobsData(this.jenkinsData, this.buildVisibility);
        
        if (!this.utilService.isInvalid(this.visTimeline)) {
            this.visTimeline.setData({groups: this.visGroups, items: this.visJobsData});
        }
    }

    toggleBuildWithoutQTime() {
        this.buildVisibility.buildWithoutQTime = !this.buildVisibility.buildWithoutQTime;
        this.visJobsData = this.getJobsData(this.jenkinsData, this.buildVisibility);
        
        if (!this.utilService.isInvalid(this.visTimeline)) {
            this.visTimeline.setData({groups: this.visGroups, items: this.visJobsData});
        }
    }

    toggleSuccessful() {
        this.buildVisibility.success = !this.buildVisibility.success;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.SUCCESS_GROUP, this.buildVisibility.success);
    }

    toggleUnstable() {
        this.buildVisibility.unstable = !this.buildVisibility.unstable;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.UNSTABLE_GROUP, this.buildVisibility.unstable);
    }

    toggleFailed() {
        this.buildVisibility.failed = !this.buildVisibility.failed;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.FAILED_GROUP, this.buildVisibility.failed);
    }

    toggleDefault() {
        this.buildVisibility.defaultGroup = !this.buildVisibility.defaultGroup;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.DEFAULT_GROUP, this.buildVisibility.defaultGroup);
    }

    toggleFullscreen() {
        let height = this.defaultGraphHeightPx;
        if (!this.buildVisibility.isFullscreen) {
            height = document.documentElement.clientHeight - Math.round(document.documentElement.clientHeight / 10);
        }

        this.visTimelineOptions.height = height + 'px';
        this.buildVisibility.isFullscreen = !this.buildVisibility.isFullscreen;
        
        if (!this.utilService.isInvalid(this.visTimeline)) {
            this.visTimeline.setOptions(this.visTimelineOptions);
            this.visTimeline.redraw();
        }
    }

    setGroupVisibility(group: number, visibility: boolean): void {
        if (this.utilService.isInvalid(this.visGroups.get(group))) {
            return;
        }

        this.visGroups.update({id: group, visible: visibility});
    }

    private getJobsData(data: IJenkinsData, visibility: VisBuildTimelineBuildVisibility): DataSet<VisDataSetItem> {
        let buildsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
        let parent = this;

        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.jobs)) {
            return buildsData;
        }

        data.jobs.forEach(function (job) {
            job.builds.forEach(function (build) {
                if (!parent.isToBeIncluded(build, parent.buildVisibility)) {
                    return;
                }

                let startDateTime: Date = undefined;
                let visibleFrameTemplate: string = undefined;
                if (visibility.queueTimes) {
                    startDateTime = new Date(build.timestamp - parent.utilService.getBuildTimeInQueue(build));
                    visibleFrameTemplate = parent.getQueueTemplate(build);
                } else {
                    startDateTime = new Date(build.timestamp);
                }

                let endDateTime = parent.utilService.buildIsRunning(build) ? new Date() : new Date(build.timestamp + build.duration);
                let visClass = parent.getBuildClass(build);

                let buildData: VisDataSetItem = {
                    id: job.name + "_#" + build.number,
                    title: parent.getItemTitle(job, build),
                    content: job.name + " #" + build.number,
                    start: startDateTime,
                    end: endDateTime,
                    result: build.result,
                    url: build.url,
                    group: parent.getGroup(build),
                    className: visClass,
                    visibleFrameTemplate: visibleFrameTemplate
                };

                buildsData.add(buildData);
            });
        });

        return buildsData;
    }

    private getQueueTemplate(build: IJenkinsBuild): string {

        let timeInQueueMillis = this.utilService.getBuildTimeInQueue(build);
        let totalTimeMillis = this.utilService.getBuildTotalTime(build);
        let percentageInQueue = Math.round((timeInQueueMillis * 100) / totalTimeMillis);
        let timeInQueueMinutes = Math.round(moment.duration(timeInQueueMillis, "milliseconds").asMinutes());
        let runtimeMinutes = Math.round(moment.duration(build.duration, "milliseconds").asMinutes());

        if (timeInQueueMinutes === 0 || percentageInQueue === 0) {
            return undefined;
        }
        
        // Use proper time calculations (i.e. if an item takes a day+ to run, show it as a day+, not only as minutes)
        let finalRunTime: string = this.utilService.simpleFormatDuration(runtimeMinutes);
        let finalQueueTime: string = this.utilService.simpleFormatDuration(timeInQueueMinutes);
        
        return ''
            + '<div class="progress-wrapper">'
            + '<div class="progress progress-yellow" style="width:' + percentageInQueue + '%">'
            + '<label class="progress-label progress-label-yellow">' + 'Queue: ' + finalQueueTime + ' (' + percentageInQueue + '%)' + '</label>'
            + '</div>'
            + '<div class="progress progress-green" style="width:' + (100 - percentageInQueue) + '%; left: ' + (percentageInQueue) + '%">'
            + '<label class="progress-label progress-label-green">' + 'Run: ' + finalRunTime + ' (' + (100 - percentageInQueue) + '%)' + '</label>'
            + '</div>'
            + '</div>';
    }

    private isToBeIncluded(build: IJenkinsBuild, visibility: VisBuildTimelineBuildVisibility): boolean {
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.duration)) {
            return false;
        }

        // Only log builds from 7 days ago onwards
        let today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        if (!this.utilService.isSameOrAfterDate(new Date(build.timestamp), lastWeek)) {
            return false;
        }

        let timeInQueueMinutes = Math.round(moment.duration(this.utilService.getBuildTimeInQueue(build), "milliseconds").asMinutes());
        if (timeInQueueMinutes > 0 && !visibility.buildWithQTime) {
            return false;
        }

        if (timeInQueueMinutes === 0 && !visibility.buildWithoutQTime) {
            return false;
        }

        return true;
    }

    private getGroup(build: IJenkinsBuild): number {
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.result)) {
            return JenkinsBuildTimelineComponent.DEFAULT_GROUP;
        }

        switch (build.result.toUpperCase().trim()) {
            case "SUCCESS": {
                return JenkinsBuildTimelineComponent.SUCCESS_GROUP;
            }
            case "UNSTABLE": {
                return JenkinsBuildTimelineComponent.UNSTABLE_GROUP;
            }
            case "FAILURE": {
                return JenkinsBuildTimelineComponent.FAILED_GROUP;
            }
        }

        return JenkinsBuildTimelineComponent.DEFAULT_GROUP;
    }

    private getBuildClass(build: IJenkinsBuild): string {

        let className = "white";
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.result)) {
            return className;
        }

        switch (this.getGroup(build)) {
            case JenkinsBuildTimelineComponent.SUCCESS_GROUP: {
                return "green";
            }
            case JenkinsBuildTimelineComponent.UNSTABLE_GROUP: {
                return "yellow";
            }
            case JenkinsBuildTimelineComponent.FAILED_GROUP: {
                return "red";
            }
        }

        return className;
    }

    private getItemTitle(job: IJenkinsJob, build: IJenkinsBuild) {
        let running = this.utilService.buildIsRunning(build) ? " <b><i>(Running)</i></b>" : "";
        let aborted = this.utilService.buildResultIs(build, JenkinsBuildStatus.Aborted) ? " <b><i>(Aborted)</i></b>" : "";
        let timeSpentInQueue = Math.round(moment.duration((this.utilService.getBuildTimeInQueue(build)), "milliseconds").asMinutes());
        let finalQueueTime: string = this.utilService.simpleFormatDuration(timeSpentInQueue);

        let queuedDateTime = new Date(build.timestamp - this.utilService.getBuildTimeInQueue(build));
        let startDateTime = new Date(build.timestamp);
        let endDateTime = this.utilService.buildIsRunning(build) ? new Date() : new Date(build.timestamp + build.duration);

        return "<b>" + job.name + " #" + build.number + "</b><br/>"
            + (!this.utilService.isInvalid(build.displayName) ? "<b>Name</b>: " + build.displayName + "<br/>" : "")
            + (!this.utilService.isInvalid(build.description) ? "<b>Description</b>: " + build.description + "<br/>" : "")
            + (this.getItemDateTimes(queuedDateTime, startDateTime, endDateTime, this.utilService.buildIsRunning(build)) + running + aborted + "<br/>")
            + ((timeSpentInQueue > 0) ? ("This build spent " + finalQueueTime + " in queue<br/>") : "")
            + "<i>Double-click to open in Jenkins</i>";
    }

    private getItemDateTimes(queuedDateTime: Date, startDateTime: Date, endDateTime: Date, isRunning: boolean): string {
        let queuedInfo = "Today at " + this.utilService.padTime(queuedDateTime);
        let startedInfo = "Today at " + this.utilService.padTime(startDateTime);
        let endedInfo = "Today at " + this.utilService.padTime(endDateTime);
        let today = new Date();

        if (!this.utilService.isSameDate(queuedDateTime, today)
            || !this.utilService.isSameDate(startDateTime, today)
            || !this.utilService.isSameDate(endDateTime, today)) {

            queuedInfo = this.utilService.padDate(queuedDateTime) + " " + this.utilService.padTime(queuedDateTime);
            startedInfo = this.utilService.padDate(startDateTime) + " " + this.utilService.padTime(startDateTime);
            endedInfo = this.utilService.padDate(endDateTime) + " " + this.utilService.padTime(endDateTime);
        }
        
        if (isRunning) {
            endedInfo = "N/A";
        }

        return "<b>Triggered</b>: " + queuedInfo + ", " + "<b>Started</b>: " + startedInfo + ", " + "<b>Ended</b>: " + endedInfo;
    }
}