import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppComponent} from '../app.component';

import {ConfigModule} from '../config/config.module';
import {ProxyModule} from '../proxy/proxy.module';
import {UtilModule} from '../util/util.module';

import {JenkinsDataRetrieverComponent} from './components/jenkins-data-retriever.component';

@NgModule({
    imports: [
        CommonModule, ConfigModule, ProxyModule, UtilModule
    ],
    declarations: [JenkinsDataRetrieverComponent],
    exports: [JenkinsDataRetrieverComponent],
    bootstrap: [AppComponent],
    providers: []
})
export class JenkinsDataRetrieverModule {}
