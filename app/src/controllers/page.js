import help from '../lib/help';

page.$inject=['$scope','$document'];

export default function page($scope, $document){
  $scope.help = help;
  $scope.focusCliInput = () => {
    $document.find('input')[0].focus();
  };
}
