import { NgModule } from '@angular/core';

import { ProxyService } from './services/proxy.service';
import { ConfigModule } from '../Config/config.module';

@NgModule({
    imports: [ ConfigModule ],
    declarations: [],
    bootstrap: [],
    providers: [ ProxyService ]
})
export class ProxyModule {}