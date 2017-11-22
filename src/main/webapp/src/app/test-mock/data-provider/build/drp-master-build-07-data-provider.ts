import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class DrpMasterBuild07DataProvider implements IBuildDataProviderService {

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
                    "buildNumber": 7,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                        "branch": [{
                            "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                        "branch": [{
                            "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                "branch": [{
                    "SHA1": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
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
        "displayName": "#7",
        "duration": 40161,
        "estimatedDuration": 39185,
        "executor": null,
        "fullDisplayName": "drp-master #7",
        "id": "7",
        "keepLog": false,
        "number": 7,
        "queueId": 88,
        "result": "SUCCESS",
        "timestamp": 1503590637896,
        "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["README.md"],
                "commitId": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                "timestamp": 1503590565000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andrei.straut",
                    "fullName": "andrei.straut"
                },
                "authorEmail": "andrei.straut@coriant.com",
                "comment": "Update badge\n",
                "date": "2017-08-24 17:02:45 +0100",
                "id": "ca9895f020344e1401001ec0bc0a1efe1ceb2d0d",
                "msg": "Update badge",
                "paths": [{
                    "editType": "edit",
                    "file": "README.md"
                }]
            }],
            "kind": "git"
        },
        "culprits": [{
            "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andrei.straut",
            "fullName": "andrei.straut"
        }],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.5.0"
    }
}