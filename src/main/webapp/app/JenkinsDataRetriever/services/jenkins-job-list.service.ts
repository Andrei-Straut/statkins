import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { ConfigService } from '../../Config/services/config.service';
import { ProxyService } from '../../Proxy/services/proxy.service';

import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { JenkinsJob } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the list of jenkins jobs from the root url. Each job only contains the name and the job url. 
 * This list will be used later to retrieve mode detailed information for each job
 */
@Injectable()
export class JenkinsJobListService implements IJenkinsService {
    readonly jenkinsJobListUrl: string;
    
    private jobList: Array<IJenkinsJob>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private config: ConfigService, private proxy: ProxyService, private LOGGER:Logger, private url: string) {
        this.jenkinsJobListUrl = this.getJenkinsApiJobListUrl(this.url, this.config);
        
        this.jobList = new Array<IJenkinsJob>();
    }
    
    async execute() {
        let jobListResponse:JSON;
        
        this.LOGGER.debug("Retrieving job list from:", this.jenkinsJobListUrl);
        
        await this.proxy.proxy(this.jenkinsJobListUrl)
                .first().toPromise()
                .then(value => jobListResponse = value)
                .catch(error => {
                    this.LOGGER.error("Could not retrieve job list:", error);
                    this.completedSuccessfully = false;
                    this.complete = true;
                });
            
        /* An error occurred, job list unretrievable */    
        if(jobListResponse === undefined) {
            this.jobList = new Array<IJenkinsJob>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
                
        this.LOGGER.debug("Received response:", jobListResponse);
        
        for(let job of jobListResponse["jobs"]) {
            let jenkinsJob:IJenkinsJob = new JenkinsJob();
            jenkinsJob.fromJson(job);
            this.jobList.push(jenkinsJob);
        }
        
        this.LOGGER.info("Job List (" + this.getData().length, "jobs found):", this.getData());
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the jobs
     */
    getData():Array<IJenkinsJob> {
        return Object.assign([], this.jobList);
    }
    
    getServiceId() {
        return JenkinsServiceId.JobList;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getJenkinsApiJobListUrl(jenkinsUrl: string, config: ConfigService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.apiSuffix + '?tree=jobs[name,url]';
    }
}