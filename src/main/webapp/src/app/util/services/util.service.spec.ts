import {TestBed, inject} from '@angular/core/testing';

import {UtilService} from './util.service';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuildStatus} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {JenkinsNode} from 'jenkins-api-ts-typings';

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
        let stringArray:Array<string> = new Array<string>();
        stringArray.push("SomeString");
        
        expect(service.isInvalid(stringArray)).toBeFalsy();
    }));

    it('isInvalid should give false for non-empty map', inject([UtilService], (service: UtilService) => {
        let stringMap:Map<string, string> = new Map<string, string>();
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
});
