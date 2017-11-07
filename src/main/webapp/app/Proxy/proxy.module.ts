import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ProxyService } from './services/proxy.service';
import { ConfigModule } from '../Config/config.module';

@NgModule({
    imports: [ ConfigModule ],
    declarations: [],
    bootstrap: [ AppComponent ],
    providers: [ ProxyService ]
})
export class ProxyModule {}