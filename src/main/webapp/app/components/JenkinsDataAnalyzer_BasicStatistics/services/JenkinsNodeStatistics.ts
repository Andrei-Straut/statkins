import {Logger} from 'angular2-logger/core';
import * as moment from 'moment';
import {Util} from '../../Util/Util';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {IJenkinsNode} from 'jenkins-api-ts-typings';

import {StatisticsEntryProvider} from '../../JenkinsDataAnalyzer/model/StatisticsEntryProvider';
import {StatisticsCardEntry} from '../../JenkinsDataAnalyzer/model/StatisticsCardEntry';
import {StatisticsEntry} from '../../JenkinsDataAnalyzer/model/StatisticsEntry';

export class JenkinsNodeStatistics implements StatisticsEntryProvider {

    private analyzerData: StatisticsCardEntry;

    constructor(private LOGGER: Logger, private data: IJenkinsData) {
    }

    public getStatistics(): StatisticsCardEntry {
        this.analyzerData = new StatisticsCardEntry(
            "Nodes",
            "Number Of Nodes: " + this.getNumberONodes(this.data.nodes),
            [
                this.getNumberOfExecutors(this.data.nodes),
                this.getNodeWithMostExecutors(this.data.nodes),
            ]);
        return this.analyzerData;
    }

    private getNumberONodes(nodes: Array<IJenkinsNode>): string {

        if (Util.isInvalid(nodes)) {
            return "N/A";
        }

        return nodes.length + "";
    }

    private getNumberOfExecutors(nodes: Array<IJenkinsNode>): StatisticsEntry {

        if (Util.isInvalid(nodes)) {
            return new StatisticsEntry("Number Of Executors", "N/A", undefined);
        }

        let executors: number = nodes
            .map(node => {return (!Util.isInvalid(node) && !Util.isInvalid(node.numExecutors)) ? node.numExecutors : 0;})
            .reduce(function (a: number, b: number) {
                return a + b;
            });

        return new StatisticsEntry("Number Of Executors", executors + "", undefined);
    }

    private getNodeWithMostExecutors(nodes: Array<IJenkinsNode>): StatisticsEntry {

        if (Util.isInvalid(nodes)) {
            return new StatisticsEntry("Node With Most Executors", "N/A", undefined);
        }

        let maxNumberOfExecutors: number = nodes
            .map(node => {return (!Util.isInvalid(node) && !Util.isInvalid(node.numExecutors)) ? node.numExecutors : 0;})
            .reduce(function (a: number, b: number) {
                return a >= b ? a : b;
            });
        let nodesWithMostExecutors: Array<IJenkinsNode> = nodes
            .filter(node => !Util.isInvalid(node) && !Util.isInvalid(node.numExecutors) && node.numExecutors >= maxNumberOfExecutors);

        if (Util.isInvalid(nodesWithMostExecutors)) {
            return new StatisticsEntry("Node With Most Executors", "N/A", undefined);
        }

        let url: string = nodesWithMostExecutors.length > 1 ? undefined : (nodesWithMostExecutors[0]).url;
        let text: string = nodesWithMostExecutors.map(node => node.displayName).join(", ") + ": " + maxNumberOfExecutors + " executors";

        return new StatisticsEntry("Node With Most Executors", text, url);
    }
}