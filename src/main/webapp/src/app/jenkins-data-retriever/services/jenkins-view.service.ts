import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ConfigService} from '../../config/services/config.service';
import {ProxyService} from '../../proxy/services/proxy.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsView} from 'jenkins-api-ts-typings';

import {JenkinsDataRetrieverService} from './JenkinsDataRetrieverService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins view's details from each view url
 */
export class JenkinsViewService extends JenkinsDataRetrieverService {
    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger,
        private url: string, private viewList: Array<IJenkinsView>, private jobList: Array<IJenkinsJob>) {
        
        super();
    }

    async execute() {
        if (this.util.isInvalid(this.viewList)) {
            this.LOGGER.error("Empty or null view list received");
            this.completedSuccessfully = false;
            this.allItemsRetrievedSuccessfully = false;
            this.complete = true;
            return;
        }

        let viewPromises: Array<Promise<JSON>> = new Array<Promise<JSON>>();
        let i = 0;

        for (let view of this.viewList) {
            i++;
            this.LOGGER.debug("Retrieving view details for:", view.name, "(", i, "/", this.viewList.length, ")");
            let viewUrl: string = this.getViewApiUrl(view, this.config);

            viewPromises.push(this.proxy.proxy(viewUrl)
                .first()
                .toPromise()
                .catch(() => {
                    this.LOGGER.warn("Error retrieving details for view", view.name); 
                    this.allItemsRetrievedSuccessfully = false;
                }));
        }

        await Promise.all(viewPromises)
            .then(values => {

                for (let viewJson of <Array<JSON>> values) {

                    if (viewJson === undefined || viewJson === null) {
                        // Failed, already handled by the promise's catch
                        continue;
                    }

                    if (!(<JSON> viewJson).hasOwnProperty("name")) {
                        this.LOGGER.warn("No view details found for:", viewJson);
                        continue;
                    }

                    let view = this.util.getViewByName(this.viewList, viewJson["name"]);

                    if (this.util.isInvalid(view)) {
                        this.LOGGER.warn("No view with name", viewJson["name"], "found");
                        this.allItemsRetrievedSuccessfully = false;
                        continue;
                    }

                    view.fromJson(viewJson);
                    view.jobs = this.getJobs(view, viewJson, this.jobList);
                    this.LOGGER.debug("Updated details for view:", view.name);
                }

                this.completedSuccessfully = true;
                this.complete = true;
                this.LOGGER.info("View details updated:", this.viewList);

            }).catch(error => {
                this.LOGGER.error("Error Occurred processing view:", error);
                this.completedSuccessfully = false;
                this.allItemsRetrievedSuccessfully = false;
                this.complete = true;
                return;
            });
    }

    /**
     * Get the jobs
     */
    getData(): Array<IJenkinsView> {
        return this.viewList;
    }

    getServiceId() {
        return JenkinsServiceId.Views;
    }

    private getViewApiUrl(view: IJenkinsView, config: ConfigService) {
        let viewApiUrl = this.url.replace(/\/$/, "") + '/' + config.viewSuffix + encodeURI(view.name) + "/" + config.apiSuffix;
        return viewApiUrl;
    }

    private getJobs(view: IJenkinsView, viewJson: JSON, allJobs: Array<IJenkinsJob>): Array<IJenkinsJob> {
        let jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        if (!viewJson.hasOwnProperty("jobs")) {
            this.LOGGER.debug("No jobs found for:", view);
            return jobs;
        }

        for (let viewJob of (viewJson["jobs"] as Array<JSON>)) {
            let job: IJenkinsJob = this.util.getJobByName(allJobs, viewJob["name"]);

            if (job === undefined) {
                continue;
            }

            jobs.push(job);
        }

        return jobs;
    }
}
