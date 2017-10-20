import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';
import { Util } from '../../Util/Util';

import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsNode } from 'jenkins-api-ts-typings';

import { StatisticsEntryProvider } from '../../JenkinsDataAnalyzer/model/StatisticsEntryProvider';
import { StatisticsCardEntry } from '../../JenkinsDataAnalyzer/model/StatisticsCardEntry';
import { StatisticsEntry } from '../../JenkinsDataAnalyzer/model/StatisticsEntry';

export class JenkinsNodeStatistics implements StatisticsEntryProvider {
    
    private analyzerData: StatisticsCardEntry;
    
    constructor(private LOGGER:Logger, private data:IJenkinsData) {
    }
    
    public getStatistics(): StatisticsCardEntry {
        this.analyzerData = new StatisticsCardEntry(
                "Nodes", 
                "Number Of Nodes: " + this.getNumberONodes(this.data.nodes),
                [
                    
                ],
                );
        return this.analyzerData;
    }
    
    private getNumberONodes(nodes: Array<IJenkinsNode>):string {
        
        if (Util.isInvalid(nodes)) {
            return "N/A";
        }
        
        return nodes.length + "";
    }
    
}