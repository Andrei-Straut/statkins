import { Injectable } from '@angular/core';

@Injectable()
export class JenkinsDefinitionService {
    readonly apiSuffix = 'api/json';
    readonly slaveSuffix = 'computer/';
    readonly userSuffix = 'view/all/people/';
    readonly viewSuffix = 'view/';
    readonly jobSuffix = 'job/';
    readonly loggerLevel = 3;
    readonly defaultDepth = "?depth=1";
    
    constructor() {
    }
}