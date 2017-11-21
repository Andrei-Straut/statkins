import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {AppComponent} from './app.component';
import {Logger, Options} from '../../node_modules/angular2-logger/core';

import {ConfigModule} from './config/config.module';
import {ConfigService} from './config/services/config.service';
import {ProxyModule} from './proxy/proxy.module';
import {ProxyService} from './proxy/services/proxy.service';
import {UtilModule} from './util/util.module';
import {UtilService} from './util/services/util.service';
import {TestMockModule} from './test-mock/test-mock.module';

import {JenkinsDataRetrieverModule} from './jenkins-data-retriever/jenkins-data-retriever.module';
import {JenkinsDataAnalyzerModule} from './jenkins-data-analyzer/jenkins-data-analyzer.module';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule,
        ConfigModule, ProxyModule, UtilModule,
        JenkinsDataRetrieverModule, JenkinsDataAnalyzerModule,
        TestMockModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [ConfigService, ProxyService, UtilService, Logger, Options]
})
export class AppModule {}
