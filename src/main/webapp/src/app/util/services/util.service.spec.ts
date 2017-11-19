import {TestBed, inject} from '@angular/core/testing';

import {UtilService} from './util.service';

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

    it('isAfterDate should return true for equal dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date();
        let date2 = date1;
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isAfterDate should return false for different same day dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 4, 2017 14:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isAfterDate should return true for later dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 4, 2017 10:13:00");
        let date2 = new Date("February 3, 2017 14:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeTruthy();
    }));

    it('isAfterDate should return false for before dates', inject([UtilService], (service: UtilService) => {
        let date1 = new Date("February 3, 2017 14:13:00");
        let date2 = new Date("February 4, 2017 10:13:00");
        expect(service.isSameOrAfterDate(date1, date2)).toBeFalsy();
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
});
