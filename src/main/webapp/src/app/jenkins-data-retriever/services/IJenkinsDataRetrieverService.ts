import {JenkinsServiceId} from './JenkinsServiceId';

export interface IJenkinsDataRetrieverService {
    execute(): void;
    isComplete(): boolean;
    isSuccessful(): boolean;
    getData(): any;
    getServiceId(): JenkinsServiceId;
}