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
    
    readonly proxyUrl = "http://localhost:8089";                                            // DEV
    readonly jenkinsUrl = "http://ptlisvltnet016.dci.co-int.net/";                          // DEV
    
//    readonly proxyUrl = "http://vm-transnet-009.dci.co-int.net:8080/drp/api/post/";       // STAGING
//    readonly jenkinsUrl = "http://ptlisvltnet016.dci.co-int.net/";                        // STAGING
    
//    readonly proxyUrl = "http://vm-transnet-009.dci.co-int.net:8080/drp/api/post/";       // LIVE
//    readonly jenkinsUrl = "https://www.andreistraut.info/jenkins/";                       // LIVE
    
    constructor() {
    }
}