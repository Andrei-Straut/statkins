import {IUserListDataProviderService} from './jenkins-user-list-data-provider';

export class AndreiStrautInfoMasterUserListDataProvider implements IUserListDataProviderService {

    public getUserListData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "users": [
            {
                "lastChange": 1523538392129,
                "project": {
                    "_class": "hudson.maven.MavenModule",
                    "name": "com.andreistraut:statkins",
                    "url": "https://www.andreistraut.info/jenkins/job/statkins-master/com.andreistraut$statkins/"
                },
                "user": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
                    "fullName": "Andrei Straut"
                }
            },
            {
                "lastChange": 1523467813986,
                "project": {
                    "_class": "hudson.maven.MavenModule",
                    "name": "com.andreistraut.drp:drp-web",
                    "url": "https://www.andreistraut.info/jenkins/job/drp-release/com.andreistraut.drp$drp-web/"
                },
                "user": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andrei.straut",
                    "fullName": "andrei.straut"
                }
            },
            {
                "lastChange": 1513778931015,
                "project": {
                    "_class": "hudson.maven.MavenModule",
                    "name": "com.andreistraut:monkins",
                    "url": "https://www.andreistraut.info/jenkins/job/monkins-master/com.andreistraut$monkins/"
                },
                "user": {
                    "absoluteUrl": "https://www.andreistraut.info/jenkins/user/noreply",
                    "fullName": "noreply"
                }
            }]
    }
}
