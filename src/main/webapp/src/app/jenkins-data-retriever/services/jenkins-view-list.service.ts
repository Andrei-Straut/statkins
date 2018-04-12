import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ConfigService} from '../../config/services/config.service';
import {ProxyService} from '../../proxy/services/proxy.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsView} from 'jenkins-api-ts-typings';
import {JenkinsView} from 'jenkins-api-ts-typings';

import {JenkinsDataRetrieverService} from './JenkinsDataRetrieverService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the list of jenkins views from the root url. Each view only contains the name and the view url. 
 * This list will be used later to retrieve mode detailed information for each views
 */
export class JenkinsViewListService extends JenkinsDataRetrieverService {
    readonly jenkinsViewListUrl: string;
    private viewList: Array<IJenkinsView>;

    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger, private url: string) {
        super();
        
        this.jenkinsViewListUrl = this.getJenkinsViewJobListUrl(this.url, this.config);
        this.viewList = new Array<IJenkinsView>();
    }

    async execute() {
        if (this.jenkinsViewListUrl === undefined || this.jenkinsViewListUrl === null || this.jenkinsViewListUrl.length === 0) {
            this.LOGGER.error("Empty or null url received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        let viewListResponse: JSON;

        this.LOGGER.debug("Retrieving view list from:", this.jenkinsViewListUrl);

        await this.proxy.proxy(this.jenkinsViewListUrl)
            .first().toPromise()
            .then(value => viewListResponse = value)
            .catch(error => {
                this.LOGGER.error("Could not retrieve view list:", error);
                this.completedSuccessfully = false;
                this.complete = true;
            });

        /* An error occurred, view list unretrievable */
        if (this.util.isInvalid(viewListResponse) || this.util.isInvalid(viewListResponse["views"])) {
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        this.LOGGER.debug("Received response:", viewListResponse);

        for (let view of viewListResponse["views"]) {
            let jenkinsView: IJenkinsView = new JenkinsView();
            jenkinsView.fromJson(view);
            this.viewList.push(jenkinsView);
        }

        this.LOGGER.info("View List (" + this.getData().length, "views found):", this.getData());
        this.completedSuccessfully = true;
        this.complete = true;
    }

    /**
     * Get the jobs
     */
    getData(): Array<IJenkinsView> {
        if (this.util.isInvalid(this.viewList)) {
            return new Array<IJenkinsView>();
        }
        
        return Object.assign([], this.viewList);
    }

    getServiceId() {
        return JenkinsServiceId.ViewList;
    }

    private getJenkinsViewJobListUrl(jenkinsUrl: string, config: ConfigService) {
        if (jenkinsUrl === undefined || jenkinsUrl === null || jenkinsUrl.length === 0) {
            return undefined;
        }
        
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.apiSuffix + '?tree=views[name,url]';
    }
}
