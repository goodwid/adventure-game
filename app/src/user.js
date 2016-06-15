import Item from './Items';
import Room from './rooms';

export default {
  location: Room.study,
  inventory: [],
  go (dir) {
    let response = '';
    let result = this.location.travel(dir);
    if (result.room) this.location = result.room;
    response = result.text;
    if (this.location.trigger) response += this.location.trigger();
    this.location.count++;
    if (result.obj) result.obj.forEach(item => response += (`<br>There is a ${item.name} on the floor.`));
    return response;
  }
}
