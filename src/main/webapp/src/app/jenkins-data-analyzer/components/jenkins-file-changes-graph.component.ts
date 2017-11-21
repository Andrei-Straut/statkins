import {Component, Input, SimpleChanges, OnInit} from '@angular/core';
import {TimelineOptions, Timeline, DataSet} from 'vis';

import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';

import {IJenkinsData} from 'jenkins-api-ts-typings';
import {VisDataSetItem} from '../services/VisDataSetItem';

@Component({
    selector: 'jenkins-file-changes-graph',
    templateUrl: '../templates/jenkins-file-changes-graph.template.html'
})
export class JenkinsFileChangesGraphComponent implements OnInit {
    @Input('utilService')
    utilService: UtilService;

    @Input('jenkinsData')
    jenkinsData = <IJenkinsData>null;

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

    private readonly graphElementId = "fileChangesGraph";
    private visGraphContainer: HTMLElement;
    private visGraphOptions: TimelineOptions;
    private visGraph: Timeline;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visFilesData: DataSet<VisDataSetItem> = new DataSet<VisDataSetItem>();

    maxNumberOfElements = 10;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {
        this.visGraphContainer = document.getElementById(this.graphElementId);
        this.visGraphOptions = {
            autoResize: true,
            clickToUse: false,
            start: 0,
            min: 0,
            max: 1000,
            showCurrentTime: false,
            showMajorLabels: false,
            showMinorLabels: true,
            moveable: false,
            zoomable: false
        };

        this.visGroups.add({
            id: 0,
            className: 'vis-group-green'
        });
    }

    analyze(jenkinsData: IJenkinsData): Timeline {
        this.visFilesData = this.getFilesData(jenkinsData);
        this.visGraph = new Timeline(this.visGraphContainer, this.visFilesData, this.visGroups, this.visGraphOptions);

        this.LOGGER.debug("File Changes Data", this.visFilesData);

        if (this.utilService.isInvalid(jenkinsData) || this.utilService.isInvalid(jenkinsData.changeSets)) {
            return;
        }

        let filesData: Map<string, number> = this.getAffectedPathsWithNoOfChangesMap(jenkinsData);
        let maxNumberOfChanges: number = this.getMaxNumberOfChanges(filesData);

        this.visGraphOptions.max = Math.round(maxNumberOfChanges * 1.25);
        this.visGraphOptions.end = Math.round(maxNumberOfChanges * 1.25);
        this.visGraph.setOptions(this.visGraphOptions);

        return this.visGraph;
    }

    private getFilesData(data: IJenkinsData): DataSet<any> {
        let filesData: DataSet<any> = new DataSet<any>();
        let parent = this;

        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.changeSets)) {
            return filesData;
        }

        let changeNamesMap: Map<string, number> = this.getAffectedPathsWithNoOfChangesMap(data);
        let changeNamesMapSorted: Map<string, number> = this.getAffectedPathsWithNoOfChangesSortedMap(changeNamesMap);

        Array.from(changeNamesMapSorted.keys()).forEach(function (affectedPath) {
            if (filesData.length >= parent.maxNumberOfElements) {
                return;
            }

            let fileData: any = undefined;
            if (parent.utilService.isInvalid(filesData.get(changeNamesMapSorted.get(affectedPath)))) {
                fileData = {
                    id: changeNamesMapSorted.get(affectedPath),
                    title: affectedPath + "<br/><br/>",
                    content: changeNamesMapSorted.get(affectedPath) + " changes",
                    start: 0,
                    end: changeNamesMapSorted.get(affectedPath),
                    group: 0,
                    className: 'green left-aligned'
                };
            } else {
                fileData = filesData.get(changeNamesMapSorted.get(affectedPath));
                let currentTitle = (fileData as VisDataSetItem).title;
                (fileData as VisDataSetItem).title = currentTitle + affectedPath + "<br/><br/>";
            }
            filesData.update(fileData);
        });

        return filesData;
    }

    private getAffectedPathsWithNoOfChangesMap(data: IJenkinsData): Map<string, number> {
        let changeNamesMap: Map<string, number> = new Map<string, number>();

        if (this.utilService.isInvalid(data) || this.utilService.isInvalid(data.changeSets)) {
            return changeNamesMap;
        }

        this.utilService.getAffectedPathsArray(data.changeSets).forEach(function (affectedPath: string) {
            if (!changeNamesMap.has(affectedPath)) {
                changeNamesMap.set(affectedPath, 0);
            }

            let timesChanged = changeNamesMap.get(affectedPath);
            changeNamesMap.set(affectedPath, timesChanged + 1);
        });

        return changeNamesMap;
    }

    private getAffectedPathsWithNoOfChangesSortedMap(changeNamesMap: Map<string, number>): Map<string, number> {
        let changeNamesSortedMap: Map<string, number> = new Map<string, number>();

        Array.from(changeNamesMap.keys())
            .sort(function (a, b) {return (changeNamesMap.get(a) - changeNamesMap.get(b)) * -1;})
            .forEach(function (affectedPath: string) {changeNamesSortedMap.set(affectedPath, changeNamesMap.get(affectedPath));});

        return changeNamesSortedMap;
    }

    private getMaxNumberOfChanges(changeNamesMap: Map<string, number>): number {
        if (this.utilService.isInvalid(changeNamesMap)) {
            return 0;
        }

        return Array.from(changeNamesMap.values()).reduce(function (a, b) {return a >= b ? a : b;});
    }
}