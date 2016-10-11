import template from './cli.html';
import style from './cli.scss';
import command from '../../lib/command';

export default {
  template,
  controller
};

controller.$inject = ['$filter','$window','$document'];

function controller($filter, $window, $document) {
  this.style = style;
  this.outputList = [
    {
      text:'Let the adventure begin!<br><br>'
    },
    {
      text: 'You wake up somewhat disoriented in a comfy bed in a strange house. You look around but can\'t get your bearings. All you know for sure is that you need to get out of the house, and the only way out is through the front door.<br><br>'
    }
  ];
  let response = command('l');

  this.location = response.status.location;
  this.outputList.push(response);
  this.inventory = '';
  const lowercase = $filter('lowercase');
  this.addOutputItem = ($event) => {
    let keyCode = $event.which || $event.keyCode;

    if (keyCode === 13) {
      let inputText = lowercase(this.inputText);
      response = command(inputText);
      if (response.help) {
        $('#modal-help').modal('show');
      }
      let inputItem = {
        text: inputText,
        command: true
      };

      this.location = response.status.location;
      this.inventory = '';

      if (response.status.inventory.length > 0) {
        this.inventory = response.status.inventory;
      }

      this.outputList.push(inputItem);
      this.outputList.push(response);
      setTimeout(() => {
        $window.scrollTo(0, $document[0].body.scrollHeight);
      }, 1);

      this.inputText = '';
    }
  };

}
