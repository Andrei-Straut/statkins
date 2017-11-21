import {Component, OnInit, Input} from '@angular/core';

import {UtilService} from '../../util/services/util.service';
import {Logger} from 'angular2-logger/core';
import {IJenkinsData} from 'jenkins-api-ts-typings';
/**
 * Root component for statistics subcomponents
 */
@Component({
    selector: 'jenkins-data-analyzer',
    templateUrl: '../templates/jenkins-data-analyzer.template.html',
    styleUrls: ['../templates/jenkins-data-analyzer.template.css']
})
export class JenkinsDataAnalyzerComponent implements OnInit {

    @Input('utilService')
    utilService: UtilService;
    @Input('jenkinsData')
    jenkinsData = <IJenkinsData>null;
    @Input('dataAvailable')
    dataAvailable: boolean;

    constructor(private LOGGER: Logger) {}

    ngOnInit() {}

    analyze(data: IJenkinsData) {}
}