import {JenkinsServiceId} from './JenkinsServiceId';

export interface IJenkinsDataRetrieverService {
    execute(): void;
    isComplete(): boolean;
    isSuccessful(): boolean;
    isDataComplete(): boolean;
    getData(): any;
    getServiceId(): JenkinsServiceId;
}