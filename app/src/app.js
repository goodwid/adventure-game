import './styles/app.css';
import './lib/bootstrap-extensions';

import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import controllers from './controllers';

angular.module('app', [ngSanitize, controllers]);
