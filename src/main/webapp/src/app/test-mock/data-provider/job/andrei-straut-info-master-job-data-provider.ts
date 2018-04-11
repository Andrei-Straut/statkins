import {IJobDataProviderService} from './jenkins-job-data-provider';

export class AndreiStrautInfoMasterJobDataProvider implements IJobDataProviderService {

    public getJobData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.maven.MavenModuleSet",
        "actions": [
            {},
            null,
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
        "displayName": "andreistraut.info-master",
        "displayNameOrNull": null,
        "fullDisplayName": "andreistraut.info-master",
        "fullName": "andreistraut.info-master",
        "name": "andreistraut.info-master",
        "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/",
        "buildable": true,
        "builds": [
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 14,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 13,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/13/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 12,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/12/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 11,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/11/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 10,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/10/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 9,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/9/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 8,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/8/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 7,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/7/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 6,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/6/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 5,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/5/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 4,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/4/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 3,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/3/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 2,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/2/"
            },
            {
                "_class": "hudson.maven.MavenModuleSetBuild",
                "number": 1,
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/1/"
            }
        ],
        "color": "blue",
        "firstBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 1,
            "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/1/"
        },
        "healthReport": [
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
            "number": 14,
            "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/"
        },
        "lastCompletedBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 14,
            "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/"
        },
        "lastFailedBuild": null,
        "lastStableBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 14,
            "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/"
        },
        "lastSuccessfulBuild": {
            "_class": "hudson.maven.MavenModuleSetBuild",
            "number": 14,
            "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/14/"
        },
        "lastUnstableBuild": null,
        "lastUnsuccessfulBuild": null,
        "nextBuildNumber": 15,
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
            {
              "_class" : "hudson.model.FreeStyleProject",
              "name" : "drp-master",
              "url" : "https://www.andreistraut.info/jenkins/job/drp-master/",
              "color" : "blue"
            }
        ],
        "scm": {
            "_class": "hudson.plugins.git.GitSCM"
        },
        "upstreamProjects": [
            {
              "_class" : "hudson.model.FreeStyleProject",
              "name" : "gaps-master",
              "url" : "https://www.andreistraut.info/jenkins/job/gaps-master/",
              "color" : "blue"
            }
        ],
        "modules": [
            {
                "name": "com.andreistraut.andreistraut.info:sbfw",
                "url": "https://www.andreistraut.info/jenkins/job/andreistraut.info-master/com.andreistraut.andreistraut.info$sbfw/",
                "color": "blue",
                "displayName": "andreistraut.info"
            }
        ]
    }
}
