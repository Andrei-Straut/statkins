import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

import {ProxyService} from './proxy.service';
import {ConfigService} from '../../config/services/config.service';
import {Logger} from '../../../../node_modules/angular2-logger/core';

describe('ProxyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpModule],
            providers: [ProxyService, Logger, ConfigService]
        });
    });

    it('should be created', inject([ProxyService], (service: ProxyService) => {
        expect(service).toBeTruthy();
    }));
});
