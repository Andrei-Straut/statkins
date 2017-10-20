import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { Util } from '../../Util/Util';
import { Logger } from 'angular2-logger/core';
import { Proxy } from '../../Proxy/Proxy';
import { IJenkinsUser } from 'jenkins-api-ts-typings';

import { IJenkinsService } from './IJenkinsService';
import { JenkinsDefinitionService } from '../../Definition/JenkinsDefinitionService';
import { JenkinsServiceId } from './JenkinsServiceId';

/**
 * Retrieve the jenkins users's details from each user url
 */
@Injectable()
export class JenkinsUserService implements IJenkinsService {    
    private proxy: Proxy;
    private complete: boolean = false;
    private completedSuccessfully: boolean = false;
    
    constructor(private LOGGER:Logger, private http: Http, private definition: JenkinsDefinitionService, private userList: Array<IJenkinsUser>) {
        this.proxy = new Proxy(this.LOGGER, this.http, this.definition);
    }
    
    async execute() {
        if (Util.isInvalid(this.userList)) {
            this.LOGGER.error("Empty or null user list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }
        
        let i = 0;
        let userPromises:Array<Promise<JSON>> = new Array<Promise<JSON>>();
        
        for (let user of this.userList) {
            i++;
            this.LOGGER.debug("Retrieving user details for:", user.fullName, "(", i, "/", this.userList.length, ")");
            let userUrl: string = this.getUserApiUrl(user.absoluteUrl, this.definition);
            
            userPromises.push(this.proxy.proxy(userUrl)
                .first()
                .toPromise()
                .catch(() => {this.LOGGER.warn("Error retrieving details for user", user.fullName); }));
        }
        
        await Promise.all(userPromises)
            .then(values => {
                
                for(let userJson of <Array<JSON>>values) {
                    if(!(<JSON>userJson).hasOwnProperty("fullName")) {
                        this.LOGGER.warn("No user details found for:", userJson);
                        continue;
                    }
                    
                    let user = Util.getUserByFullName(this.userList, userJson["fullName"]);

                    if (Util.isInvalid(user)) {
                        this.LOGGER.warn("No user with fullName", userJson["fullName"], "found");
                        continue;
                    }

                    user.fromJsonString(JSON.stringify(userJson));
                    this.LOGGER.debug("Updated details for user:", user.fullName);
                }
                
                this.completedSuccessfully = true;
                this.complete = true;
            });
            
        this.completedSuccessfully = true;
        this.complete = true;
        this.LOGGER.info("User details updated:", this.userList);
    }
    
    /**
     * Get the users
     */
    getData():Array<IJenkinsUser> {
        return this.userList;
    }
    
    getServiceId() {
        return JenkinsServiceId.Users;
    }
    
    isComplete(): boolean {
        return this.complete;
    }
    
    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    private getUserApiUrl(userUrl: string, jenkinsDefinition: JenkinsDefinitionService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return userUrl.replace(/\/$/, "") + '/' + jenkinsDefinition.apiSuffix;
    }
}