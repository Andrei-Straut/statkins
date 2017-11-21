import {IBuildDataProviderService} from './jenkins-build-data-provider';

/**
 * Build with FAILURE result
 */
export class GapsMasterBuild04DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return this.data as JSON;
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSetBuild",
        "actions": [{
            "_class": "hudson.model.CauseAction",
            "causes": [{
                "_class": "hudson.model.Cause$UserIdCause",
                "shortDescription": "Started by user Andrei Straut",
                "userId": "andreistraut",
                "userName": "Andrei Straut"
            }]
        }, {
            "_class": "hudson.plugins.git.util.BuildData",
            "buildsByBranchName": {
                "refs/remotes/origin/master": {
                    "_class": "hudson.plugins.git.util.Build",
                    "buildNumber": 4,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                        "branch": [{
                            "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                        "branch": [{
                            "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                "branch": [{
                    "SHA1": "401e5c5cdcf2b41ad992c618c4d97fdff85ca109",
                    "name": "refs/remotes/origin/master"
                }]
            },
            "remoteUrls": ["https://github.com/Andrei-Straut/gaps/"],
            "scmName": ""
        }, {
            "_class": "hudson.plugins.git.GitTagAction"
        }, {}, {}, {}, {}],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#4",
        "duration": 46084,
        "estimatedDuration": 39076,
        "executor": null,
        "fullDisplayName": "gaps-master #4",
        "id": "4",
        "keepLog": false,
        "number": 4,
        "queueId": 5,
        "result": "FAILURE",
        "timestamp": 1497114933334,
        "url": "https://www.andreistraut.info/jenkins/job/gaps-master/4/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [],
            "kind": "git"
        },
        "culprits": [],
        "mavenArtifacts": null,
        "mavenVersionUsed": "3.3.9"
    }
}