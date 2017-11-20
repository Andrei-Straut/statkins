import {IJenkinsService} from './IJenkinsService';
import {JenkinsServiceId} from './JenkinsServiceId';

export abstract class JenkinsService implements IJenkinsService {
    protected complete: boolean = false;
    protected completedSuccessfully: boolean = false;
    
    abstract async execute(): Promise<void>;
    abstract getData(): any;
    abstract getServiceId(): JenkinsServiceId;

    isComplete(): boolean {
        return this.complete;
    }

    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
}