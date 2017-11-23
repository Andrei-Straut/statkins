import {Injectable} from '@angular/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';
import {JenkinsJob} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {JenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsUser} from 'jenkins-api-ts-typings';
import {IJenkinsView} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {JenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsAction} from 'jenkins-api-ts-typings';

import {AndreiStrautInfoMasterJobDataProvider} from '../data-provider/job/andrei-straut-info-master-job-data-provider';
import {AndreiStrautInfoMasterBuild12DataProvider} from '../data-provider/build/andrei-straut-info-master-build-12-data-provider';
import {AndreiStrautInfoMasterBuild13DataProvider} from '../data-provider/build/andrei-straut-info-master-build-13-data-provider';
import {AndreiStrautInfoMasterBuild14DataProvider} from '../data-provider/build/andrei-straut-info-master-build-14-data-provider';

import {DrpMasterJobDataProvider} from '../data-provider/job/drp-master-job-data-provider';
import {DrpMasterBuild05DataProvider} from '../data-provider/build/drp-master-build-05-data-provider';
import {DrpMasterBuild06DataProvider} from '../data-provider/build/drp-master-build-06-data-provider';
import {DrpMasterBuild07DataProvider} from '../data-provider/build/drp-master-build-07-data-provider';

import {GapsMasterJobDataProvider} from '../data-provider/job/gaps-master-job-data-provider';
import {GapsMasterBuild04DataProvider} from '../data-provider/build/gaps-master-build-04-data-provider';
import {GapsMasterBuild14DataProvider} from '../data-provider/build/gaps-master-build-14-data-provider';
import {GapsMasterBuild15DataProvider} from '../data-provider/build/gaps-master-build-15-data-provider';

@Injectable()
export class JenkinsDataProviderService {
    private nodes: Array<IJenkinsNode> = new Array<IJenkinsNode>();
    private users: Array<IJenkinsUser> = new Array<IJenkinsUser>();
    private jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();
    private builds: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();
    private views: Array<IJenkinsView> = new Array<IJenkinsView>();
    private changeSets: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
    private actions: Map<IJenkinsBuild, Array<IJenkinsAction>> = new Map<IJenkinsBuild, Array<IJenkinsAction>>();
    
    constructor() {
        this.jobs = this.createJobs();
        this.builds = this.createBuilds(this.jobs);
        this.changeSets = this.createChangeSets(this.builds);
    }
    
    public getData(): IJenkinsData {
        return {
            nodes: this.nodes,
            users: this.users,
            jobs: this.jobs,
            builds: this.builds,
            views: this.views,
            changeSets: this.changeSets,
            actions: this.actions
        };
    }

    private createJobs(): Array<IJenkinsJob> {
        let jobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();

        let andreiStrautInfoMasterJob: IJenkinsJob = this.createAndreiStrautInfoMasterData();
        let drpJob: IJenkinsJob = this.createDrpMasterData();
        let gapsMasterJob: IJenkinsJob = this.createGapsMasterData();

        jobs.push(andreiStrautInfoMasterJob);
        jobs.push(drpJob);
        jobs.push(gapsMasterJob);

        return jobs;
    }
    
    private createBuilds(jobData: Array<IJenkinsJob>): Map<IJenkinsJob, Array<IJenkinsBuild>> {
        let builds: Map<IJenkinsJob, Array<IJenkinsBuild>> = new Map<IJenkinsJob, Array<IJenkinsBuild>>();
        
        jobData.forEach(function(job: IJenkinsJob) {
            builds.set(job, job.builds);
        });
        
        return builds;
    }
    
    private createChangeSets(buildData: Map<IJenkinsJob, Array<IJenkinsBuild>>): Map<IJenkinsBuild, Array<IJenkinsChangeSet>> {
        let changeSets: Map<IJenkinsBuild, Array<IJenkinsChangeSet>> = new Map<IJenkinsBuild, Array<IJenkinsChangeSet>>();
        
         Array.from(buildData.values()).reduce((a, b) => a.concat(b), []).forEach(function(build: IJenkinsBuild) {
            changeSets.set(build, new Array<IJenkinsChangeSet>());
            
            if (build.getJsonData()["changeSet"] !== undefined && build.getJsonData()["changeSet"] !== null 
                && (build.getJsonData()["changeSet"] as Array<JSON>).length > 0) {
                
                let changeSetsJson: Array<JSON> = build.getJsonData()["changeSet"]["items"];
                
                changeSetsJson.forEach(function(changeSetJson) {
                    let changeSet: IJenkinsChangeSet = new JenkinsChangeSet();
                    changeSet.fromJson(changeSetJson);
                    build.changeSets.push(changeSet);
                    changeSets.get(build).push(changeSet);
                })
            }
        });
        
        return changeSets;
    }
    
    private createAndreiStrautInfoMasterData() {
        let andreiStrautInfoMasterJob: IJenkinsJob = new JenkinsJob();
        andreiStrautInfoMasterJob.fromJson(new AndreiStrautInfoMasterJobDataProvider().getJobData());
        
        let andreiStrautInfoMasterBuild12: IJenkinsBuild = new JenkinsBuild();
        andreiStrautInfoMasterBuild12.fromJson(new AndreiStrautInfoMasterBuild12DataProvider().getBuildData());
        
        let andreiStrautInfoMasterBuild13: IJenkinsBuild = new JenkinsBuild();
        andreiStrautInfoMasterBuild13.fromJson(new AndreiStrautInfoMasterBuild13DataProvider().getBuildData());
        
        let andreiStrautInfoMasterBuild14: IJenkinsBuild = new JenkinsBuild();
        andreiStrautInfoMasterBuild14.fromJson(new AndreiStrautInfoMasterBuild14DataProvider().getBuildData());
        
        andreiStrautInfoMasterJob.builds.push(andreiStrautInfoMasterBuild12);
        andreiStrautInfoMasterJob.builds.push(andreiStrautInfoMasterBuild13);
        andreiStrautInfoMasterJob.builds.push(andreiStrautInfoMasterBuild14);
        
        return andreiStrautInfoMasterJob;
    }
    
    private createDrpMasterData() {
        let drpMasterJob: IJenkinsJob = new JenkinsJob();
        drpMasterJob.fromJson(new DrpMasterJobDataProvider().getJobData());
        
        let drpMasterBuild05: IJenkinsBuild = new JenkinsBuild();
        drpMasterBuild05.fromJson(new DrpMasterBuild05DataProvider().getBuildData());
        
        let drpMasterBuild06: IJenkinsBuild = new JenkinsBuild();
        drpMasterBuild06.fromJson(new DrpMasterBuild06DataProvider().getBuildData());
        
        let drpMasterBuild07: IJenkinsBuild = new JenkinsBuild();
        drpMasterBuild07.fromJson(new DrpMasterBuild07DataProvider().getBuildData());
        
        drpMasterJob.builds.push(drpMasterBuild05);
        drpMasterJob.builds.push(drpMasterBuild06);
        drpMasterJob.builds.push(drpMasterBuild07);
        
        return drpMasterJob;
    }
    
    private createGapsMasterData() {
        let gapsMasterJob: IJenkinsJob = new JenkinsJob();
        gapsMasterJob.fromJson(new GapsMasterJobDataProvider().getJobData());
        
        let gapsMasterBuild04: IJenkinsBuild = new JenkinsBuild();
        gapsMasterBuild04.fromJson(new GapsMasterBuild04DataProvider().getBuildData());
        
        let gapsMasterBuild14: IJenkinsBuild = new JenkinsBuild();
        gapsMasterBuild14.fromJson(new GapsMasterBuild14DataProvider().getBuildData());
        
        let gapsMasterBuild15: IJenkinsBuild = new JenkinsBuild();
        gapsMasterBuild15.fromJson(new GapsMasterBuild15DataProvider().getBuildData());
        
        gapsMasterJob.builds.push(gapsMasterBuild04);
        gapsMasterJob.builds.push(gapsMasterBuild14);
        gapsMasterJob.builds.push(gapsMasterBuild15);
        
        return gapsMasterJob;
    }
}