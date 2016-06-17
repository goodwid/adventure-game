import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import controllers from './controllers';

export default angular.module('app', [
  ngSanitize,
  controllers
]).name;
