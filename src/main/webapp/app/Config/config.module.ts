import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ConfigService } from './services/config.service';

@NgModule({
    imports: [],
    declarations: [],
    bootstrap: [ AppComponent ],
    providers: [ ConfigService ]
})
export class ConfigModule {}