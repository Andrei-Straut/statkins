import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { UtilService } from './services/util.service';

@NgModule({
    imports: [],
    declarations: [],
    bootstrap: [ AppComponent ],
    providers: [ UtilService ]
})
export class UtilModule {}