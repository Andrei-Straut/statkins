import {Component, Input, SimpleChanges, OnInit} from '@angular/core';
import {Options, Network} from 'vis';
import {IJenkinsData} from 'jenkins-api-ts-typings';

import {UtilService} from '../../Util/services/util.service';
import {VisNetworkData} from '../services/VisNetworkData';
import {VisDataSetItem} from '../services/VisDataSetItem';
import {VisEventNetworkProperties} from '../services/VisEventNetworkProperties';
import {Logger} from 'angular2-logger/core';

import {JobRelationshipNetworkService} from '../services/jenkins-job-relationship-network.service';

@Component({
    selector: 'jenkins-job-relationship-network',
    templateUrl: 'app/JenkinsDataAnalyzer/templates/jenkins-job-relationship-network.template.html',
    providers: [],
})
export class JenkinsJobRelationshipNetworkComponent implements OnInit {
    @Input('utilService')
    utilService: UtilService;

    @Input('jenkinsData')
    jenkinsData: IJenkinsData;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["utilService"] !== undefined && changes["utilService"].currentValue !== undefined) {
            this.utilService = changes["utilService"].currentValue;
        }
        if (changes["jenkinsData"] !== undefined && changes["jenkinsData"].currentValue !== undefined) {
            this.jenkinsData = changes["jenkinsData"].currentValue;
        }

        if (this.utilService !== undefined && !this.utilService.isInvalid(this.jenkinsData)) {
            this.analyze(this.jenkinsData);
        }
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

    private tooltipDelay = 1;
    private timeLimitUnit = "seconds";

    private showNodesWithEdges: boolean = true;
    private showNodesWithoutEdges: boolean = true;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visNetworkContainer = document.getElementById(this.visNetworkElementId);
        this.visNetworkOptions = this.getSettings();
    }

    analyze(data: IJenkinsData): Network {
        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.utilService,
            data,
            this.verticalMultiplier,
            this.verticalSubMultiplier,
            this.horizontalMultiplier,
            this.maxHorizontalItemsPerLevel);
        let parent = this;

        this.visJobNetworkData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork = new Network(this.visNetworkContainer, this.visJobNetworkData, this.visNetworkOptions);
        this.visNetwork.fit();
        this.visNetwork.setOptions({physics:{enabled: false}});

        this.visNetwork.on('doubleClick', function (properties: VisEventNetworkProperties) {
            if (parent.utilService.isInvalid(parent.visJobNetworkData) || parent.utilService.isInvalid(parent.visJobNetworkData.nodes)) {
                return;
            }

            if (parent.utilService.isInvalid(properties) || parent.utilService.isInvalid(properties.nodes)) {
                return;
            }

            let item: VisDataSetItem = parent.visJobNetworkData.nodes.get(properties.nodes[0]);
            if (parent.utilService.isInvalid(item) || parent.utilService.isInvalid(item.url)) {
                return;
            }

            window.open(item.url, '_blank');
        });

        this.LOGGER.debug("Job Build Data", this.visJobNetworkData);

        return this.visNetwork;
    }

    toggleUnconnectedNodes() {
        this.showNodesWithoutEdges = !this.showNodesWithoutEdges;

        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.utilService,
            this.jenkinsData,
            this.verticalMultiplier,
            this.verticalSubMultiplier,
            this.horizontalMultiplier,
            this.maxHorizontalItemsPerLevel);

        let jobsData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork.setData(jobsData);
        this.visNetwork.fit();
    }

    toggleConnectedNodes() {
        this.showNodesWithEdges = !this.showNodesWithEdges;

        let jobService: JobRelationshipNetworkService = new JobRelationshipNetworkService(
            this.utilService,
            this.jenkinsData,
            this.verticalMultiplier,
            this.verticalSubMultiplier,
            this.horizontalMultiplier,
            this.maxHorizontalItemsPerLevel);

        let jobsData = jobService.getDataSet(this.showNodesWithoutEdges, this.showNodesWithEdges);
        this.visNetwork.setData(jobsData);
        this.visNetwork.fit();
    }

    private getSettings() {
        return {
            height: '500px',
            clickToUse: true,
            interaction: {
                tooltipDelay: this.tooltipDelay * 1000, // milliseconds
                hover: true,
                navigationButtons: true,
                keyboard: true,
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
                fixed: {
                    y: true
                }
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
                enabled: true,
            }
        };
    }
}