import template from './statusBar.html';
import style from './statusBar.scss';

export default {
  template,
  bindings: {
    location: '=',
    inventory: '='
  },
  controller() {
    this.style = style;
    console.log(this.inventory);
  },
};
