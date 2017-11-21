import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class GapsMasterBuild14DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return this.data as JSON;
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
                        "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                        "branch": [{
                            "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                        "branch": [{
                            "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                "branch": [{
                    "SHA1": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
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
        "displayName": "#14",
        "duration": 35419,
        "estimatedDuration": 39076,
        "executor": null,
        "fullDisplayName": "gaps-master #14",
        "id": "14",
        "keepLog": false,
        "number": 14,
        "queueId": 45,
        "result": "SUCCESS",
        "timestamp": 1503007357706,
        "url": "https://www.andreistraut.info/jenkins/job/gaps-master/14/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["src/main/webapp/scripts/gaps/app.gaps.js"],
                "commitId": "b260a60c925dcd27e69988d22c2f6186a42fa28d",
                "timestamp": 1503007172000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei.straut@gmail.com",
                "comment": "Update ws url\n",
                "date": "2017-08-17 22:59:32 +0100",
                "id": "b260a60c925dcd27e69988d22c2f6186a42fa28d",
                "msg": "Update ws url",
                "paths": [{
                    "editType": "edit",
                    "file": "src/main/webapp/scripts/gaps/app.gaps.js"
                }]
            }, {
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["pom.xml", "src/main/webapp/scripts/gaps/app.gaps.js"],
                "commitId": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                "timestamp": 1503007248000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei.straut@gmail.com",
                "comment": "Setup wildfly auto deploy. Bump pom\nConflicts:\npom.xml\n",
                "date": "2017-08-17 23:00:48 +0100",
                "id": "eb50bb262f4d5963cd020d23751063d17ac43c1f",
                "msg": "Setup wildfly auto deploy. Bump pom",
                "paths": [{
                    "editType": "edit",
                    "file": "pom.xml"
                }, {
                    "editType": "edit",
                    "file": "src/main/webapp/scripts/gaps/app.gaps.js"
                }]
            }],
            "kind": "git"
        },
        "culprits": [{
            "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
            "fullName": "Andrei Straut"
        }],
        "mavenArtifacts": {},
        "mavenVersionUsed": "3.3.9"
    }
}