import {IViewListDataProviderService} from './jenkins-view-list-data-provider';

export class AndreiStrautInfoMasterViewListDataProvider implements IViewListDataProviderService {

    public getViewListData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "views": [
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "DRP",
                "url": "https://www.andreistraut.info/jenkins/view/DRP/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "GAPS",
                "url": "https://www.andreistraut.info/jenkins/view/GAPS/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "Jenkins API Typings",
                "url": "https://www.andreistraut.info/jenkins/view/Jenkins%20API%20Typings/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "Monkins",
                "url": "https://www.andreistraut.info/jenkins/view/Monkins/"
            },
            {
                "_class": "hudson.model.ListView",
                "name": "Other",
                "url": "https://www.andreistraut.info/jenkins/view/Other/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "Statkins",
                "url": "https://www.andreistraut.info/jenkins/view/Statkins/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "TLDR",
                "url": "https://www.andreistraut.info/jenkins/view/TLDR/"
            },
            {
                "_class": "hudson.model.AllView",
                "name": "all",
                "url": "https://www.andreistraut.info/jenkins/"
            },
            {
                "_class": "hudson.plugins.sectioned_view.SectionedView",
                "name": "andreistraut.info",
                "url": "https://www.andreistraut.info/jenkins/view/andreistraut.info/"
            }]
    }
}
