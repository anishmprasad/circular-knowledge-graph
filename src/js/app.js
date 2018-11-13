/* eslint-disable */

'use strict'

import './import_assets';
import {config} from './config/config';
import {utilsService} from './config/utils-service';
import {deeplinkService} from './config/deeplink-service';
import Explore from './components/Explore'

window.onload = (function () {
  var component = new Explore(config, utilsService, deeplinkService)
  component.onInit()
})();