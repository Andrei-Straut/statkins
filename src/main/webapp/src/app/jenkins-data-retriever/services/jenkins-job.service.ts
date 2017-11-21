import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ConfigService} from '../../config/services/config.service';
import {ProxyService} from '../../proxy/services/proxy.service';
import {UtilService} from '../../util/services/util.service'
import {Logger} from 'angular2-logger/core';

import {IJenkinsJob} from 'jenkins-api-ts-typings';

import {JenkinsDataRetrieverService} from './JenkinsDataRetrieverService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins job's details from each job url
 */
export class JenkinsJobService extends JenkinsDataRetrieverService {

    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger, private jobList: Array<IJenkinsJob>) {
        super();
    }

    async execute() {
        if (this.util.isInvalid(this.jobList)) {
            this.LOGGER.error("Empty or null job list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        let jobPromises: Array<Promise<JSON>> = new Array<Promise<JSON>>();
        let i = 0;

        for (let job of this.jobList) {
            i++;
            this.LOGGER.debug("Retrieving job details for:", job.name, "(", i, "/", this.jobList.length, ")");
            let jobUrl: string = this.getJobApiUrl(job.url, this.config);

            jobPromises.push(this.proxy.proxy(jobUrl)
                .first()
                .toPromise()
                .catch(() => {this.LOGGER.warn("Error retrieving details for job", job.name);}));
        }

        await Promise.all(jobPromises)
            .then(values => {

                for (let jobJson of <Array<JSON>> values) {
                    if (this.util.isInvalid(jobJson) || !(<JSON> jobJson).hasOwnProperty("name")) {
                        this.LOGGER.warn("No job details found for:", jobJson);
                        continue;
                    }

                    let job = this.util.getJobByName(this.jobList, jobJson["name"]);

                    if (job === undefined) {
                        this.LOGGER.warn("No job with name", jobJson["name"], "found");
                        continue;
                    }

                    job.fromJson(jobJson);
                    job.upstreamProjects = this.getUpstreamProjects(jobJson, job);
                    job.downstreamProjects = this.getDownstreamProjects(jobJson, job);
                    this.LOGGER.debug("Updated details for job:", job.name);
                }
                this.completedSuccessfully = true;
                this.complete = true;
            });

        this.LOGGER.info("Job details updated:", this.jobList);
        this.completedSuccessfully = true;
        this.complete = true;
    }

    /**
     * Get the jobs
     */
    getData(): Array<IJenkinsJob> {
        return this.jobList;
    }

    getServiceId() {
        return JenkinsServiceId.Jobs;
    }

    private getUpstreamProjects(jobJson: JSON, job: IJenkinsJob): Array<IJenkinsJob> {
        let upstreamProjects: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        if (!jobJson.hasOwnProperty("upstreamProjects")) {
            this.LOGGER.debug("No upstream projects found for:", job);
            return upstreamProjects;
        }

        for (let upstreamJobJson of (jobJson["upstreamProjects"] as Array<JSON>)) {
            let upstreamJob: IJenkinsJob = this.util.getJobByName(this.jobList, upstreamJobJson["name"]);

            if (upstreamJob === undefined) {
                continue;
            }

            upstreamProjects.push(upstreamJob);
        }

        return upstreamProjects;
    }

    private getDownstreamProjects(jobJson: JSON, job: IJenkinsJob) {
        let downstreamProjects: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        if (!jobJson.hasOwnProperty("downstreamProjects")) {
            this.LOGGER.debug("No downstream projects found for:", job);
            return downstreamProjects;
        }

        for (let downstreamJobJson of (jobJson["downstreamProjects"] as Array<JSON>)) {
            let downstreamJob: IJenkinsJob = this.util.getJobByName(this.jobList, downstreamJobJson["name"]);

            if (downstreamJob === undefined) {
                continue;
            }

            downstreamProjects.push(downstreamJob);
        }

        return downstreamProjects;
    }

    private getJobApiUrl(jobUrl: string, config: ConfigService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jobUrl.replace(/\/$/, "") + '/' + config.apiSuffix;
    }
}
