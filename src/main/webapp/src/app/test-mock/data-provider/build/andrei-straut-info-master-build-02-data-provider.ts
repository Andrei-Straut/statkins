import {IBuildDataProviderService} from './jenkins-build-data-provider';

/**
 * Build with time in queue action and no changesets
 */
export class AndreiStrautInfoMasterBuild02DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return this.data as JSON;
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSetBuild",
        "actions": [
        {
            "_class": "jenkins.metrics.impl.TimeInQueueAction", 
            "queuingDurationMillis": 103833,
            "totalDurationMillis": 1474583
        }],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#2",
        "duration": 18284,
        "estimatedDuration": 22468,
        "executor": null,
        "fullDisplayName": "andreistraut.info-master #12",
        "id": "2",
        "keepLog": false,
        "number": 2,
        "queueId": 95,
        "result": "SUCCESS",
        "timestamp": 1503593604402,
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/12/",
        "builtOn": "",
        "changeSet": {},
        "culprits": [{
            "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
            "fullName": "Andrei Straut"
        }],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.5.0"
    }
}