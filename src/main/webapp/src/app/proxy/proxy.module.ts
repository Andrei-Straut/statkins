import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ProxyService} from './services/proxy.service';

import {Logger} from '../../../node_modules/angular2-logger/core';

@NgModule({
    imports: [
        CommonModule, HttpModule
    ],
    declarations: [],
    providers: [ProxyService, Logger]
})
export class ProxyModule {}
