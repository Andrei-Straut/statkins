import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyObservableErrorMockService extends ProxyService {

    constructor() {
        super(null, null, new ConfigMockService());
    }

    proxy(url: string): Observable<any> {
        return Observable.throw("Expected Error thrown from mock");
    }
}
