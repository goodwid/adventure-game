import './styles/app.css';

import angular from 'angular';
import commands from './cli';

angular
  .module('app', [])
  .controller('cli', ($scope, $filter) => {
    $scope.outputList = [];

    $scope.addOutputItem = ($event) => {
      let keyCode = $event.which || $event.keyCode;

      if (keyCode === 13) {
        let inputText = $filter('lowercase')($scope.inputText);

        let inputItem = {
          text: `command not found: ${inputText}`,
          validCommand: false
        };

        // let elCli = angular.element(document.getElementById('cli'));
        // let value = $event.target.value.toLowerCase().trim();
        // let command = ` ${value}<br>`;
        //
        // if (commands[value]) {
        //   if (commands[value] == 'clear the cli screen') {
        //     elCli.html('');
        //   } else {
        //     elCli.append(`<li><span class="color--cyan">$</span> ${command}</li>`);
        //   }
        // } else {
        //   elCli.append(`<li>command not found: ${command}</li>`);
        // }
        //
        // $event.target.value = '';

        $scope.outputList.push(inputItem);

        $scope.inputText = '';
      }
    };
  });
