import {TestBed, inject} from '@angular/core/testing';

import {ConfigService} from './config.service';

describe('ConfigService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigService]
        });
    });

    it('should be created', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));

    it('proxyUrl should be defined', inject([ConfigService], (service: ConfigService) => {
        expect(service.proxyUrl).toBeDefined();
    }));

    it('jenkinsUrl should be defined', inject([ConfigService], (service: ConfigService) => {
        expect(service.jenkinsUrl).toBeDefined();
    }));

});
