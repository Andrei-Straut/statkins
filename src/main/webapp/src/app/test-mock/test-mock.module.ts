import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigMockService} from './services/config.mock.service';
import {UtilMockService} from './services/util.mock.service';
import {ProxyCustomResponseMockService} from './services/proxy.custom-response.mock.service';
import {IJenkinsDataMockService} from './services/jenkins-data.mock.service';

import {ConfigModule} from '../config/config.module';
import {ProxyModule} from '../proxy/proxy.module';
import {UtilModule} from '../util/util.module';

import {JenkinsDataProviderService} from './services/jenkins-data-provider.service';

@NgModule({
    imports: [
        CommonModule, ConfigModule, ProxyModule, UtilModule
    ],
    declarations: [],
    providers: [
        ConfigMockService, 
        UtilMockService, 
        ProxyCustomResponseMockService,
        IJenkinsDataMockService,
        
        JenkinsDataProviderService]
})
export class TestMockModule {}
