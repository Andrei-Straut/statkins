import {IJobListDataProviderService} from './jenkins-job-list-data-provider';

export class AndreiStrautInfoMasterJobListDataProvider implements IJobListDataProviderService {

    public getJobListData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "jobs": [
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "andreistraut.info-master",
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "andreistraut.info-release",
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "drp-master",
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/",
                "color": "blue"
            }]
    }
}
