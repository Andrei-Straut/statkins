import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigService} from '../../config/services/config.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {JenkinsNode} from 'jenkins-api-ts-typings';

import {IJenkinsService} from './IJenkinsService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins nodes from the root url
 */
export class JenkinsNodeService implements IJenkinsService {
    readonly jenkinsNodeUrl: string;

    private nodeList: Array<IJenkinsNode>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;

    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger, private url: string) {
        this.jenkinsNodeUrl = this.getJenkinsApiNodeUrl(this.url, this.config);

        this.nodeList = new Array<IJenkinsNode>();
    }

    async execute() {
        let nodeResponse: JSON;

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
        if (this.util.isInvalid(nodeResponse) || this.util.isInvalid(nodeResponse["computer"])) {
            this.nodeList = new Array<IJenkinsNode>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        this.LOGGER.debug("Received response:", nodeResponse);

        for (let node of nodeResponse["computer"]) {
            let jenkinsNode: IJenkinsNode = new JenkinsNode();
            jenkinsNode.fromJson(node);

            if (!this.util.isInvalid(jenkinsNode) && !this.util.isInvalid(jenkinsNode.name)) {
                jenkinsNode.url = this.getJenkinsNodeUrl(this.url, this.config, jenkinsNode.displayName);
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

    private getJenkinsApiNodeUrl(jenkinsUrl: string, config: ConfigService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.slaveSuffix + config.apiSuffix + "?depth=1";
    }

    private getJenkinsNodeUrl(jenkinsUrl: string, config: ConfigService, nodeName: string) {
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.slaveSuffix + "/" + nodeName;
    }
}