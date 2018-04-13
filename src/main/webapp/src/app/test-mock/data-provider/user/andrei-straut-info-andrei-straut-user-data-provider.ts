import {IUserDataProviderService} from './jenkins-user-data-provider';

export class AndreiStrautInfoAndreiStrautUserDataProvider implements IUserDataProviderService {

    public getUserData(): JSON {
        return JSON.parse(JSON.stringify(this.data));
    }

    private data: any = {
        "_class": "hudson.model.User",
        "absoluteUrl": "https://www.andreistraut.info/jenkins/user/andreistraut",
        "description": null,
        "fullName": "Andrei Straut",
        "id": "andreistraut",
        "property": [
            {
                "_class": "jenkins.security.ApiTokenProperty"
            },
            {
                "_class": "com.cloudbees.plugins.credentials.UserCredentialsProvider$UserCredentialsProperty"
            },
            {
                "_class": "hudson.plugins.emailext.watching.EmailExtWatchAction$UserProperty",
                "triggers": [
                ]
            },
            {
                "_class": "hudson.model.MyViewsProperty"
            },
            {
                "_class": "org.jenkinsci.plugins.displayurlapi.user.PreferredProviderUserProperty"
            },
            {
                "_class": "hudson.model.PaneStatusProperties"
            },
            {
                "_class": "hudson.search.UserSearchProperty",
                "insensitiveSearch": false
            },
            {
                "_class": "hudson.security.HudsonPrivateSecurityRealm$Details"
            },
            {
                "_class": "hudson.tasks.Mailer$UserProperty",
                "address": "somemail@someserver.com"
            },
            {
                "_class": "jenkins.security.LastGrantedAuthoritiesProperty"
            }
        ]
    }
}
