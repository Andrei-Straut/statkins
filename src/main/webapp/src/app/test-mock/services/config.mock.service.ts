import {Injectable} from '@angular/core';

import {ConfigService} from '../../config/services/config.service'

@Injectable()
export class ConfigMockService extends ConfigService {

    constructor() {
        super();
    }

    get proxyUrl(): string {
        return "SomeUrl";
    }
}
