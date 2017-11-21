import {Injectable} from '@angular/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {IJenkinsView} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';

@Injectable()
export class IJenkinsDataMockService implements IJenkinsData {
    public nodes: Array<IJenkinsNode> = new Array<IJenkinsNode>();
    public jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();
    public builds: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();
    public users: Array<IJenkinsUser> = new Array<IJenkinsUser>();
    public views: Array<IJenkinsView> = new Array<IJenkinsView>();
    public changeSets: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
    public actions: Map<IJenkinsBuild, Array<IJenkinsAction>> = new Map<IJenkinsBuild, Array<IJenkinsAction>>();
}