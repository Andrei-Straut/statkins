import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoAndreiStrautInfoViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Personal Website source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info\" target=\"_blank\">https://www.andreistraut.info</a></h2>",
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
            }
        ],
        "name": "andreistraut.info",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/andreistraut.info/"
    }
}
