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
import {JenkinsBuildStatus} from 'jenkins-api-ts-typings';

@Injectable()
export class UtilService {
    private readonly _INSTANCE_ID: string;

    constructor() {
        this._INSTANCE_ID = this.uuidv4();
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

    padDate(dateTime: Date): string {
        if (this.isInvalid(dateTime)) {
            return new Date().toISOString().slice(0, 10);
        }

        return dateTime.toISOString().slice(0, 10);
    }

    padTime(dateTime: Date): string {
        if (this.isInvalid(dateTime)) {
            return "00:00";
        }

        let hours: string = ('0' + dateTime.getHours()).slice(-2);
        let minutes: string = ('0' + dateTime.getMinutes()).slice(-2);

        return hours + ":" + minutes;
    }

    padTimestamp(timestamp: number): number {

        if (this.isInvalid(timestamp) || timestamp === 0) {
            return 0;
        }

        if (timestamp < 0) {
            timestamp = timestamp * -1;
        }

        if (timestamp < 1) {
            timestamp = 1;
        }

        timestamp = Math.round(timestamp);

        let lowerMargin = 999999999999;
        let upperMargin = lowerMargin * 10;

        let maxIterations: number = 100;
        while (timestamp < lowerMargin && maxIterations > 0) {
            timestamp = timestamp * 10;
            maxIterations--;
        }

        maxIterations = 100;
        while (timestamp > upperMargin && maxIterations > 0) {
            timestamp = Math.round(timestamp / 10);
            maxIterations--;
        }

        timestamp = Math.round(timestamp);
        return timestamp;
    }

    isSameDate(dateTimeA: Date, dateTimeB: Date): boolean {
        var format: string = "DD/MM/YYYY";
        var momentA = moment(dateTimeA, format);
        var momentB = moment(dateTimeB, format);

        return momentA.isSame(momentB, "day") || momentA.format(format) === momentB.format(format);
    }

    isSameOrAfterDate(dateTimeA: Date, dateTimeB: Date): boolean {
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
    
    simpleFormatDuration(durationInMinutes: number, useFullDescriptors: boolean = false): string {
        let days = 0;
        let hours = 0;
        let minutes = 0;
        
        if (durationInMinutes > (60 * 24)) {
            days = Math.floor(durationInMinutes / (60 * 24));
            let durationWithoutDays = durationInMinutes - (days * 60 * 24);
            hours = Math.floor(durationWithoutDays / 60);
            let durationWithoutDaysWithoutHours = durationWithoutDays - (hours * 60);
            minutes = Math.floor(durationWithoutDaysWithoutHours % 60);
        } else if(durationInMinutes > 60) {
            hours = Math.floor(durationInMinutes / 60);
            let durationWithoutHours = durationInMinutes - (hours * 60);
            minutes = Math.floor(durationWithoutHours % 60);
        } else {
            minutes = durationInMinutes;
        }
        
        let formatted: string = (days > 0 ? days + 'd ' : "") + (hours > 0 ? hours + 'h ' : "") + minutes + 'm';
        if(useFullDescriptors) {
            formatted = (days > 0 ? days + 'days ' : "") + (hours > 0 ? hours + 'hours ' : "") + minutes + 'minutes';
        }
        
        return formatted;
    }

    mapToArray<T>(values: Map<any, Array<T>>): Array<T> {

        if (this.isInvalid(values)) {
            return new Array<T>();
        }

        return Array.from(values.values()).reduce((a, b) => a.concat(b), []);
    }

    getAffectedPathsArray(builds: Map<any, Array<IJenkinsChangeSet>>): Array<string> {
        if (this.isInvalid(builds)) {
            return new Array<string>();
        }
        
        return this.mapToArray(builds)
            .filter(changeSet => (!this.isInvalid(changeSet) && !this.isInvalid(changeSet.affectedPaths)))
            .map(changeSet => changeSet.affectedPaths)
            .reduce((a, b) => a.concat(b), []);
    }

    getJobByName(jobList: Array<IJenkinsJob>, name: string): IJenkinsJob {
        if (this.isInvalid(jobList) || this.isInvalid(name)) {
            return undefined;
        }
        
        let jobs: Array<IJenkinsJob> = jobList.filter(job => (!this.isInvalid(job) && job.name === name));

        return jobs.length > 0 ? jobs[0] : undefined;
    }

    getJobByBuildUrl(jobList: Array<IJenkinsJob>, buildUrl: string): IJenkinsJob {
        if (this.isInvalid(jobList) || this.isInvalid(buildUrl)) {
            return undefined;
        }

        for (let job of jobList) {
            if (this.isInvalid(job) || this.isInvalid(job.builds)) {
                continue;
            }
            
            let builds = job.builds
                .filter(build => (
                    !this.isInvalid(build) && 
                    !this.isInvalid(build.url) && 
                    build.url.toLowerCase().trim().replace(" ", "") === buildUrl.toLowerCase().trim().replace(" ", "")));

            if (!this.isInvalid(builds) && builds.length > 0) {
                return job;
            }
        }
        return undefined;
    }

    getUserByFullName(userList: Array<IJenkinsUser>, fullName: string): IJenkinsUser {
        if (this.isInvalid(userList) || this.isInvalid(fullName)) {
            return undefined;
        }
        
        let users: Array<IJenkinsUser> = userList.filter(user => !this.isInvalid(user) && !this.isInvalid(user.fullName) && user.fullName === fullName);

        return users.length > 0 ? users[0] : undefined;
    }

    getViewByName(viewList: Array<IJenkinsView>, name: string): IJenkinsView {
        if (this.isInvalid(viewList) || this.isInvalid(name)) {
            return undefined;
        }
        
        let views: Array<IJenkinsView> = viewList.filter(view => !this.isInvalid(view) && !this.isInvalid(view.name) && view.name === name);

        return views.length > 0 ? views[0] : undefined;
    }

    getBuildByBuildNumber(buildList: Array<IJenkinsBuild>, buildNumber: number): IJenkinsBuild {
        let builds = buildList.filter(build => build.number == buildNumber);

        return builds.length > 0 ? builds[0] as IJenkinsBuild : undefined;
    }

    buildResultIs(build: IJenkinsBuild, status: JenkinsBuildStatus) {

        if (this.isInvalid(status)) {
            return false;
        }

        if (this.isInvalid(build) || this.isInvalid(build.result)) {
            return false;
        }

        return build.result.toUpperCase().trim().replace(/ /g, "") === status.toUpperCase().trim().replace(/ /g, "");
    }

    buildIsRunning(build: IJenkinsBuild): boolean {

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

        if (this.isInvalid(build) || this.isInvalid(build.duration)) {
            return 0;
        }

        return build.duration as number;
    }

    getBuildAverageDuration(builds: Array<IJenkinsBuild>): number {
        let parent = this;

        if (this.isInvalid(builds)) {
            return 0;
        }

        let filteredBuilds: Array<IJenkinsBuild> = builds.filter(b => !parent.isInvalid(b) && !parent.isInvalid(b.duration) && !isNaN(b.duration));
        if (filteredBuilds.length === 0) {
            return 0;
        }

        let durations: Array<number> = filteredBuilds.map(build => build.duration);
        let totalDuration = durations.reduce(function (a: number, b: number) {
            return a + b;
        });
        let average = totalDuration / filteredBuilds.length;

        return Math.ceil(average);
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

        let weightedDuration: number = durationsWithWeights.reduce(function (mean, weightedValue) {
            return mean + weightedValue[0] * weightedValue[1] / totalWeight;
        }, 0);

        if (isNaN(totalWeight) || isNaN(weightedDuration) || totalWeight === 0 || weightedDuration === 0) {
            return this.getBuildAverageDuration(builds);
        }

        return Math.ceil(weightedDuration);
    }

    public getBuildTimeInQueue(build: IJenkinsBuild): number {
        if (this.isInvalid(build) || this.isInvalid(build.actions)) {
            return 0;
        }

        let timeInQueueArray: Array<IJenkinsAction> = build.actions.filter(action => (action as IJenkinsAction).isTimeInQueueActionClass());
        if (this.isInvalid(timeInQueueArray)) {
            return 0;
        }

        let timeInQueueAction: JenkinsTimeInQueueAction = timeInQueueArray[0] as JenkinsTimeInQueueAction;

        let timeInQueue = timeInQueueAction.getQueuingDurationMillis();
        if (!this.isInvalid(timeInQueue) && !isNaN(timeInQueue) && timeInQueue > 0) {
            return timeInQueue;
        }

        return 0;
    }

    public getBuildTotalTime(build: IJenkinsBuild): number {
        if (this.isInvalid(build) || this.isInvalid(build.actions)) {
            return 0;
        }

        let totalTimeArray: Array<IJenkinsAction> = build.actions.filter(action => (action as IJenkinsAction).isTimeInQueueActionClass());
        if (this.isInvalid(totalTimeArray)) {
            return 0;
        }

        let timeInQueueAction: JenkinsTimeInQueueAction = totalTimeArray[0] as JenkinsTimeInQueueAction;
        let totalTime = timeInQueueAction.getTotalDurationMillis();
        if (!this.isInvalid(totalTime) && !isNaN(totalTime) && totalTime > 0) {
            return totalTime;
        }

        return 0;
    }

    getNumberOfBuilds(job: IJenkinsJob): number {
        if (this.isInvalid(job) || this.isInvalid(job.builds)) {
            return 0;
        }

        return job.builds.length;
    }

    getLastBuildTimestamp(job: IJenkinsJob): number {
        if (this.isInvalid(job) || this.isInvalid(job.lastBuild) 
            || this.isInvalid(job.lastBuild.timestamp) || job.lastBuild.timestamp <= 0) {

            return 0;
        }

        return job.lastBuild.timestamp;
    }

    getLastSuccessfulBuildTimestamp(job: IJenkinsJob): number {
        if (this.isInvalid(job) || this.isInvalid(job.lastSuccessfulBuild) 
            || this.isInvalid(job.lastSuccessfulBuild.timestamp) || job.lastSuccessfulBuild.timestamp <= 0) {

            return 0;
        }

        return job.lastSuccessfulBuild.timestamp;
    }

    getLastFailedBuildTimestamp(job: IJenkinsJob): number {
        if (this.isInvalid(job) || this.isInvalid(job.lastFailedBuild) 
            || this.isInvalid(job.lastFailedBuild.timestamp) || job.lastFailedBuild.timestamp <= 0) {

            return 0;
        }

        return job.lastFailedBuild.timestamp;
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}