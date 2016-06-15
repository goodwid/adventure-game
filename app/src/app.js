import './styles/app.css';

import command from './command';
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
// import commands from './cli';

angular
  .module('app', [ngSanitize])
  .controller('cli', ($scope, $filter) => {
    $scope.outputList = [];
    let response = command('l');
    let outputItem = {
      text: response.text,
      validCommand: false
    }
    $scope.location = response.status.location;
    $scope.outputList.push(outputItem);
    $scope.addOutputItem = ($event) => {
      let keyCode = $event.which || $event.keyCode;

      if (keyCode === 13) {
        let inputText = $filter('lowercase')($scope.inputText);
        let response = command(inputText);
        $scope.location = response.status.location;
        // $scope.inventory = response.status.inventory;

        let outputItem = {
          text: response.text,
          validCommand: false
        }
        let inputItem = {
          text: inputText,
          validCommand: response.validCommand
        };
        $scope.outputList.push(inputItem);
        $scope.outputList.push(outputItem);

        if ($scope.outputList.length > 16) {
          $scope.outputList.shift();
          $scope.outputList.shift();
        }

        $scope.inputText = '';
      }
    };
  })
  .controller('status',($scope) => {

  })
