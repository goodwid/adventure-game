import './styles/main.css';
import './lib/bootstrap-extensions';

import angular from 'angular';
import app from './adventureGame';

angular.bootstrap(document, [app.name]);
