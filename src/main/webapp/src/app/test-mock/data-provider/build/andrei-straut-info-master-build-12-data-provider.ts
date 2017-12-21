import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class AndreiStrautInfoMasterBuild12DataProvider implements IBuildDataProviderService {

    public getBuildData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSetBuild",
        "actions": [
            {
                "_class": "hudson.model.CauseAction",
                "causes": [
                    {
                        "_class": "com.cloudbees.jenkins.GitHubPushCause",
                        "shortDescription": "Started by GitHub push by Andrei-Straut"
                    }, 
                    {
                        "_class": "com.cloudbees.jenkins.GitHubPushCause",
                        "shortDescription": "Started by GitHub push by Andrei-Straut"
                    }
                ]
            }, {},
            {
                "_class": "hudson.plugins.git.util.BuildData",
                "buildsByBranchName": {
                    "refs/remotes/origin/master": {
                        "_class": "hudson.plugins.git.util.Build",
                        "buildNumber": 12,
                        "buildResult": null,
                        "marked": {
                            "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                            "branch": [{
                                "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                                "name": "refs/remotes/origin/master"
                            }]
                        },
                        "revision": {
                            "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                            "branch": [{
                                "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                                "name": "refs/remotes/origin/master"
                            }]
                        }
                    }
                },
                "lastBuiltRevision": {
                    "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                    "branch": [{
                        "SHA1": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                        "name": "refs/remotes/origin/master"
                    }]
                },
                "remoteUrls": ["https://github.com/Andrei-Straut/andreistraut.info"],
                "scmName": ""
            },
            {
                "_class": "jenkins.metrics.impl.TimeInQueueAction",
                "queuingDurationMillis": 103833,
                "totalDurationMillis": 1474583
            },
            {
                "_class": "hudson.plugins.git.GitTagAction"
            }, {}, 
            {
                "_class": "hudson.maven.reporters.MavenAggregatedArtifactRecord"
            }, {}, {}, {}, {}
        ],
        "artifacts": [],
        "building": false,
        "description": null,
        "displayName": "#12",
        "duration": 18284,
        "estimatedDuration": 22468,
        "executor": null,
        "fullDisplayName": "andreistraut.info-master #12",
        "id": "12",
        "keepLog": false,
        "number": 12,
        "queueId": 95,
        "result": "SUCCESS",
        "timestamp": 1503593604402,
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/12/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["src/main/webapp/index.html"],
                "commitId": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                "timestamp": 1503593528000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei-straut@users.noreply.github.com",
                "comment": "Do not load analytics when check by Google PageSpeed\n",
                "date": "2017-08-24 17:52:08 +0100",
                "id": "e6cae6587caf25ab524105c7ddc8c91b9e376925",
                "msg": "Do not load analytics when check by Google PageSpeed",
                "paths": [{
                    "editType": "edit",
                    "file": "src/main/webapp/index.html"
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