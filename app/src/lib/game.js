class Room {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    this.obj = [];
    this.count = 0;
  }
  travel (dir) {
    let response = {room: this[dir]};
    if (!this[dir]) {
      response.text = 'Sorry, you cannot go that way';
    } else {
      response.text = this[dir].desc;
      if (this[dir].obj.length > 0) response.obj = this[dir].obj;
    }
    return response;
  }
  look () {
    let response = ''
    response += `${this.desc}`;
    if (this.obj.length > 0) this.obj.forEach(item => response += (`<br>There is a ${item.name} on the floor.`));
    return response;
  }
}

Room.closet = new Room({
  title: 'closet',
  desc: 'It\'s dark and there are spiders. Ew. There are some vintage clothes on the rod and a high shelf. South is the door back to the bedroom.',
  trigger() {
    if (this.count === 2) {
      this.obj.push(Item.ring);
      return '<br>Something falls off a high shelf.';
    }
    return '';
  }
})

Room.kitchen = new Room({
  title: 'kitchen',
  desc: 'This appears to be a kitchen. There are cabinets and a stove here. You smell something familiar but you can\'t place it. There is a door to the garage in the north, and the den to the south, and an exit to the hallway east.',
});

Room.dining = new Room({
  title: 'dining room',
  desc: 'You are in the dining room. There are a table and chairs here. The living room is south, and you can enter the hallway to the west.'
});

Room.patio = new Room({
  title: 'patio',
  desc: 'You are in a fenced off patio. There seems to be no way out except to go back inside.'
});

Room.foyer = new Room({
  title: 'foyer',
  desc: 'There is a front door to the south and doors east and west but you see a monster blocking the pathway!',
  trigger() {
    user.location = Room.living;
    return '<br><br>BAM!<br><br>The monster smacks you hard and you stumble out of the room, landing on a couch in the living room.<br>There is a comfy sofa here and some end tables. The foyer is to the west, and the dining room is north.'
  }
});

Room.living = new Room({
  title: 'livingroom',
  desc: 'There is a comfy sofa here and some end tables. The foyer is to the west, and the dining room is north.'
});

Room.garage = new Room({
  title: 'garage',
  desc: 'You are in the garage. There is a dusty workbench here. In the dust is scrawled "SEARCH THE CLOSET"  You can return to the kitchen through the door to the south.'
});

Room.master = new Room({
  title: 'master bedroom',
  desc: 'You are in the master bedroom. There is a large bed here, and a chair. There is a locked closet to the north, and a door to the hallway to the west.'
});

Room.smallBedroom = new Room({
  title: 'small bedroom',
  desc: 'You\'re in the smaller bedroom. There is a bed here, and a nightstand. On the nightstand is a note that reads: "The ring is dangerous!"  There is a door to the east.'
});

Room.largeBedroom = new Room({
  title: 'large bedroom',
  desc: 'This is the larger of the two bedrooms. There is a bed here, and a nightstand. There is a door to the east.'
});

Room.den = new Room({
  title: 'den',
  desc: 'You\'re in the den. Bookshelves line the room. There is a recliner and a side table facing a small television. On a small table in the corner, there is a printer with a USB slot. There is a door to the foyer in the east, and the kitchen in the north.'
});

Room.hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are at the north end of a long hallway. There are doors to the east and west and the hallway continues south.'
});

Room.hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway. It continues to the north and south, with exits to the east and west.'
});

Room.hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are at the south end of a long hallway. There is a door to the foyer in the south and and another door to the west, and the hallway continues north.'
});

Room.exit = new Room({
  title: 'Victory!',
  desc: 'Congratulations! you have defeated the monster and made your escape from the house! Thanks for playing...'
});

function buildMap() {
  function opposite(dir) {
    switch (dir) {
      case 'n': { return 's'; break; }
      case 's': { return 'n'; break; }
      case 'e': { return 'w'; break; }
      case 'w': { return 'e'; break; }
    }
  }
  function connect(room1, dir, room2) {
    room1[dir] = room2;
    room2[opposite(dir)] = room1;
  }
  connect(Room.foyer, 'n', Room.hallwaySouth);
  connect(Room.hallwaySouth, 'n', Room.hallwayMiddle);
  connect(Room.hallwayMiddle, 'e', Room.dining);
  connect(Room.hallwayMiddle, 'w', Room.kitchen);
  connect(Room.kitchen, 'n', Room.garage);
  connect(Room.kitchen, 's', Room.den);
  connect(Room.den, 'e', Room.foyer);
  connect(Room.foyer, 'e', Room.living);
  connect(Room.living, 'n', Room.dining);
  connect(Room.living, 'e', Room.patio);
  connect(Room.hallwaySouth, 'w', Room.smallBedroom);
  connect(Room.hallwayMiddle, 'n', Room.hallwayNorth);
  connect(Room.hallwayNorth, 'w', Room.largeBedroom);
  connect(Room.hallwayNorth, 'e', Room.master);
}

buildMap();

var user = {
  location: Room.master,
  inventory: [],
  go (dir) {
    let response = '';
    let result = this.location.travel(dir);
    if (result.room) this.location = result.room;
    this.location.count++;
    response = result.text;
    if (this.location.trigger) response += this.location.trigger();
    if (this.location.obj) this.location.obj.forEach(item => response += (`<br>There is a ${item.name} on the floor.`));
    return response;
  }
};

class Item {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    if (this.startRoom) this.startRoom.obj.push(this);
  }
  use () {
    return this.action();
  }
}

Item.key = new Item({
  name: 'key',
  startRoom: Room.dining,
  useRoom: Room.master,
  action() {
    Room.master.n = Room.closet;
    Room.closet.s = Room.master;
    Room.master.desc = 'You are in the master bedroom. There is a large bed here, and a chair. There is an open closet door to the north, and a door to the hallway to the west.'
    let itemIndex = user.inventory.findIndex(item => item.name === this.name);
    user.inventory.splice(itemIndex,1);
    return 'You unlock the closet door to the north. The key is stuck in the lock.';
  }
});

Item.usb = new Item({
  name: 'flashdrive',
  startRoom: Room.closet,
  useRoom: Room.den,
  action() {
    return 'The printer starts to heat up and after a moment it prints out a message:<br>Attack from the North!';
  }
});

Item.ring = new Item({
  name: 'ring',
  useRoom: Room.hallwaySouth,
  action() {
    Room.foyer.s = Room.exit;
    delete Room.foyer.trigger;
    Room.foyer.desc = 'You are in the foyer. You see the front door to the south. The floor is covered in a fine dust.';
    return 'A beam of light shines from the giant ruby on the ring into the foyer, striking the monster in the forehead, and he crumbles to dust!';
  }
});

export {Room, Item, user};
