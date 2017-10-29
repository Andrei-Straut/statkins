import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {Options, Network, DataSet} from 'vis';

import {Logger} from 'angular2-logger/core';
import {Util} from '../Util/Util';
import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsBuild} from 'jenkins-api-ts-typings';
import {IJenkinsChangeSet} from 'jenkins-api-ts-typings';
import {IJenkinsJob} from 'jenkins-api-ts-typings';

import {DataSetItem} from '../JenkinsDataAnalyzer/model/DataSetItem';

class VisNetworkData {
    nodes: DataSet<any>;
    edges: DataSet<any>;
}

@Component({
    selector: 'jenkins-job-relationship-network',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JobRelationshipNetwork/templates/jenkinsjobrelationshipnetwork.template.html',
    providers: [],
})
export class JenkinsJobRelationshipNetworkComponent implements OnInit {

    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }

    private readonly visNetworkElementId = "jobRelationshipNetwork";
    private visNetworkContainer: HTMLElement;
    private visNetworkOptions: Options;
    private visJobNetworkData: VisNetworkData = new VisNetworkData();
    private visNetwork: Network;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visNetworkContainer = document.getElementById(this.visNetworkElementId);
        this.visNetworkOptions = {
            height: '500px',
            clickToUse: true,
            layout: {
                hierarchical: {
                    sortMethod: 'directed',
                    nodeSpacing: 200
                }
            },
            interaction: {
                tooltipDelay: 100,
            },
            nodes: {
                shape: 'box',
                color: {
                    background: '#00CE6F',
                    border: 'red',
                    highlight: {
                        background: 'lightgray'
                    },
                },
                font: {
                    size: 25,
                },
            },
            edges: {
                arrows: 'to'
            },
            physics: {
                enabled: false
            },
        };
    }

    analyze(jenkinsData: IJenkinsData): Network {
        this.visJobNetworkData = this.getJobsData(jenkinsData);
        this.visNetwork = new Network(this.visNetworkContainer, this.visJobNetworkData, this.visNetworkOptions);

        if (Util.isInvalid(jenkinsData) || Util.isInvalid(jenkinsData.jobs)) {
            return;
        }

        this.LOGGER.info("Job Build Data", this.visJobNetworkData);

        return this.visNetwork;
    }

    private getJobsData(data: IJenkinsData): VisNetworkData {
        let jobsData: VisNetworkData = new VisNetworkData();
        jobsData.nodes = new DataSet<any>();
        jobsData.edges = new DataSet<any>();

        let parent = this;

        if (Util.isInvalid(data) || Util.isInvalid(data.jobs)) {
            return jobsData;
        }

        let roots = this.getJobTreeRoots(data.jobs);
        let counter = 0;

        data.jobs.forEach(function (job: IJenkinsJob) {
            let node: any = {
                id: job.name,
                title: parent.getJobTitle(job),
                label: job.name,
                widthConstraint: { maximum: 200 }
            };

            let edges = job.downstreamProjects
                .map(downstreamJob => new Object({from: (job as IJenkinsJob).name, to: (downstreamJob as IJenkinsJob).name}));

            jobsData.nodes.add(node);
            jobsData.edges.add(edges);
            counter++;
        });

        return jobsData;
    }

    private getJobTreeRoots(jobs: Array<IJenkinsJob>): Array<IJenkinsJob> {
        return jobs.filter(job => !Util.isInvalid(job) && Util.isInvalid(job.upstreamProjects));
    }

    private getJobTitle(job: IJenkinsJob) {
        return '<b>' + job.name + '</b><br/>' +
            ((job.upstreamProjects.length > 0) ? 'Upstream Projects: ' + job.upstreamProjects.map(job => (job as IJenkinsJob).name).join(", ") + '<br/><br/>' : '') +
            ((job.downstreamProjects.length > 0) ? 'Downstream Projects: ' + job.downstreamProjects.map(job => (job as IJenkinsJob).name).join(", ") : '');
    }

}