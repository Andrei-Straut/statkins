import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { UtilService } from '../../Util/services/util.service';
import { Logger } from 'angular2-logger/core';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { VisDataSetItem } from '../services/VisDataSetItem';
    
@Component({
    selector: 'jenkins-changeset-timeline',
    templateUrl: 'app/JenkinsDataAnalyzer/templates/jenkins-changeset-timeline.template.html',
    providers: [],
})
export class JenkinsChangeSetTimelineComponent implements OnInit {
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
    
    private readonly visTimelineElementId = "changeSetTimeline";
    private visTimelineContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visChangeSetData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
    private visGroups = new DataSet<any>();
    private visTimeline: Timeline;
    
    private startTimeLimit: number = 8;
    private endTimeLimit: number = 1;
    private timeLimitUnit = "days";
    
    private static readonly DEFAULT_GROUP = 0;
    private static readonly SUCCESS_GROUP = 1;
    private static readonly UNSTABLE_GROUP = 2;
    private static readonly FAILED_GROUP = 3;
    
    private groupVisibility = {
        stack: true,
        success: true,
        unstable: true,
        failed: true,
        defaultGroup: true
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
            height: '600px',
            type: 'point',
            autoResize: true,
            clickToUse: true,
            start: yesterday,
            end: today,
            min: startDate,
            max: endDate,
            stack: this.groupVisibility.stack,
            showCurrentTime: true,
            showMajorLabels: true,
            showMinorLabels: true,
            zoomMin: 1000 * 60 * 60,             // 1h in milliseconds
            zoomMax: 1000 * 60 * 60 * 24 * 3,    // 3d in milliseconds
        };
        
        this.visGroups.add({
            id: JenkinsChangeSetTimelineComponent.DEFAULT_GROUP,
            content: "Aborted / Running"
        });
        
        this.visGroups.add({
            id: JenkinsChangeSetTimelineComponent.SUCCESS_GROUP,
            content: "Successful"
        });
        
        this.visGroups.add({
            id: JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP,
            content: "Unstable"
        });
        
        this.visGroups.add({
            id: JenkinsChangeSetTimelineComponent.FAILED_GROUP,
            content: "Failed"
        });
    }
    
    analyze(jenkinsData: IJenkinsData):Timeline {
        this.visChangeSetData = this.getChangeSetData(jenkinsData);
        this.visTimeline = new Timeline(this.visTimelineContainer, this.visChangeSetData, this.visGroups, this.visTimelineOptions);
        
        this.LOGGER.debug("Change Set Data", this.visChangeSetData);
        
        return this.visTimeline;
    }
    
    toggleOverlap() {
        this.groupVisibility.stack = !this.groupVisibility.stack;
        this.visTimelineOptions.stack = this.groupVisibility.stack;
        this.visTimeline.setOptions(this.visTimelineOptions);
    }
    
    toggleSuccessful() {
        this.groupVisibility.success = !this.groupVisibility.success;
        this.setGroupVisibility(JenkinsChangeSetTimelineComponent.SUCCESS_GROUP, this.groupVisibility.success);
    }
    
    toggleUnstable() {
        this.groupVisibility.unstable = !this.groupVisibility.unstable;
        this.setGroupVisibility(JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP, this.groupVisibility.unstable);
    }
    
    toggleDefault() {
        this.groupVisibility.defaultGroup = !this.groupVisibility.defaultGroup;
        this.setGroupVisibility(JenkinsChangeSetTimelineComponent.DEFAULT_GROUP, this.groupVisibility.defaultGroup);
    }
    
    toggleFailed() {
        this.groupVisibility.failed = !this.groupVisibility.failed;
        this.setGroupVisibility(JenkinsChangeSetTimelineComponent.FAILED_GROUP, this.groupVisibility.failed);
    }
    
    setGroupVisibility(group: number, visibility: boolean):void {
        if (this.utilService.isInvalid(this.visGroups.get(group))) {
            return;
        }
        
        this.visGroups.update({id: group, visible: visibility});
    }
    
    private getChangeSetData(data: IJenkinsData):DataSet<VisDataSetItem> {
        let changeSetsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
        let parent = this;
        let counter = 0;
        
        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.builds)) {
            return changeSetsData;
        }
        
        Array.from(data.builds.keys()).forEach(function(job) {
            job.builds.forEach(function(build) {
                
                build.changeSets.forEach(function(changeSet) {
                    if (!parent.isToBeIncluded(changeSet)) {
                        return;
                    }
                    
                    counter++;
                    let startDateTime = new Date(changeSet.timestamp);
                    
                    let changeSetData:VisDataSetItem = undefined;
                    if (!parent.utilService.isInvalid(changeSetsData.get(changeSet.commitId))) {
                        return;
                    } else {
        
                        let buildsContainingCommit = parent.utilService.getBuildMapContainingCommit(data.builds, changeSet.commitId);
                        
                        changeSetData = {
                            id: changeSet.commitId,
                            title: parent.getItemTitle(data, changeSet),
                            content: parent.getItemContent(changeSet),
                            start: startDateTime,
                            end: startDateTime,
                            result: build.result,
                            url: build.url,
                            group: parent.getGroupForBuilds(buildsContainingCommit),
                            className: parent.getChangeSetTimelineClass(buildsContainingCommit),
                            visibleFrameTemplate: undefined,
                        };
                    }
                    
                    changeSetsData.add(changeSetData);
                });
            });
        });
        
        return changeSetsData;
    }
    
    private isToBeIncluded(changeSet: IJenkinsChangeSet): boolean {
        // Only log builds from one week onwards
        let today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        if(!this.utilService.isAfterDate(new Date(changeSet.timestamp), lastWeek)) {
            return false;
        }
        
        return true;
    }
    
    private getItemTitle(data: IJenkinsData, changeSet: IJenkinsChangeSet) {
        let startDateTime = new Date(changeSet.timestamp);
        
        let buildsContainingCommit = this.utilService.getBuildMapContainingCommit(data.builds, changeSet.commitId);
        let buildString = "";
        let parent = this;
        
        if (!this.utilService.isInvalid(buildsContainingCommit)) {
            Array.from(buildsContainingCommit.keys()).forEach(function(job) {
                buildsContainingCommit.get(job).forEach(function(build) {
                    let spanClass = parent.getChangeSetSpanTitleClass(build);
                    let abortedStatus = parent.utilService.isAborted(build) ? " <b><i>(aborted)</i></b>" : "";
                    let runningStatus = parent.utilService.isRunning(build) ? " <b><i>(running)</i></b>" : "";
                    buildString = buildString + "<span class='vis-build-result-span " + spanClass + "'>"
                        + job.name + " #" + build.number + abortedStatus + runningStatus +"</span>" + "<br/>"
                });
            });
        }
        
        return "<b>" + parent.getItemContent(changeSet) + "</b>: " + changeSet.commitId + "<br/><br/>"
            + (!this.utilService.isInvalid(changeSet.comment) ? changeSet.comment : changeSet.msg) + "<br/><br/>"
            + this.utilService.padDate(startDateTime) + ", " + this.utilService.padTime(startDateTime) + "<br/>"
            + "Present in builds:<br/>" + buildString + "<br/>"
            + (!this.utilService.isInvalid(changeSet.affectedPaths) ? changeSet.affectedPaths.length + " changed files" : "")
    }
    
    private getItemContent(changeSet: IJenkinsChangeSet) {
        if (!this.utilService.isInvalid(changeSet.author) && !this.utilService.isInvalid(changeSet.author.fullName)) {
            return changeSet.author.fullName;
        }
        
        if (!this.utilService.isInvalid(changeSet.author) && !this.utilService.isInvalid(changeSet.author.id)) {
            return changeSet.author.id;
        }
        
        if (!this.utilService.isInvalid(changeSet.authorEmail)) {
            return changeSet.authorEmail;
        }
        
        if (!this.utilService.isInvalid(changeSet.authorData) && (changeSet.authorData as JSON).hasOwnProperty("fullName")) {
            return (changeSet.authorData as JSON)["fullName"];
        }
        
        return "Commit Author N/A";
    }
    
    private getGroupForBuilds(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>): number {
        if (this.utilService.isInvalid(builds)) {
            return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
        }
        
        let hasFailed = this.utilService.getBuildArray(builds).filter(build => this.utilService.isFailed(build)).length > 0;
        let hasUnstable = this.utilService.getBuildArray(builds).filter(build => this.utilService.isUnstable(build)).length > 0;
        let hasSuccessful = this.utilService.getBuildArray(builds).filter(build => this.utilService.isSuccessful(build)).length > 0;
        
        if (hasFailed) {
            return JenkinsChangeSetTimelineComponent.FAILED_GROUP;
        }
        
        if (hasUnstable) {
            return JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP;
        }
        
        if (hasSuccessful) {
            return JenkinsChangeSetTimelineComponent.SUCCESS_GROUP;
        }

        return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
    }
    
    private getGroupForBuild(build: IJenkinsBuild): number {
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.result)) {
            return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
        }
        
        if (this.utilService.isSuccessful(build)) {
            return JenkinsChangeSetTimelineComponent.SUCCESS_GROUP;
        }
        
        if (this.utilService.isUnstable(build)) {
            return JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP;
        }
        
        if (this.utilService.isFailed(build)) {
            return JenkinsChangeSetTimelineComponent.FAILED_GROUP;
        }

        return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
    }
    
    private getChangeSetSpanTitleClass(build: IJenkinsBuild): string {
        
        let className = "white";
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.result)) {
            return className;
        }
        
        switch (this.getGroupForBuild(build)) {
            case JenkinsChangeSetTimelineComponent.SUCCESS_GROUP: {
                return "green";
            }
            case JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP: {
                return "yellow";
            }
            case JenkinsChangeSetTimelineComponent.FAILED_GROUP: {
                return "red";
            }
        }

        return className;
    }
    
    private getChangeSetTimelineClass(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>): string {
        
        let hasFailed = this.utilService.getBuildArray(builds).filter(build => this.utilService.isFailed(build)).length > 0;
        let hasUnstable = this.utilService.getBuildArray(builds).filter(build => this.utilService.isUnstable(build)).length > 0;
        let hasSuccessful = this.utilService.getBuildArray(builds).filter(build => this.utilService.isSuccessful(build)).length > 0;
        
        if (hasFailed) {
            return "red";
        }
        
        if (hasUnstable) {
            return "yellow";
        }
        
        if (hasSuccessful) {
            return "green";
        }
        
        return "white";
    }
}