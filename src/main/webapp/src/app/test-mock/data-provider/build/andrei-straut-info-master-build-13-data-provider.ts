import {IBuildDataProviderService} from './jenkins-build-data-provider';

export class AndreiStrautInfoMasterBuild13DataProvider implements IBuildDataProviderService {

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
            }]
        }, {}, {
            "_class": "hudson.plugins.git.util.BuildData",
            "buildsByBranchName": {
                "refs/remotes/origin/master": {
                    "_class": "hudson.plugins.git.util.Build",
                    "buildNumber": 13,
                    "buildResult": null,
                    "marked": {
                        "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                        "branch": [{
                            "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                            "name": "refs/remotes/origin/master"
                        }]
                    },
                    "revision": {
                        "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                        "branch": [{
                            "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                            "name": "refs/remotes/origin/master"
                        }]
                    }
                }
            },
            "lastBuiltRevision": {
                "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                "branch": [{
                    "SHA1": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
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
        "displayName": "#13",
        "duration": 26960,
        "estimatedDuration": 22468,
        "executor": null,
        "fullDisplayName": "andreistraut.info-master #13",
        "id": "13",
        "keepLog": false,
        "number": 13,
        "queueId": 2,
        "result": "SUCCESS",
        "timestamp": 1504192192706,
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/13/",
        "builtOn": "",
        "changeSet": {
            "_class": "hudson.plugins.git.GitChangeSetList",
            "items": [{
                "_class": "hudson.plugins.git.GitChangeSet",
                "affectedPaths": ["src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/gaps.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/monkins-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/jts-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/drp.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/as.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/drp-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/as-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/beyond-http-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/Template-layered.pdn", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/beyond-http.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/jts-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/gaps-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/gaps-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/drp.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/as-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/drp-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/statkins-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/statkins.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/statkins-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/gaps.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/beyond-http-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/beyond-http.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/gaps-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/as-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/beyond-http-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/drp-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/beyond-http-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/monkins-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/monkins-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/jts-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/drp-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/monkins.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/statkins-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/monkins-square.ico", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/gaps-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/jts.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/monkins.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/as.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/statkins.svg", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/as-jenkins-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/profile-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/statkins-min.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/as-square.png", "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/as-jenkins-min.png"],
                "commitId": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                "timestamp": 1504190833000,
                "author": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                },
                "authorEmail": "andrei-straut@users.noreply.github.com",
                "comment": "Add icons\n",
                "date": "2017-08-31 15:47:13 +0100",
                "id": "4c0b42ba67ba78cc89109e590cf1861e3c556599",
                "msg": "Add icons",
                "paths": [{
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/drp-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/gaps.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/drp-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/jts-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/monkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/statkins.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/as-jenkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/profile-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/as-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/beyond-http-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/statkins.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/statkins-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/drp.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/beyond-http-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/as-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/gaps-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/monkins.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/jts.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/gaps-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/statkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/monkins.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-blue-minified-small/beyond-http-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/as-jenkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/drp-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/gaps-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/statkins-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/jts-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/Template-layered.pdn"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/gaps-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/as.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/drp-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/as-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/statkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/beyond-http.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/as.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/beyond-http.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/gaps.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/beyond-http-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-minified-large/monkins-min.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/monkins-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-svg-grey/drp.svg"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-ico-grey/monkins-square.ico"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/jts-square.png"
                }, {
                    "editType": "add",
                    "file": "src/main/resources/com/andreistraut/freelancerwar/sbfw/images/original-png-grey-unminified/as-square.png"
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