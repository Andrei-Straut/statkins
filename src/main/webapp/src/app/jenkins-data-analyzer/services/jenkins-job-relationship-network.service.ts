import {IJenkinsData, IJenkinsJob} from 'jenkins-api-ts-typings';
import {DataSet} from 'vis';

import {UtilService} from '../../util/services/util.service';

import {VisNetworkData} from './VisNetworkData';

export class JenkinsJobRelationshipNetworkService {

    constructor(
        private utilService: UtilService,
        private jenkinsData: IJenkinsData,
        private verticalMultiplier: number,
        private verticalSubMultiplier: number,
        private horizontalMultiplier: number,
        private maxHorizontalItemsPerLevel: number, ) {

    }

    getDataSet(showUnconnectedNodes: boolean, showConnectedNodes: boolean): VisNetworkData {
        let relationshipDataSet: VisNetworkData = {
            nodes: new DataSet<any>(),
            edges: new DataSet<any>()
        };
        
        if (this.utilService.isInvalid(this.jenkinsData) || this.utilService.isInvalid(this.jenkinsData.jobs)) {
            return relationshipDataSet;
        }

        let roots = this.getJobTreeRoots(this.jenkinsData.jobs);
        let counter = 0;

        let downstream: VisNetworkData = this.getJobGraph(roots, counter, showUnconnectedNodes, showConnectedNodes);
        relationshipDataSet.nodes.update(downstream.nodes.get());
        relationshipDataSet.edges.update(downstream.edges.get());

        return relationshipDataSet;
    }

    private getJobTreeRoots(jobs: Array<IJenkinsJob>): Array<IJenkinsJob> {
        return jobs.filter(job =>
            !this.utilService.isInvalid(job)
            && this.utilService.isInvalid(job.upstreamProjects));
    }

    private getJobGraph(currentJobs: Array<IJenkinsJob>, treeLevel: number, showUnconnectedNodes: boolean, showConnectedNodes: boolean): VisNetworkData {
        let jobsData: VisNetworkData = {
            nodes: new DataSet<any>(),
            edges: new DataSet<any>()
        };
        
        if (this.utilService.isInvalid(currentJobs)) {
            return jobsData;
        }

        let nextLevelJobs: Array<IJenkinsJob> = new Array<IJenkinsJob>();
        let parent = this;
        let nodeHorizontalOrder = this.getInitialNodeHorizontalOrder(currentJobs);
        let nodeVerticalOrder = treeLevel * this.verticalMultiplier;
        let horizontalCounter = 0;

        currentJobs.forEach(job => {

            if (!this.utilService.isInvalid(job)) {

                if (this.utilService.isInvalid(jobsData.nodes.get((job as IJenkinsJob).name))) {

                    if (horizontalCounter > parent.maxHorizontalItemsPerLevel) {
                        horizontalCounter = 0;
                        nodeHorizontalOrder = parent.getInitialNodeHorizontalOrder(currentJobs);
                        nodeVerticalOrder = nodeVerticalOrder + parent.verticalSubMultiplier;
                    }

                    nodeHorizontalOrder = nodeHorizontalOrder + 1;
                    horizontalCounter = horizontalCounter + 1;

                    let node: any = parent.mapJobToGraphNode(job, (nodeHorizontalOrder * parent.horizontalMultiplier), nodeVerticalOrder, showUnconnectedNodes, showConnectedNodes);
                    jobsData.nodes.update(node);
                }

                if (!this.utilService.isInvalid(job.downstreamProjects)) {
                    jobsData.edges.update(parent.mapDownstreamJobsToGraphEdges(job, showConnectedNodes).edges.get());

                    let donwstreamToAdd = job.downstreamProjects.filter(downstream => nextLevelJobs.indexOf(downstream) === -1);
                    nextLevelJobs = nextLevelJobs.concat(donwstreamToAdd);
                }
            }
        });

        let downstreamLevel: VisNetworkData = parent.getJobGraph(nextLevelJobs, treeLevel + 1, showUnconnectedNodes, showConnectedNodes);
        jobsData.nodes.update(downstreamLevel.nodes.get());
        jobsData.edges.update(downstreamLevel.edges.get());

        return jobsData;
    }

    private getJobTitle(job: IJenkinsJob) {
        return '<b>' + job.name + '</b><br/>' +
            ((job.upstreamProjects.length > 0) ? '<b>Upstream Projects</b>: ' + job.upstreamProjects.map(job => (job as IJenkinsJob).name).join(", ") + '<br/><br/>' : '') +
            ((job.downstreamProjects.length > 0) ? '<b>Downstream Projects</b>: ' + job.downstreamProjects.map(job => (job as IJenkinsJob).name).join(", ") : '');
    }

    private mapJobToGraphNode(job: IJenkinsJob, xPosition: number, yPosition: number, showUnconnectedNodes: boolean, showConnectedNodes: boolean): any {
        let hasEdges: boolean = (job.downstreamProjects.length > 0) || (job.upstreamProjects.length > 0);
        let visible = (!hasEdges && showUnconnectedNodes) || (hasEdges && showConnectedNodes);

        return {
            id: (job as IJenkinsJob).name,
            title: this.getJobTitle((job as IJenkinsJob)),
            label: (job as IJenkinsJob).name,
            x: xPosition,
            y: yPosition,
            url: job.url,
            hidden: !visible
        };
    }

    private mapDownstreamJobsToGraphEdges(job: IJenkinsJob, showConnectedNodes: boolean) {
        let jobsData: VisNetworkData = {
            nodes: new DataSet<any>(),
            edges: new DataSet<any>()
        };

        job.downstreamProjects.forEach(downstreamProject => {
            let edge: any = {
                from: (job as IJenkinsJob).name,
                to: (downstreamProject as IJenkinsJob).name,
                title: '<b>Upstream</b>: ' + (job as IJenkinsJob).name + '<br/>' + '<b>Downstream</b>: ' + (downstreamProject as IJenkinsJob).name + '<br/>',
                hidden: !showConnectedNodes
            };
            jobsData.edges.update(edge);
        });

        return jobsData;
    }

    private getInitialNodeHorizontalOrder(jobs: Array<IJenkinsJob>): number {
        if (this.utilService.isInvalid(jobs)) {
            return Math.round(this.maxHorizontalItemsPerLevel) / 2 * -1;
        }

        if (jobs.length <= 20) {
            return Math.round(jobs.length / 2) * -1;
        }

        return Math.round(this.maxHorizontalItemsPerLevel) / 2 * -1;
    }
}