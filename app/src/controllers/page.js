page.$inject=['$scope','$document'];

export default function page($scope, $document){
  $scope.focusCliInput = ($event) => {
    if ($event.target.className !== 'glyphicon glyphicon-question-sign') {
      $document.find('input')[0].focus();
    }
  };
}
