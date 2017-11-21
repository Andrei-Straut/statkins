import {IJobDataProviderService} from './jenkins-job-data-provider';

export class GapsMasterJobDataProvider implements IJobDataProviderService {

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
        "displayName": "gaps-master",
        "displayNameOrNull": null,
        "fullDisplayName": "gaps-master",
        "fullName": "gaps-master",
        "name": "gaps-master",
        "url": "https://www.andreistraut.info/jenkins/job/gaps-master/",
        "buildable": true,
        "builds": [
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 15,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 14,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/14/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 13,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/13/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 12,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/12/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 11,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/11/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 10,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/10/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 9,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/9/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 8,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/8/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 7,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/7/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 6,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/6/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 5,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/5/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 4,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/4/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 3,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/3/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 2,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/2/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 1,
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/1/"
            }
        ],
        "color": "blue",
        "firstBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 1,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/1/"
        },
        "healthReport": [
            {
                "description": "Test Result: 0 tests failing out of a total of 457 tests.",
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
            "number": 15,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/"
        },
        "lastCompletedBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 15,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/"
        },
        "lastFailedBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 4,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/4/"
        },
        "lastStableBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 15,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/"
        },
        "lastSuccessfulBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 15,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/15/"
        },
        "lastUnstableBuild": null,
        "lastUnsuccessfulBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 4,
            "url": "https://www.andreistraut.info/jenkins/job/gaps-master/4/"
        },
        "nextBuildNumber": 16,
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
                "name": "com.andreistraut:gaps",
                "url": "https://www.andreistraut.info/jenkins/job/gaps-master/com.andreistraut$gaps/",
                "color": "blue",
                "displayName": "GAPS"
            }
        ]
    }
}
