import angular from 'angular';
import page from './page';
import cli from './cli';

const controllers = angular.module('controllers', [])
  .controller('page', page)
  .controller('cli', cli);

export default controllers.name;
