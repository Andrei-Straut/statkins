import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/timeout';

import {ProxyRequest} from './ProxyRequest';
import {JenkinsDefinitionService} from '../../components/Definition/JenkinsDefinitionService';
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
export class Proxy {
    readonly proxyEndpoint: string;

    constructor(private LOGGER: Logger, private http: Http, private definitionService: JenkinsDefinitionService) {
        this.proxyEndpoint = this.definitionService.proxyUrl;
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
}