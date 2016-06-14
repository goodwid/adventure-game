import 'angular-material/angular-material.css';
import '../styles/app.css';

import angular from 'angular';
import angularMaterial from 'angular-material';
import greeting from './greeting';

angular
  .module('greetingApp', [angularMaterial])
  .controller('greeting', $scope => {
    $scope.greeting = greeting;
    $scope.inputedName;
    $scope.selectedFormat = 'default';
  })
  .config($mdThemingProvider => {
    $mdThemingProvider
      .theme('docs-dark')
      .primaryPalette('green')
      .dark();
  });
