import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigMockService} from './services/config.mock.service';
import {UtilMockService} from './services/util.mock.service';
import {ProxyMockService} from './services/proxy.mock.service';
import {ConfigModule} from '../config/config.module';
import {ProxyModule} from '../proxy/proxy.module';
import {UtilModule} from '../util/util.module';

@NgModule({
    imports: [
        CommonModule, ConfigModule, ProxyModule, UtilModule
    ],
    declarations: [],
    providers: [ConfigMockService, UtilMockService, ProxyMockService]
})
export class TestMockModule {}
