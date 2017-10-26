import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { IJenkinsUser } from 'jenkins-api-ts-typings';
import { IJenkinsView } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { IJenkinsNode } from 'jenkins-api-ts-typings';


@Injectable()
export class Util {
    
    static isInvalid(objectToCheck: any): boolean {
        if(objectToCheck === undefined || objectToCheck === null) {
            return true;
        }
        
        if(objectToCheck instanceof Array) {
            return (objectToCheck as Array<any>).length === 0;
        }
        
        if(objectToCheck instanceof Map) {
            return (objectToCheck as Map<any, any>).size === 0;
        }
        
        return false;
    }
    
    static getBuildArray(builds: Map<any, Array<IJenkinsBuild>>):Array<IJenkinsBuild> {
        
        if (Util.isInvalid(builds)) {
            return new Array<IJenkinsBuild>();
        }
        
        return Array.from(builds.values()).reduce((a, b) => a.concat(b), []);
    }

    static getChangeSetArray(builds: Map<any, Array<IJenkinsChangeSet>>):Array<IJenkinsChangeSet> {
        return Array.from(builds.values()).reduce((a, b) => a.concat(b), []);
    }
    
    static getAffectedPathsArray(builds: Map<any, Array<IJenkinsChangeSet>>):Array<string> {
        return Util.getChangeSetArray(builds).map(changeSet => changeSet.affectedPaths).reduce((a, b) => a.concat(b), []);
    }
    
    static getJobByName(jobList: Array<IJenkinsJob>, name: string):IJenkinsJob {
        let jobs: Array<IJenkinsJob> = jobList.filter(job => job.name === name);
        
        return jobs.length > 0 ? jobs[0] : undefined;
    }
    
    static getJobByBuildUrl(jobList: Array<IJenkinsJob>, buildUrl: string):IJenkinsJob {
        
        for (let job of jobList) {
            let builds = job.builds.filter(build => build.url.toLowerCase().trim().replace(" ", "") === buildUrl.toLowerCase().trim().replace(" ", ""));
            
            if (builds !== undefined && builds !== null && builds.length > 0) {
                return job;
            }
        }
        return undefined;
    }
    
    static getUserByFullName(userList: Array<IJenkinsUser>, fullName: string):IJenkinsUser {
        let users: Array<IJenkinsUser> = userList.filter(user => user.fullName === fullName);
        
        return users.length > 0 ? users[0] : undefined;
    }
    
    static getViewByName(viewList: Array<IJenkinsView>, name: string):IJenkinsView {
        let views: Array<IJenkinsView> = viewList.filter(view => view.name === name);
        
        return views.length > 0 ? views[0] : undefined;
    }
    
    static getBuildByBuildNumber(buildList: Array<IJenkinsBuild>, buildNumber: number):IJenkinsBuild {
        let builds = buildList.filter(build => build.number == buildNumber);
        
        return builds.length > 0 ? builds[0] as IJenkinsBuild : undefined;
    }
    
    static isSuccessful(build: IJenkinsBuild):boolean {
        
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
            return false;
        }
        
        return build.result.toUpperCase().trim().replace(" ", "") === "SUCCESS";
    }
    
    static isUnstable(build: IJenkinsBuild):boolean {
        
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
            return false;
        }
        
        return build.result.toUpperCase().trim().replace(" ", "") === "UNSTABLE";
    }
    
    static isFailed(build: IJenkinsBuild):boolean {
        
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
            return false;
        }
        
        return build.result.toUpperCase().trim().replace(" ", "") === "FAILURE";
    }
    
    static isAborted(build: IJenkinsBuild):boolean {
        
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
            return false;
        }
        
        return build.result.toUpperCase().trim().replace(" ", "") === "ABORTED";
    }
    
    static isRunning(build: IJenkinsBuild):boolean {
        
        if (Util.isInvalid(build) || Util.isInvalid(build.result)) {
            return false;
        }
        
        return build.building;
    }
    
    static isOffline(node: IJenkinsNode):boolean {
        
        if (Util.isInvalid(node)) {
            return false;
        }
        
        if (Util.isInvalid(node.offline) && Util.isInvalid(node.temporarilyOffline)) {
            return false;
        }
        
        return node.offline || node.temporarilyOffline;
    }
    
    static isIdle(node: IJenkinsNode):boolean {
        
        if (Util.isInvalid(node)) {
            return false;
        }
        
        if (Util.isInvalid(node.idle)) {
            return false;
        }
        
        return node.idle;
    }
    
    static getBuildMapContainingCommit(buildList: Map<any, Array<IJenkinsBuild>>, changeSetId: string):Map<IJenkinsJob, Array<IJenkinsBuild>> {

        let builds: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();

        if (Util.isInvalid(buildList) || Util.isInvalid(changeSetId)) {
            return builds;
        }

        Array.from(buildList.keys()).forEach(function(job: IJenkinsJob) {
            if (Util.isInvalid(job.builds)) {
                return;
            }
            
            job.builds.forEach(function (build: IJenkinsBuild) {
                if (Util.isInvalid(build.changeSets)) {
                    return;
                }
                
                build.changeSets.forEach(function (changeSet: IJenkinsChangeSet) {
                    if (Util.isInvalid(changeSet)) {
                        return;
                    }
                    
                    if (changeSet.commitId === changeSetId) {
                        if(!builds.has(job)) {
                            builds.set(job, new Array<IJenkinsBuild>());
                        }
                        builds.get(job).push(build);
                        return;
                    }
                });
            });
            
        });
                
        return builds;
    }
    
    static getBuildDuration(build: IJenkinsBuild): number {
        
        if (build === undefined || build === null || build.duration === undefined || build.duration === null) {
            return 0;
        }
        
        return build.duration as number;
    }
    
    static getBuildAverageDuration(builds: Array<IJenkinsBuild>): number {
        
        if (this.isInvalid(builds)) {
            return 0;
        }
        
        let durations: Array<number> = builds.map(build => build.duration);
        let totalDuration = durations.reduce(function (a, b) {
            if (Util.isInvalid(a)) {
                return b;
            }
            if (Util.isInvalid(b)) {
                return a;
            }
            return a + b;
        });
        let average = totalDuration / builds.length;
        
        return Math.round(average);
    }
    
    static getNumberOfBuilds(job: IJenkinsJob): number {
        if (job === undefined || job.builds === undefined || job.builds.length === 0) {
            return 0;
        }
        
        return job.builds.length;
    }
    
    static getLastBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastBuild === undefined 
            || job.lastBuild.timestamp === undefined || job.lastBuild.timestamp === 0) {
            
            return 0;
        }
        
        return job.lastBuild.timestamp;
    }
    
    static getLastSuccessfulBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastSuccessfulBuild === undefined 
            || job.lastSuccessfulBuild.timestamp === undefined || job.lastSuccessfulBuild.timestamp === 0) {
            
            return 0;
        }
        
        return job.lastSuccessfulBuild.timestamp;
    }
    
    static getLastFailedBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastFailedBuild === undefined 
            || job.lastFailedBuild.timestamp === undefined || job.lastFailedBuild.timestamp === 0) {
            
            return 0;
        }
        
        return job.lastFailedBuild.timestamp;
    }
    
    static padDate(dateTime: Date):string {
        let year = dateTime.getFullYear();
        let month:string = ('0'  + dateTime.getMonth()).slice(-2);
        let day:string = ('0'  + dateTime.getDay()).slice(-2);
        
        return year + "/" + month+ "/" + day;
    }
    
    static padTime(dateTime: Date):string {
        let hours:string = ('0'  + dateTime.getHours()).slice(-2);
        let minutes:string = ('0'  + dateTime.getMinutes()).slice(-2);
        
        return hours + ":" + minutes;
    }
    
    static padTimestamp(timestamp: number):number {
        
        if (timestamp === 0) {
            return 0;
        }
        
        if (timestamp < 0) {
            timestamp = timestamp * -1;
        }
        
        let lowerMargin = 999999999999;
        let upperMargin = lowerMargin * 10;
        
        let maxIterations:number = 10;
        while (timestamp < lowerMargin && maxIterations > 0) {
            timestamp = timestamp * 10;
            maxIterations--;
        }
        
        maxIterations = 10;
        while (timestamp > upperMargin && maxIterations > 0) {
            timestamp = timestamp / 10;
            maxIterations--;
        }
        
        return timestamp;
    }
    
    static isSameDate(dateTimeA:Date, dateTimeB:Date):boolean {
        var format: string = "DD/MM/YYYY";
        var momentA = moment(dateTimeA, format);
        var momentB = moment(dateTimeB, format);
        
        return momentA.isSame(momentB, "day") || momentA.format(format) === momentB.format(format);
    }
    
    static isAfterDate(dateTimeA:Date, dateTimeB:Date):boolean {
        var format: string = "DD/MM/YYYY";
        var momentA = moment(dateTimeA, format);
        var momentB = moment(dateTimeB, format);
        
        return momentA.isSameOrAfter(momentB, "day");
    }
    
    static isAfter(dateTimeA:Date, dateTimeB:Date):boolean {
        var momentA = moment(dateTimeA);
        var momentB = moment(dateTimeB);
        
        return momentA.isAfter(momentB);
    }
}
