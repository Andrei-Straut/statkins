import {JenkinsServiceId} from './JenkinsServiceId';

export interface IJenkinsService {
    execute(): void;
    isComplete(): boolean;
    isSuccessful(): boolean;
    getData(): any;
    getServiceId(): JenkinsServiceId;
}