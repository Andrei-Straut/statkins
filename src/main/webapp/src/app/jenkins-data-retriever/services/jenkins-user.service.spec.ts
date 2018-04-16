import {TestBed} from '@angular/core/testing';

import {JenkinsUserService} from './jenkins-user.service';
import {JenkinsUserListService} from './jenkins-user-list.service';
import {IJenkinsUser} from 'jenkins-api-ts-typings';

import {Logger} from '../../../../node_modules/angular2-logger/core';
import {TestMockModule} from '../../test-mock/test-mock.module';
import {ConfigMockService} from '../../test-mock/services/config.mock.service';
import {UtilMockService} from '../../test-mock/services/util.mock.service';
import {ProxyObservableErrorMockService} from '../../test-mock/services/proxy.observable-error.mock.service';
import {ProxyCustomResponseMockService} from '../../test-mock/services/proxy.custom-response.mock.service';
import {JenkinsServiceId} from './JenkinsServiceId';
import {AndreiStrautInfoMasterUserListDataProvider} from '../../test-mock/data-provider/userList/andrei-straut-info-user-list-data-provider';

import {AndreiStrautInfoAndreiDotStrautUserDataProvider} from '../../test-mock/data-provider/user/andrei-straut-info-andrei-dot-straut-user-data-provider';
import {AndreiStrautInfoAndreiStrautUserDataProvider} from '../../test-mock/data-provider/user/andrei-straut-info-andrei-straut-user-data-provider';
import {AndreiStrautInfoNoReplyUserDataProvider} from '../../test-mock/data-provider/user/andrei-straut-info-noreply-user-data-provider';

let loggerService: Logger = undefined;
let utilService: UtilMockService = new UtilMockService();
let configService: ConfigMockService = new ConfigMockService();
let proxyErrorService: ProxyObservableErrorMockService = new ProxyObservableErrorMockService();

describe('JenkinsUserService', () => {
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestMockModule],
            providers: [Logger]
        });

        if (loggerService == undefined || loggerService == null) {
            loggerService = TestBed.get(Logger);
            loggerService.level = 0;
        }
    });

    it('should be created', () => {
        let service: JenkinsUserService = createService(new Array());
        expect(service).toBeTruthy();
    });

    it('should have correct ServiceId', () => {
        let service: JenkinsUserService = createService(new Array<any>());
        expect(service.getServiceId() === JenkinsServiceId.Users);
    });

    it('isComplete and completedSuccssefully should be false at initialization', () => {
        let service: JenkinsUserService = createService(new Array<any>());
        expect(service.isComplete()).toBeFalsy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when userList is undefined', async () => {
        let service: JenkinsUserService = createService(undefined);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when userList is null', async () => {
        let service: JenkinsUserService = createService(null);
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return empty when userList is emtpy', async () => {
        let service: JenkinsUserService = createService(new Array<IJenkinsUser>());
        await service.execute();

        expect(service.getData().length).toBe(0);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeFalsy();
    });

    it('getData should return correct results for response with user', async () => {
        let userListJsonData: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        let userListProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let userListService: JenkinsUserListService = new JenkinsUserListService(configService, userListProxyService, utilService, loggerService, "SomeUrl");
        
        userListProxyService.setDefaultResponse(userListJsonData);
        await userListService.execute();
        let userListData = userListService.getData();
                
        let noReplyData = new AndreiStrautInfoNoReplyUserDataProvider().getUserData();
        let andreiStrautData = new AndreiStrautInfoAndreiStrautUserDataProvider().getUserData();
        let andreiDotStrautData = new AndreiStrautInfoAndreiDotStrautUserDataProvider().getUserData();

        let userProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        userProxyService.addResponse(((noReplyData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), noReplyData);
        userProxyService.addResponse(((andreiStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiStrautData);
        userProxyService.addResponse(((andreiDotStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiDotStrautData);
    
        let service: JenkinsUserService = new JenkinsUserService(configService, userProxyService, utilService, loggerService, userListData);
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeTruthy();
        
        let noReplyUser: IJenkinsUser = service.getData().filter(user => user.fullName === "noreply")[0];
        expect(noReplyUser).toBeDefined();
        expect(noReplyUser.fullName).toBe("noreply");
        expect(noReplyUser.absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/noreply");
        expect(noReplyUser.id).toBe("noreply");
        
        let andreiStrautUser: IJenkinsUser = service.getData().filter(user => user.fullName === "Andrei Straut")[0];
        expect(andreiStrautUser).toBeDefined();
        expect(andreiStrautUser.fullName).toBe("Andrei Straut");
        expect(andreiStrautUser.absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/andreistraut");
        expect(andreiStrautUser.id).toBe("andreistraut");
        
        let andreiDotStrautUser: IJenkinsUser = service.getData().filter(user => user.fullName === "andrei.straut")[0];
        expect(andreiDotStrautUser).toBeDefined();
        expect(andreiDotStrautUser.fullName).toBe("andrei.straut");
        expect(andreiDotStrautUser.absoluteUrl).toBe("https://www.andreistraut.info/jenkins/user/andrei.straut");
        expect(andreiDotStrautUser.id).toBe("andrei.straut");
    });
    
    it('getData should skip values and continue for response with user without fullName', async () => {
        let userListJsonData: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        let userListProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let userListService: JenkinsUserListService = new JenkinsUserListService(configService, userListProxyService, utilService, loggerService, "SomeUrl");
        
        userListProxyService.setDefaultResponse(userListJsonData);
        await userListService.execute();
        let userListData = userListService.getData();
        
        let noReplyData = new AndreiStrautInfoNoReplyUserDataProvider().getUserData();
        let andreiStrautData = new AndreiStrautInfoAndreiStrautUserDataProvider().getUserData();
        let andreiDotStrautData = new AndreiStrautInfoAndreiDotStrautUserDataProvider().getUserData();
        
        delete noReplyData["fullName"];
        delete andreiStrautData["fullName"];
        delete andreiDotStrautData["fullName"];

        let userProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        userProxyService.addResponse(((noReplyData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), noReplyData);
        userProxyService.addResponse(((andreiStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiStrautData);
        userProxyService.addResponse(((andreiDotStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiDotStrautData);
        
        let service: JenkinsUserService = new JenkinsUserService(configService, userProxyService, utilService, loggerService, userListData);
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
    
    it('getData should skip values and continue for response with undefined users', async () => {
        let userListJsonData: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        let userListProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let userListService: JenkinsUserListService = new JenkinsUserListService(configService, userListProxyService, utilService, loggerService, "SomeUrl");
        
        userListProxyService.setDefaultResponse(userListJsonData);
        await userListService.execute();
        let userListData = userListService.getData();
        
        let noReplyData = new AndreiStrautInfoNoReplyUserDataProvider().getUserData();
        let andreiStrautData = new AndreiStrautInfoAndreiStrautUserDataProvider().getUserData();
        let andreiDotStrautData = new AndreiStrautInfoAndreiDotStrautUserDataProvider().getUserData();
        
        let userProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        userProxyService.addResponse(((noReplyData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), noReplyData);
        userProxyService.addResponse(((andreiStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), undefined);
        userProxyService.addResponse(((andreiDotStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiDotStrautData);
        
        let service: JenkinsUserService = new JenkinsUserService(configService, userProxyService, utilService, loggerService, userListData);
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
    
    it('getData should skip values and continue for response with user without absoluteUrl', async () => {
        let userListJsonData: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        let userListProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let userListService: JenkinsUserListService = new JenkinsUserListService(configService, userListProxyService, utilService, loggerService, "SomeUrl");
        
        userListProxyService.setDefaultResponse(userListJsonData);
        await userListService.execute();
        let userListData = userListService.getData();
        
        let noReplyData = new AndreiStrautInfoNoReplyUserDataProvider().getUserData();
        let andreiStrautData = new AndreiStrautInfoAndreiStrautUserDataProvider().getUserData();
        let andreiDotStrautData = new AndreiStrautInfoAndreiDotStrautUserDataProvider().getUserData();
        
        let noReplyDataUrl = noReplyData["absoluteUrl"];
        let andreiStrautDataUrl = andreiStrautData["absoluteUrl"];
        let andreiDotStrautUrl = andreiDotStrautData["absoluteUrl"];
        delete noReplyData["absoluteUrl"];
        delete andreiStrautData["absoluteUrl"];
        delete andreiDotStrautData["absoluteUrl"];

        let userProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        userProxyService.addResponse(noReplyDataUrl, noReplyData);
        userProxyService.addResponse(andreiStrautDataUrl, andreiStrautData)
        userProxyService.addResponse(andreiDotStrautUrl, andreiDotStrautData)
        
        let service: JenkinsUserService = new JenkinsUserService(configService, userProxyService, utilService, loggerService, userListData);
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
    
    it('getData should skip values and continue for response with user not in user list', async () => {
        let userListJsonData: JSON = new AndreiStrautInfoMasterUserListDataProvider().getUserListData();
        let userListProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        let userListService: JenkinsUserListService = new JenkinsUserListService(configService, userListProxyService, utilService, loggerService, "SomeUrl");
        
        userListProxyService.setDefaultResponse(userListJsonData);
        await userListService.execute();
        let userListData = userListService.getData();
        
        let noReplyData = new AndreiStrautInfoNoReplyUserDataProvider().getUserData();
        let andreiStrautData = new AndreiStrautInfoAndreiStrautUserDataProvider().getUserData();
        let andreiDotStrautData = new AndreiStrautInfoAndreiDotStrautUserDataProvider().getUserData();
        
        noReplyData["fullName"] = "SomeNameThatDoesntExist";
        andreiStrautData["fullName"] = "SomeNameThatDoesntExist";
        andreiDotStrautData["fullName"] = "SomeNameThatDoesntExist";

        let responses: Map<string, any> = new Map<string, any>();
        responses.set(((noReplyData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), noReplyData);
        responses.set(((andreiStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiStrautData);
        responses.set(((andreiDotStrautData["absoluteUrl"] as string).replace(/\/$/, "") + '/' + configService.apiSuffix), andreiDotStrautData);

        let userProxyService: ProxyCustomResponseMockService = new ProxyCustomResponseMockService();
        userProxyService.setResponses(responses);
        
        let service: JenkinsUserService = new JenkinsUserService(configService, userProxyService, utilService, loggerService, userListData);
        await service.execute();

        expect(service.getData().length).toBe(3);
        expect(service.isComplete()).toBeTruthy();
        expect(service.isSuccessful()).toBeTruthy();
        expect(service.isDataComplete()).toBeFalsy();
    });
});

function createService(data: any): JenkinsUserService {
    let service: JenkinsUserService = new JenkinsUserService(configService, proxyErrorService, utilService, loggerService, data);
    return service;
}
