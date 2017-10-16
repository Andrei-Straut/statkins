import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { Logger } from 'angular2-logger/core';
import { Functions } from '../Helper/Functions';
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
@Component({
    selector: 'jenkins-changeset-timeline',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JenkinsChangeSetTimeline/templates/jenkinschangesettimeline.template.html',
    providers: [],
})
export class JenkinsChangeSetTimelineComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Functions.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    private readonly visTimelineElementId = "changeSetTimeline";
    private visTimelineContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visChangeSetData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
    private visGroups = new DataSet<any>();
    private visTimeline: Timeline;
    
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
        let lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 8);
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        this.visTimelineContainer = document.getElementById(this.visTimelineElementId);
        this.visTimelineOptions = {
            height: '600px',
            type: 'point',
            autoResize: true,
            clickToUse: true,
            start: yesterday,
            end: today,
            min: lastWeek,
            max: tomorrow,
            stack: this.groupVisibility.stack,
            showCurrentTime: true,
            showMajorLabels: true,
            showMinorLabels: true,
            zoomMin: 1000 * 60 * 60,             // 1h in milliseconds
            zoomMax: 1000 * 60 * 60 * 24 * 3     // 3d in milliseconds
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
        if (Functions.isInvalid(this.visGroups.get(group))) {
            return;
        }
        
        this.visGroups.update({id: group, visible: visibility});
    }
    
    private getChangeSetData(data: IJenkinsData):DataSet<DataSetItem> {
        let changeSetsData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
        let parent = this;
        let counter = 0;
        
        Array.from(data.builds.keys()).forEach(function(job) {
            job.builds.forEach(function(build) {
                
                build.changeSets.forEach(function(changeSet) {
                    if (!parent.isToBeIncluded(changeSet)) {
                        return;
                    }
                    
                    counter++;
                    let startDateTime = new Date(changeSet.timestamp);
                    
                    let changeSetData:DataSetItem = undefined;
                    if (!Functions.isInvalid(changeSetsData.get(changeSet.commitId))) {
                        return;
                    } else {
        
                        let buildsContainingCommit = Functions.getBuildMapContainingCommit(data.builds, changeSet.commitId);
                        
                        changeSetData = {
                            id: changeSet.commitId,
                            title: parent.getItemTitle(data, changeSet),
                            content: parent.getItemContent(changeSet),
                            start: startDateTime,
                            end: startDateTime,
                            result: build.result,
                            url: build.url,
                            group: parent.getGroupForBuilds(buildsContainingCommit),
                            className: parent.getChangeSetTimelineClass(buildsContainingCommit)
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
        if(!Functions.isAfterDate(new Date(changeSet.timestamp), lastWeek)) {
            return false;
        }
        
        return true;
    }
    
    private getItemTitle(data: IJenkinsData, changeSet: IJenkinsChangeSet) {
        let startDateTime = new Date(changeSet.timestamp);
        
        let buildsContainingCommit = Functions.getBuildMapContainingCommit(data.builds, changeSet.commitId);
        let buildString = "";
        let parent = this;
        
        if (!Functions.isInvalid(buildsContainingCommit)) {
            Array.from(buildsContainingCommit.keys()).forEach(function(job) {
                buildsContainingCommit.get(job).forEach(function(build) {
                    let spanClass = parent.getChangeSetSpanTitleClass(build);
                    let abortedStatus = Functions.isAborted(build) ? " <b><i>(aborted)</i></b>" : "";
                    let runningStatus = Functions.isRunning(build) ? " <b><i>(running)</i></b>" : "";
                    buildString = buildString + "<span class='vis-build-result-span " + spanClass + "'>"
                        + job.name + " #" + build.number + abortedStatus + runningStatus +"</span>" + "<br/>"
                });
            });
        }
        
        return "<b>" + parent.getItemContent(changeSet) + "</b>: " + changeSet.commitId + "<br/><br/>"
            + (!Functions.isInvalid(changeSet.comment) ? changeSet.comment : changeSet.msg) + "<br/><br/>"
            + Functions.padDate(startDateTime) + ", " + Functions.padTime(startDateTime) + "<br/>"
            + "Present in builds:<br/>" + buildString + "<br/>"
            + (!Functions.isInvalid(changeSet.affectedPaths) ? changeSet.affectedPaths.length + " changed files" : "")
    }
    
    private getItemContent(changeSet: IJenkinsChangeSet) {
        if (!Functions.isInvalid(changeSet.author) && !Functions.isInvalid(changeSet.author.fullName)) {
            return changeSet.author.fullName;
        }
        
        if (!Functions.isInvalid(changeSet.author) && !Functions.isInvalid(changeSet.author.id)) {
            return changeSet.author.id;
        }
        
        if (!Functions.isInvalid(changeSet.authorEmail)) {
            return changeSet.authorEmail;
        }
        
        if (!Functions.isInvalid(changeSet.authorData) && (changeSet.authorData as JSON).hasOwnProperty("fullName")) {
            return (changeSet.authorData as JSON)["fullName"];
        }
        
        return "Commit Author N/A";
    }
    
    private getGroupForBuilds(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>): number {
        if (Functions.isInvalid(builds)) {
            return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
        }
        
        let hasFailed = Functions.getBuildArray(builds).filter(build => Functions.isFailed(build)).length > 0;
        let hasUnstable = Functions.getBuildArray(builds).filter(build => Functions.isUnstable(build)).length > 0;
        let hasSuccessful = Functions.getBuildArray(builds).filter(build => Functions.isSuccessful(build)).length > 0;
        
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
        if (Functions.isInvalid(build) || Functions.isInvalid(build.result)) {
            return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
        }
        
        if (Functions.isSuccessful(build)) {
            return JenkinsChangeSetTimelineComponent.SUCCESS_GROUP;
        }
        
        if (Functions.isUnstable(build)) {
            return JenkinsChangeSetTimelineComponent.UNSTABLE_GROUP;
        }
        
        if (Functions.isFailed(build)) {
            return JenkinsChangeSetTimelineComponent.FAILED_GROUP;
        }

        return JenkinsChangeSetTimelineComponent.DEFAULT_GROUP;
    }
    
    private getChangeSetSpanTitleClass(build: IJenkinsBuild): string {
        
        let className = "white";
        if (Functions.isInvalid(build) || Functions.isInvalid(build.result)) {
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
        
        let hasFailed = Functions.getBuildArray(builds).filter(build => Functions.isFailed(build)).length > 0;
        let hasUnstable = Functions.getBuildArray(builds).filter(build => Functions.isUnstable(build)).length > 0;
        let hasSuccessful = Functions.getBuildArray(builds).filter(build => Functions.isSuccessful(build)).length > 0;
        
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