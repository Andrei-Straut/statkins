import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {IJenkinsView} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';
import {JenkinsTimeInQueueAction} from 'jenkins-api-ts-typings';

@Injectable()
export class UtilService {
    private readonly _INSTANCE_ID: string;

    constructor() {
        this._INSTANCE_ID = this.uuidv4();
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    isInvalid(objectToCheck: any): boolean {
        if (objectToCheck === undefined || objectToCheck === null) {
            return true;
        }

        if (objectToCheck instanceof Array) {
            return (objectToCheck as Array<any>).length === 0;
        }

        if (objectToCheck instanceof Map) {
            return (objectToCheck as Map<any, any>).size === 0;
        }
        
        return false;
    }

    getBuildArray(builds: Map<any, Array<IJenkinsBuild>>): Array<IJenkinsBuild> {

        if (this.isInvalid(builds)) {
            return new Array<IJenkinsBuild>();
        }

        return Array.from(builds.values()).reduce((a, b) => a.concat(b), []);
    }

    getChangeSetArray(builds: Map<any, Array<IJenkinsChangeSet>>): Array<IJenkinsChangeSet> {
        return Array.from(builds.values()).reduce((a, b) => a.concat(b), []);
    }

    getAffectedPathsArray(builds: Map<any, Array<IJenkinsChangeSet>>): Array<string> {
        return this.getChangeSetArray(builds).map(changeSet => changeSet.affectedPaths).reduce((a, b) => a.concat(b), []);
    }

    getJobByName(jobList: Array<IJenkinsJob>, name: string): IJenkinsJob {
        let jobs: Array<IJenkinsJob> = jobList.filter(job => job.name === name);

        return jobs.length > 0 ? jobs[0] : undefined;
    }

    getJobByBuildUrl(jobList: Array<IJenkinsJob>, buildUrl: string): IJenkinsJob {

        for (let job of jobList) {
            let builds = job.builds.filter(build => build.url.toLowerCase().trim().replace(" ", "") === buildUrl.toLowerCase().trim().replace(" ", ""));

            if (builds !== undefined && builds !== null && builds.length > 0) {
                return job;
            }
        }
        return undefined;
    }

    getUserByFullName(userList: Array<IJenkinsUser>, fullName: string): IJenkinsUser {
        let users: Array<IJenkinsUser> = userList.filter(user => user.fullName === fullName);

        return users.length > 0 ? users[0] : undefined;
    }

    getViewByName(viewList: Array<IJenkinsView>, name: string): IJenkinsView {
        let views: Array<IJenkinsView> = viewList.filter(view => view.name === name);

        return views.length > 0 ? views[0] : undefined;
    }

    getBuildByBuildNumber(buildList: Array<IJenkinsBuild>, buildNumber: number): IJenkinsBuild {
        let builds = buildList.filter(build => build.number == buildNumber);

        return builds.length > 0 ? builds[0] as IJenkinsBuild : undefined;
    }

    isSuccessful(build: IJenkinsBuild): boolean {

        if (this.isInvalid(build) || this.isInvalid(build.result)) {
            return false;
        }

        return build.result.toUpperCase().trim().replace(" ", "") === "SUCCESS";
    }

    isUnstable(build: IJenkinsBuild): boolean {

        if (this.isInvalid(build) || this.isInvalid(build.result)) {
            return false;
        }

        return build.result.toUpperCase().trim().replace(" ", "") === "UNSTABLE";
    }

    isFailed(build: IJenkinsBuild): boolean {

        if (this.isInvalid(build) || this.isInvalid(build.result)) {
            return false;
        }

        return build.result.toUpperCase().trim().replace(" ", "") === "FAILURE";
    }

    isAborted(build: IJenkinsBuild): boolean {

        if (this.isInvalid(build) || this.isInvalid(build.result)) {
            return false;
        }

        return build.result.toUpperCase().trim().replace(" ", "") === "ABORTED";
    }

    isRunning(build: IJenkinsBuild): boolean {

        if (this.isInvalid(build) || this.isInvalid(build.building)) {
            return false;
        }

        return build.building;
    }

    isOffline(node: IJenkinsNode): boolean {

        if (this.isInvalid(node)) {
            return false;
        }

        if (this.isInvalid(node.offline)) {
            return false;
        }

        return node.offline;
    }

    isTemporarilyOffline(node: IJenkinsNode): boolean {

        if (this.isInvalid(node)) {
            return false;
        }

        if (this.isInvalid(node.temporarilyOffline)) {
            return false;
        }

        return node.temporarilyOffline;
    }

    isIdle(node: IJenkinsNode): boolean {

        if (this.isInvalid(node)) {
            return false;
        }

        if (this.isInvalid(node.idle)) {
            return false;
        }

        return node.idle;
    }

    getBuildMapContainingCommit(buildList: Map<any, Array<IJenkinsBuild>>, changeSetId: string): Map<IJenkinsJob, Array<IJenkinsBuild>> {
        let parent = this;

        let builds: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();

        if (this.isInvalid(buildList) || this.isInvalid(changeSetId)) {
            return builds;
        }

        Array.from(buildList.keys()).forEach(function (job: IJenkinsJob) {
            if (parent.isInvalid(job.builds)) {
                return;
            }

            job.builds.forEach(function (build: IJenkinsBuild) {
                if (parent.isInvalid(build.changeSets)) {
                    return;
                }

                build.changeSets.forEach(function (changeSet: IJenkinsChangeSet) {
                    if (parent.isInvalid(changeSet)) {
                        return;
                    }

                    if (changeSet.commitId === changeSetId) {
                        if (!builds.has(job)) {
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

    getBuildDuration(build: IJenkinsBuild): number {

        if (build === undefined || build === null || build.duration === undefined || build.duration === null) {
            return 0;
        }

        return build.duration as number;
    }

    getBuildAverageDuration(builds: Array<IJenkinsBuild>): number {
        let parent = this;

        if (this.isInvalid(builds)) {
            return 0;
        }

        let durations: Array<number> = builds.map(build => build.duration);
        let totalDuration = durations.reduce(function (a, b) {
            if (parent.isInvalid(a)) {
                return b;
            }
            if (parent.isInvalid(b)) {
                return a;
            }
            return a + b;
        });
        let average = totalDuration / builds.length;

        return Math.round(average);
    }

    getBuildAverageWeightedDuration(builds: Array<IJenkinsBuild>): number {

        if (this.isInvalid(builds)) {
            return 0;
        }

        let durationsMinutes: Array<number> = builds.map(build => Math.ceil(moment.duration(build.duration, "milliseconds").asMinutes()));
        let durationsWithWeights: Array<Array<number>> = new Array<Array<number>>();

        for (let i = 0; i < durationsMinutes.length; i++) {
            let value = durationsMinutes[i];
            if (typeof durationsWithWeights[value] === "undefined") {
                durationsWithWeights[value] = [value, 1];
            } else {
                durationsWithWeights[value][1]++;
            }
        }

        let totalWeight: number = durationsWithWeights.map(array => array[1]).reduce((a, b) => a + b);
        
        let weightedDuration:number = durationsWithWeights.reduce(function (mean, weightedValue) {
            return mean + weightedValue[0] * weightedValue[1] / totalWeight;
        }, 0);
        
        if (isNaN(totalWeight) || isNaN(weightedDuration) || totalWeight === 0 || weightedDuration === 0) {
            return this.getBuildAverageDuration(builds);
        }
        
        return Math.ceil(weightedDuration);
    }
    
    public getBuildTimeInQueue(build: IJenkinsBuild):number {
        let timeInQueueArray: Array<IJenkinsAction> = build.actions.filter(action => (action as IJenkinsAction).isTimeInQueueActionClass());
        
        if (!this.isInvalid(timeInQueueArray)) {
            let timeInQueue = ((timeInQueueArray[0]) as JenkinsTimeInQueueAction).getQueuingDurationMillis();
            
            if (!this.isInvalid(timeInQueue) && !isNaN(timeInQueue) && timeInQueue > 0) {
                return timeInQueue;
            }
        }
        
        return 0;
    }
    
    public getBuildTotalTime(build: IJenkinsBuild):number {
        let totalTimeArray: Array<IJenkinsAction> = build.actions.filter(action => (action as IJenkinsAction).isTimeInQueueActionClass());
        
        if (!this.isInvalid(totalTimeArray)) {
            let totalTime = ((totalTimeArray[0]) as JenkinsTimeInQueueAction).getTotalDurationMillis();
            
            if (!this.isInvalid(totalTime) && !isNaN(totalTime) && totalTime > 0) {
                return totalTime;
            }
        }
        
        return build.duration;
    }

    getNumberOfBuilds(job: IJenkinsJob): number {
        if (job === undefined || job.builds === undefined || job.builds.length === 0) {
            return 0;
        }

        return job.builds.length;
    }

    getLastBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastBuild === undefined
            || job.lastBuild.timestamp === undefined || job.lastBuild.timestamp === 0) {

            return 0;
        }

        return job.lastBuild.timestamp;
    }

    getLastSuccessfulBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastSuccessfulBuild === undefined
            || job.lastSuccessfulBuild.timestamp === undefined || job.lastSuccessfulBuild.timestamp === 0) {

            return 0;
        }

        return job.lastSuccessfulBuild.timestamp;
    }

    getLastFailedBuildTimestamp(job: IJenkinsJob): number {
        if (job === undefined || job.lastFailedBuild === undefined
            || job.lastFailedBuild.timestamp === undefined || job.lastFailedBuild.timestamp === 0) {

            return 0;
        }

        return job.lastFailedBuild.timestamp;
    }

    padDate(dateTime: Date): string {
        let year = dateTime.getFullYear();
        let month: string = ('0' + dateTime.getMonth()).slice(-2);
        let day: string = ('0' + dateTime.getDay()).slice(-2);

        return year + "/" + month + "/" + day;
    }

    padTime(dateTime: Date): string {
        let hours: string = ('0' + dateTime.getHours()).slice(-2);
        let minutes: string = ('0' + dateTime.getMinutes()).slice(-2);

        return hours + ":" + minutes;
    }

    padTimestamp(timestamp: number): number {

        if (timestamp === 0) {
            return 0;
        }

        if (timestamp < 0) {
            timestamp = timestamp * -1;
        }

        let lowerMargin = 999999999999;
        let upperMargin = lowerMargin * 10;

        let maxIterations: number = 10;
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

    isSameDate(dateTimeA: Date, dateTimeB: Date): boolean {
        var format: string = "DD/MM/YYYY";
        var momentA = moment(dateTimeA, format);
        var momentB = moment(dateTimeB, format);

        return momentA.isSame(momentB, "day") || momentA.format(format) === momentB.format(format);
    }

    isAfterDate(dateTimeA: Date, dateTimeB: Date): boolean {
        var format: string = "DD/MM/YYYY";
        var momentA = moment(dateTimeA, format);
        var momentB = moment(dateTimeB, format);

        return momentA.isSameOrAfter(momentB, "day");
    }

    isAfter(dateTimeA: Date, dateTimeB: Date): boolean {
        var momentA = moment(dateTimeA);
        var momentB = moment(dateTimeB);

        return momentA.isAfter(momentB);
    }
}