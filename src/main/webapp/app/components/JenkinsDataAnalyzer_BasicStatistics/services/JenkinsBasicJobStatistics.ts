import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';

import { Functions } from '../../Helper/Functions'
import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsData } from 'jenkins-api-ts-typings';

import { StatisticsEntryProvider } from '../../JenkinsDataAnalyzer/model/StatisticsEntryProvider';
import { StatisticsCardEntry } from '../../JenkinsDataAnalyzer/model/StatisticsCardEntry';
import { StatisticsEntry } from '../../JenkinsDataAnalyzer/model/StatisticsEntry';

export class JenkinsBasicJobStatistics implements StatisticsEntryProvider {
    
    private analyzerData: StatisticsCardEntry;
    
    constructor(private LOGGER:Logger, private data:IJenkinsData) {  
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
        
        if (Functions.isInvalid(builds)) {
            return new StatisticsEntry("Most Built", "N/A", undefined);
        }
        
        var mostBuilt = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Functions.getNumberOfBuilds(job1) >= Functions.getNumberOfBuilds(job2) ? job1 : job2;
        });
        
        var text = mostBuilt.name + " (" + mostBuilt.builds.length + " builds)";
        var url = mostBuilt.url;
        return new StatisticsEntry("Most Built", text, url);
    }
    
    private getLastSuccessfulJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Functions.isInvalid(builds)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let lastSuccessful:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Functions.getLastSuccessfulBuildTimestamp(job1) >= Functions.getLastSuccessfulBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Functions.isInvalid(lastSuccessful)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let text = lastSuccessful.name + " (" +  moment(lastSuccessful.lastSuccessfulBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastSuccessful.url;
            
        return new StatisticsEntry("Last Successful", text, url);
    }
    
    private getLastFailedJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Functions.isInvalid(builds)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let lastFailed:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Functions.getLastFailedBuildTimestamp(job1) >= Functions.getLastFailedBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Functions.isInvalid(lastFailed) || Functions.isInvalid(lastFailed.lastFailedBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let text = lastFailed.name + " (" +  moment(lastFailed.lastFailedBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastFailed.url;
                
        return new StatisticsEntry("Last Failed", text, url);
    }
    
    private getLastRunJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Functions.isInvalid(builds)) {
            return new StatisticsEntry("Last Run", "N/A", undefined);
        }
        
        var lastRun:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Functions.getLastBuildTimestamp(job1) >= Functions.getLastBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Functions.isInvalid(lastRun) || Functions.isInvalid(lastRun.lastBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        var text = lastRun.name + " (" +  moment(lastRun.lastBuild.date).format("DD/MM/YYYY HH:mm") + ")" ;
        var url = lastRun.url;
            
        return new StatisticsEntry("Last Run", text, url);
    }
    
    private getLongestDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        let buildArray: Array<IJenkinsBuild> = Functions.getBuildArray(builds);
        
        if (Functions.isInvalid(buildArray)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningBuild = buildArray.reduce(function (build1, build2) {
            return Functions.getBuildDuration(build1) > Functions.getBuildDuration(build2) ? build1 : build2;
        });
        
        if (Functions.isInvalid(longestRunningBuild) || Functions.isInvalid(longestRunningBuild.url)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningJob = Functions.getJobByBuildUrl(Array.from(builds.keys()), longestRunningBuild.url);
        if (Functions.isInvalid(longestRunningJob)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningDuration = moment.duration(longestRunningBuild.duration, "milliseconds").asMinutes();        
        let text = longestRunningJob.name + " build #" + longestRunningBuild.number + " (" 
            + moment(longestRunningBuild.date).format("DD/MM/YYYY") + ", " + Math.round(longestRunningDuration) + " minutes)";
        let url = longestRunningBuild.url;
            
        return new StatisticsEntry("Longest Duration", text, url);
    }
    
    private getLongestAverageDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Functions.isInvalid(builds)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let longestAverageRunning: IJenkinsJob = Array.from(builds.keys()).reduce(function(job1, job2) {
            return Functions.getBuildAverageDuration(job1.builds) > Functions.getBuildAverageDuration(job2.builds) ? job1 : job2;
        });
        
        if (Functions.isInvalid(longestAverageRunning)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let averageDuration = Functions.getBuildAverageDuration(longestAverageRunning.builds);
        let text = longestAverageRunning.name + "(" + Math.round(moment.duration(averageDuration, "milliseconds").asMinutes()) + " minutes out of " 
            + longestAverageRunning.builds.length + " builds)";
        let url = longestAverageRunning.url;
        
        return new StatisticsEntry("Longest Average Duration", text, url);
    }
}