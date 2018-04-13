import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoMonkinsViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Jenkins Monitor source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info/monkins\" target=\"_blank\">https://www.andreistraut.info/monkins</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "Monkins",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/Monkins/"
    }
}
