import {IBuildDataProviderService} from './jenkins-build-data-provider';

/**
 * Build with empty actions and no changesets
 */
export class AndreiStrautInfoMasterBuild01DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return this.data as JSON;
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSetBuild",
        "actions": [],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#1",
        "duration": 18284,
        "estimatedDuration": 22468,
        "executor": null,
        "fullDisplayName": "andreistraut.info-master #12",
        "id": "1",
        "keepLog": false,
        "number": 1,
        "queueId": 95,
        "result": "SUCCESS",
        "timestamp": 1503593604402,
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/12/",
        "builtOn": "",
        "changeSet": {},
        "culprits": [],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.5.0"
    }
}