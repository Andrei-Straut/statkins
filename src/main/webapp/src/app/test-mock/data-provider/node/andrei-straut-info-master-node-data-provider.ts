import {INodeDataProviderService} from './jenkins-node-data-provider';

export class AndreiStrautInfoMasterNodeDataProvider implements INodeDataProviderService {

    public getNodeData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.model.ComputerSet",
        "busyExecutors": 0,
        "computer": [
            {
                "_class": "hudson.model.Hudson$MasterComputer",
                "actions": [

                ],
                "assignedLabels": [
                    {
                        "name": "master"
                    }
                ],
                "description": "the master Jenkins node",
                "displayName": "master",
                "executors": [
                    {

                    }
                ],
                "icon": "computer.png",
                "iconClassName": "icon-computer",
                "idle": true,
                "jnlpAgent": false,
                "launchSupported": true,
                "loadStatistics": {
                    "_class": "hudson.model.Label$1"
                },
                "manualLaunchAllowed": true,
                "monitorData": {

                },
                "numExecutors": 1,
                "offline": false,
                "offlineCause": null,
                "offlineCauseReason": "",
                "oneOffExecutors": [

                ],
                "temporarilyOffline": false
            },
            {
                "_class": "hudson.model.Hudson$MasterComputer",
                "actions": [

                ],
                "assignedLabels": [
                    {
                        "name": "master"
                    }
                ],
                "description": "the master Jenkins node",
                "displayName": "master_secondary",
                "executors": [
                    {

                    }
                ],
		"name": "master_secondary",
                "icon": "computer.png",
                "iconClassName": "icon-computer",
                "idle": true,
                "jnlpAgent": false,
                "launchSupported": true,
                "loadStatistics": {
                    "_class": "hudson.model.Label$1"
                },
                "manualLaunchAllowed": true,
                "monitorData": {

                },
                "numExecutors": 1,
                "offline": false,
                "offlineCause": null,
                "offlineCauseReason": "",
                "oneOffExecutors": [

                ],
                "temporarilyOffline": false
            }
        ],
        "displayName": "Nodes",
        "totalExecutors": 1
    }
}
