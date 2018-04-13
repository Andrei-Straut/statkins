import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoTLDRViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Test Levels During Refactor source code CI</h1>\r\n<h2><a href=\"https://www.andreistraut.info/tldr\" target=\"_blank\">https://www.andreistraut.info/tldr</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "TLDR",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/TLDR/"
    }
}
