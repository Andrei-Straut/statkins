import {IJenkinsDataRetrieverService} from './IJenkinsDataRetrieverService';
import {JenkinsServiceId} from './JenkinsServiceId';

export abstract class JenkinsDataRetrieverService implements IJenkinsDataRetrieverService {
    protected complete: boolean = false;
    protected completedSuccessfully: boolean = false;
    protected allItemsRetrievedSuccessfully: boolean = true;
    
    abstract async execute(): Promise<void>;
    abstract getData(): any;
    abstract getServiceId(): JenkinsServiceId;

    isComplete(): boolean {
        return this.complete;
    }

    isSuccessful(): boolean {
        return this.completedSuccessfully;
    }
    
    isDataComplete(): boolean {
        return this.allItemsRetrievedSuccessfully;
    }
}