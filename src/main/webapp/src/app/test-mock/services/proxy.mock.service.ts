import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ProxyRequest} from '../../proxy/services/proxy-request';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyMockService extends ProxyService {

    constructor() {
        super(null, null, new ConfigMockService());
    }
}
