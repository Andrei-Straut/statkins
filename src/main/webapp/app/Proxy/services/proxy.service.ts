import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/timeout';

import {ProxyRequest} from './ProxyRequest';
import {ConfigService} from '../../Config/services/config.service';
import {Logger} from 'angular2-logger/core';

let headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
});
let options = new RequestOptions({
    method: "POST",
    headers: headers
});

@Injectable()
export class ProxyService {
    private readonly _INSTANCE_ID: string;

    readonly proxyEndpoint: string;

    constructor(private LOGGER: Logger, private http: Http, private config: ConfigService) {
        this._INSTANCE_ID = this.uuidv4();
        this.proxyEndpoint = this.config.proxyUrl;
    }

    proxy(url: string): Observable<any> {
        var proxy = new ProxyRequest(url);
        var proxyRequest = proxy.build();
        options.body = JSON.stringify(proxyRequest);

        this.LOGGER.debug("Submitting request", proxyRequest, "for proxying to:", this.proxyEndpoint);

        let proxyResponse = this.http.request(this.proxyEndpoint, options)
            .timeout(60000)
            .map((response: Response) => {return response.text() ? response.json() : JSON.stringify({});});

        return proxyResponse;
    }

    proxyRaw(url: string): Observable<any> {
        var proxy = new ProxyRequest(url);
        var proxyRequest = proxy.build();
        options.body = JSON.stringify(proxyRequest);

        this.LOGGER.debug("Submitting request", proxyRequest, "for proxying to:", this.proxyEndpoint);

        let proxyResponse = this.http.request(this.proxyEndpoint, options)
            .timeout(60000);

        return proxyResponse;
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}