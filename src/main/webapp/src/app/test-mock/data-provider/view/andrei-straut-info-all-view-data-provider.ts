import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoAllViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.model.AllView",
        "description": "<h1>All projects source code CI</h1>",
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
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "drp-release",
                "url": "https://www.andreistraut.info/jenkins/job/drp-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "gaps-master",
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "gaps-release",
                "url": "https://www.andreistraut.info/jenkins/job/gaps-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "jenkins-api-ts-typings-master",
                "url": "https://www.andreistraut.info/jenkins/job/jenkins-api-ts-typings-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "jenkins-api-ts-typings-release",
                "url": "https://www.andreistraut.info/jenkins/job/jenkins-api-ts-typings-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "monkins-master",
                "url": "https://www.andreistraut.info/jenkins/job/monkins-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "monkins-release",
                "url": "https://www.andreistraut.info/jenkins/job/monkins-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "server-health-check",
                "url": "https://www.andreistraut.info/jenkins/job/server-health-check/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "statkins-master",
                "url": "https://www.andreistraut.info/jenkins/job/statkins-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "statkins-release",
                "url": "https://www.andreistraut.info/jenkins/job/statkins-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "tldr-master",
                "url": "https://www.andreistraut.info/jenkins/job/tldr-master/",
                "color": "blue"
            },
            {
                "_class": "hudson.maven.MavenModuleSet",
                "name": "tldr-release",
                "url": "https://www.andreistraut.info/jenkins/job/tldr-release/",
                "color": "blue"
            },
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "vultr-automatic-snapshots",
                "url": "https://www.andreistraut.info/jenkins/job/vultr-automatic-snapshots/",
                "color": "blue"
            }
        ],
        "name": "all",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/"
    }
}
