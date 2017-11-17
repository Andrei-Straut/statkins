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
});
