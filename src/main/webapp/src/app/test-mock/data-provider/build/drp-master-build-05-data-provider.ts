import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class DrpMasterBuild05DataProvider implements IBuildDataProviderService {

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
                    "buildNumber": 5,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                        "branch": [{
                            "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                        "branch": [{
                            "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                "branch": [{
                    "SHA1": "350c45684464f0c47311af6d091107162ed3b227",
                    "name": "refs/remotes/origin/master"
                }]
            },
            "remoteUrls": ["https://github.com/Andrei-Straut/drp/"],
            "scmName": ""
        }, {
            "_class": "hudson.plugins.git.GitTagAction"
        }, {}, {
            "_class": "hudson.maven.reporters.SurefireAggregatedReport",
            "failCount": 0,
            "skipCount": 0,
            "totalCount": 128,
            "urlName": "testReport"
        }, {
            "_class": "hudson.maven.reporters.MavenAggregatedArtifactRecord"
        }, {
            "_class": "hudson.plugins.jacoco.JacocoBuildAction"
        }, {}, {}, {}, {}],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#5",
        "duration": 38963,
        "estimatedDuration": 39185,
        "executor": null,
        "fullDisplayName": "drp-master #5",
        "id": "5",
        "keepLog": false,
        "number": 5,
        "queueId": 5,
        "result": "SUCCESS",
        "timestamp": 1502918761713,
        "url": "https://www.andreistraut.info/jenkins/job/drp-master/5/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [],
            "kind": "git"
        },
        "culprits": [],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.3.9"
    }
}