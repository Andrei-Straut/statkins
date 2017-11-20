

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {ConfigService} from '../../config/services/config.service';
import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';
import {JenkinsAction} from 'jenkins-api-ts-typings';
import {JenkinsTimeInQueueAction} from 'jenkins-api-ts-typings';

import {JenkinsService} from './JenkinsService';
import {JenkinsServiceId} from './JenkinsServiceId';

/**
 * Retrieve the jenkins actions details from each build
 */
export class JenkinsActionService extends JenkinsService {
    private actions: Map<IJenkinsBuild, Array<IJenkinsAction>>;

    constructor(private config: ConfigService, private util: UtilService, private LOGGER: Logger, private buildList: Map<IJenkinsJob, Array<IJenkinsBuild>>) {
        super();
        
        this.actions = new Map<IJenkinsBuild, Array<IJenkinsAction>>();
    }

    async execute() {
        if (this.util.isInvalid(this.buildList)) {
            this.LOGGER.error("Empty or null build list received");
            this.completedSuccessfully = false;
            this.complete = true;
            return;
        }

        let parent = this;

        for (let job of Array.from(this.buildList.keys())) {
            for (let build of job.builds) {

                if (!this.hasActions(build)) {
                    this.LOGGER.debug("No actions found for build #" + build.number, "of job", job.name);
                    continue;
                }

                let actionsJsonData: Array<JSON> = (JSON.parse(build.getJsonData())["actions"]) as Array<JSON>;

                this.LOGGER.debug("Retrieving action details for build #" + build.number, "of job", job);

                let actions: Array<IJenkinsAction> = actionsJsonData.map(jsonData => {
                    if (parent.util.isInvalid(jsonData) || Object.keys(jsonData).length === 0) {
                        return;
                    }

                    let action: IJenkinsAction = new JenkinsAction();
                    if (jsonData["_class"] === parent.config.jenkinsTimeInQueueActionId) {
                        action = new JenkinsTimeInQueueAction();
                    } else {
                        action = new JenkinsAction();
                    }
                    
                    action.fromJson(jsonData);
                    return action;
                }).filter(action => !parent.util.isInvalid(action));

                build.actions = actions;
                this.actions.set(build, actions);
            }
        }

        this.LOGGER.info("Actions details updated:", this.actions);
        this.completedSuccessfully = true;
        this.complete = true;
    }

    /**
     * Get the changeSets
     */
    getData(): Map<IJenkinsBuild, Array<IJenkinsAction>> {
        return new Map(this.actions);
    }

    getServiceId() {
        return JenkinsServiceId.Actions;
    }

    private hasActions(build: IJenkinsBuild): boolean {

        let buildData: JSON = JSON.parse(build.getJsonData());
        if (buildData === undefined || buildData == null) {
            return false;
        }

        let actionsData: Array<JSON> = buildData["actions"];
        if (this.util.isInvalid(actionsData)) {
            return false;
        }

        return true;
    }
}