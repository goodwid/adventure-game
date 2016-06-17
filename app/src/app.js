import angular from 'angular';
import controllers from './controllers';

import './styles/app.css';


import ngSanitize from 'angular-sanitize';
// import commands from './cli';

angular.module('app', [ngSanitize, controllers]);
