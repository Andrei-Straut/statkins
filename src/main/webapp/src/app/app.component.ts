import {Component} from '@angular/core';
import {IJenkinsData} from '../../node_modules/jenkins-api-ts-typings/dist/types/jenkins-api-ts-typings';
import {Logger} from '../../node_modules/angular2-logger/core';
import {ConfigService } from './config/services/config.service';
import {ProxyService } from './proxy/services/proxy.service';
import {UtilService } from './util/services/util.service';

import {JenkinsDataRetrieverComponent} from './jenkins-data-retriever/components/jenkins-data-retriever.component';
import {JenkinsDataAnalyzerComponent} from './jenkins-data-analyzer/components/jenkins-data-analyzer.component';

@Component({
    selector: 'statkins',
    templateUrl: './app.template.html',
    styleUrls: ['./app.template.css'],
    providers: [ConfigService, ProxyService, UtilService, Logger],
    entryComponents: [ JenkinsDataRetrieverComponent, JenkinsDataAnalyzerComponent ]
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
        console.info("Logger Level set to", this.configService.loggerLevel, ". Possible level values", this.LOGGER.Level);
        this.LOGGER.info("Proxy URL", this.configService.proxyUrl);
        this.LOGGER.info("Jenkins URL", this.configService.jenkinsUrl);
    }
    
    onDataRetrieved(data: IJenkinsData) {
        this.LOGGER.info("=============================== Data Set ===============================");
        this.LOGGER.info(data);
        this.jenkinsData = data;
        this.dataAvailable = true;
        this.LOGGER.info("========================================================================");
    }
}
