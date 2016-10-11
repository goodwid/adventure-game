import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import controllers from './controllers';
import components from './components';

export default angular.module('adventureGame', [
  ngSanitize,
  components
]);
