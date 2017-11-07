

export interface IJenkinsService {
    execute(): void;
    isComplete(): boolean;
    isSuccessful(): boolean;
    getData(): any;
}

