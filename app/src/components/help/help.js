import template from './help.html';
import style from './help.scss';
import help from '../../lib/help';

export default {
  template,
  controller() {
    this.help = help;
    this.style = style;
  },
};
