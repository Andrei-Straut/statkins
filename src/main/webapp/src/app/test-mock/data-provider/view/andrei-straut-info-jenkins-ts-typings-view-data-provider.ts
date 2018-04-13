import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoJenkinsTSTypingsViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.plugins.sectioned_view.SectionedView",
        "description": "<h1>Jenkins JSON API TypeScript Typings source code CI</h1>\r\n<h2><a href=\"https://www.npmjs.com/package/jenkins-api-ts-typings\" target=\"_blank\">https://www.npmjs.com/package/jenkins-api-ts-typings</a></h2>",
        "jobs": [
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
            }
        ],
        "name": "Jenkins API Typings",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/Jenkins%20API%20Typings/"
    }
}
