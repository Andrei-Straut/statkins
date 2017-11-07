import { AppComponent  } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ConfigModule } from './Config/config.module';
import { ConfigService } from './Config/services/config.service';
import { ProxyModule } from './Proxy/proxy.module';
import { ProxyService } from './Proxy/services/proxy.service';
import { UtilModule } from './Util/util.module';
import { UtilService } from './Util/services/util.service';
import { Logger } from 'angular2-logger/core';

import { JenkinsDataRetrieverModule } from './JenkinsDataRetriever/jenkins-data-retriever.module';
import { JenkinsDataAnalyzerModule } from './JenkinsDataAnalyzer/jenkins-data-analyzer.module';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule,
        ConfigModule, ProxyModule, UtilModule,
        JenkinsDataRetrieverModule, JenkinsDataAnalyzerModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ],
    providers: [ ConfigService, ProxyService, UtilService, Logger ]
})
export class AppModule {}
