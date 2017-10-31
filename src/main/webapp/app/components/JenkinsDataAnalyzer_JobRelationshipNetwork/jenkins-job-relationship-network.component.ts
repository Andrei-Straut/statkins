import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {Options, Network, DataSet} from 'vis';

import {Logger} from 'angular2-logger/core';
import {Util} from '../Util/Util';
import {VisNetworkData} from '../JenkinsDataAnalyzer/model/VisNetworkData';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import { JobRelationshipNetworkService } from './services/JobRelationshipNetworkService';

@Component({
    selector: 'jenkins-job-relationship-network',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JobRelationshipNetwork/templates/jenkinsjobrelationshipnetwork.template.html',
    providers: [],
})
export class JenkinsJobRelationshipNetworkComponent implements OnInit {

    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            this.data = undefined;
            return;
        }
        this.data = jenkinsData;
        this.analyze(this.data);
    }

    private readonly visNetworkElementId = "jobRelationshipNetwork";
    private visNetworkContainer: HTMLElement;
    private visNetworkOptions: Options;
    private visJobNetworkData: VisNetworkData = new VisNetworkData();
    private visNetwork: Network;
    
    private readonly verticalMultiplier = 300;
    private readonly verticalSubMultiplier = 50;
    private readonly horizontalMultiplier = 350;
    private readonly maxHorizontalItemsPerLevel = 20;
    
    private showNodesWithEdges: boolean = true;
    private showNodesWithoutEdges: boolean = true;
    
    private data: IJenkinsData;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visNetworkContainer = document.getElementById(this.visNetworkElementId);
        this.visNetworkOptions = this.getSettings();
    }

    analyze(data: IJenkinsData): Network {
        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.data, 
            this.verticalMultiplier, 
            this.verticalSubMultiplier, 
            this.horizontalMultiplier, 
            this.maxHorizontalItemsPerLevel);
        
        this.visJobNetworkData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork = new Network(this.visNetworkContainer, this.visJobNetworkData, this.visNetworkOptions);

        if (Util.isInvalid(data) || Util.isInvalid(data.jobs)) {
            return;
        }

        this.LOGGER.debug("Job Build Data", this.visJobNetworkData);
        
        return this.visNetwork;
    }
    
    toggleUnconnectedNodes() {
        this.showNodesWithoutEdges = !this.showNodesWithoutEdges;
        
        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.data, 
            this.verticalMultiplier, 
            this.verticalSubMultiplier, 
            this.horizontalMultiplier, 
            this.maxHorizontalItemsPerLevel);
        
        let jobsData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork.setData(jobsData);
    }
    
    toggleConnectedNodes() {
        this.showNodesWithEdges = !this.showNodesWithEdges;
        
        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.data, 
            this.verticalMultiplier, 
            this.verticalSubMultiplier, 
            this.horizontalMultiplier, 
            this.maxHorizontalItemsPerLevel);
        
        let jobsData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork.setData(jobsData);
    }

    private getSettings() {
        return {
            height: '500px',
            clickToUse: true,
            interaction: {
                tooltipDelay: 100,
                hover: true
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
                smooth: false,
                arrows: 'to',
                selectionWidth: 3,
                hoverWidth: 1,
                color: {
                    color: 'red',
                    hover: '#000000',
                    highlight: '#000000'
                }
            },
            physics: {
                enabled: false,
            },
        };
    }
}