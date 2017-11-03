import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { Proxy } from '../../Proxy/Proxy';
import { Util } from '../../Util/Util';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { JenkinsDefinitionService } from '../../Definition/JenkinsDefinitionService';
import { IJenkinsService } from './IJenkinsService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the jenkins build's details from each build url
 */
@Injectable()
export class JenkinsBuildService implements IJenkinsService {
    private proxy: Proxy;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private http: Http, private definition: JenkinsDefinitionService, private buildList: Map<IJenkinsJob, Array<IJenkinsBuild>>) {
        this.proxy = new Proxy(this.LOGGER, this.http, this.definition);
    }
    
    async execute() {
        
        if (Util.isInvalid(this.buildList)) {
            this.LOGGER.error("Empty or null build list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        let promises:Map<IJenkinsJob, Array<Promise<JSON>>> = this.createPromises(this.buildList);
        
        for(let job of promises.keys()) {
            
            await Promise.all(promises.get(job))
                .then(values => this.handlePromises(job, values))
                .catch((err) => {
                    this.LOGGER.warn("Build details not retrieved correctly");
                    this.LOGGER.debug(err);
                    this.completedSuccessfully = false;
                    this.complete = true;
                    
                    return;});
            
            job.firstBuild = this.getBuild(job, "firstBuild", job.builds);
            job.lastBuild = this.getBuild(job, "lastBuild", job.builds);
            job.lastCompletedBuild = this.getBuild(job, "lastBuild", job.builds);
            job.lastSuccessfulBuild = this.getBuild(job, "lastSuccessfulBuild", job.builds);
            job.lastFailedBuild = this.getBuild(job, "lastFailedBuild", job.builds);
            job.lastStableBuild = this.getBuild(job, "lastStableBuild", job.builds);
            job.lastUnstableBuild = this.getBuild(job, "lastUnstableBuild", job.builds);
            job.lastUnsuccessfulBuild = this.getBuild(job, "lastUnsuccessfulBuild", job.builds);
        }
                    
        this.LOGGER.info("Build details updated:", this.buildList);
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the builds
     */
    getData(): Map<IJenkinsJob, Array<IJenkinsBuild>> {
        return new Map(this.buildList);
    }
    
    getServiceId() {
        return JenkinsServiceId.Builds;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getBuildApiUrl(build: IJenkinsBuild, jenkinsDefinition: JenkinsDefinitionService) {
        let buildApiUrl = build.url.replace(/\/$/, "") + '/' + jenkinsDefinition.apiSuffix;
        return buildApiUrl;
    }
    
    private createPromises(builds: Map<IJenkinsJob, Array<IJenkinsBuild>>):Map<IJenkinsJob, Array<Promise<JSON>>> {
        let i = 0;
        let promises:Map<IJenkinsJob, Array<Promise<JSON>>> = new Map<IJenkinsJob, Array<Promise<JSON>>>();
        
        for (let job of builds.keys()) {
            promises.set(job, this.createJobPromises(job));
        }
        
        return promises;
    }
    
    private createJobPromises(job: IJenkinsJob): Array<Promise<JSON>> {
        let parent = this;
        
        return job.builds.map(function(build) {
            let buildUrl = parent.getBuildApiUrl(build, parent.definition);

            return parent.proxy.proxy(buildUrl)
                .first()
                .toPromise()
                .catch((err) => {
                    parent.LOGGER.warn("Error retrieving details for build #" + build.number, "of job", job.name, "(" + buildUrl + ") - Enable Debug mode for stacktrace");
                    parent.LOGGER.debug(err);
                });
            });
    }
    
    private handlePromises(job:IJenkinsJob, promises: Array<JSON>) {
        
        for(let buildJson of promises) {

            if (buildJson === undefined || buildJson === null) {
                // Failed, already handled by the promise's catch
                continue;
            }

            if(!(<JSON>buildJson).hasOwnProperty("number") || !(<JSON>buildJson).hasOwnProperty("url")) {
                this.LOGGER.warn("No build details found for build:", buildJson);
                continue;
            }

            let build = Util.getBuildByBuildNumber(job.builds, buildJson["number"]);

            if (build === undefined || build === null) {
                this.LOGGER.warn("Build with number #" + buildJson["number"], "not found for job", job.name);
                continue;
            }

            build.fromJson(buildJson);
            this.LOGGER.debug("Updated build:", buildJson);
        }
    }
    
    private getBuild(job: IJenkinsJob, buildTypeString: string, builds: Array<IJenkinsBuild>): IJenkinsBuild {
        if (job.getJsonData() == undefined || job.getJsonData() == null) {
            return undefined;
        }
        
        let jobData:JSON = JSON.parse(job.getJsonData());        
        if(!jobData.hasOwnProperty(buildTypeString)) {
            return undefined;
        }
        
        let buildData:JSON = (jobData[buildTypeString] as JSON);
        if(buildData === undefined || buildData === null || !buildData.hasOwnProperty("number")) {
            return undefined;
        }
        
        return Util.getBuildByBuildNumber(builds, buildData["number"]);
        
    }
}