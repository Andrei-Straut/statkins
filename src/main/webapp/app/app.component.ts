import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppDefinitionService } from './components/Definition/AppDefinitionService';

import { Logger } from 'angular2-logger/core';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { JenkinsDataRetrieverComponent } from './components/JenkinsDataRetriever/jenkins-data-retriever.component';
import { JenkinsDataAnalyzerComponent } from './components/JenkinsDataAnalyzer/jenkins-data-analyzer.component';

import { JenkinsDefinitionService } from './components/Definition/JenkinsDefinitionService';

@Component({
    selector: 'jenkins-analyzer',
    templateUrl: 'app/templates/startpage.template.html',
    providers: [
        AppDefinitionService, JenkinsDefinitionService, Logger
    ],
    entryComponents: [ JenkinsDataRetrieverComponent, JenkinsDataAnalyzerComponent ]
})
export class AppComponent implements OnInit {
    name: string;
    copyright: string;
    jenkinsUrl: string;
    jenkinsDefinitionService: JenkinsDefinitionService
    jenkinsData: IJenkinsData;
    dataAvailable: boolean = false;
    
    constructor(private LOGGER:Logger, appDef: AppDefinitionService, jenkinsDef: JenkinsDefinitionService) {
        this.name = appDef.appName;
        this.copyright = appDef.copyright;
        this.jenkinsDefinitionService = jenkinsDef;
        this.jenkinsUrl = this.jenkinsDefinitionService.jenkinsUrl;
    }
    
    ngOnInit() {
        this.LOGGER.level = this.jenkinsDefinitionService.loggerLevel;
        this.LOGGER.store();
        console.info("Logger Level set to", this.jenkinsDefinitionService.loggerLevel, ". Possible level values", this.LOGGER.Level); 
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
