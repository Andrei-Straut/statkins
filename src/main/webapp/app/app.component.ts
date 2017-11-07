import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { JenkinsDataRetrieverComponent } from './JenkinsDataRetriever/components/jenkins-data-retriever.component';
import { JenkinsDataAnalyzerComponent } from './JenkinsDataAnalyzer/components/jenkins-data-analyzer.component';

import { ConfigService } from './Config/services/config.service';
import { ProxyService } from './Proxy/services/proxy.service';
import { UtilService } from './Util/services/util.service';
import { Logger } from 'angular2-logger/core';

@Component({
    selector: 'jenkins-analyzer',
    templateUrl: 'app/app.template.html',
    providers: [
        ConfigService, ProxyService, UtilService, Logger
    ],
    entryComponents: [ JenkinsDataRetrieverComponent, JenkinsDataAnalyzerComponent ]
})
export class AppComponent implements OnInit {
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
        console.info("Logger Level set to", this.configService.loggerLevel, ". Possible level values", this.LOGGER.Level); 
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
