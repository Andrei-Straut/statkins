import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Graph2dOptions, Graph2d, DataSet } from 'vis';
import * as moment from 'moment';

import { Logger } from 'angular2-logger/core';
import { Util } from '../Util/Util'
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
@Component({
    selector: 'jenkins-average-build-duration',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JenkinsAverageBuildDurationGraph/templates/jenkinsaveragebuilddurationgraph.template.html',
    providers: [],
})
export class JenkinsAverageBuildDurationGraphComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    private readonly BUILD_GREEN_THRESHOLD = 10;
    private readonly  BUILD_YELLOW_THRESHOLD = 20;
    
    private readonly graphElementId = "jobBuildAverageDurationGraph";
    private visGraphContainer: HTMLElement;
    private visGraphOptions: Graph2dOptions;
    private visGraph: Graph2d;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visJobsData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
    
    constructor(private LOGGER: Logger) {}
    
    ngOnInit() {
        this.visGraphContainer = document.getElementById(this.graphElementId);
        this.visGraphOptions = {
            height: '400px',
            clickToUse: true,
            style: "bar",
            barChart: {
                width: 150,
                align: "center",
                sideBySide: true
            },
            drawPoints: {
                style: 'circle'
            },
            showMajorLabels: false,
            showMinorLabels: false,
            min: -50,
            max: 100,
            start: -50,
            end: 100
        };
        
        this.visGroups.add({
            id: 0,
            className: 'vis-group-green',
            options: {
                drawPoints: true
            }
        });
        this.visGroups.add({
            id: 1,
            className: 'vis-group-yellow',
            options: {
                drawPoints: true
            }
        });
        this.visGroups.add({
            id: 2,
            className: 'vis-group-red',
            options: {
                drawPoints: true
            }
        });
    }
    
    analyze(jenkinsData: IJenkinsData):Graph2d {        
        this.visJobsData = new DataSet(this.getJobsData(jenkinsData));
        this.visGraph =  new Graph2d(this.visGraphContainer, this.visJobsData, this.visGroups, this.visGraphOptions);
        
        this.LOGGER.debug("Average Build Duration Data", this.visJobsData);
        
        return this.visGraph;
    }
    
    private getJobsData(data:IJenkinsData):Array<any> {
        let jobsData:Array<any> = new Array<any>();
        let counter:number = 0;
        let parent = this;
        
        if (Util.isInvalid(data) || Util.isInvalid(data.jobs)) {
            return jobsData;
        }
        
        data.jobs
            .sort(function (jobA, jobB) {return (Util.getBuildAverageDuration(jobA.builds) - Util.getBuildAverageDuration(jobB.builds)) * -1})
            .forEach(function(job) {
                let averageBuildDuration = Math.ceil(moment.duration(Util.getBuildAverageDuration(job.builds), "milliseconds").asMinutes());

                let jobData = {
                    label: {
                        content:job.name,
                        xOffset: 0,
                        yOffset: 0,
                    },
                    title: job.name + ":" + averageBuildDuration + " minutes",
                    content: job.name,
                    x: counter,
                    y: averageBuildDuration,
                    group: parent.getGroup(averageBuildDuration)
                };

                counter++;
                jobsData.push(jobData);
        });
        
        return jobsData;
    }
    
    private getGroup(buildDurationMinutes: number) {
        if (buildDurationMinutes <= this.BUILD_GREEN_THRESHOLD) {
            return 0;
        } else if (buildDurationMinutes > this.BUILD_GREEN_THRESHOLD 
                && buildDurationMinutes <= this.BUILD_YELLOW_THRESHOLD) {
            return 1;
        } else {
            return 2;
        }
    }
}