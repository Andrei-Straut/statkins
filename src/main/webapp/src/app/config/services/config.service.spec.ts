import {TestBed, inject} from '@angular/core/testing';

import {ConfigService} from './config.service';

class ConfigServiceTestDev extends ConfigService {
    readonly _configuration:string = "DEV";
    readonly loggerLevel = 0;
}
class ConfigServiceTestStaging extends ConfigService {
    readonly _configuration:string = "STAGING";
    readonly loggerLevel = 0;
}
class ConfigServiceTestLive extends ConfigService {
    readonly _configuration:string = "LIVE";
    readonly loggerLevel = 0;
}
class ConfigServiceTestInvalid extends ConfigService {
    readonly _configuration:string = "SOME_CONFIG";
    readonly loggerLevel = 0;
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
        
        if (service._configuration === 'DEV') {
            expect(configTest.proxyUrl === service.proxyUrl).toBeTruthy();
        } else {
            expect(configTest.proxyUrl !== service.proxyUrl).toBeTruthy();
        }
    }));

    it('proxyUrl should be different between DEV and STAGING configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestStaging();
        
        if (service._configuration === 'STAGING') {
            expect(configTest.proxyUrl === service.proxyUrl).toBeTruthy();
        } else {
            expect(configTest.proxyUrl !== service.proxyUrl).toBeTruthy();
        }
    }));

    it('proxyUrl should be different between DEV and LIVE configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestLive();
        
        if (service._configuration === 'LIVE') {
            expect(configTest.proxyUrl === service.proxyUrl).toBeTruthy();
        } else {
            expect(configTest.proxyUrl !== service.proxyUrl).toBeTruthy();
        }
    }));

    it('proxyUrl should be undefined for unsupported configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestInvalid();
        
        expect(configTest.proxyUrl).toBeUndefined();
    }));

    it('jenkinsUrl should be same between DEV and DEV configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestDev();
        
        if (service._configuration === 'DEV') {
            expect(configTest.jenkinsUrl === service.jenkinsUrl).toBeTruthy();
        } else {
            expect(configTest.jenkinsUrl !== service.jenkinsUrl).toBeTruthy();
        }
    }));

    it('jenkinsUrl should be same between DEV and STAGING configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestStaging();
        
        if (service._configuration === 'DEV' || service._configuration === 'STAGING') {
            expect(configTest.jenkinsUrl === service.jenkinsUrl).toBeTruthy();
        } else {
            expect(configTest.jenkinsUrl !== service.jenkinsUrl).toBeTruthy();
        }
    }));

    it('jenkinsUrl should be different between DEV and LIVE configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestLive();
        
        if (service._configuration === 'LIVE') {
            expect(configTest.jenkinsUrl === service.jenkinsUrl).toBeTruthy();
        } else {
            expect(configTest.jenkinsUrl !== service.jenkinsUrl).toBeTruthy();
        }
    }));

    it('jenkinsUrl should be undefined for unsupported configuration', inject([ConfigService], (service: ConfigService) => {
        let configTest: ConfigService = new ConfigServiceTestInvalid();
        
        expect(configTest.jenkinsUrl).toBeUndefined();
    }));

});
