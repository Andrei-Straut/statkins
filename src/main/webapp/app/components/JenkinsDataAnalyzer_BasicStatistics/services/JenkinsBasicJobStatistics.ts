import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';

import { Util } from '../../Util/Util'
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
        
        if (Util.isInvalid(builds)) {
            return new StatisticsEntry("Most Built", "N/A", undefined);
        }
        
        var mostBuilt = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Util.getNumberOfBuilds(job1) >= Util.getNumberOfBuilds(job2) ? job1 : job2;
        });
        
        var text = mostBuilt.name + " (" + mostBuilt.builds.length + " builds)";
        var url = mostBuilt.url;
        return new StatisticsEntry("Most Built", text, url);
    }
    
    private getLastSuccessfulJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Util.isInvalid(builds)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let lastSuccessful:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Util.getLastSuccessfulBuildTimestamp(job1) >= Util.getLastSuccessfulBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Util.isInvalid(lastSuccessful)) {
            return new StatisticsEntry("Last Successful", "N/A", undefined);
        }
        
        let text = lastSuccessful.name + " (" +  moment(lastSuccessful.lastSuccessfulBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastSuccessful.url;
            
        return new StatisticsEntry("Last Successful", text, url);
    }
    
    private getLastFailedJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Util.isInvalid(builds)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let lastFailed:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Util.getLastFailedBuildTimestamp(job1) >= Util.getLastFailedBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Util.isInvalid(lastFailed) || Util.isInvalid(lastFailed.lastFailedBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        let text = lastFailed.name + " (" +  moment(lastFailed.lastFailedBuild.date).format("DD/MM/YYYY HH:mm") + ")";
        let url = lastFailed.url;
                
        return new StatisticsEntry("Last Failed", text, url);
    }
    
    private getLastRunJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Util.isInvalid(builds)) {
            return new StatisticsEntry("Last Run", "N/A", undefined);
        }
        
        var lastRun:IJenkinsJob = Array.from(builds.keys()).reduce(function (job1, job2) {
            return Util.getLastBuildTimestamp(job1) >= Util.getLastBuildTimestamp(job2) ? job1 : job2;
        });
        
        if (Util.isInvalid(lastRun) || Util.isInvalid(lastRun.lastBuild)) {
            return new StatisticsEntry("Last Failed", "N/A", undefined);
        }
        
        var text = lastRun.name + " (" +  moment(lastRun.lastBuild.date).format("DD/MM/YYYY HH:mm") + ")" ;
        var url = lastRun.url;
            
        return new StatisticsEntry("Last Run", text, url);
    }
    
    private getLongestDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        let buildArray: Array<IJenkinsBuild> = Util.getBuildArray(builds);
        
        if (Util.isInvalid(buildArray)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningBuild = buildArray.reduce(function (build1, build2) {
            return Util.getBuildDuration(build1) > Util.getBuildDuration(build2) ? build1 : build2;
        });
        
        if (Util.isInvalid(longestRunningBuild) || Util.isInvalid(longestRunningBuild.url)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningJob = Util.getJobByBuildUrl(Array.from(builds.keys()), longestRunningBuild.url);
        if (Util.isInvalid(longestRunningJob)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let longestRunningDuration = moment.duration(longestRunningBuild.duration, "milliseconds").asMinutes();        
        let text = longestRunningJob.name + " build #" + longestRunningBuild.number + " (" 
            + moment(longestRunningBuild.date).format("DD/MM/YYYY") + ", " + Math.round(longestRunningDuration) + " minutes)";
        let url = longestRunningBuild.url;
            
        return new StatisticsEntry("Longest Duration", text, url);
    }
    
    private getLongestAverageDurationJob(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        
        if (Util.isInvalid(builds)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let longestAverageRunning: IJenkinsJob = Array.from(builds.keys()).reduce(function(job1, job2) {
            return Util.getBuildAverageDuration(job1.builds) > Util.getBuildAverageDuration(job2.builds) ? job1 : job2;
        });
        
        if (Util.isInvalid(longestAverageRunning)) {
            return new StatisticsEntry("Longest Average Duration", "N/A", undefined);
        }
        
        let averageDuration = Util.getBuildAverageDuration(longestAverageRunning.builds);
        let text = longestAverageRunning.name + "(" + Math.round(moment.duration(averageDuration, "milliseconds").asMinutes()) + " minutes out of " 
            + longestAverageRunning.builds.length + " builds)";
        let url = longestAverageRunning.url;
        
        return new StatisticsEntry("Longest Average Duration", text, url);
    }
}