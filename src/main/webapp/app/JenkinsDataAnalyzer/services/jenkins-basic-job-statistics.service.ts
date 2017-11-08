import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';
import { UtilService } from '../../Util/services/util.service';

import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsData } from 'jenkins-api-ts-typings';

import { StatisticsEntryProvider } from './StatisticsEntryProvider';
import { StatisticsCardEntry } from './StatisticsCardEntry';
import { StatisticsEntry } from './StatisticsEntry';

export class JenkinsBasicJobStatistics implements StatisticsEntryProvider {
    
    private analyzerData: StatisticsCardEntry;
    
    constructor(private util: UtilService, private LOGGER:Logger, private data:IJenkinsData) {  
    }
    
    public getStatistics(): StatisticsCardEntry {
        this.analyzerData = new StatisticsCardEntry(
                "Jobs", 
                "Number Of Jobs: " + this.data.jobs.length, 
                [
                    this.getMostBuiltJob(this.data.builds),
                    this.getLastRunJob(this.data.builds),
                    this.getLastSuccessfulJob(this.data.builds),
                    this.getLastFailedJob(this.data.builds),
                    this.getLongestDurationJob(this.data.builds),
                    this.getLongestAverageDurationJob(this.data.builds),
                ]
        );
        
        return this.analyzerData;
    }
    
    private getMostBuiltJob(builds: Map<IJenkinsJob, Array<any>>):StatisticsEntry {
        let parent = this;
        
        if (this.util.isInvalid(builds)) {
            return new StatisticsEntry("Most Built", "N/A", undefined);
        }
        
        var mostBuilt = Array.from(builds.keys()).reduce(function (job1, job2) {
            return parent.util.getNumberOfBuilds(job1) >= parent.util.getNumberOfBuilds(job2) ? job1 : job2;
        });
        
        var text = mostBuilt.name + " (" + mostBuilt.builds.length + " builds)";
        var url = mostBuilt.url;
        return new StatisticsEntry("Most Built", text, url);
    }
    
    private getLastSuccessfulJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        
        if (this.util.isInvalid(builds)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let lastSuccessful:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return parent.util.getLastSuccessfulBuildTimestamp(job1) >= parent.util.getLastSuccessfulBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (this.util.isInvalid(lastSuccessful)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let text = lastSuccessful.name + " (" +  moment(lastSuccessful.lastSuccessfulBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastSuccessful.url;
            
        return new StatisticsEntry("Last Successful", text, url);
    }
    
    private getLastFailedJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        
        if (this.util.isInvalid(builds)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let lastFailed:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return parent.util.getLastFailedBuildTimestamp(job1) >= parent.util.getLastFailedBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (this.util.isInvalid(lastFailed) || this.util.isInvalid(lastFailed.lastFailedBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let text = lastFailed.name + " (" +  moment(lastFailed.lastFailedBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastFailed.url;
                
        return new StatisticsEntry("Last Failed", text, url);
    }
    
    private getLastRunJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        
        if (this.util.isInvalid(builds)) {
            return new StatisticsEntry("Last Run", "N/A", undefined);
        }
        
        var lastRun:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return parent.util.getLastBuildTimestamp(job1) >= parent.util.getLastBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (this.util.isInvalid(lastRun) || this.util.isInvalid(lastRun.lastBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        var text = lastRun.name + " (" +  moment(lastRun.lastBuild.date).format("DD/MM/YYYY HH:mm") + ")" ;
        var url = lastRun.url;
            
        return new StatisticsEntry("Last Run", text, url);
    }
    
    private getLongestDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        
        let buildArray: Array<IJenkinsBuild> = this.util.getBuildArray(builds);
        
        if (this.util.isInvalid(buildArray)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningBuild = buildArray.reduce(function (build1, build2) {
            return parent.util.getBuildDuration(build1) > parent.util.getBuildDuration(build2) ? build1 : build2;
        });
        
        if (this.util.isInvalid(longestRunningBuild) || this.util.isInvalid(longestRunningBuild.url)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningJob = this.util.getJobByBuildUrl(Array.from(builds.keys()), longestRunningBuild.url);
        if (this.util.isInvalid(longestRunningJob)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningDuration = moment.duration(longestRunningBuild.duration, "milliseconds").asMinutes();        
        let text = longestRunningJob.name + " build #" + longestRunningBuild.number + " (" 
            + moment(longestRunningBuild.date).format("DD/MM/YYYY") + ", " + Math.round(longestRunningDuration) + " minutes)";
        let url = longestRunningBuild.url;
            
        return new StatisticsEntry("Longest Duration", text, url);
    }
    
    private getLongestAverageDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        
        if (this.util.isInvalid(builds)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let longestAverageRunning: IJenkinsJob = Array.from(builds.keys()).reduce(function(job1, job2) {
            return parent.util.getBuildAverageDuration(job1.builds) > parent.util.getBuildAverageDuration(job2.builds) ? job1 : job2;
        });
        
        if (this.util.isInvalid(longestAverageRunning)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let averageDuration = this.util.getBuildAverageDuration(longestAverageRunning.builds);
        let text = longestAverageRunning.name + "(" + Math.round(moment.duration(averageDuration, "milliseconds").asMinutes()) + " minutes out of " 
            + longestAverageRunning.builds.length + " builds)";
        let url = longestAverageRunning.url;
        
        return new StatisticsEntry("Longest Average Duration", text, url);
    }
}