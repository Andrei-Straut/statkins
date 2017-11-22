import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class AndreiStrautInfoMasterBuild14DataProvider implements IBuildDataProviderService {

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
                    "buildNumber": 14,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                        "branch": [{
                            "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                        "branch": [{
                            "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                "branch": [{
                    "SHA1": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                    "name": "refs/remotes/origin/master"
                }]
            },
            "remoteUrls": ["https://github.com/Andrei-Straut/andreistraut.info"],
            "scmName": ""
        }, {
            "_class": "hudson.plugins.git.GitTagAction"
        }, {}, {
            "_class": "hudson.maven.reporters.MavenAggregatedArtifactRecord"
        }, {}, {}, {}, {}],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#14",
        "duration": 22161,
        "estimatedDuration": 22468,
        "executor": null,
        "fullDisplayName": "andreistraut.info-master #14",
        "id": "14",
        "keepLog": false,
        "number": 14,
        "queueId": 244,
        "result": "SUCCESS",
        "timestamp": 1504880133963,
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["README.md"],
                "commitId": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                "timestamp": 1504880007000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei-straut@users.noreply.github.com",
                "comment": "Re-Test webhooks\n",
                "date": "2017-09-08 15:13:27 +0100",
                "id": "d4c77a9bd9c1486c3868536b94d52135d349d630",
                "msg": "Re-Test webhooks",
                "paths": [{
                    "editType": "edit",
                    "file": "README.md"
                }]
            }],
            "kind": "git"
        },
        "culprits": [{
            "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
            "fullName": "Andrei Straut"
        }],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.5.0"
    }
}