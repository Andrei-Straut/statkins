import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter  } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigService } from '../../Config/services/config.service';
import { ProxyService } from '../../Proxy/services/proxy.service';
import { UtilService } from '../../Util/services/util.service';
import { Logger } from 'angular2-logger/core';

import { IJenkinsData } from 'jenkins-api-ts-typings';

import { IJenkinsService } from '../services/IJenkinsService';
import { JenkinsNodeService } from '../services/JenkinsNodeService';
import { JenkinsUserListService } from '../services/JenkinsUserListService';
import { JenkinsUserService } from '../services/JenkinsUserService';
import { JenkinsJobListService } from '../services/JenkinsJobListService';
import { JenkinsJobService } from '../services/JenkinsJobService';
import { JenkinsViewListService } from '../services/JenkinsViewListService';
import { JenkinsViewService } from '../services/JenkinsViewService';
import { JenkinsBuildListService } from '../services/JenkinsBuildListService';
import { JenkinsBuildService } from '../services/JenkinsBuildService';
import { JenkinsChangeSetService } from '../services/JenkinsChangeSetService';
    
interface IJenkinsServices {
        nodeService: IJenkinsService,
        userListService: IJenkinsService,
        userService: IJenkinsService,
        jobListService: IJenkinsService,
        jobService: IJenkinsService,
        viewListService: IJenkinsService,
        viewService: IJenkinsService
        buildListService: IJenkinsService,
        buildService: IJenkinsService,
        changeSetService: IJenkinsService,
};

interface ResponseWithBody {
        _body: string,
}

@Component({
    selector: 'jenkins-data-retriever',
    templateUrl: 'app/JenkinsDataRetriever/templates/jenkinsdataretriever.template.html',
    providers: [
        ConfigService, ProxyService, Logger
    ],
})
export class JenkinsDataRetrieverComponent implements OnInit {
    @Input('jenkinsUrl')
    jenkinsUrl: string;
    @Input('configService')
    configService: ConfigService
    @Input('proxyService')
    proxyService: ProxyService
    @Input('utilService')
    utilService: UtilService
    
    @Output('dataRetrieved')
    dataRetrieved:EventEmitter<IJenkinsData> = new EventEmitter<IJenkinsData>();
    
    urlCheckStarted: boolean = false;
    urlCheckFinished: boolean = false;
    urlCheckSuccessful: boolean = true;
    errorMessage: string = "";
    
    retrievalStarted: boolean = false;
    retrievalFinished: boolean = false;
    retrievalSuccessful: boolean = true;
    
    data: IJenkinsData = {
            nodes: null,
            users: null,
            jobs: null,
            builds: null,
            views: null,
            changeSets: null
    };
    
    services: IJenkinsServices = <any>{};
    
    constructor(private LOGGER:Logger, private http: Http) {}
    
    ngOnInit() {}
    
    async analyze() {
    
        this.urlCheckStarted = false;
        this.urlCheckFinished = false;
        this.urlCheckSuccessful = true;
        this.errorMessage = "";
        this.retrievalStarted = false;
        this.retrievalFinished = false;
        this.retrievalSuccessful = true;
        
        this.urlCheckStarted = true;
        
        await this.proxyService.proxyRaw(this.jenkinsUrl)
                .first()
                .toPromise()
                .then(() => {
                    this.errorMessage = ""; 
                    this.urlCheckFinished = true; 
                    this.urlCheckSuccessful = true;
                })
                .catch(error => {
                    this.LOGGER.error("URL Received", this.jenkinsUrl, "invalid, error was", error);
                    this.urlCheckFinished = true; 
                    this.urlCheckSuccessful = false;
                    this.errorMessage = (error as ResponseWithBody)._body;
                    return;
                });
        
        this.urlCheckFinished = true;
        if (!this.urlCheckSuccessful) {
            return;
        }
        
        this.retrievalStarted = true;
        this.LOGGER.info("Starting data retrieval for:", this.jenkinsUrl);
        
        this.services.nodeService = new JenkinsNodeService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.jenkinsUrl);
        await this.services.nodeService.execute();
        this.data.nodes = this.services.nodeService.getData();
        
        this.services.userListService = new JenkinsUserListService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.jenkinsUrl);
        await this.services.userListService.execute();
        this.data.users = this.services.userListService.getData();
        
        this.services.userService = new JenkinsUserService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.data.users);
        await this.services.userService.execute();
        
        this.services.jobListService = new JenkinsJobListService(this.configService, this.proxyService, this.LOGGER, this.jenkinsUrl);
        await this.services.jobListService.execute();
        this.data.jobs = this.services.jobListService.getData();
        
        this.services.jobService = new JenkinsJobService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.data.jobs);
        await this.services.jobService.execute();
        
        this.services.viewListService = new JenkinsViewListService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.jenkinsUrl);
        await this.services.viewListService.execute();
        this.data.views = this.services.viewListService.getData();
        
        this.services.viewService = new JenkinsViewService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.jenkinsUrl, this.data.views, this.data.jobs);
        await this.services.viewService.execute();
        
        this.services.buildListService = new JenkinsBuildListService(this.utilService, this.LOGGER, this.data.jobs);
        await this.services.buildListService.execute();
        this.data.builds = this.services.buildListService.getData();
        
        this.services.buildService = new JenkinsBuildService(this.configService, this.proxyService, this.utilService, this.LOGGER, this.data.builds);
        await this.services.buildService.execute();
        
        this.services.changeSetService = new JenkinsChangeSetService(this.utilService, this.LOGGER, this.data.builds, this.data.users);
        await this.services.changeSetService.execute();
        this.data.changeSets = this.services.changeSetService.getData();
        
        this.LOGGER.info("Data retrieval ended");
        this.dataRetrieved.emit(this.data);
        this.retrievalSuccessful = !this.hasRetrieveErrors();
        this.retrievalFinished = true;
    }
    
    getData():IJenkinsData {
        return this.data;
    }
    
    isHideUrlCheckLoadingLabel(): boolean {
        if (this.urlCheckStarted && this.urlCheckFinished) {
            return true;
        }
        
        return false;
    }
    
    isHideUrlCheckSuccessfulLabel(): boolean {
        if (!this.urlCheckStarted || !this.urlCheckFinished) {
            return true;
        }
        
        return !this.urlCheckSuccessful;
    }
    
    isHideUrlCheckErrorLabel(): boolean {
        if (!this.urlCheckStarted || !this.urlCheckFinished) {
            return true;
        }
        
        return this.urlCheckSuccessful;
    }
    
    isHideLoadingLabel(service: IJenkinsService): boolean {
        if (this.retrievalStarted && this.retrievalFinished) {
            return true;
        }
        
        return service !== undefined && service !== null && service.isComplete();
    }
    
    isHideSuccessfulLabel(service: IJenkinsService): boolean {
        if(service === undefined || service === null) {
            return true;
        }
        
        if(!service.isComplete()) {
            return true;
        }
        
        return !service.isSuccessful();
    }
    
    isHideErrorLabel(service: IJenkinsService): boolean {
        if(service === undefined || service === null) {
            return true;
        }
        
        if(!service.isComplete()) {
            return true;
        }
        
        return service.isSuccessful();
    }
    
    hasRetrieveErrors():boolean {
        if (this.serviceEndedWithErrors(this.services.nodeService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.userListService)) {
            return true;
        }
        
        if(this.serviceEndedWithErrors(this.services.userService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.jobListService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.jobService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.viewListService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.viewService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.buildListService)) {
            return true;
        }
        
        if (this.serviceEndedWithErrors(this.services.buildService)) {
            return true;
        }
        
        if ( this.serviceEndedWithErrors(this.services.changeSetService)) {
            return true;
        }
        
        return false;
    }
    
    private serviceEndedWithErrors(service: IJenkinsService):boolean {
        if(service === null || service === undefined) {
            return false;
        }
        
        if (!service.isComplete()) {
            return false;
        }
        
        return !service.isSuccessful();
    }
}

