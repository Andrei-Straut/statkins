import {IJobDataProviderService} from './jenkins-job-data-provider';

export class DrpMasterJobDataProvider implements IJobDataProviderService {

    public getJobData(): JSON {
        return this.data as JSON;
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSet",
        "actions": [
            {},
            {},
            null,
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
                "_class": "com.cloudbees.plugins.credentials.ViewCredentialsAction"
            }
        ],
        "description": "",
        "displayName": "drp-master",
        "displayNameOrNull": null,
        "fullDisplayName": "drp-master",
        "fullName": "drp-master",
        "name": "drp-master",
        "url": "https://www.andreistraut.info/jenkins/job/drp-master/",
        "buildable": true,
        "builds": [
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 7,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 6,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/6/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 5,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/5/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 4,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/4/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 3,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/3/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 2,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/2/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 1,
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/1/"
            }
        ],
        "color": "blue",
        "firstBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 1,
            "url": "https://www.andreistraut.info/jenkins/job/drp-master/1/"
        },
        "healthReport": [
            {
                "description": "Test Result: 0 tests failing out of a total of 128 tests.",
                "iconClassName": "icon-health-80plus",
                "iconUrl": "health-80plus.png",
                "score": 100
            },
            {
                "description": "Coverage: All coverage targets have been met.    ",
                "iconClassName": "icon-health-80plus",
                "iconUrl": "health-80plus.png",
                "score": 100
            },
            {
                "description": "Build stability: No recent builds failed.",
                "iconClassName": "icon-health-80plus",
                "iconUrl": "health-80plus.png",
                "score": 100
            }
        ],
        "inQueue": false,
        "keepDependencies": false,
        "lastBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 7,
            "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/"
        },
        "lastCompletedBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 7,
            "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/"
        },
        "lastFailedBuild": null,
        "lastStableBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 7,
            "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/"
        },
        "lastSuccessfulBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 7,
            "url": "https://www.andreistraut.info/jenkins/job/drp-master/7/"
        },
        "lastUnstableBuild": null,
        "lastUnsuccessfulBuild": null,
        "nextBuildNumber": 8,
        "property": [
            {
                "_class": "com.coravy.hudson.plugins.github.GithubProjectProperty"
            },
            {
                "_class": "com.sonyericsson.rebuild.RebuildSettings"
            }
        ],
        "queueItem": null,
        "concurrentBuild": false,
        "downstreamProjects": [
        ],
        "scm": {
            "_class": "hudson.plugins.git.GitSCM"
        },
        "upstreamProjects": [
        ],
        "modules": [
            {
                "name": "com.andreistraut.drp:drp-all",
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/com.andreistraut.drp$drp-all/",
                "color": "blue",
                "displayName": "DynamicReverseProxy"
            },
            {
                "name": "com.andreistraut.drp:drp-core",
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/com.andreistraut.drp$drp-core/",
                "color": "blue",
                "displayName": "DynamicReverseProxyCore"
            },
            {
                "name": "com.andreistraut.drp:drp-local",
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/com.andreistraut.drp$drp-local/",
                "color": "blue",
                "displayName": "DynamicReverseProxyLocal"
            },
            {
                "name": "com.andreistraut.drp:drp-web",
                "url": "https://www.andreistraut.info/jenkins/job/drp-master/com.andreistraut.drp$drp-web/",
                "color": "blue",
                "displayName": "DynamicReverseProxyWeb"
            }
        ]
    }
}
