import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyCustomResponseMockService extends ProxyService {
    
    private defaultResponse: JSON;
    private desiredResponses: Map<string, any>;

    constructor() {
        super(null, null, new ConfigMockService());
        this.defaultResponse = JSON.parse("{}");
        this.desiredResponses = new Map<string, any>();
    }
    
    setDefaultResponse(desiredResponse: JSON) {
        this.defaultResponse = desiredResponse;
    }
    
    addResponse(url:string, desiredResponse:any) {
        if (this.desiredResponses === undefined || this.desiredResponses === null) {
            this.desiredResponses = new Map<string, any>();
        }
        
        this.desiredResponses.set(url, desiredResponse);
    }
    
    setResponses(desiredResponses: Map<string, any>) {
        this.desiredResponses = desiredResponses;
    }

    proxy(url: string): Observable<any> {
        if (this.desiredResponses === undefined || this.desiredResponses === null) {
            return Observable.of(this.defaultResponse);
        }
        
        if (this.desiredResponses.has(url)) {
            return Observable.of(this.desiredResponses.get(url));
        }
        
        return Observable.of(this.defaultResponse);
    }
}
