import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigService} from '../../config/services/config.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {JenkinsNode} from 'jenkins-api-ts-typings';

import {JenkinsDataRetrieverService} from './JenkinsDataRetrieverService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins nodes from the root url
 */
export class JenkinsNodeService extends JenkinsDataRetrieverService {
    readonly jenkinsNodeUrl: string;
    private nodeList: Array<IJenkinsNode>;

    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger, private url: string) {
        super();
        
        this.jenkinsNodeUrl = this.getJenkinsApiNodeUrl(this.url, this.config);
        this.nodeList = new Array<IJenkinsNode>();
    }

    async execute() {
        if (this.jenkinsNodeUrl === undefined || this.jenkinsNodeUrl === null || this.jenkinsNodeUrl.length === 0) {
            this.LOGGER.error("Empty or null url received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        let nodeResponse: JSON;

        this.LOGGER.debug("Retrieving nodes from:", this.jenkinsNodeUrl);

        await this.proxy.proxy(this.jenkinsNodeUrl)
            .first().toPromise()
            .then(value => nodeResponse = value)
            .catch(error => {
                this.LOGGER.error("Could not retrieve node list:", error);
                this.completedSuccessfully = false;
                this.allItemsRetrievedSuccessfully = false;
                this.complete = true;
            });

        /* An error occurred, node list unretrievable */
        if (this.util.isInvalid(nodeResponse) || !nodeResponse.hasOwnProperty("computer") || this.util.isInvalid(nodeResponse["computer"])) {
            this.nodeList = new Array<IJenkinsNode>();
            this.completedSuccessfully = false;
            this.allItemsRetrievedSuccessfully = false;
            this.complete = true;
            return;
        }

        this.LOGGER.debug("Received response:", nodeResponse);

        for (let node of nodeResponse["computer"]) {
            let jenkinsNode: IJenkinsNode = new JenkinsNode();
            jenkinsNode.fromJson(node);

            if (!this.util.isInvalid(jenkinsNode) && !this.util.isInvalid(jenkinsNode.displayName)) {
                jenkinsNode.url = this.getJenkinsNodeUrl(this.url, this.config, jenkinsNode.displayName);
            } else {
                this.allItemsRetrievedSuccessfully = false;
                this.LOGGER.debug("Node details invalid:", nodeResponse);
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
    getData(): Array<IJenkinsNode> {
        if (this.util.isInvalid(this.nodeList)) {
            return new Array<IJenkinsNode>();
        }
        
        return Object.assign([], this.nodeList);
    }

    getServiceId(): JenkinsServiceId {
        return JenkinsServiceId.Nodes;
    }

    private getJenkinsApiNodeUrl(jenkinsUrl: string, config: ConfigService) {
        if (jenkinsUrl === undefined || jenkinsUrl === null || jenkinsUrl.length === 0) {
            return undefined;
        }
        
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.slaveSuffix + config.apiSuffix + "?depth=1";
    }

    private getJenkinsNodeUrl(jenkinsUrl: string, config: ConfigService, nodeName: string) {
        if (jenkinsUrl === undefined || jenkinsUrl === null || jenkinsUrl.length === 0) {
            return undefined;
        }
        
        let name = nodeName;
        if (name.toLowerCase() === "master") {
            name = '(' + nodeName + ')';
        }
        
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.slaveSuffix + name;
    }
}