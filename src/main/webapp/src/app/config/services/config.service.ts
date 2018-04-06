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
    
    readonly jenkinsTimeInQueueActionId = "jenkins.metrics.impl.TimeInQueueAction";
    
    get proxyUrl():string {
        if(this._configuration === "DEV") {
            return "http://localhost:8089";
        } else if(this._configuration === "STAGING") {
            return "http://vm-transnet-009.dci.co-int.net:8080/drp/api/post/";
        } else if(this._configuration === "LIVE") {
            return "https://www.andreistraut.info/drp/api/post/";
        }
        
        return undefined;
    }
    
    get jenkinsUrl():string {
        if(this._configuration === "DEV") {
            return "http://ptlisvltnet016.dci.co-int.net/";
        } else if(this._configuration === "STAGING") {
            return "http://ptlisvltnet016.dci.co-int.net/";
        } else if(this._configuration === "LIVE") {
            return "https://www.andreistraut.info/jenkins/";
        }
        
        return undefined;
    }
    
    constructor() {
        this._INSTANCE_ID = this.uuidv4();
        this.copyright = '© ' + this.developerName + ' ' + new Date().getFullYear();
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
