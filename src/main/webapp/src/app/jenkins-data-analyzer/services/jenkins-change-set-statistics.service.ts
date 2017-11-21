import {Logger} from 'angular2-logger/core';
import {UtilService} from '../../util/services/util.service';

import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import {StatisticsEntryProvider} from './StatisticsEntryProvider';
import {StatisticsCardEntry} from './StatisticsCardEntry';
import {StatisticsEntry} from './StatisticsEntry';

export class JenkinsChangeSetStatisticsService implements StatisticsEntryProvider {

    private analyzerData: StatisticsCardEntry;

    constructor(private util: UtilService, private LOGGER: Logger, private data: IJenkinsData) {
    }

    public getStatistics(): StatisticsCardEntry {
        this.analyzerData = new StatisticsCardEntry(
            "Commits",
            "Number Of Commits: " + this.util.getChangeSetArray(this.data.changeSets).length,
            [
                this.getNumberOfChangeSetsToday(this.data.changeSets),
                this.getNumberOfChangeSetsYesterday(this.data.changeSets),
                this.getUserWithMostCommits(this.data.changeSets),
                this.getTotalChangedFiles(this.data.changeSets),
                this.getAverageChangedFilesPerBuild(this.data.changeSets),
                this.getMostChangedFile(this.data.changeSets),
            ]
        );

        return this.analyzerData;
    }

    private getNumberOfChangeSetsToday(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let parent = this;
        let numberOfChangeSets: number = 0;

        let today = new Date();
        this.util.getChangeSetArray(data).forEach(function (changeSet) {
            if (!parent.util.isInvalid(changeSet.timestamp) && parent.util.isSameDate(new Date(changeSet.timestamp), today)) {
                numberOfChangeSets += 1;
            }
        });

        return new StatisticsEntry("Commits today", numberOfChangeSets + "", undefined);
    }

    private getNumberOfChangeSetsYesterday(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let parent = this;
        let numberOfChangeSets: number = 0;

        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        this.util.getChangeSetArray(data).forEach(function (changeSet) {
            if (parent.util.isSameDate(new Date(changeSet.timestamp), yesterday)) {
                numberOfChangeSets += 1;
            }
        });

        return new StatisticsEntry("Commits yesterday", numberOfChangeSets + "", undefined);
    }

    private getUserWithMostCommits(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let changeSetsByUser: Map<IJenkinsUser, Array<IJenkinsChangeSet>> = this.getChangeSetsByUser(data);

        if (this.util.isInvalid(changeSetsByUser)) {
            return new StatisticsEntry("User with most commits", "N/A", undefined);
        }

        let userWithMostCommits: IJenkinsUser = Array.from(changeSetsByUser.keys()).reduce(function (user1, user2) {
            if (changeSetsByUser.get(user1).length >= changeSetsByUser.get(user2).length) {
                return user1;
            }

            return user2;
        });

        let userStringResult: string = userWithMostCommits !== undefined
            ? userWithMostCommits.id + ", " + changeSetsByUser.get(userWithMostCommits).length + " commits"
            : "N/A";
        let userStringUrl: string = userWithMostCommits !== undefined
            ? userWithMostCommits.absoluteUrl
            : undefined;

        return new StatisticsEntry("User with most commits", userStringResult, userStringUrl);
    }

    private getTotalChangedFiles(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let numberOfAffectedPaths = this.util.getAffectedPathsArray(data).length;

        return new StatisticsEntry("Total changed files", numberOfAffectedPaths + "", undefined);
    }

    private getAverageChangedFilesPerBuild(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let numberOfBuilds = Array.from(data.keys()).length;
        let numberOfAffectedPaths = this.util.getAffectedPathsArray(data).length;
        let average = (numberOfAffectedPaths / numberOfBuilds).toFixed(2);

        return new StatisticsEntry("Average changed files per build", average + "", undefined);
    }

    private getMostChangedFile(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): StatisticsEntry {
        let files: Map<string, number> = new Map<string, number>();

        this.util.getAffectedPathsArray(data).forEach(function (path) {
            if (!files.has(path)) {
                files.set(path, 0);
            }

            let changed = files.get(path);
            files.set(path, changed + 1);
        });

        if (this.util.isInvalid(files)) {
            return new StatisticsEntry("Most changed file", "N/A", undefined);
        }

        let mostChanged = Array.from(files.keys()).reduce(function (file1, file2) {
            return files.get(file1) >= files.get(file2) ? file1 : file2;
        });

        return new StatisticsEntry("Most changed file", mostChanged + ", " + files.get(mostChanged) + " commits", undefined);
    }

    private getChangeSetsByUser(data: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>): Map<IJenkinsUser, Array<IJenkinsChangeSet>> {
        var changeSetsByUser: Map<IJenkinsUser, Array<IJenkinsChangeSet>> = new Map<IJenkinsUser, Array<IJenkinsChangeSet>>();

        this.util.getChangeSetArray(data).forEach(function (changeSet) {

            if (!changeSetsByUser.has(changeSet.author)) {
                changeSetsByUser.set(changeSet.author, new Array<IJenkinsChangeSet>());
            }

            changeSetsByUser.get(changeSet.author).push(changeSet);
        });

        return changeSetsByUser;
    }
}
