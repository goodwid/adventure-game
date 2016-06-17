import command from './command';

cli.$inject = ['$scope','$filter','$window','$document'];

export default function cli($scope, $filter, $window, $document) {
  $scope.outputList = [];
  $scope.outputList.push({text:'<p>Welcome to our game!</p><p>You wake up somewhat disoriented in a comfy bed in a strange house.  You look around but can\'t get your bearings.  All you know for sure is that you need to get out of the house, and the only way out is through the front door.</p>'})
  let response = command('l');

  $scope.location = response.status.location;
  $scope.outputList.push(response);
  $scope.inventory = '';

  $scope.addOutputItem = ($event) => {
    let keyCode = $event.which || $event.keyCode;

    if (keyCode === 13) {
      let inputText = $filter('lowercase')($scope.inputText);
      response = command(inputText);
      if (response.help) {
        $('#modal-help').modal('show');
        console.log('help triggered');
      }
      let inputItem = {
        text: inputText,
        command: true
      };

      $scope.location = response.status.location;
      $scope.inventory = '';

      if (response.status.inventory.length > 0) {
        $scope.inventory = response.status.inventory;
      }

      $scope.outputList.push(inputItem);
      $scope.outputList.push(response);
      setTimeout(() => {
        $window.scrollTo(0, $document[0].body.scrollHeight);
      }, 1);

      $scope.inputText = '';
    }
  };
}
