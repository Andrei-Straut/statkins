import {TestBed} from '@angular/core/testing';

import {ProxyRequest} from './proxy-request';

describe('ProxyRequestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        });
    });

    it('should be created', () => {
        expect(new ProxyRequest("SomeUrl")).toBeTruthy();
    });

    it('should have the url provided in the constructor', () => {
        let url = "SomeUrl";
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.url).toBe(url);
    });

    it('should have method GET', () => {
        let method = "GET";
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.method).toBe(method);
    });

    it('should have an object as headers property', () => {
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.headers instanceof Object).toBeTruthy();
    });

    it('should have Content-Type defined', () => {
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.headers["Content-Type"]).toBeDefined();
    });

    it('should have expected value for Content-Type', () => {
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.headers["Content-Type"]).toBe("application/json");
    });

    it('should have Server defined', () => {
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.headers["Server"]).toBeDefined();
    });

    it('should have expected value for Server', () => {
        let request = new ProxyRequest("SomeUrl");
        
        expect(request.headers["Server"]).toBe("GlassFish Server Open Source Edition 4.0");
    });
});
