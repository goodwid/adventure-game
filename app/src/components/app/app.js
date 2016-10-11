import template from './app.html';
import style from './app.scss';

export default {
  template,
  controller() {
    this.style = style;
  },
};
