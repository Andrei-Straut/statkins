import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyExceptionMockService extends ProxyService {

    constructor() {
        super(null, null, new ConfigMockService());
    }

    proxy(url: string): Observable<any> {
        throw new Error("Expected Error thrown from mock");
    }
}
