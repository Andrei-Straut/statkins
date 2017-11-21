import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';

import {AndreiStrautInfoMasterJobDataProvider} from '../data-provider/job/andrei-straut-info-master-job-data-provider';
import {DrpMasterJobDataProvider} from '../data-provider/job/drp-master-job-data-provider';
import {GapsMasterJobDataProvider} from '../data-provider/job/gaps-master-job-data-provider';

export class JenkinsJobProviderService {

    private jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();

    constructor() {
        this.jobs = this.createJobs();
    }

    public getJobs(): Array<IJenkinsJob> {
        return this.jobs;
    }

    private createJobs(): Array<IJenkinsJob> {
        let jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        let andreiStrautInfoMasterJob: IJenkinsJob = new JenkinsJob();
        andreiStrautInfoMasterJob.fromJson(new AndreiStrautInfoMasterJobDataProvider().getJobData());

        let drpJob: IJenkinsJob = new JenkinsJob();
        drpJob.fromJson(new DrpMasterJobDataProvider().getJobData());

        let gapsMasterJob: IJenkinsJob = new JenkinsJob();
        gapsMasterJob.fromJson(new GapsMasterJobDataProvider().getJobData());

        jobs.push(andreiStrautInfoMasterJob);
        jobs.push(drpJob);
        jobs.push(gapsMasterJob);

        return jobs;
    }
}
