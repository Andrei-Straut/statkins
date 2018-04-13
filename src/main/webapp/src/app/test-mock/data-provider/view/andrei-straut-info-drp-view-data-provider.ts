import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoDRPViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Dynamic Reverse Proxy source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info/drp\" target=\"_blank\">https://www.andreistraut.info/drp</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "DRP",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/DRP/"
    }
}
