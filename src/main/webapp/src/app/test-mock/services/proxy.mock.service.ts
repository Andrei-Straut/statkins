import { Injectable } from '@angular/core';

import {ProxyService} from '../../proxy/services/proxy.service';
import {ConfigMockService} from './config.mock.service';

@Injectable()
export class ProxyMockService extends ProxyService {

  constructor() {
      super(null, null, new ConfigMockService());
  }

}
