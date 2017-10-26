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
                this.getIdleNodes(this.data.nodes),
                this.getBusyNodes(this.data.nodes),
                this.getOfflineNodes(this.data.nodes),
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
        let text: string = nodesWithMostExecutors.length > 3
            ? nodesWithMostExecutors.length + " nodes with " + maxNumberOfExecutors + " each"
            : nodesWithMostExecutors.map(node => node.displayName).join(", ") + " (" + maxNumberOfExecutors + " executors)";

        return new StatisticsEntry("Node With Most Executors", text, url);
    }

    private getOfflineNodes(nodes: Array<IJenkinsNode>): StatisticsEntry {

        if (Util.isInvalid(nodes)) {
            return new StatisticsEntry("Offline Nodes", "N/A", undefined);
        }

        let offlineNodes: Array<IJenkinsNode> = nodes
            .filter(node => Util.isOffline(node));

        if (Util.isInvalid(offlineNodes)) {
            return new StatisticsEntry("Offline Nodes", "0", undefined);
        }

        let url: string = offlineNodes.length > 1 ? undefined : (offlineNodes[0]).url;
        let text: string = offlineNodes.map(node => node.displayName).join(", ");

        return new StatisticsEntry("Offline Nodes", text, url);
    }

    private getIdleNodes(nodes: Array<IJenkinsNode>): StatisticsEntry {

        if (Util.isInvalid(nodes)) {
            return new StatisticsEntry("Idle Nodes", "N/A", undefined);
        }

        let idleNodes: Array<IJenkinsNode> = nodes
            .filter(node => Util.isIdle(node));

        if (Util.isInvalid(idleNodes)) {
            return new StatisticsEntry("Idle Nodes", "0", undefined);
        }

        let url: string = idleNodes.length > 1 ? undefined : (idleNodes[0]).url;
        let text: string = idleNodes.length > 2 ? idleNodes.length + "" : idleNodes.map(node => node.displayName).join(", ");

        return new StatisticsEntry("Idle Nodes", text, url);
    }

    private getBusyNodes(nodes: Array<IJenkinsNode>): StatisticsEntry {

        if (Util.isInvalid(nodes)) {
            return new StatisticsEntry("Busy Nodes", "N/A", undefined);
        }

        let busyNodes: Array<IJenkinsNode> = nodes
            .filter(node => !Util.isIdle(node));

        if (Util.isInvalid(busyNodes)) {
            return new StatisticsEntry("Busy Nodes", "0", undefined);
        }

        let url: string = busyNodes.length > 1 ? undefined : (busyNodes[0]).url;
        let text: string = busyNodes.length > 2 ? busyNodes.length + "" : busyNodes.map(node => node.displayName).join(", ");

        return new StatisticsEntry("Busy Nodes", text, url);
    }
}