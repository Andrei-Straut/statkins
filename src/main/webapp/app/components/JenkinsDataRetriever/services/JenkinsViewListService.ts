import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { Util } from '../../Util/Util';
import { Proxy } from '../../Proxy/Proxy';
import { IJenkinsView } from 'jenkins-api-ts-typings';
import { JenkinsView } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsDefinitionService } from '../../Definition/JenkinsDefinitionService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the list of jenkins views from the root url. Each view only contains the name and the view url. 
 * This list will be used later to retrieve mode detailed information for each views
 */
@Injectable()
export class JenkinsViewListService implements IJenkinsService {
    readonly jenkinsViewListUrl: string;
    
    private proxy: Proxy;
    private viewList: Array<IJenkinsView>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private http: Http, private url: string, private definition: JenkinsDefinitionService) {
        this.jenkinsViewListUrl = this.getJenkinsViewJobListUrl(this.url, this.definition);
        this.proxy = new Proxy(this.LOGGER, this.http, this.definition);
        
        this.viewList = new Array<IJenkinsView>();
    }
    
    async execute() {
        let viewListResponse:JSON;
        
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
        if (Util.isInvalid(viewListResponse)) {
            this.viewList = new Array<IJenkinsView>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
                
        this.LOGGER.debug("Received response:", viewListResponse);
        
        for (let view of viewListResponse["views"]) {
            let jenkinsView:IJenkinsView = new JenkinsView();
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
    getData():Array<IJenkinsView> {
        return Object.assign([], this.viewList);
    }
    
    getServiceId() {
        return JenkinsServiceId.ViewList;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getJenkinsViewJobListUrl(jenkinsUrl: string, jenkinsDefinition: JenkinsDefinitionService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + jenkinsDefinition.apiSuffix + '?tree=views[name,url]';
    }
}