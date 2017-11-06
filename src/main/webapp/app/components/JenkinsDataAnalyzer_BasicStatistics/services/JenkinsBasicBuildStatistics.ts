import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';
import { UtilService } from '../../../Util/services/util.service';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';

import { StatisticsEntryProvider } from '../../JenkinsDataAnalyzer/model/StatisticsEntryProvider';
import { StatisticsCardEntry } from '../../JenkinsDataAnalyzer/model/StatisticsCardEntry';
import { StatisticsEntry } from '../../JenkinsDataAnalyzer/model/StatisticsEntry';

export class JenkinsBasicBuildStatistics implements StatisticsEntryProvider {
    
    private analyzerData: StatisticsCardEntry;
    
    constructor(private util: UtilService, private LOGGER:Logger, private data:IJenkinsData) {}
    
    public getStatistics(): StatisticsCardEntry {
        this.analyzerData = new StatisticsCardEntry(
                "Builds", 
                "Number Of Builds: " + this.getNumberOfBuilds(this.data.builds),
                [
                    this.getNumberOfBuildsToday(this.data.builds),
                    this.getNumberOfBuildsYesterday(this.data.builds),
                    this.getNumberOfBuildsThisWeek(this.data.builds),
                    this.getLastUnstableBuild(this.data.builds),
                    this.getDayWithMostBuilds(this.data.builds),
                    this.getBuildWithMostChangeSets(this.data.builds),
                    this.getAverageBuildDuration(this.data.builds)
                ],
                );
        return this.analyzerData;
    }
    
    private getNumberOfBuilds(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):number {
        var numberOfBuilds:number = 0;
        
        Array.from(builds.keys()).forEach(function(entry) {
            numberOfBuilds = numberOfBuilds + entry.builds.length;
        });
        
        return numberOfBuilds;
    }
    
    private getNumberOfBuildsToday(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let numberOfBuilds: number = this.getBuildsOfDate(builds, new Date()).length;
                
        return new StatisticsEntry("Builds today", numberOfBuilds + "", undefined);
    }
    
    private getNumberOfBuildsYesterday(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        
        let numberOfBuilds:number = this.getBuildsOfDate(builds, yesterday).length;
        
        return new StatisticsEntry("Builds yesterday", numberOfBuilds + "", undefined);
    }
    
    private getNumberOfBuildsThisWeek(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let lastWeek: Date = moment(new Date()).subtract(7, "day").toDate();
        let numberOfBuilds:number = this.getBuildsAfterDate(builds, lastWeek).length;
        
        return new StatisticsEntry("Builds last 7 days", numberOfBuilds + "", undefined);
    }
    
    private getDayWithMostBuilds(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let buildArray: Array<IJenkinsBuild> = this.util.getBuildArray(builds);
        let buildsByDay:Map<string, Array<IJenkinsBuild>> = new Map<string, Array<IJenkinsBuild>>();
        
        for (let build of buildArray) {
            var day:string = moment(new Date(build.timestamp)).format("DD/MM/YYYY");
            
            if (!buildsByDay.has(day)) {
                buildsByDay.set(day, new Array<IJenkinsBuild>());
            }
            
            buildsByDay.get(day).push(build);
        }
        
        var mostBuilt:string = Array.from(buildsByDay.keys()).reduce(function (day1, day2) {
            return buildsByDay.get(day1) >= buildsByDay.get(day2) ? day1 : day2;
        });
        
        return new StatisticsEntry("Busiest day",  mostBuilt + ", " + buildsByDay.get(mostBuilt).length + " builds", undefined);
    }
    
    private getLastUnstableBuild(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        let jobsWithUnstableBuilds:Array<IJenkinsJob> = Array.from(builds.keys()).filter(job => !this.util.isInvalid(job.lastUnstableBuild));
        
        if (this.util.isInvalid(jobsWithUnstableBuilds)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        let lastUnstableJob:IJenkinsJob = jobsWithUnstableBuilds.reduce(function (jobA, jobB) {
            if (parent.util.isInvalid(jobA) || parent.util.isInvalid(jobA.lastUnstableBuild) || parent.util.isInvalid(jobA.lastUnstableBuild.timestamp)) {
                return jobB;
            }
            if (parent.util.isInvalid(jobB) || parent.util.isInvalid(jobB.lastUnstableBuild) || parent.util.isInvalid(jobB.lastUnstableBuild.timestamp)) {
                return jobA;
            }
            
            let momentA = moment(new Date(jobA.lastUnstableBuild.timestamp));
            let momentB = moment(new Date(jobB.lastUnstableBuild.timestamp));
            
            return momentA.isAfter(momentB) ? jobA : jobB;
        });
        
        if (this.util.isInvalid(lastUnstableJob) || this.util.isInvalid(lastUnstableJob.lastUnstableBuild)) {
            return new StatisticsEntry("Longest Duration", "N/A", undefined);
        }
        
        return new StatisticsEntry(
            "Last Unstable",  
            lastUnstableJob.name + ", Build #" + lastUnstableJob.lastUnstableBuild.number,
            lastUnstableJob.lastUnstableBuild.url);
    }
    
    private getBuildWithMostChangeSets(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let parent = this;
        let buildArray: Array<IJenkinsBuild> = this.util.getBuildArray(builds);
        let mostCommitted = buildArray.reduce(function (buildA, buildB) {
            if (parent.util.isInvalid(buildA) || parent.util.isInvalid(buildA.changeSets)) {
                return buildB;
            }
            if (parent.util.isInvalid(buildB) || parent.util.isInvalid(buildB.changeSets)) {
                return buildA;
            }
            
            return buildA.changeSets.length >= buildB.changeSets.length ? buildA : buildB;
        });
        
        if (this.util.isInvalid(mostCommitted) || this.util.isInvalid(mostCommitted.changeSets)) {
            return new StatisticsEntry("Most commits", "N/A", undefined);
        }
        
        let job = this.util.getJobByBuildUrl(Array.from(builds.keys()), mostCommitted.url);        
        if (this.util.isInvalid(job)) {
            return new StatisticsEntry("Most commits", "N/A", undefined);
        }
        
        return new StatisticsEntry(
            "Most commits",  
            job.name + ", Build #" + mostCommitted.number + ", " + mostCommitted.changeSets.length + " commits",
            mostCommitted.url);
    }
    
    private getAverageBuildDuration(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):StatisticsEntry {
        let totalDurationTimestamp = this.util.getBuildArray(builds).map(build => build.duration).reduce(function(buildADuration, buildBDuration) {
            return (isNaN(buildADuration) ? 0 : buildADuration) + (isNaN(buildBDuration) ? 0 : buildBDuration);
        });
        
        let averageDurationTimestamp = Math.round(totalDurationTimestamp / this.util.getBuildArray(builds).length);
        let averageDurationMinutes = Math.round(moment.duration(averageDurationTimestamp, "milliseconds").asMinutes());
        
        return new StatisticsEntry("Average build duration", averageDurationMinutes + " minutes", undefined);
    }
    
    private getBuildsOfDate(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>, date: Date):Array<IJenkinsBuild>  {
        let buildArray: Array<IJenkinsBuild> = this.util.getBuildArray(builds);
        
        return buildArray.filter(build => this.util.isSameDate(new Date(build.timestamp), date));
    }
    
    private getBuildsAfterDate(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>, afterDate: Date):Array<IJenkinsBuild>  {
        let buildArray: Array<IJenkinsBuild> = this.util.getBuildArray(builds);
        
        return buildArray.filter(build => this.util.isAfterDate(new Date(build.timestamp), afterDate));
    }
}