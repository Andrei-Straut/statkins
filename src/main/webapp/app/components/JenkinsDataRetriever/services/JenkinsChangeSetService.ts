import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { Util } from '../../Util/Util';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { JenkinsChangeSet } from 'jenkins-api-ts-typings';
import { IJenkinsUser } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the jenkins changeset's details from each build url
 */
@Injectable()
export class JenkinsChangeSetService implements IJenkinsService {
    private changeSets: Map<IJenkinsBuild, Array<IJenkinsChangeSet>>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private buildList: Map<IJenkinsJob, Array<IJenkinsBuild>>, private userList: Array<IJenkinsUser>) {
        this.changeSets = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
    }
    
    async execute() {
        if (Util.isInvalid(this.buildList)) {
            this.LOGGER.error("Empty or null build list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        let changeSetMap: Map<string, IJenkinsChangeSet> = new Map<string, IJenkinsChangeSet>();
        
        for (let job of this.buildList.keys()) {
            for (let build of job.builds) {
                        
                if (!this.hasChangeSets(build)) {
                    this.LOGGER.debug("No change sets found for build #" + build.number, "of job", job.name);
                    continue;
                }
                
                let changeSetJsonData: Array<JSON> = (JSON.parse(build.getJsonData())["changeSet"])["items"] as Array<JSON>;
                
                this.LOGGER.debug("Retrieving change set details for build #" + build.number, "of job", job);
                
                let changeSets: Array<IJenkinsChangeSet> = changeSetJsonData.map(jsonData => {
                    let changeSet: IJenkinsChangeSet = new JenkinsChangeSet();
                    
                    // Avoid duplicating changeset objects
                    if (jsonData.hasOwnProperty("commitId") && changeSetMap.has(jsonData["commitId"])) {
                        changeSet = changeSetMap.get(jsonData["commitId"]);
                        this.LOGGER.debug("ChangeSet with ID", jsonData["commitId"], "retrieved from cache");
                    } else {
                        this.LOGGER.debug("ChangeSet with ID", jsonData["commitId"], "created");
                        changeSet.fromJson(jsonData);
                        changeSet.author = this.getChangeSetAuthor(this.userList, jsonData);
                        changeSet.timestamp = Util.padTimestamp(changeSet.timestamp);
                        
                        if (Util.isInvalid(changeSet.date) || changeSet.date.toString().toLowerCase().indexOf("invalid") !== -1) {
                            changeSet.date = new Date(changeSet.timestamp);
                        }
                        
                        changeSetMap.set(changeSet.commitId, changeSet);
                    }
                    return changeSet;
                });
                
                build.changeSets = changeSets;
                this.changeSets.set(build, changeSets);
            }
        }
        
        this.LOGGER.info("ChangeSet details updated:", this.changeSets);
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the changeSets
     */
    getData(): Map<IJenkinsBuild, Array<IJenkinsChangeSet>> {
        return new Map(this.changeSets);
    }
    
    getServiceId() {
        return JenkinsServiceId.Changesets;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private hasChangeSets(build: IJenkinsBuild): boolean {
        
        let buildData: JSON = JSON.parse(build.getJsonData());
        if (buildData === undefined || buildData == null) {
            return false;
        }
     
        let changeSetData: JSON = buildData["changeSet"];
        if (changeSetData === undefined || changeSetData == null || !changeSetData.hasOwnProperty("items")) {
            return false;
        }
        
        let changeSetItems: Array<JSON> = changeSetData["items"];
        if (changeSetItems === undefined || changeSetItems == null || changeSetItems.length === 0) {
            return false;
        }
        return true;   
    }
    
    private getChangeSetAuthor(users: Array<IJenkinsUser>, changeSetData: JSON): IJenkinsUser {   
        if (changeSetData === undefined || changeSetData === null) {
            return undefined;
        }
             
        if(!changeSetData.hasOwnProperty("author")) {
            return undefined;
        }
        
        let authorData = changeSetData["author"] as JSON;
        if(!authorData.hasOwnProperty("fullName")) {
            return undefined;
        }
        
        return Util.getUserByFullName(users, authorData["fullName"]);
    }
}