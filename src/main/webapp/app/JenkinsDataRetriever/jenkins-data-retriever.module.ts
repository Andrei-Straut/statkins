import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';

import { ConfigModule } from '../Config/config.module';
import { ProxyModule } from '../Proxy/proxy.module';
import { UtilModule } from '../Util/util.module';

import { JenkinsDataRetrieverComponent } from './components/jenkins-data-retriever.component';

@NgModule({
    imports: [ ConfigModule, ProxyModule, UtilModule ],
    declarations: [
        JenkinsDataRetrieverComponent
    ],
    exports: [
        JenkinsDataRetrieverComponent
    ],
    bootstrap: [ AppComponent ],
    providers: []
})
export class JenkinsDataRetrieverModule {}