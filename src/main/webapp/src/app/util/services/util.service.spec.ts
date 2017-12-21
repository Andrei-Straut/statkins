import {TestBed, inject} from '@angular/core/testing';

import {UtilService} from './util.service';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuildStatus} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {JenkinsNode} from 'jenkins-api-ts-typings';
import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {JenkinsUser} from 'jenkins-api-ts-typings';
import {IJenkinsView} from 'jenkins-api-ts-typings';
import {JenkinsView} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {JenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';
import {JenkinsAction} from 'jenkins-api-ts-typings';
import {JenkinsTimeInQueueAction} from 'jenkins-api-ts-typings';

import {AndreiStrautInfoMasterBuild12DataProvider} from '../../test-mock/data-provider/build/andrei-straut-info-master-build-12-data-provider';
import {AndreiStrautInfoMasterBuild13DataProvider} from '../../test-mock/data-provider/build/andrei-straut-info-master-build-13-data-provider';

describe('UtilService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UtilService]
        });
    });

    it('should be created', inject([UtilService], (service: UtilService) => {
        expect(service).toBeTruthy();
    }));

    it('isInvalid should give true for undefined', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(undefined)).toBeTruthy();
    }));

    it('isInvalid should give true for null', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(null)).toBeTruthy();
    }));

    it('isInvalid should give true for empty array', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(new Array<any>())).toBeTruthy();
    }));

    it('isInvalid should give true for empty map', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(new Map<any, any>())).toBeTruthy();
    }));

    it('isInvalid should give false for non-empty array', inject([UtilService], (service: UtilService) => {
        let stringArray: Array<string> = new Array<string>();
        stringArray.push("SomeString");

        expect(service.isInvalid(stringArray)).toBeFalsy();
    }));

    it('isInvalid should give false for non-empty map', inject([UtilService], (service: UtilService) => {
        let stringMap: Map<string, string> = new Map<string, string>();
        stringMap.set("SomeStringKey", "SomeStringValue");

        expect(service.isInvalid(stringMap)).toBeFalsy();
    }));

    it('isInvalid should give false for number', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(123)).toBeFalsy();
    }));

    it('isInvalid should give false for string', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid(123)).toBeFalsy();
    }));

    it('isInvalid should give false for object', inject([UtilService], (service: UtilService) => {
        expect(service.isInvalid({"SomeObjectKey": "SomeObjectValue"})).toBeFalsy();
    }));

    it('padDate should return valid date when input is undefined', inject([UtilService], (service: UtilService) => {
        expect(service.padDate(undefined).length).toBe(10);
    }));

    it('padDate should return valid date when input is null', inject([UtilService], (service: UtilService) => {
        expect(service.padDate(null).length).toBe(10);
    }));

    it('padDate should return correct value for date', inject([UtilService], (service: UtilService) => {
        let date: Date = new Date();
        expect(service.padDate(date).length).toBe(10);
    }));

    it('padTime should return 00:00 when input is undefined', inject([UtilService], (service: UtilService) => {
        expect(service.padTime(undefined)).toBe("00:00");
    }));

    it('padTime should return 00:00 when input is null', inject([UtilService], (service: UtilService) => {
        expect(service.padTime(null)).toBe("00:00");
    }));

    it('padTime should return correct value for date', inject([UtilService], (service: UtilService) => {
        let inputDate: Date = new Date();
        let inputHours: string = ('0' + inputDate.getHours()).slice(-2);
        let inputMinutes: string = ('0' + inputDate.getMinutes()).slice(-2);
        let expected = inputHours + ":" + inputMinutes;

        expect(service.padTime(inputDate)).toBe(expected);
    }));

    it('padTimestamp should return 0 when input is undefined', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(undefined)).toBe(0);
    }));

    it('padTimestamp should return 0 when input is null', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(null)).toBe(0);
    }));

    it('padTimestamp should return 0 when timestamp is 0', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(0)).toBe(0);
    }));

    it('padTimestamp should return valid value when input is smaller than 0', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(-123456789)).toBe(1234567890000);
    }));

    it('padTimestamp should return valid value when input is smaller than 1', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(0.123456789)).toBe(1000000000000);
    }));

    it('padTimestamp should return valid value when input is smaller than number of returned characters', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(123456789)).toBe(1234567890000);
    }));

    it('padTimestamp should return valid value when input is not an integer', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(123456789.123456789)).toBe(1234567890000);
    }));

    it('padTimestamp should return valid value when input is very small', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(1)).toBe(1000000000000);
    }));

    it('padTimestamp should return valid value when input is larger than number of returned characters', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(1234567890123456879)).toBe(1234567890124);
    }));

    it('padTimestamp should return valid value when input is MUCH larger than number of returned characters', inject([UtilService], (service: UtilService) => {
        expect(service.padTimestamp(123456789012345687901234567890123456790)).toBe(1234567890124);
    }));

    it('isSameDate should return true for equal dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date();
        let date2 = date1;
        expect(service.isSameDate(date1, date2)).toBeTruthy();
    }));

    it('isSameDate should return true for different same day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 4, 2017 14:13:00");
        expect(service.isSameDate(date1, date2)).toBeTruthy();
    }));

    it('isSameDate should return true for different day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 3, 2017 14:13:00");
        expect(service.isSameDate(date1, date2)).toBeFalsy();
    }));

    it('isSameOrAfterDate should return true for equal dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date();
        let date2 = date1;
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isSameOrAfterDate should return false for different same day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 4, 2017 14:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isSameOrAfterDate should return true for later dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 3, 2017 14:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isSameOrAfterDate should return false for before dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 3, 2017 14:13:00");
        let date2 = new Date("February 4, 2017 10:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeFalsy();
    }));

    it('isAfter should return false for equal dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date();
        let date2 = date1;
        expect(service.isAfter(date1, date2)).toBeFalsy();
    }));

    it('isAfter should return false for earlier different same day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 4, 2017 14:13:00");
        expect(service.isAfter(date1, date2)).toBeFalsy();
    }));

    it('isAfter should return true for later different same day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 14:13:00");
        let date2 = new Date("February 4, 2017 10:13:00");
        expect(service.isAfter(date1, date2)).toBeTruthy();
    }));

    it('isAfter should return true for later dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 3, 2017 14:13:00");
        expect(service.isAfter(date1, date2)).toBeTruthy();
    }));

    it('isAfter should return false for before dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 3, 2017 14:13:00");
        let date2 = new Date("February 4, 2017 10:13:00");
        expect(service.isAfter(date1, date2)).toBeFalsy();
    }));

    it('mapToArray should return empty for undefined', inject([UtilService], (service: UtilService) => {
        let expectedLength = 0;

        expect(service.mapToArray(undefined).length).toBe(expectedLength);
    }));

    it('mapToArray should return empty for null', inject([UtilService], (service: UtilService) => {
        let expectedLength = 0;

        expect(service.mapToArray(null).length).toBe(expectedLength);
    }));

    it('mapToArray should return empty for empty map', inject([UtilService], (service: UtilService) => {
        let emptyMap: Map<any, Array<any>> = new Map<any, Array<any>>();
        let expectedLength = 0;

        expect(service.mapToArray(emptyMap).length).toBe(expectedLength);
    }));

    it('mapToArray should return the values for a map with one key', inject([UtilService], (service: UtilService) => {
        let map: Map<string, Array<string>> = new Map<string, Array<string>>();
        let valuesArray: Array<string> = new Array<string>();

        valuesArray.push("Key1Value1");
        valuesArray.push("Key1Value2");
        map.set("Key1", valuesArray);

        let expectedLength = 2;

        expect(service.mapToArray(map).length).toBe(expectedLength);
        expect(service.mapToArray(map)).toEqual(valuesArray);
    }));

    it('mapToArray should return the values for a map with two keys', inject([UtilService], (service: UtilService) => {
        let map: Map<string, Array<string>> = new Map<string, Array<string>>();
        let values1Array: Array<string> = new Array<string>();
        let values2Array: Array<string> = new Array<string>();

        values1Array.push("Key1Value1");
        values1Array.push("Key1Value2");
        values2Array.push("Key2Value1");
        values2Array.push("Key2Value2");
        map.set("Key1", values1Array);
        map.set("Key2", values2Array);

        let expectedLength = 4;
        let expectedValue = values1Array.concat(values2Array);

        expect(service.mapToArray(map).length).toBe(expectedLength);
        expect(service.mapToArray(map)).toEqual(expectedValue);
    }));
    
    it('getAffectedPathsArray should return empty for undefined build array', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = undefined;
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for null build array', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = null;
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for empty build array', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
        
    }));
    
    it('getAffectedPathsArray should return empty for builds with undefined changesets', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        build1.changeSets = undefined;
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        build2.changeSets = undefined;
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
        
    }));
    
    it('getAffectedPathsArray should return empty for builds with null changesets', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        build1.changeSets = null;
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        build2.changeSets = null;
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for builds with empty changesets', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        build1.changeSets = new Array<IJenkinsChangeSet>();
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        build2.changeSets = new Array<IJenkinsChangeSet>();
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for changesets with undefined affected paths', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        let build1ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build1ChangeSet.affectedPaths = undefined;
        build1.changeSets = Array.from([build1ChangeSet]);
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        let build2ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build2ChangeSet.affectedPaths = undefined;
        build2.changeSets = Array.from([build2ChangeSet]);
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for changesets with null affected paths', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        let build1ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build1ChangeSet.affectedPaths = null;
        build1.changeSets = Array.from([build1ChangeSet]);
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        let build2ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build2ChangeSet.affectedPaths = null;
        build2.changeSets = Array.from([build2ChangeSet]);
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return empty for changesets with empty affected paths', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        let build1ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build1ChangeSet.affectedPaths = new Array<string>();
        build1.changeSets = Array.from([build1ChangeSet]);
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        let build2ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build2ChangeSet.affectedPaths = new Array<string>();;
        build2.changeSets = Array.from([build2ChangeSet]);
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(0);
    }));
    
    it('getAffectedPathsArray should return correct values for changesets with affected paths', inject([UtilService], (service: UtilService) => {
        let builds: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
        let build1: IJenkinsBuild = new JenkinsBuild();
        let build1ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build1ChangeSet.affectedPaths = Array.from(["SomeAffectedPath1", "SomeAffectedPath11", "SomeAffectedPath12"]);
        build1.changeSets = Array.from([build1ChangeSet]);
        
        let build2: IJenkinsBuild = new JenkinsBuild();
        let build2ChangeSet: IJenkinsChangeSet = new JenkinsChangeSet();
        build2ChangeSet.affectedPaths = Array.from(["SomeAffectedPath1", "SomeAffectedPath21", "SomeAffectedPath22"]);
        build2.changeSets = Array.from([build2ChangeSet]);
        
        builds.set(build1, build1.changeSets);
        builds.set(build2, build2.changeSets);
        
        expect(service.getAffectedPathsArray(builds)).toBeTruthy();
        expect(service.getAffectedPathsArray(builds).length).toBe(6);
    }));
    
    it('getJobByName should return undefined for undefined job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = undefined;

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined for null job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = null;

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined for empty job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined for job array with undefined jobs', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = Array.from([undefined, undefined, undefined]);

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined for job array with null jobs', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = Array.from([null, null, null]);

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined for job array with undefined job names', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = Array.from([new JenkinsJob(), new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return undefined when job with given name not found', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.name = "SomeOtherName";
        let jobList: Array<IJenkinsJob> = Array.from([job, new JenkinsJob(), new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, "SomeName")).toBeUndefined();
    }));

    it('getJobByName should return correct undefined when given job name is undefined', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.name = "SomeName";
        
        let jobList: Array<IJenkinsJob> = Array.from([job, new JenkinsJob(), new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, undefined)).toBeUndefined;
    }));

    it('getJobByName should return correct undefined when given job name is null', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.name = "SomeName";
        
        let jobList: Array<IJenkinsJob> = Array.from([job, new JenkinsJob(), new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, null)).toBeUndefined;
    }));

    it('getJobByName should return correct results when job with given name is found', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.name = "SomeName";
        let jobList: Array<IJenkinsJob> = Array.from([job, new JenkinsJob(), new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, "SomeName")).toBe(job);
    }));

    it('getJobByName should return correct results when more than one job with given name is found', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.name = "SomeName";
        job.buildable = true;
        job.nextBuildNumber = 1;
        
        let someOtherJob: IJenkinsJob = new JenkinsJob();
        job.name = "SomeName";
        job.buildable = false;
        job.nextBuildNumber = 100;
        
        let jobList: Array<IJenkinsJob> = Array.from([job, new JenkinsJob(), someOtherJob, new JenkinsJob(), new JenkinsJob()]);

        expect(service.getJobByName(jobList, "SomeName")).toBe(job);
        expect(service.getJobByName(jobList, "SomeName").nextBuildNumber).toBe(job.nextBuildNumber);
        expect(service.getJobByName(jobList, "SomeName").buildable).toBe(job.buildable);
    }));

    it('getJobByBuildUrl should return undefined for undefined job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = undefined;

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for null job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = null;

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for empty job array', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for job array with undefined jobs', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = Array.from([undefined, undefined, undefined]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for job array with null jobs', inject([UtilService], (service: UtilService) => {
        let jobList: Array<IJenkinsJob> = Array.from([null, null, null]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for job array with undefined job builds', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        job1.builds = undefined;
        let job2: IJenkinsJob = new JenkinsJob();
        job2.builds = undefined;
        let job3: IJenkinsJob = new JenkinsJob();
        job3.builds = undefined;
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for job array with undefined build urls', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        job1.builds = Array.from([new JenkinsBuild()]);
        
        let job2: IJenkinsJob = new JenkinsJob();
        job2.builds = Array.from([new JenkinsBuild()]);
        
        let job3: IJenkinsJob = new JenkinsJob();
        job3.builds = Array.from([new JenkinsBuild()]);
        
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrl")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for undefined given build url', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        let job1Build: IJenkinsBuild = new JenkinsBuild();
        job1Build.url = "SomeUrl1";
        job1.builds = Array.from([job1Build]);
        
        let job2: IJenkinsJob = new JenkinsJob();
        let job2Build: IJenkinsBuild = new JenkinsBuild();
        job2Build.url = "SomeUrl2";
        job2.builds = Array.from([job2Build]);
        
        let job3: IJenkinsJob = new JenkinsJob();
        let job3Build: IJenkinsBuild = new JenkinsBuild();
        job3Build.url = "SomeUrl2";
        job3.builds = Array.from([job3Build]);
        
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, undefined)).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined for null given build url', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        let job1Build: IJenkinsBuild = new JenkinsBuild();
        job1Build.url = "SomeUrl1";
        job1.builds = Array.from([job1Build]);
        
        let job2: IJenkinsJob = new JenkinsJob();
        let job2Build: IJenkinsBuild = new JenkinsBuild();
        job2Build.url = "SomeUrl2";
        job2.builds = Array.from([job2Build]);
        
        let job3: IJenkinsJob = new JenkinsJob();
        let job3Build: IJenkinsBuild = new JenkinsBuild();
        job3Build.url = "SomeUrl2";
        job3.builds = Array.from([job3Build]);
        
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, null)).toBeUndefined();
    }));

    it('getJobByBuildUrl should return undefined when given build url is not found', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        let job1Build: IJenkinsBuild = new JenkinsBuild();
        job1Build.url = "SomeUrl1";
        job1.builds = Array.from([job1Build]);
        
        let job2: IJenkinsJob = new JenkinsJob();
        let job2Build: IJenkinsBuild = new JenkinsBuild();
        job2Build.url = "SomeUrl2";
        job2.builds = Array.from([job2Build]);
        
        let job3: IJenkinsJob = new JenkinsJob();
        let job3Build: IJenkinsBuild = new JenkinsBuild();
        job3Build.url = "SomeUrl2";
        job3.builds = Array.from([job3Build]);
        
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrlThatDoesntExist")).toBeUndefined();
    }));

    it('getJobByBuildUrl should return correct results when more than 1 build with given url is found', inject([UtilService], (service: UtilService) => {
        let job1: IJenkinsJob = new JenkinsJob();
        job1.buildable = true;
        let job1Build: IJenkinsBuild = new JenkinsBuild();
        job1Build.url = "SomeUrl1";
        job1Build.building = true;
        job1.builds = Array.from([job1Build]);
        
        let job2: IJenkinsJob = new JenkinsJob();
        job2.buildable = false;
        let job2Build: IJenkinsBuild = new JenkinsBuild();
        job2Build.url = "SomeUrl1";
        job2Build.building = false;
        job2.builds = Array.from([job2Build]);
        
        let job3: IJenkinsJob = new JenkinsJob();
        let job3Build: IJenkinsBuild = new JenkinsBuild();
        job3Build.url = "SomeUrl2";
        job3.builds = Array.from([job3Build]);
        
        let jobList: Array<IJenkinsJob> = Array.from([job1, job2, job3]);

        expect(service.getJobByBuildUrl(jobList, "SomeUrl1")).toBe(job1);
        expect(service.getJobByBuildUrl(jobList, "SomeUrl1").buildable).toBe(job1.buildable);
    }));
    
    it('getUserByFullName should return undefined for undefined user array', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = undefined;

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined for null user array', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = null;

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined for empty user array', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = new Array<IJenkinsUser>();

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined for user array with undefined users', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = Array.from([undefined, undefined, undefined]);

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined for user array with null users', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = Array.from([null, null, null]);

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined for users array with undefined user names', inject([UtilService], (service: UtilService) => {
        let userList: Array<IJenkinsUser> = Array.from([new JenkinsUser(), new JenkinsUser(), new JenkinsUser()]);

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return undefined when user with given name not found', inject([UtilService], (service: UtilService) => {
        let user: IJenkinsUser = new JenkinsUser();
        user.fullName = "SomeOtherName";
        let userList: Array<IJenkinsUser> = Array.from([user, new JenkinsUser(), new JenkinsUser(), new JenkinsUser()]);

        expect(service.getUserByFullName(userList, "SomeName")).toBeUndefined();
    }));

    it('getUserByFullName should return correct undefined when given user name is undefined', inject([UtilService], (service: UtilService) => {
        let user: IJenkinsUser = new JenkinsUser();
        user.fullName = "SomeName";
        
        let userList: Array<IJenkinsUser> = Array.from([user, new JenkinsUser(), new JenkinsUser(), new JenkinsUser()]);

        expect(service.getUserByFullName(userList, undefined)).toBeUndefined;
    }));

    it('getUserByFullName should return correct undefined when given user name is null', inject([UtilService], (service: UtilService) => {
        let user: IJenkinsUser = new JenkinsUser();
        user.fullName = "SomeName";
        
        let userList: Array<IJenkinsUser> = Array.from([user, new JenkinsUser(), new JenkinsUser(), new JenkinsUser()]);

        expect(service.getUserByFullName(userList, null)).toBeUndefined;
    }));

    it('getUserByFullName should return correct results when user with given name is found', inject([UtilService], (service: UtilService) => {
        let user: IJenkinsUser = new JenkinsUser();
        user.fullName = "SomeName";
        
        let userList: Array<IJenkinsUser> = Array.from([user, new JenkinsUser(), new JenkinsUser(), new JenkinsUser()]);

        expect(service.getUserByFullName(userList, "SomeName")).toBe(user);
    }));

    it('getUserByFullName should return correct results when more than one user with given name is found', inject([UtilService], (service: UtilService) => {
        let user1: IJenkinsUser = new JenkinsUser();
        user1.fullName = "SomeName";
        user1.id = "ID1";
        
        let user2: IJenkinsUser = new JenkinsUser();
        user2.fullName = "SomeName";
        user2.id = "ID2";
        
        let user3: IJenkinsUser = new JenkinsUser();
        user3.fullName = "SomeName3";
        user3.id = "ID3";
        
        let userList: Array<IJenkinsUser> = Array.from([user1, user2, user3]);

        expect(service.getUserByFullName(userList, "SomeName")).toBe(user1);
        expect(service.getUserByFullName(userList, "SomeName").id).toBe(user1.id);
    }));
    
    it('getViewByName should return undefined for undefined view array', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = undefined;

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined for null view array', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = null;

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined for empty view array', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = new Array<IJenkinsView>();

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined for view array with undefined views', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = Array.from([undefined, undefined, undefined]);

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined for user array with null views', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = Array.from([null, null, null]);

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined for view array with undefined view names', inject([UtilService], (service: UtilService) => {
        let viewList: Array<IJenkinsView> = Array.from([new JenkinsView(), new JenkinsView(), new JenkinsView()]);

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return undefined when view with given name not found', inject([UtilService], (service: UtilService) => {
        let view: IJenkinsView = new JenkinsView();
        view.name = "SomeOtherName";
        let viewList: Array<IJenkinsView> = Array.from([view, new JenkinsView(), new JenkinsView(), new JenkinsView()]);

        expect(service.getViewByName(viewList, "SomeName")).toBeUndefined();
    }));

    it('getViewByName should return correct undefined when given view name is undefined', inject([UtilService], (service: UtilService) => {
        let view: IJenkinsView = new JenkinsView();
        view.name = "SomeName";
        
        let viewList: Array<IJenkinsView> = Array.from([view, new JenkinsView(), new JenkinsView(), new JenkinsView()]);

        expect(service.getViewByName(viewList, undefined)).toBeUndefined;
    }));

    it('getViewByName should return correct undefined when given view name is null', inject([UtilService], (service: UtilService) => {
        let view: IJenkinsView = new JenkinsView();
        view.name = "SomeName";
        
        let viewList: Array<IJenkinsView> = Array.from([view, new JenkinsView(), new JenkinsView(), new JenkinsView()]);

        expect(service.getViewByName(viewList, null)).toBeUndefined;
    }));

    it('getViewByName should return correct results when view with given name is found', inject([UtilService], (service: UtilService) => {
        let view: IJenkinsView = new JenkinsView();
        view.name = "SomeName";
        
        let viewList: Array<IJenkinsView> = Array.from([view, new JenkinsView(), new JenkinsView(), new JenkinsView()]);

        expect(service.getViewByName(viewList, "SomeName")).toBe(view);
    }));

    it('getViewByName should return correct results when more than one view with given name is found', inject([UtilService], (service: UtilService) => {
        let view1: IJenkinsView = new JenkinsView();
        view1.name = "SomeName";
        view1.description = "Description1";
        
        let view2: IJenkinsView = new JenkinsView();
        view2.name = "SomeName";
        view2.description = "Description2";
        
        let view3: IJenkinsView = new JenkinsView();
        view3.name = "SomeName3";
        view3.description = "Description3";
        
        let viewList: Array<IJenkinsView> = Array.from([view1, view2, view3]);

        expect(service.getViewByName(viewList, "SomeName")).toBe(view1);
        expect(service.getViewByName(viewList, "SomeName").description).toBe(view1.description);
    }));

    it('buildResultIs should return false for undefined parameter', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SUCCESS";
        expect(service.buildResultIs(build, undefined)).toBeFalsy();
    }));

    it('buildResultIs should return false for null parameter', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SUCCESS";
        expect(service.buildResultIs(build, undefined)).toBeFalsy();
    }));

    it('buildResultIs should return true for build status ABORTED when testing against string ABORTED', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "ABORTED";
        expect(service.buildResultIs(build, "ABORTED")).toBeTruthy();
    }));

    it('buildResultIs should return true for build status FAILURE when testing against string FAILURE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "FAILURE";
        expect(service.buildResultIs(build, "FAILURE")).toBeTruthy();
    }));

    it('buildResultIs should return true for build status SUCCESS when testing against string SUCCESS', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SUCCESS";
        expect(service.buildResultIs(build, "SUCCESS")).toBeTruthy();
    }));

    it('buildResultIs should return true for build status UNSTABLE when testing against string UNSTABLE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "UNSTABLE";
        expect(service.buildResultIs(build, "UNSTABLE")).toBeTruthy();
    }));

    it('buildResultIs should return false for undefined build status', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = undefined;
        expect(service.buildResultIs(build, JenkinsBuildStatus.Success)).toBeFalsy();
    }));

    it('buildResultIs should return false for null build status', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = undefined;
        expect(service.buildResultIs(build, JenkinsBuildStatus.Success)).toBeFalsy();
    }));

    it('buildResultIs should return false for build status unknown when testing ABORTED', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SomeBuildStatus";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeFalsy();
    }));

    it('buildResultIs should return false for build status unknown when testing FAILURE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SomeBuildStatus";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Failure)).toBeFalsy();
    }));

    it('buildResultIs should return false for build status unknown when testing SUCCESS', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SomeBuildStatus";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Success)).toBeFalsy();
    }));

    it('buildResultIs should return false for build status unknown when testing UNSTABLE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "SomeBuildStatus";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Unstable)).toBeFalsy();
    }));

    it('buildResultIs should return true for build status ABORTED when testing ABORTED', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "Aborted";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeTruthy();
    }));

    it('buildResultIs should return false for build status FAILURE when testing FAILURE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "Failure";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Failure)).toBeTruthy();
    }));

    it('buildResultIs should return false for build status SUCCESS when testing SUCCESS', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "Success";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Success)).toBeTruthy();
    }));

    it('buildResultIs should return false for build status UNSTABLE when testing UNSTABLE', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "Unstable";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Unstable)).toBeTruthy();
    }));

    it('buildResultIs should return true when status is all lowercase', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "aborted";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeTruthy();
    }));

    it('buildResultIs should return true when status is all uppercase', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = "aborted";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeTruthy();
    }));

    it('buildResultIs should return true when status contains leading and trailing spaces', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = " aborted ";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeTruthy();
    }));

    it('buildResultIs should return true when status contains spaces', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.result = " abor  ted ";
        expect(service.buildResultIs(build, JenkinsBuildStatus.Aborted)).toBeTruthy();
    }));

    it('buildIsRunning should return false when build is undefined', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = undefined;
        expect(service.buildIsRunning(build)).toBeFalsy();
    }));

    it('buildIsRunning should return false when build is null', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = null;
        expect(service.buildIsRunning(build)).toBeFalsy();
    }));

    it('buildIsRunning should return false when build.building is undefined', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.building = undefined;
        expect(service.buildIsRunning(build)).toBeFalsy();
    }));

    it('buildIsRunning should return false when build.building is null', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.building = null;
        expect(service.buildIsRunning(build)).toBeFalsy();
    }));

    it('buildIsRunning should return false when build.building is false', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.building = false;
        expect(service.buildIsRunning(build)).toBeFalsy();
    }));

    it('buildIsRunning should return true when build.building is true', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.building = true;
        expect(service.buildIsRunning(build)).toBeTruthy();
    }));

    it('isOffline should return false when node is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = undefined;
        expect(service.isOffline(node)).toBeFalsy();
    }));

    it('isOffline should return false when node is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = null;
        expect(service.isOffline(node)).toBeFalsy();
    }));

    it('isOffline should return false when node.offline is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.offline = undefined;
        expect(service.isOffline(node)).toBeFalsy();
    }));

    it('isOffline should return false when node.offline is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.offline = null;
        expect(service.isOffline(node)).toBeFalsy();
    }));

    it('isOffline should return false when node.offline is false', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.offline = false;
        expect(service.isOffline(node)).toBeFalsy();
    }));

    it('isOffline should return true when node.offline is true', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.offline = true;
        expect(service.isOffline(node)).toBeTruthy();
    }));

    it('isTemporarilyOffline should return false when node is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = undefined;
        expect(service.isTemporarilyOffline(node)).toBeFalsy();
    }));

    it('isTemporarilyOffline should return false when node is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = null;
        expect(service.isTemporarilyOffline(node)).toBeFalsy();
    }));

    it('isTemporarilyOffline should return false when node.temporarilyOffline is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.temporarilyOffline = undefined;
        expect(service.isTemporarilyOffline(node)).toBeFalsy();
    }));

    it('isTemporarilyOffline should return false when node.temporarilyOffline is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.temporarilyOffline = null;
        expect(service.isTemporarilyOffline(node)).toBeFalsy();
    }));

    it('isTemporarilyOffline should return false when node.temporarilyOffline is false', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.temporarilyOffline = false;
        expect(service.isTemporarilyOffline(node)).toBeFalsy();
    }));

    it('isTemporarilyOffline should return true when node.temporarilyOffline is true', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.temporarilyOffline = true;
        expect(service.isTemporarilyOffline(node)).toBeTruthy();
    }));

    it('isIdle should return false when node is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = undefined;
        expect(service.isIdle(node)).toBeFalsy();
    }));

    it('isIdle should return false when node is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = null;
        expect(service.isIdle(node)).toBeFalsy();
    }));

    it('isIdle should return false when node.idle is undefined', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.idle = undefined;
        expect(service.isIdle(node)).toBeFalsy();
    }));

    it('isIdle should return false when node.idle is null', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.idle = null;
        expect(service.isIdle(node)).toBeFalsy();
    }));

    it('isIdle should return false when node.idle is false', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.idle = false;
        expect(service.isIdle(node)).toBeFalsy();
    }));

    it('isIdle should return true when node.idle is true', inject([UtilService], (service: UtilService) => {
        let node: IJenkinsNode = new JenkinsNode();
        node.idle = true;
        expect(service.isIdle(node)).toBeTruthy();
    }));

    it('getBuildDuration should return 0 for undefined build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = undefined;
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return 0 for null build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = undefined;
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return 0 for build with undefined duration', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.duration = undefined
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return 0 for build with null duration', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.duration = undefined
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return 0 for undefined build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.building = undefined;
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return 0 for duration 0', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.duration = 0;
        expect(service.getBuildDuration(build)).toBe(0);
    }));

    it('getBuildDuration should return correct duration', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.duration = 123456;
        expect(service.getBuildDuration(build)).toBe(123456);
    }));

    it('getBuildAverageDuration should return 0 for undefined build array', inject([UtilService], (service: UtilService) => {
        let builds: Array<IJenkinsBuild> = undefined;
        expect(service.getBuildAverageDuration(builds)).toBe(0);
    }));

    it('getBuildAverageDuration should return 0 for null build array', inject([UtilService], (service: UtilService) => {
        let builds: Array<IJenkinsBuild> = null;
        expect(service.getBuildAverageDuration(builds)).toBe(0);
    }));

    it('getBuildAverageDuration should return 0 for empty build array', inject([UtilService], (service: UtilService) => {
        let builds: Array<IJenkinsBuild> = new Array<IJenkinsBuild>();
        expect(service.getBuildAverageDuration(builds)).toBe(0);
    }));

    it('getBuildAverageDuration should return 0 for builds with undefined duration', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = undefined;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = undefined;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(0);
    }));

    it('getBuildAverageDuration should return 0 for builds with null duration', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = null;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = null;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(0);
    }));

    it('getBuildAverageDuration should not be influenced by builds with undefined duration', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 3;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = undefined;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(3);
    }));

    it('getBuildAverageDuration should not be influenced by builds with null duration', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 3;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = null;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(3);
    }));

    it('getBuildAverageDuration should take into consideration builds with 0 duration', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 3;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = 0;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(2);
    }));

    it('getBuildAverageDuration should return correct results for 2 builds', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 3;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = 5;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild))).toBe(4);
    }));

    it('getBuildAverageDuration should return correct results for 3 builds', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 3;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = 5;
        let thirdBuild: IJenkinsBuild = new JenkinsBuild();
        thirdBuild.duration = 7;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild, thirdBuild))).toBe(5);
    }));

    it('getBuildAverageDuration should round results up', inject([UtilService], (service: UtilService) => {
        let firstBuild: IJenkinsBuild = new JenkinsBuild();
        firstBuild.duration = 11;
        let secondBuild: IJenkinsBuild = new JenkinsBuild();
        secondBuild.duration = 11;
        let thirdBuild: IJenkinsBuild = new JenkinsBuild();
        thirdBuild.duration = 12;
        expect(service.getBuildAverageDuration(Array.of(firstBuild, secondBuild, thirdBuild))).toBe(12);
    }));

    it('getBuildTimeInQueue should return 0 for undefined build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = undefined;
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for null build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = null;
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for build with undefined actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = undefined;
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for build with null actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = null;
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for build with empty actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for build without timeInQueueActions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.fromJson(new AndreiStrautInfoMasterBuild13DataProvider().getBuildData());
        build.actions = new Array<any>();
        build.actions.push(new JenkinsAction());
        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for builds with timeInQueue NaN', inject([UtilService], (service: UtilService) => {
        let timeInQueueAction: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": "asdf",' +
                '"totalDurationMillis": 1474583}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(timeInQueueAction);

        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return 0 for builds with timeInQueue smaller than 0', inject([UtilService], (service: UtilService) => {
        let timeInQueueAction: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": -123456,' +
                '"totalDurationMillis": 1474583}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(timeInQueueAction);

        expect(service.getBuildTimeInQueue(build)).toBe(0);
    }));

    it('getBuildTimeInQueue should return correct results for build with timeInQueueActions', inject([UtilService], (service: UtilService) => {
        let duration = 103833;
        
        let someAction: IJenkinsAction = new JenkinsAction();
        someAction.fromJson(JSON.parse(
                '{"_class": "hudson.plugins.git.GitTagAction"}'
        ));
        
        let someOtherAction: IJenkinsAction = new JenkinsAction();
        someOtherAction.fromJson(JSON.parse(
                '{"_class": "hudson.model.CauseAction",' +
                '"causes": []}'
        ));
        
        let timeInQueueAction1: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction1.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": 103833,' +
                '"totalDurationMillis": 1474583}'
        ));
        
        let timeInQueueAction2: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction2.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": 1,' +
                '"totalDurationMillis": 1474583}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(someAction);
        build.actions.push(timeInQueueAction1);
        build.actions.push(someOtherAction);
        build.actions.push(timeInQueueAction2);

        expect(service.getBuildTimeInQueue(build)).toBe(duration);
    }));
    
    it('getBuildTotalTime should return 0 for undefined build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = undefined;
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for null build', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = null;
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for build with undefined actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = undefined;
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for build with null actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = null;
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for build with empty actions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for build without timeInQueueActions', inject([UtilService], (service: UtilService) => {
        let build: IJenkinsBuild = new JenkinsBuild();
        build.fromJson(new AndreiStrautInfoMasterBuild13DataProvider().getBuildData());
        build.actions = new Array<any>();
        build.actions.push(new JenkinsAction());
        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for builds with totalDuration NaN', inject([UtilService], (service: UtilService) => {
        let timeInQueueAction: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": "123456",' +
                '"totalDurationMillis": "asdfg"}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(timeInQueueAction);

        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return 0 for builds with totalDuration smaller than 0', inject([UtilService], (service: UtilService) => {
        let timeInQueueAction: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": 123456,' +
                '"totalDurationMillis": -123456}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(timeInQueueAction);

        expect(service.getBuildTotalTime(build)).toBe(0);
    }));

    it('getBuildTotalTime should return correct results for build with timeInQueueActions', inject([UtilService], (service: UtilService) => {
        let duration = 123456;
        
        let someAction: IJenkinsAction = new JenkinsAction();
        someAction.fromJson(JSON.parse(
                '{"_class": "hudson.plugins.git.GitTagAction"}'
        ));
        
        let someOtherAction: IJenkinsAction = new JenkinsAction();
        someOtherAction.fromJson(JSON.parse(
                '{"_class": "hudson.model.CauseAction",' +
                '"causes": []}'
        ));
        
        let timeInQueueAction1: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction1.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": 103833,' +
                '"totalDurationMillis": 123456}'
        ));
        
        let timeInQueueAction2: IJenkinsAction = new JenkinsTimeInQueueAction();
        timeInQueueAction2.fromJson(JSON.parse(
                '{"_class": "jenkins.metrics.impl.TimeInQueueAction",' +
                '"queuingDurationMillis": 103833,' +
                '"totalDurationMillis": 1}'
        ));
        
        let build: IJenkinsBuild = new JenkinsBuild();
        build.actions = new Array<any>();
        build.actions.push(someAction);
        build.actions.push(timeInQueueAction1);
        build.actions.push(someOtherAction);
        build.actions.push(timeInQueueAction2);

        expect(service.getBuildTotalTime(build)).toBe(duration);
    }));

    it('getNumberOfBuilds should return 0 for undefined job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = undefined;
        expect(service.getNumberOfBuilds(job)).toBe(0);
    }));

    it('getNumberOfBuilds should return 0 for null job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = null;
        expect(service.getNumberOfBuilds(job)).toBe(0);
    }));

    it('getNumberOfBuilds should return 0 for job with undefined builds', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.builds = undefined;
        expect(service.getNumberOfBuilds(job)).toBe(0);
    }));

    it('getNumberOfBuilds should return 0 for job with null builds', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.builds = null;
        expect(service.getNumberOfBuilds(job)).toBe(0);
    }));

    it('getNumberOfBuilds should return 0 for job with empty builds', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.builds = new Array<IJenkinsBuild>();
        expect(service.getNumberOfBuilds(job)).toBe(0);
    }));

    it('getNumberOfBuilds should return correct results for job with builds', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.builds = Array.from([new JenkinsBuild(), new JenkinsBuild(), new JenkinsBuild()]);
        expect(service.getNumberOfBuilds(job)).toBe(3);
    }));

    it('getLastBuildTimestamp should return 0 for undefined job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = undefined;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for null job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = null;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for undefined last build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = undefined;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for null last build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = null;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for undefined last build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for null last build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for undefined last build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        job.lastBuild.timestamp = undefined;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 for null last build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        job.lastBuild.timestamp = null;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return 0 when last build timestamp value is smaller than 0', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        job.lastBuild.timestamp = -123;
        expect(service.getLastBuildTimestamp(job)).toBe(0);
    }));

    it('getLastBuildTimestamp should return correct results when last build timestamp value is valid', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastBuild = new JenkinsBuild();
        job.lastBuild.timestamp = 123;
        expect(service.getLastBuildTimestamp(job)).toBe(123);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for undefined job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = undefined;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for null job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = null;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for undefined last successful build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = undefined;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for null last successful build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = null;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for undefined last successful build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for null last successful build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for undefined last successful build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        job.lastSuccessfulBuild.timestamp = undefined;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 for null last successful build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        job.lastSuccessfulBuild.timestamp = null;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return 0 when last successful build timestamp value is smaller than 0', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        job.lastSuccessfulBuild.timestamp = -123;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(0);
    }));

    it('getLastSuccessfulBuildTimestamp should return correct results when last successful build timestamp value is valid', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastSuccessfulBuild = new JenkinsBuild();
        job.lastSuccessfulBuild.timestamp = 123;
        expect(service.getLastSuccessfulBuildTimestamp(job)).toBe(123);
    }));

    it('getLastFailedBuildTimestamp should return 0 for undefined job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = undefined;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for null job', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = null;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for undefined last failed build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = undefined;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for null last failed build', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = null;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for undefined last failed build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for null last failed build timestamp', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for undefined last failed build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        job.lastFailedBuild.timestamp = undefined;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 for null last failed build timestamp value', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        job.lastFailedBuild.timestamp = null;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return 0 when last failed build timestamp value is smaller than 0 ', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        job.lastFailedBuild.timestamp = -123;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(0);
    }));

    it('getLastFailedBuildTimestamp should return correct results when last failed  timestamp value is valid', inject([UtilService], (service: UtilService) => {
        let job: IJenkinsJob = new JenkinsJob();
        job.lastFailedBuild = new JenkinsBuild();
        job.lastFailedBuild.timestamp = 123;
        expect(service.getLastFailedBuildTimestamp(job)).toBe(123);
    }));
});
