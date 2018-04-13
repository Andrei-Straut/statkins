import {IViewDataProviderService} from './jenkins-view-data-provider';

export class AndreiStrautInfoOtherViewDataProvider implements IViewDataProviderService {

    public getViewData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.model.ListView",
        "description": "<br/>\r\n<h1>Utilities, small scripts and cron jobs run by Jenkins</h1>\r\n<br/>",
        "jobs": [
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "server-health-check",
                "url": "https://www.andreistraut.info/jenkins/job/server-health-check/",
                "color": "blue"
            },
            {
                "_class": "hudson.model.FreeStyleProject",
                "name": "vultr-automatic-snapshots",
                "url": "https://www.andreistraut.info/jenkins/job/vultr-automatic-snapshots/",
                "color": "blue"
            }
        ],
        "name": "Other",
        "property": [

        ],
        "url": "https://www.andreistraut.info/jenkins/view/Other/"
    }
}
