import angular from 'angular';
import ngSanitize from 'angular-sanitize';

import './styles/app.css';

import controllers from './controllers';
angular.module('app', [ngSanitize, controllers]);
