import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { UtilService } from '../../Util/services/util.service';
import { Logger } from 'angular2-logger/core';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { VisDataSetItem } from '../services/VisDataSetItem';
import { VisEventProperties } from '../services/VisEventProperties';

@Component({
    selector: 'jenkins-build-timeline',
    templateUrl: 'app/JenkinsDataAnalyzer/templates/jenkins-build-timeline.template.html',
    providers: [],
})
export class JenkinsBuildTimelineComponent implements OnInit {
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
    
    private readonly visTimelineElementId = "buildTimeline";
    private visTimelineContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visJobsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
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
            height: '600px',
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
            zoomMax: 1000 * 60 * 60 * 24 * 3     // 3d in milliseconds
        };
        
        this.visGroups.add({
            id: 0,
            content: "Aborted / Running"
        });
        this.visGroups.add({
            id: 1,
            content: "Successful"
        });
        this.visGroups.add({
            id: 2,
            content: "Unstable"
        });
        this.visGroups.add({
            id: 3,
            content: "Failed"
        });
    }
    
    analyze(jenkinsData: IJenkinsData):Timeline {
        
        this.visJobsData = this.getJobsData(jenkinsData);
        this.visTimeline = new Timeline(this.visTimelineContainer, this.visJobsData, this.visGroups, this.visTimelineOptions);
        
        this.LOGGER.debug("Build Timeline Data", this.visJobsData);
        
        if (this.utilService.isInvalid(jenkinsData) || this.utilService.isInvalid(jenkinsData.jobs)) {
            return this.visTimeline;
        }
        
        let parent = this;
        let visDataSet: DataSet<VisDataSetItem> = this.visJobsData;
        this.visTimeline.on('doubleClick', function(properties:VisEventProperties) {
            if (parent.utilService.isInvalid(properties) || parent.utilService.isInvalid(properties.item)) {
                return;
            }
            
            let item:VisDataSetItem = visDataSet.get(properties.item);
            if (parent.utilService.isInvalid(item)) {
                return;
            }
            
            window.open(item.url, '_blank');
        });
        
        return this.visTimeline;
    }
    
    toggleOverlap() {
        this.groupVisibility.stack = !this.groupVisibility.stack;
        this.visTimelineOptions.stack = this.groupVisibility.stack;
        this.visTimeline.setOptions(this.visTimelineOptions);
    }
    
    toggleSuccessful() {
        this.groupVisibility.success = !this.groupVisibility.success;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.SUCCESS_GROUP, this.groupVisibility.success);
    }
    
    toggleUnstable() {
        this.groupVisibility.unstable = !this.groupVisibility.unstable;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.UNSTABLE_GROUP, this.groupVisibility.unstable);
    }
    
    toggleFailed() {
        this.groupVisibility.failed = !this.groupVisibility.failed;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.FAILED_GROUP, this.groupVisibility.failed);
    }
    
    toggleDefault() {
        this.groupVisibility.defaultGroup = !this.groupVisibility.defaultGroup;
        this.setGroupVisibility(JenkinsBuildTimelineComponent.DEFAULT_GROUP, this.groupVisibility.defaultGroup);
    }
    
    setGroupVisibility(group: number, visibility: boolean):void {
        if (this.utilService.isInvalid(this.visGroups.get(group))) {
            return;
        }
        
        this.visGroups.update({id: group, visible: visibility});
    }
    
    private getJobsData(data: IJenkinsData):DataSet<VisDataSetItem> {
        let buildsData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();
        let parent = this;
        
        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.jobs)) {
            return buildsData;
        }
        
        data.jobs.forEach(function(job) {
            job.builds.forEach(function(build) {
                if (!parent.isToBeIncluded(build)) {
                    return;
                }
                    
                let startDateTime = new Date(build.timestamp);
                let endDateTime = new Date(build.timestamp + build.duration);
                let visClass = parent.getBuildClass(build);
                
                let buildData:VisDataSetItem = {
                        id: job.name + "_#" + build.number,
                        title: parent.getItemTitle(job, build),
                        content: job.name + " #" + build.number,
                        start: startDateTime,
                        end: endDateTime,
                        result: build.result,
                        url: build.url,
                        group: parent.getGroup(build),
                        className: visClass
                };
                
                buildsData.add(buildData);
            });
        });
        
        return buildsData;
    }
    
    private isToBeIncluded(build: IJenkinsBuild): boolean {
        if (this.utilService.isInvalid(build) || this.utilService.isInvalid(build.duration)) {
            return false;
        }

        // Only log builds from 7 days ago onwards
        let today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        if(!this.utilService.isAfterDate(new Date(build.timestamp), lastWeek)) {
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
        let startDateTime = new Date(build.timestamp);
        let endDateTime = new Date(build.timestamp + build.duration);
        let running = this.utilService.isRunning(build) ? " <b><i>(Running)</i></b>" : "";
        let aborted = this.utilService.isAborted(build) ? " <b><i>(Aborted)</i></b>" : "";
        
        return job.name + " #" + build.number + "<br/>"
            + (!this.utilService.isInvalid(build.displayName) ? "Name: " + build.displayName + "<br/>" : "")
            + (!this.utilService.isInvalid(build.description) ? "Description: " + build.description + "<br/>" : "")
            + "Start: " + this.utilService.padTime(startDateTime) + ", " + "End: " + this.utilService.padTime(endDateTime) + running + aborted + "<br/>"
            + "<i>Double-click to open in Jenkins</i>";
    }
}