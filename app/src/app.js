import './styles/app.css';

import command from './command';
import angular from 'angular';
// import commands from './cli';

angular
  .module('app', [])
  .controller('cli', ($scope, $filter) => {
    $scope.outputList = [];

    $scope.addOutputItem = ($event) => {
      let keyCode = $event.which || $event.keyCode;

      if (keyCode === 13) {
        let inputText = $filter('lowercase')($scope.inputText);

        let inputItem = {
          text: inputText,
          validCommand: false
        };
        let response = command(inputText);
        $scope.outputList.push(inputItem);
        $scope.outputList.push(response);

        $scope.inputText = '';
      }
    };
  });
