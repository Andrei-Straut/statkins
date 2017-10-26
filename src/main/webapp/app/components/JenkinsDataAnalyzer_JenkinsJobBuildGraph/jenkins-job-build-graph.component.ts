import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TimelineOptions, Timeline, DataSet } from 'vis';

import { Logger } from 'angular2-logger/core';
import { Util } from '../Util/Util'
import { IJenkinsData } from 'jenkins-api-ts-typings';
import { DataSetItem } from '../JenkinsDataAnalyzer/model/DataSetItem';
    
@Component({
    selector: 'jenkins-job-build-graph',
    templateUrl: 'app/components/JenkinsDataAnalyzer_JenkinsJobBuildGraph/templates/jenkinsjobbuildgraph.template.html',
    providers: [],
})
export class JenkinsJobBuildGraphComponent implements OnInit {
    
    @Input('jenkinsData')
    set jenkinsData(jenkinsData: IJenkinsData) {
        if (Util.isInvalid(jenkinsData)) {
            return;
        }
        this.analyze(jenkinsData);
    }
    
    private readonly graphElementId = "jobBuildGraph";
    private visGraphContainer: HTMLElement;
    private visGraphOptions: TimelineOptions;
    private visGraph: Timeline;
    private visGroups: DataSet<any> = new DataSet<any>();
    private visJobsData: DataSet<DataSetItem> = new DataSet<DataSetItem>();
    
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
        this.visJobsData = this.getJobsData(jenkinsData);
        this.visGraph =  new Timeline(this.visGraphContainer, this.visJobsData, this.visGroups, this.visGraphOptions);
        
        if (Util.isInvalid(jenkinsData) && !Util.isInvalid(jenkinsData.jobs)) {
            return;
        }
        let maxNumber = jenkinsData.jobs.sort(function (job1, job2) {return (job1.builds.length - job2.builds.length) * -1});
        if (Util.isInvalid(maxNumber)) {
            return;
        }
        this.visGraphOptions.max = Math.round((maxNumber[0]).builds.length * 1.25);
        this.visGraphOptions.end = Math.round((maxNumber[0]).builds.length * 1.25);
        this.visGraph.setOptions(this.visGraphOptions);
        
        return this.visGraph;
    }
    
    private getJobsData(data:IJenkinsData):DataSet<any> {
        let jobsData:DataSet<any> = new DataSet<any>();
        
        let counter:number = 0;
        data.jobs.sort(function (job1, job2) {return (job1.builds.length - job2.builds.length) * -1}).forEach(function(job) {
            
            let jobData: any = undefined;
            if (Util.isInvalid(jobsData.get(job.builds.length))) {
                jobData = {
                    id: job.builds.length,
                    title: job.name + "<br/>",
                    content: job.builds.length + " builds",
                    start: 0,
                    end: job.builds.length,
                    group: 0,
                    className: 'green left-aligned'
                };                
            } else {
                jobData = jobsData.get(job.builds.length);
                let currentTitle = (jobData as DataSetItem).title;
                (jobData as DataSetItem).title = currentTitle + job.name + "<br/>";
            }
            jobsData.update(jobData);
            
            counter++;
        });
        
        return jobsData;
    }
}