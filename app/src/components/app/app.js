import template from './app.html';
import style from './app.scss';

export default {
  template,
  controller
};

controller.$inject = ['$document'];

function controller ($document) {
  this.style = style;
  this.focusCliInput = () => {
    $document.find('input')[0].focus();
  }
}
