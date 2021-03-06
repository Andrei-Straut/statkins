import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {ConfigService} from '../../config/services/config.service';
import {ProxyService} from '../../proxy/services/proxy.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';

import {IJenkinsDataRetrieverService} from '../services/IJenkinsDataRetrieverService';

import {JenkinsNodeService} from '../services/jenkins-node.service';
import {JenkinsUserListService} from '../services/jenkins-user-list.service';
import {JenkinsUserService} from '../services/jenkins-user.service';
import {JenkinsJobListService} from '../services/jenkins-job-list.service';
import {JenkinsJobService} from '../services/jenkins-job.service';
import {JenkinsViewListService} from '../services/jenkins-view-list.service';
import {JenkinsViewService} from '../services/jenkins-view.service';
import {JenkinsBuildListService} from '../services/jenkins-build-list.service';
import {JenkinsBuildService} from '../services/jenkins-build.service';
import {JenkinsChangeSetService} from '../services/jenkins-change-set.service';
import {JenkinsActionService} from '../services/jenkins-action.service';

interface IJenkinsServices {
    nodeService: IJenkinsDataRetrieverService,
    userListService: IJenkinsDataRetrieverService,
    userService: IJenkinsDataRetrieverService,
    jobListService: IJenkinsDataRetrieverService,
    jobService: IJenkinsDataRetrieverService,
    viewListService: IJenkinsDataRetrieverService,
    viewService: IJenkinsDataRetrieverService
    buildListService: IJenkinsDataRetrieverService,
    buildService: IJenkinsDataRetrieverService,
    changeSetService: IJenkinsDataRetrieverService,
    actionService: IJenkinsDataRetrieverService,
};

interface ResponseWithBody {
    _body: string,
}

@Component({
    selector: 'jenkins-data-retriever',
    templateUrl: '../templates/jenkins-data-retriever.template.html',
    styleUrls: ['../templates/jenkins-data-retriever.template.css'],
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
    dataRetrieved: EventEmitter<IJenkinsData> = new EventEmitter<IJenkinsData>();

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
        changeSets: null,
        actions: null,
    };

    services: IJenkinsServices = <any> {};

    constructor(private LOGGER: Logger) {}

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

        this.services.actionService = new JenkinsActionService(this.configService, this.utilService, this.LOGGER, this.data.builds);
        await this.services.actionService.execute();
        this.data.actions = this.services.actionService.getData();
        
        this.LOGGER.info("Data retrieval ended");
        this.dataRetrieved.emit(this.data);
        this.retrievalSuccessful = !this.hasRetrieveErrors();
        this.retrievalFinished = true;
    }

    getData(): IJenkinsData {
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

    isHideLoadingLabel(service: IJenkinsDataRetrieverService): boolean {
        if (this.retrievalStarted && this.retrievalFinished) {
            return true;
        }

        return service !== undefined && service !== null && service.isComplete();
    }

    isHideSuccessfulLabel(service: IJenkinsDataRetrieverService): boolean {
        if (service === undefined || service === null) {
            return true;
        }

        if (!service.isComplete()) {
            return true;
        }
        
        if (!service.isDataComplete()) {
            return true;
        }

        return !service.isSuccessful() && !service.isDataComplete();
    }

    isHideIncompleteLabel(service: IJenkinsDataRetrieverService): boolean {
        if (service === undefined || service === null) {
            return true;
        }

        if (!service.isComplete()) {
            return true;
        }

        if (!service.isSuccessful()) {
            return true;
        }

        return service.isDataComplete();
    }

    isHideErrorLabel(service: IJenkinsDataRetrieverService): boolean {
        if (service === undefined || service === null) {
            return true;
        }

        if (!service.isComplete()) {
            return true;
        }

        return service.isSuccessful();
    }

    hasRetrieveErrors(): boolean {
        if (this.serviceEndedWithErrors(this.services.nodeService) || this.serviceDataIncomplete(this.services.nodeService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.userListService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.userService) || this.serviceDataIncomplete(this.services.userService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.jobListService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.jobService) || this.serviceDataIncomplete(this.services.jobService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.viewListService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.viewService) || this.serviceDataIncomplete(this.services.viewService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.buildListService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.buildService) || this.serviceDataIncomplete(this.services.buildService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.changeSetService) || this.serviceDataIncomplete(this.services.changeSetService)) {
            return true;
        }

        if (this.serviceEndedWithErrors(this.services.actionService) || this.serviceDataIncomplete(this.services.actionService)) {
            return true;
        }

        return false;
    }

    private serviceEndedWithErrors(service: IJenkinsDataRetrieverService): boolean {
        if (service === null || service === undefined) {
            return false;
        }

        if (!service.isComplete()) {
            return false;
        }

        return !service.isSuccessful();
    }

    private serviceDataIncomplete(service: IJenkinsDataRetrieverService): boolean {
        if (service === null || service === undefined) {
            return false;
        }

        if (!service.isComplete()) {
            return false;
        }

        return service.isComplete() && !service.isDataComplete();
    }
}