import './styles/app.css';

import angular from 'angular';
import cli from './cli';

angular
  .module('app', [])
  .controller('cli', $scope => {
    $scope.onKeypress = ($event) => {
      let keyCode = $event.which || $event.keyCode;

      if (keyCode === 13) {
        let elCli = angular.element(document.getElementById('cli'));
        let value = $event.target.value.toLowerCase().trim();
        let command = ` ${value}<br>`;

        if (cli[value]) {
          if (cli[value] == 'clear the cli screen') {
            elCli.html('');
          } else {
            elCli.append(`<li><span class="color--cyan">$</span> ${command}</li>`);
          }
        } else {
          elCli.append(`<li>command not found: ${command}</li>`);
        }

        $event.target.value = '';
      }
    };
  });
