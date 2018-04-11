import {INodeDataProviderService} from './jenkins-node-data-provider';

export class AndreiStrautInfoMasterNodeDataProvider implements INodeDataProviderService {

    public getNodeData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
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
            "hudson.node_monitors.SwapSpaceMonitor": {
                "_class": "hudson.node_monitors.SwapSpaceMonitor$MemoryUsage2",
                "availablePhysicalMemory": 214032384,
                "availableSwapSpace": 1367863296,
                "totalPhysicalMemory": 2090491904,
                "totalSwapSpace": 2147479552
            },
            "hudson.node_monitors.TemporarySpaceMonitor": {
                "_class": "hudson.node_monitors.DiskSpaceMonitorDescriptor$DiskSpace",
                "timestamp": 1523442028374,
                "path": "/tmp",
                "size": 7936864256
            },
            "hudson.node_monitors.DiskSpaceMonitor": {
                "_class": "hudson.node_monitors.DiskSpaceMonitorDescriptor$DiskSpace",
                "timestamp": 1523442028015,
                "path": "/home/wildfly/.jenkins",
                "size": 7936864256
            },
            "hudson.node_monitors.ArchitectureMonitor": "Linux (amd64)",
            "hudson.node_monitors.ResponseTimeMonitor": {
                "_class": "hudson.node_monitors.ResponseTimeMonitor$Data",
                "timestamp": 1523442028020,
                "average": 0
            },
            "hudson.node_monitors.ClockMonitor": {
                "_class": "hudson.util.ClockDifference",
                "diff": 0
            }
        },
        "numExecutors": 1,
        "offline": false,
        "offlineCause": null,
        "offlineCauseReason": "",
        "oneOffExecutors": [

        ],
        "temporarilyOffline": false
    }
}
