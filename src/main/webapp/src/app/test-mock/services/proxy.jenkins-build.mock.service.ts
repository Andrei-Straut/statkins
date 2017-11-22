import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AndreiStrautInfoMasterBuild14DataProvider} from '../data-provider/build/andrei-straut-info-master-build-14-data-provider';
import 'rxjs/add/observable/of';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyJenkinsJobMockService extends ProxyService {

    constructor() {
        super(null, null, new ConfigMockService());
    }

    proxy(url: string): Observable<any> {
        let jsonData = new AndreiStrautInfoMasterBuild14DataProvider().getBuildData();
        jsonData["url"] = url;
        let proxyResponse = Observable.of(jsonData as JSON);

        return proxyResponse;
    }
}
