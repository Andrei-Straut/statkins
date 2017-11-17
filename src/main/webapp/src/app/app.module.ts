import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Logger, Options} from '../../node_modules/angular2-logger/core';

import {ConfigModule} from './config/config.module';
import {ConfigService} from './config/services/config.service';
import {ProxyModule} from './proxy/proxy.module';
import {ProxyService} from './proxy/services/proxy.service';
import {UtilModule} from './util/util.module';
import {UtilService} from './util/services/util.service';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule,
        ConfigModule, ProxyModule, UtilModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [ConfigService, ProxyService, UtilService, Logger, Options]
})
export class AppModule {}
