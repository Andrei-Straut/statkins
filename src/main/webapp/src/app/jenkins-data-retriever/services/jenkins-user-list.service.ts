import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigService} from '../../config/services/config.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {JenkinsUser} from 'jenkins-api-ts-typings';

import {JenkinsService} from './JenkinsService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins users from the root url. Each user only contains the name and the user url. 
 * This list will be used later to retrieve mode detailed information for each user
 */
export class JenkinsUserListService extends JenkinsService {
    readonly jenkinsUserUrl: string;
    private userList: Array<IJenkinsUser>;

    constructor(private config: ConfigService, private proxy: ProxyService, private util: UtilService, private LOGGER: Logger, private url: string) {
        super();
        
        this.jenkinsUserUrl = this.getJenkinsApiUserUrl(this.url, this.config);
        this.userList = new Array<IJenkinsUser>();
    }

    async execute() {
        let userResponse: JSON;

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
        if (this.util.isInvalid(userResponse)) {
            this.userList = new Array<IJenkinsUser>();
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        this.LOGGER.debug("Received response:", userResponse);

        if (!userResponse.hasOwnProperty("users")) {
            this.LOGGER.error("No users found in response");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        for (let user of userResponse["users"]) {
            let jenkinsUser: IJenkinsUser = new JenkinsUser();
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
    getData(): Array<IJenkinsUser> {
        return Object.assign([], this.userList);
    }

    getServiceId() {
        return JenkinsServiceId.UserList;
    }

    private getJenkinsApiUserUrl(jenkinsUrl: string, config: ConfigService) {
        /** Remove trailing slash ('/') from root url, if present, then concatenate the jenkins api suffix */
        return jenkinsUrl.replace(/\/$/, "") + '/' + config.userSuffix + config.apiSuffix;
    }
}