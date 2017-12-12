import {TestBed} from '@angular/core/testing';

import {StatisticsCardEntry} from './StatisticsCardEntry';
import {StatisticsEntry} from './StatisticsEntry';

describe('StatisticsEntry', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
        });
    });

    it('should be created', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", "SomeUrl");
        expect(service).toBeTruthy();
    });

    it('title should have correct results when instantiated with undefined', () => {
        let service: StatisticsEntry = new StatisticsEntry(undefined, "SomeSubTitle", "SomeUrl");
        expect(service.title).toBeUndefined();
    });

    it('title should have correct results when instantiated with null', () => {
        let service: StatisticsEntry = new StatisticsEntry(null, "SomeSubTitle", "SomeUrl");
        expect(service.title).toBeNull();
    });

    it('title should have correct results when instantiated with valid value', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", "SomeUrl");
        expect(service.title).toBe("SomeTitle");
    });

    it('subTitle should have correct results when instantiated with undefined', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", undefined, "SomeUrl");
        expect(service.subTitle).toBeUndefined();
    });

    it('subTitle should have correct results when instantiated with null', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", null, "SomeUrl");
        expect(service.subTitle).toBeNull();
    });

    it('subTitle should have correct results when instantiated with valid value', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", "SomeUrl");
        expect(service.subTitle).toBe("SomeSubTitle");
    });
    
    it('url should have correct results when instantiated with undefined', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", undefined);
        expect(service.url).toBeUndefined();
    });

    it('url should have correct results when instantiated with null', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", null);
        expect(service.url).toBeNull();
    });

    it('url should have correct results when instantiated with valid value', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", "SomeUrl");
        expect(service.url).toBe("SomeUrl");
    });
    
    it('hasUrl should have correct results when instantiated with undefined', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", undefined);
        expect(service.hasUrl()).toBeFalsy();
    });

    it('hasUrl should have correct results when instantiated with null', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", null);
        expect(service.hasUrl()).toBeFalsy();
    });

    it('hasUrl should have correct results when instantiated with valid value', () => {
        let service: StatisticsEntry = new StatisticsEntry("SomeTitle", "SomeSubTitle", "SomeUrl");
        expect(service.hasUrl()).toBeTruthy();
    });

});
