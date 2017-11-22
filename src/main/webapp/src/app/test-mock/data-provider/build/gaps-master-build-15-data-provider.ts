import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class GapsMasterBuild15DataProvider implements IBuildDataProviderService {

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
                    "buildNumber": 15,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                        "branch": [{
                            "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                        "branch": [{
                            "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                "branch": [{
                    "SHA1": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                    "name": "refs/remotes/origin/master"
                }]
            },
            "remoteUrls": ["https://github.com/Andrei-Straut/gaps/"],
            "scmName": ""
        }, {
            "_class": "hudson.plugins.git.GitTagAction"
        }, {}, {
            "_class": "hudson.maven.reporters.SurefireAggregatedReport",
            "failCount": 0,
            "skipCount": 0,
            "totalCount": 457,
            "urlName": "testReport"
        }, {
            "_class": "hudson.maven.reporters.MavenAggregatedArtifactRecord"
        }, {
            "_class": "hudson.plugins.jacoco.JacocoBuildAction"
        }, {}, {}, {}, {}],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#15",
        "duration": 46047,
        "estimatedDuration": 39076,
        "executor": null,
        "fullDisplayName": "gaps-master #15",
        "id": "15",
        "keepLog": false,
        "number": 15,
        "queueId": 84,
        "result": "SUCCESS",
        "timestamp": 1503589862769,
        "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["README.md"],
                "commitId": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                "timestamp": 1503589845000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei.straut@gmail.com",
                "comment": "Update badges\n",
                "date": "2017-08-24 16:50:45 +0100",
                "id": "4c217f93e4713cde2dda768f9321294301cb8ebb",
                "msg": "Update badges",
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