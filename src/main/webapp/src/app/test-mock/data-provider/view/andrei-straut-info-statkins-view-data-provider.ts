import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoStatkinsViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Jenkins Statistics Analyzer source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info/statkins\" target=\"_blank\">https://www.andreistraut.info/statkins</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "Statkins",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/Statkins/"
    }
}
