import {TestBed, inject} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {CommonModule} from '@angular/common';

import {ProxyService} from './proxy.service';
import {ConfigService} from '../../config/services/config.service';
import {Logger} from '../../../../node_modules/angular2-logger/core';

const mockResponse = {
    data: [
        {id: 0, data: 'SomeData'}
    ]
};

describe('ProxyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpModule],
            providers: [ProxyService, Logger, ConfigService, {provide: XHRBackend, useClass: MockBackend}]
        });
    });

    it('proxy should return correct data', inject([ProxyService, XHRBackend], (service: ProxyService, mockHttp: MockBackend) => {
        mockHttp.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

        service.proxy("http://www.SomeUrl123456SomeUrl.com").subscribe(response => {
            expect(response).toBeTruthy();
            expect(((response as JSON)["data"])[0]).toEqual({id: 0, data: 'SomeData'});
        });
    }));

    it('proxyRaw should return correct data', inject([ProxyService, XHRBackend], (service: ProxyService, mockHttp: MockBackend) => {
        mockHttp.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

        service.proxyRaw("http://www.SomeUrl123456SomeUrl.com").subscribe(response => {
            expect(response).toBeTruthy();
        });
    }));
});
