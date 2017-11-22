import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class DrpMasterBuild06DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSetBuild",
        "actions": [{
            "_class": "hudson.model.CauseAction",
            "causes": [{
                "_class": "com.cloudbees.jenkins.GitHubPushCause",
                "shortDescription": "Started by GitHub push by Andrei-Straut"
            }, {
                "_class": "com.cloudbees.jenkins.GitHubPushCause",
                "shortDescription": "Started by GitHub push by Andrei-Straut"
            }]
        }, {}, {
            "_class": "hudson.plugins.git.util.BuildData",
            "buildsByBranchName": {
                "refs/remotes/origin/master": {
                    "_class": "hudson.plugins.git.util.Build",
                    "buildNumber": 6,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                        "branch": [{
                            "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                        "branch": [{
                            "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                "branch": [{
                    "SHA1": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
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
        "displayName": "#6",
        "duration": 38430,
        "estimatedDuration": 39185,
        "executor": null,
        "fullDisplayName": "drp-master #6",
        "id": "6",
        "keepLog": false,
        "number": 6,
        "queueId": 51,
        "result": "SUCCESS",
        "timestamp": 1503008376334,
        "url": "https://www.andreistraut.info/jenkins/job/drp-master/6/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["drp-web/pom.xml"],
                "commitId": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                "timestamp": 1503008261000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andrei.straut",
                    "fullName": "andrei.straut"
                },
                "authorEmail": "andrei.straut@coriant.com",
                "comment": "Setup wildfly auto deploy for drp web\n",
                "date": "2017-08-17 23:17:41 +0100",
                "id": "6a81755141ec31d74e6003e8158ce8e30019d1cf",
                "msg": "Setup wildfly auto deploy for drp web",
                "paths": [{
                    "editType": "edit",
                    "file": "drp-web/pom.xml"
                }]
            }],
            "kind": "git"
        },
        "culprits": [{
            "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andrei.straut",
            "fullName": "andrei.straut"
        }],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.3.9"
    }
}