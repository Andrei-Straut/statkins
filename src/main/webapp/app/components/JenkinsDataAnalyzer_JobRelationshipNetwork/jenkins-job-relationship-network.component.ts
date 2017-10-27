import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Options, Network, DataSet } from 'vis';

import { Logger } from 'angular2-logger/core';
import { Util } from '../Util/Util';
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsBuild } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { IJenkinsJob } from 'jenkins-api-ts-typings';

import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
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
    private visJobNetworkData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
    private visGroups = new DataSet<any>();
    private visNetwork: Network;
    
    constructor(private LOGGER: Logger) {}
    
    ngOnInit() {
    }
    
    analyze(jenkinsData: IJenkinsData):Network {
        return undefined;
    }
    
}