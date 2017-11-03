import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Logger } from 'angular2-logger/core';
import { Util } from '../../Util/Util'
import { Proxy } from '../../Proxy/Proxy';
import { IJenkinsUser } from 'jenkins-api-ts-typings';
import { JenkinsUser } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsDefinitionService } from '../../Definition/JenkinsDefinitionService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the jenkins users from the root url. Each user only contains the name and the user url. 
 * This list will be used later to retrieve mode detailed information for each user
 */
@Injectable()
export class JenkinsUserListService implements IJenkinsService {
    readonly jenkinsUserUrl: string;
    
    private proxy: Proxy;
    private userList: Array<IJenkinsUser>;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private http: Http, private url: string, private definition: JenkinsDefinitionService) {
        this.jenkinsUserUrl = this.getJenkinsApiUserUrl(this.url, this.definition);
        this.proxy = new Proxy(this.LOGGER, this.http, this.definition);
        
        this.userList = new Array<IJenkinsUser>();
    }
    
    async execute() {
        let userResponse:JSON;
        
        this.LOGGER.debug("Retrieving users from:", this.jenkinsUserUrl);
        
        await this.proxy.proxy(this.jenkinsUserUrl)
                .first().toPromise()
                .then(value => userResponse = value)
                .catch(error => {
                    this.completedSuccessfully = false;
                    this.complete = true;
                    this.LOGGER.error("Could not retrieve user list:", error)
                });
            
        /* An error occurred, job list unretrievable */
        if (Util.isInvalid(userResponse)) {
            this.userList = new Array<IJenkinsUser>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
                
        this.LOGGER.debug("Received response:", userResponse);
        
        if(!userResponse.hasOwnProperty("users")) {
            this.LOGGER.error("No users found in response");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        for (let user of userResponse["users"]) {
            let jenkinsUser:IJenkinsUser = new JenkinsUser();
            jenkinsUser.fromJson(user["user"]);

            this.userList.push(jenkinsUser);
        }
        
        this.LOGGER.info("User List (" + this.getData().length, "users found):", this.getData());
        this.completedSuccessfully = true;
        this.complete = true;
    }
    
    /**
     * Get the users
     */
    getData():Array<IJenkinsUser> {
        return Object.assign([], this.userList);
    }
    
    getServiceId() {
        return JenkinsServiceId.UserList;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getJenkinsApiUserUrl(jenkinsUrl: string, jenkinsDefinition: JenkinsDefinitionService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + jenkinsDefinition.userSuffix + jenkinsDefinition.apiSuffix;
    }
}