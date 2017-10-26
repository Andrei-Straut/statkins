import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { Logger } from 'angular2-logger/core';
import { Util } from '../Util/Util'
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { IJenkinsChangeSet } from 'jenkins-api-ts-typings';
import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
@Component({
    selector: 'jenkins-file-changes-graph',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JenkinsFileChangesGraph/templates/jenkinsfilechangesgraph.template.html',
    providers: [],
})
export class JenkinsFileChangesGraphComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    private readonly graphElementId = "fileChangesGraph";
    private visGraphContainer: HTMLElement;
    private visGraphOptions: TimelineOptions;
    private visGraph: Timeline;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visFilesData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
    
    private maxNumberOfElements = 10;
    
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
    
    analyze(jenkinsData: IJenkinsData):Timeline {
        this.visFilesData = this.getFilesData(jenkinsData);
        this.visGraph =  new Timeline(this.visGraphContainer, this.visFilesData, this.visGroups, this.visGraphOptions);
        
        this.LOGGER.debug("File Changes Data", this.visFilesData);
        
        if (Util.isInvalid(jenkinsData) || Util.isInvalid(jenkinsData.changeSets)) {
            return;
        }
        
        let filesData:Map<string, number> = this.getAffectedPathsWithNoOfChangesMap(jenkinsData);
        let maxNumberOfChanges:number = this.getMaxNumberOfChanges(filesData);
        
        this.visGraphOptions.max = Math.round(maxNumberOfChanges * 1.25);
        this.visGraphOptions.end = Math.round(maxNumberOfChanges * 1.25);
        this.visGraph.setOptions(this.visGraphOptions);
        
        return this.visGraph;
    }
    
    private getFilesData(data:IJenkinsData):DataSet<any> {
        let filesData:DataSet<any> = new DataSet<any>();
        let parent = this;
        
        if (Util.isInvalid(data) || Util.isInvalid(data.changeSets)) {
            return filesData;
        }
        
        let changeNamesMap:Map<string, number> = this.getAffectedPathsWithNoOfChangesMap(data);
        let changeNamesMapSorted:Map<string, number> = this.getAffectedPathsWithNoOfChangesSortedMap(changeNamesMap);
        
        Array.from(changeNamesMapSorted.keys()).forEach(function(affectedPath) {
            if (filesData.length >= parent.maxNumberOfElements) {
                return;
            }
            
            let fileData: any = undefined;
            if (Util.isInvalid(filesData.get(changeNamesMapSorted.get(affectedPath)))) {
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
                let currentTitle = (fileData as DataSetItem).title;
                (fileData as DataSetItem).title = currentTitle + affectedPath + "<br/><br/>";
            }
            filesData.update(fileData);
        });
        
        return filesData;
    }
    
    private getAffectedPathsWithNoOfChangesMap(data:IJenkinsData):Map<string, number> {
        let changeNamesMap:Map<string, number> = new Map<string, number>();
        
        if (Util.isInvalid(data) || Util.isInvalid(data.changeSets)) {
            return changeNamesMap;
        }
        
        Util.getAffectedPathsArray(data.changeSets).forEach(function (affectedPath: string) {
            if (!changeNamesMap.has(affectedPath)) {
                changeNamesMap.set(affectedPath, 0);
            }

            let timesChanged = changeNamesMap.get(affectedPath);
            changeNamesMap.set(affectedPath, timesChanged + 1);
        });        
        
        return changeNamesMap;
    }
    
    private getAffectedPathsWithNoOfChangesSortedMap(changeNamesMap: Map<string, number>): Map<string, number> {
        let changeNamesSortedMap:Map<string, number> = new Map<string, number>();
        
        Array.from(changeNamesMap.keys())
            .sort(function(a, b) { return (changeNamesMap.get(a) - changeNamesMap.get(b)) * -1; })
            .forEach(function(affectedPath: string) { changeNamesSortedMap.set(affectedPath, changeNamesMap.get(affectedPath)); });
        
        return changeNamesSortedMap;
    }
    
    private getMaxNumberOfChanges(changeNamesMap: Map<string, number>): number {
        if (Util.isInvalid(changeNamesMap)) {
            return 0;
        }
        
        return Array.from(changeNamesMap.values()).reduce(function(a, b) { return a >= b ? a : b; });
    }
}