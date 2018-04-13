import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoGAPSViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Genetic Algorithm Path Search source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info/gaps\" target=\"_blank\">https://www.andreistraut.info/gaps</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "GAPS",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/GAPS/"
    }
}
