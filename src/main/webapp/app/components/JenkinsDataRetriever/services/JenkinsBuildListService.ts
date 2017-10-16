import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Functions } from '../../Helper/Functions'
import { Logger } from 'angular2-logger/core';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { JenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the list of jenkins build from each job's data. Each build only contains the number and the build url. 
 * This list will be used later to retrieve mode detailed information for each build
 */
@Injectable()
export class JenkinsBuildListService implements IJenkinsService {
    private buildList: Map<IJenkinsJob, Array<IJenkinsBuild>>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private jobList: Array<IJenkinsJob>) {
        this.buildList = new Map<IJenkinsJob, Array<IJenkinsBuild>>();
    }
    
    async execute() {
        
        if (Functions.isInvalid(this.jobList)) {
            this.LOGGER.error("Empty or null job list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        for (let job of this.jobList) {
            let buildsJson: Array<JSON> = (JSON.parse(job.getJsonData()))["builds"];
            
            if (Functions.isInvalid(buildsJson)) {
                this.LOGGER.warn("No job details found for:", job.name);
                continue;
            }
            
            this.buildList.set(job, buildsJson.map(buildJson => {
                let build = new JenkinsBuild();
                build.fromJsonString(JSON.stringify(buildJson));
                return build;
            }));
            job.builds = this.buildList.get(job);
                
            this.LOGGER.debug("Found", job.builds.length, "builds for job", job.name, ":", job.builds);
        }
        
        let numberOfBuilds = Array.from(this.buildList.values()).map(value => value.length).reduce(function (a, b) { return a + b; }, 0);
        
        this.LOGGER.info("Build List (" + numberOfBuilds, "builds found):", this.getData());
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the builds
     */
    getData(): Map<IJenkinsJob, Array<IJenkinsBuild>> {
        return new Map<IJenkinsJob, Array<IJenkinsBuild>>(this.buildList);
    }
    
    getServiceId() {
        return JenkinsServiceId.BuildList;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
}