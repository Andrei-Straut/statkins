import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyCustomResponseMockService extends ProxyService {
    
    private desiredResponse: JSON;

    constructor(desiredResponse:JSON) {
        super(null, null, new ConfigMockService());
        this.desiredResponse = desiredResponse;
    }

    proxy(url: string): Observable<any> {
        let proxyResponse = Observable.of(this.desiredResponse);

        return proxyResponse;
    }
}
