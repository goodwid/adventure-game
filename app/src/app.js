import './styles/app.css';

import command from './command';
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
// import commands from './cli';

angular
  .module('app', [ngSanitize])
  .controller('page', [
    '$scope', '$document',
    ($scope, $document) => {
      $scope.focusCliInput = () => {
        console.log();
        $document.find('input')[0].focus();
      };
    }
  ])
  .controller('cli', [
    '$scope', '$filter', '$window', '$document',
    ($scope, $filter, $window, $document) => {
      $scope.outputList = [];
      $scope.outputList.push({text:'<p>Welcome to our game!</p><p>You wake up somewhat disoriented in a comfy bed in a strange house.  You look around but can\' get your bearings.<br>All you know for sure is that you need to get out of the house, and the only way out is through the front door.</p>'})
      let response = command('l');
      let outputItem = {
        text: response.text,
        validCommand: false
      }

      $scope.location = response.status.location;
      $scope.outputList.push(outputItem);
      $scope.inventory = '';

      $scope.addOutputItem = ($event) => {
        let keyCode = $event.which || $event.keyCode;

        if (keyCode === 13) {
          let inputText = $filter('lowercase')($scope.inputText);
          let response = command(inputText);

          if (response.help) {
            //showHelp();
            console.log('help triggered');
          }
          let inputItem = {
            text: inputText,
            validCommand: response.validCommand
          };

          outputItem = {
            text: response.text,
            validCommand: false
          }

          $scope.location = response.status.location;
          $scope.inventory = '';

          if (response.status.inventory.length > 0) {
            $scope.inventory = response.status.inventory;
          }

          $scope.outputList.push(inputItem);

          if (response.validCommand === true) {
            $scope.outputList.push(outputItem);
          }

          // if ($scope.outputList.length > 16) {
          //   $scope.outputList.shift();
          //   $scope.outputList.shift();
          // }

          setTimeout(() => {
            $window.scrollTo(0, $document[0].body.scrollHeight);
          }, 100);

          $scope.inputText = '';
        }
      };
    }
  ]);
