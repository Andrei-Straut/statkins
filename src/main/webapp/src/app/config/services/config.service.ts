import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private readonly _INSTANCE_ID: string;
    
//    readonly _configuration:string = "DEV";
//    readonly _configuration:string = "STAGING";
    readonly _configuration:string = "LIVE";
    
    readonly appName = 'Statkins';
    readonly developerName = 'Andrei Straut';
    readonly copyright: string;
    
    readonly apiSuffix = 'api/json';
    readonly slaveSuffix = 'computer/';
    readonly userSuffix = 'view/all/people/';
    readonly viewSuffix = 'view/';
    readonly jobSuffix = 'job/';
    readonly loggerLevel:number = 3;
    readonly defaultDepth = "?depth=1";
    
    readonly devProxyUrl = "http://localhost:8089";
    readonly stagingProxyURL = "http://vm-transnet-009.dci.co-int.net:8080/drp/api/post/";
    readonly liveProxyURL = "https://www.andreistraut.info/drp/api/post/";
    
    readonly devJenkinsURL = "http://ptlisvltnet016.dci.co-int.net/";
    readonly stagingJenkinsURL = "http://ptlisvltnet016.dci.co-int.net/";
    readonly liveJenkinsURL = "https://www.andreistraut.info/jenkins/";
    
    readonly jenkinsTimeInQueueActionId = "jenkins.metrics.impl.TimeInQueueAction";
    
    get proxyUrl():string {
        if(this._configuration === "DEV") {
            return this.devProxyUrl;
        } else if(this._configuration === "STAGING") {
            return this.stagingProxyURL;
        } else if(this._configuration === "LIVE") {
            return this.liveProxyURL;
        }
        
        return undefined;
    }
    
    get jenkinsUrl():string {
        if(this._configuration === "DEV") {
            return this.devJenkinsURL;
        } else if(this._configuration === "STAGING") {
            return this.stagingJenkinsURL;
        } else if(this._configuration === "LIVE") {
            return this.liveJenkinsURL;
        }
        
        return undefined;
    }
    
    constructor() {
        this._INSTANCE_ID = this.uuidv4();
        this.copyright = 'Copyright © ' + this.developerName + ' ' + new Date().getFullYear();
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
