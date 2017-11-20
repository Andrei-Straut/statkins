import {Component} from '@angular/core';
import {IJenkinsData} from '../../node_modules/jenkins-api-ts-typings/dist/types/jenkins-api-ts-typings';
import {Logger} from '../../node_modules/angular2-logger/core';
import {ConfigService } from './config/services/config.service';
import {ProxyService } from './proxy/services/proxy.service';
import {UtilService } from './util/services/util.service';

import {JenkinsDataRetrieverComponent} from './jenkins-data-retriever/components/jenkins-data-retriever/jenkins-data-retriever.component';

@Component({
    selector: 'statkins',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfigService, ProxyService, UtilService, Logger],
    entryComponents: [ JenkinsDataRetrieverComponent ]
})
export class AppComponent {
    name: string;
    copyright: string;
    jenkinsUrl: string;
    configService: ConfigService
    proxyService: ProxyService
    utilService: UtilService
    jenkinsData: IJenkinsData;
    dataAvailable: boolean = false;
    
    constructor(private LOGGER:Logger, config: ConfigService, proxy: ProxyService, util: UtilService) {
        this.name = config.appName;
        this.copyright = config.copyright;
        this.configService = config;
        this.proxyService = proxy;
        this.utilService = util;
        this.jenkinsUrl = this.configService.jenkinsUrl;
    }
    
    ngOnInit() {
        this.LOGGER.level = this.configService.loggerLevel;
        this.LOGGER.store();
        // console.info("Logger Level set to", this.configService.loggerLevel, ". Possible level values", this.LOGGER.Level); 
    }
    
    start(event: Event) {
        event.preventDefault();
    }
    
    onDataRetrieved(data: IJenkinsData) {
        this.LOGGER.info("=============================== Data Set ===============================");
        this.LOGGER.info(data);
        this.jenkinsData = data;
        this.dataAvailable = true;
        this.LOGGER.info("========================================================================");
    }
}
