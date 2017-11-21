import {TestBed, inject} from '@angular/core/testing';

import {ConfigService} from './config.service';

class ConfigServiceTestDev extends ConfigService {
    readonly _configuration:string = "DEV";
}
class ConfigServiceTestStaging extends ConfigService {
    readonly _configuration:string = "STAGING";
}
class ConfigServiceTestLive extends ConfigService {
    readonly _configuration:string = "LIVE";
}
class ConfigServiceTestInvalid extends ConfigService {
    readonly _configuration:string = "SOME_CONFIG";
}

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

    it('proxyUrl should be same between DEV and DEV configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestDev();
        
        expect(configTest.proxyUrl === service.proxyUrl).toBeTruthy();
    }));

    it('proxyUrl should be different between DEV and STAGING configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestStaging();
        
        expect(configTest.proxyUrl !== service.proxyUrl).toBeTruthy();
    }));

    it('proxyUrl should be different between DEV and LIVE configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestLive();
        
        expect(configTest.proxyUrl !== service.proxyUrl).toBeTruthy();
    }));

    it('proxyUrl should be undefined for unsupported configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestInvalid();
        
        expect(configTest.proxyUrl).toBeUndefined();
    }));

    it('jenkinsUrl should be same between DEV and DEV configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestDev();
        
        expect(configTest.jenkinsUrl === service.jenkinsUrl).toBeTruthy();
    }));

    it('jenkinsUrl should be same between DEV and STAGING configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestStaging();
        
        expect(configTest.jenkinsUrl === service.jenkinsUrl).toBeTruthy();
    }));

    it('jenkinsUrl should be different between DEV and LIVE configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestLive();
        
        expect(configTest.jenkinsUrl !== service.jenkinsUrl).toBeTruthy();
    }));

    it('jenkinsUrl should be undefined for unsupported configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestInvalid();
        
        expect(configTest.jenkinsUrl).toBeUndefined();
    }));

});
