import {TestBed} from '@angular/core/testing';

import {StatisticsCardEntry} from './StatisticsCardEntry';
import {StatisticsEntry} from './StatisticsEntry';

describe('StatisticsCardEntry', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
        });
    });

    it('should be created', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", new Array<StatisticsEntry>());
        expect(service).toBeTruthy();
    });

    it('title should have correct results when instantiated with undefined', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry(undefined, "SomeSubTitle", new Array<StatisticsEntry>());
        expect(service.title).toBeUndefined();
    });

    it('title should have correct results when instantiated with null', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry(null, "SomeSubTitle", new Array<StatisticsEntry>());
        expect(service.title).toBeNull();
    });

    it('title should have correct results when instantiated with valid value', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", new Array<StatisticsEntry>());
        expect(service.title).toBe("SomeTitle");
    });

    it('subTitle should have correct results when instantiated with undefined', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", undefined, new Array<StatisticsEntry>());
        expect(service.subTitle).toBeUndefined();
    });

    it('subTitle should have correct results when instantiated with null', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", null, new Array<StatisticsEntry>());
        expect(service.subTitle).toBeNull();
    });

    it('subTitle should have correct results when instantiated with valid value', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", new Array<StatisticsEntry>());
        expect(service.subTitle).toBe("SomeSubTitle");
    });

    it('contents should have correct results when StatisticsEntry array is undefined', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", undefined);
        expect(service.contents).toBeTruthy();
        expect(service.contents.length).toBe(0);
    });

    it('contents should have correct results when StatisticsEntry array is null', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", null);
        expect(service.contents).toBeTruthy();
        expect(service.contents.length).toBe(0);
    });

    it('contents should have correct results when StatisticsEntry array is present', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", Array.of(
            new StatisticsEntry("SomeTitle", "SomeSubtitle", "SomeUrl"),
            new StatisticsEntry("SomeTitle", "SomeSubtitle", "SomeUrl")));
            
        expect(service.contents).toBeTruthy();
        expect(service.contents.length).toBe(2);
    });

    it('addContent() should push undefined content anyway', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", undefined);
        service.addContent(undefined, undefined, undefined);
        
        expect(service.contents.length).toBe(1);
        expect((service.contents[0] as StatisticsEntry)).toBeDefined();
        expect((service.contents[0] as StatisticsEntry).title).toBeUndefined();
        expect((service.contents[0] as StatisticsEntry).subTitle).toBeUndefined();
        expect((service.contents[0] as StatisticsEntry).url).toBeUndefined();
    });

    it('addContent() should push null content anyway', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", undefined);
        service.addContent(null, null, null);
        
        expect(service.contents.length).toBe(1);
        expect((service.contents[0] as StatisticsEntry)).toBeDefined();
        expect((service.contents[0] as StatisticsEntry).title).toBeNull();
        expect((service.contents[0] as StatisticsEntry).subTitle).toBeNull();
        expect((service.contents[0] as StatisticsEntry).url).toBeNull();
    });

    it('addContent() should push contents', () => {
        let service: StatisticsCardEntry = new StatisticsCardEntry("SomeTitle", "SomeSubTitle", undefined);
        service.addContent("SomeKey", "SomeValue", "SomeUrl");
        
        expect(service.contents.length).toBe(1);
        expect((service.contents[0] as StatisticsEntry)).toBeDefined();
        expect((service.contents[0] as StatisticsEntry).title).toBe("SomeKey");
        expect((service.contents[0] as StatisticsEntry).subTitle).toBe("SomeValue");
        expect((service.contents[0] as StatisticsEntry).url).toBe("SomeUrl");
    });
});
