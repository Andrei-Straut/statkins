import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { Logger } from 'angular2-logger/core';
import { Util } from '../Util/Util'
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
class VisEventProperties {
    item: string;
}

@Component({
    selector: 'jenkins-build-timeline',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JenkinsBuildTimeline/templates/jenkinsbuildtimeline.template.html',
    providers: [],
})
export class JenkinsBuildTimelineComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    private readonly visTimelineElementId = "buildTimeline";
    private visTimelineContainer: HTMLElement;
    private visTimelineOptions: TimelineOptions;
    private visJobsData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
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
        defaultGroup: true,
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
        
        let visDataSet: DataSet<DataSetItem> = this.visJobsData;
        this.visTimeline.on('doubleClick', function(properties:VisEventProperties) {
            if (Util.isInvalid(properties) || Util.isInvalid(properties.item)) {
                return;
            }
            
            let item:DataSetItem = visDataSet.get(properties.item);
            if (Util.isInvalid(item)) {
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
        if (Util.isInvalid(this.visGroups.get(group))) {
            return;
        }
        
        this.visGroups.update({id: group, visible: visibility});
    }
    
    private getJobsData(data: IJenkinsData):DataSet<DataSetItem> {
        let buildsData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
        let parent = this;
        
        data.jobs.forEach(function(job) {
            job.builds.forEach(function(build) {
                if (!parent.isToBeIncluded(build)) {
                    return;
                }
                    
                let startDateTime = new Date(build.timestamp);
                let endDateTime = new Date(build.timestamp + build.duration);
                let visClass = parent.getBuildClass(build);
                
                let buildData:DataSetItem = {
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
        if (Util.isInvalid(build) || Util.isInvalid(build.duration)) {
            return false;
        }

        // Only log builds from 7 days ago onwards
        let today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        if(!Util.isAfterDate(new Date(build.timestamp), lastWeek)) {
            return false;
        }
        
        return true;
    }
    
    private getGroup(build: IJenkinsBuild): number {
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
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
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
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
        
        return job.name + " #" + build.number + "<br/>"
            + (!Util.isInvalid(build.displayName) ? "Name: " + build.displayName + "<br/>" : "")
            + (!Util.isInvalid(build.description) ? "Description: " + build.description + "<br/>" : "")
            + "Start: " + Util.padTime(startDateTime) + ", " + "End: " + Util.padTime(endDateTime) + "<br/>"
            + "<i>Double-click to open in Jenkins</i>";
    }
}