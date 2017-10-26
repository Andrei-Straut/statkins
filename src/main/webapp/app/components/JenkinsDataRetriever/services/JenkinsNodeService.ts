import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { Util } from '../../Util/Util';
import { Proxy } from '../../Proxy/Proxy';
import { IJenkinsNode } from 'jenkins-api-ts-typings';
import { JenkinsNode } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsDefinitionService } from '../../Definition/JenkinsDefinitionService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the jenkins nodes from the root url
 */
@Injectable()
export class JenkinsNodeService implements IJenkinsService {
    readonly jenkinsNodeUrl: string;
    
    private proxy: Proxy;
    private nodeList: Array<IJenkinsNode>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private http: Http, private url: string, private definition: JenkinsDefinitionService) {
        this.jenkinsNodeUrl = this.getJenkinsApiNodeUrl(this.url, this.definition);
        this.proxy = new Proxy(this.LOGGER, this.http, this.definition);
        
        this.nodeList = new Array<IJenkinsNode>();
    }
    
    async execute() {
        let nodeResponse:JSON;
        
        this.LOGGER.debug("Retrieving nodes from:", this.jenkinsNodeUrl);
        
        await this.proxy.proxy(this.jenkinsNodeUrl)
                .first().toPromise()
                .then(value => nodeResponse = value)
                .catch(error => {
                    this.LOGGER.error("Could not retrieve node list:", error);
                    this.completedSuccessfully = false;
                    this.complete = true;
                });
            
        /* An error occurred, node list unretrievable */
        if (Util.isInvalid(nodeResponse) || Util.isInvalid(nodeResponse["computer"])) {
            this.nodeList = new Array<IJenkinsNode>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        this.LOGGER.debug("Received response:", nodeResponse);
        
        for (let node of nodeResponse["computer"]) {
            let jenkinsNode:IJenkinsNode = new JenkinsNode();
            jenkinsNode.fromJsonString(JSON.stringify(node));
            
            if (!Util.isInvalid(jenkinsNode) && !Util.isInvalid(jenkinsNode.name)) {
                jenkinsNode.url = this.getJenkinsNodeUrl(this.url, this.definition, jenkinsNode.name);
            }
            
            this.nodeList.push(jenkinsNode);
        }
        
        this.LOGGER.info("Node List (" + this.getData().length, "nodes found):", this.getData());
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the nodes
     */
    getData():Array<IJenkinsNode> {
        return Object.assign([], this.nodeList);
    }
    
    getServiceId(): JenkinsServiceId {
        return JenkinsServiceId.Nodes;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getJenkinsApiNodeUrl(jenkinsUrl: string, jenkinsDefinition: JenkinsDefinitionService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + jenkinsDefinition.slaveSuffix + jenkinsDefinition.apiSuffix + "?depth=1";
    }
    
    private getJenkinsNodeUrl(jenkinsUrl: string, jenkinsDefinition: JenkinsDefinitionService, nodeName: string) {
        return jenkinsUrl.replace(/\/$/, "") + '/' + jenkinsDefinition.slaveSuffix + "/" + nodeName;
    }
}