import Room from './rooms';
import user from './user';

export default class Item {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    if (this.startRoom) this.startRoom.obj.push(this);
  }
  use () {
    let response = {};
    if (user.location === this.room) {
      response.msg = this.action();
    } else response.msg = 'You cannot use that item here.';
    return response;
  }
}

Item.key = new Item({
  name: 'key',
  startRoom: Room.den,
  useRoom: Room.study,
  action() {
    Room.study.w = Room.closet;
    Room.closet.e = Room.study;
    let itemIndex = user.inventory.findIndex(item => item.name === this.name);
    user.inventory.splice(itemIndex,1);
    return 'You unlock the closet door to the west.  The key is stuck in the lock.';
  }
});

Item.card = new Item({
  name: 'card',
  startRoom: Room.closet,
  useRoom: Room.den,
  action() {
    user.location = Room.closet;
    return 'Rainbows fill the room.  You feel woozy.';
  }
});

Item.ring = new Item({
  name: 'ring',
  useRoom: Room.hallwayMiddle,
  action() {
    return 'Ow!';
  }
});
