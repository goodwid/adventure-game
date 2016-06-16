import Item from './Items';

export default class Room {
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
    response += `You are in the ${this.title}.  ${this.desc}`;
    if (this.obj.length > 0) this.obj.forEach(item => response += (`<br>There is a ${item.name} on the floor.`));
    return response;
  }
}

Room.closet = new Room({
  title: 'closet',
  desc: 'It\'s dark and there are spiders.  Scratched on the wall you see _ _ 3.',
  trigger() {
    if (this.count === 3) {
      this.obj.push(Item.ring);
      return '<br>Something falls off a high shelf.';
    }
    return '';
  }
})

Room.kitchen = new Room({
  title: 'kitchen',
  desc: 'There are cabinets and a stove here.  You smell something familiar but you can\'t place it.  There is a door to the garage in the north, and the den to the south, and an exit to the hallway east.',
});

Room.dining = new Room({
  title: 'dining room',
  desc: 'There are a table and chairs here.',
});

Room.patio = new Room({
  title: 'patio',
  desc: 'You are in a fenced off patio.  There seems to be no way out except to go back inside.',
});

Room.foyer = new Room({
  title: 'foyer',
  desc: 'There is a front door to the south but you see a monster blocking the pathway.',
});

Room.living = new Room({
  title: 'livingroom',
  desc: 'There is a comfy sofa here and some end tables.',
});

Room.office = new Room({
  title: 'office',
  desc: 'There is a desk here.',
});

Room.garage = new Room({
  title: 'garage',
  desc: 'There is a workbench here.  YOu can return to the kitchen through the door to the south.',
});

Room.master = new Room({
  title: 'master bedroom',
  desc: 'There is a large bed here.  There is a closet to the north, and a door to the hallway to the west.',
});

Room.smallBedroom = new Room({
  title: 'small bedroom',
  desc: 'There is a bed here, and a nightstand.  There is a door to the east.',
});

Room.largeBedroom = new Room({
  title: 'large bedroom',
  desc: 'There is a bed here, and a nightstand.  There is a door to the east.',
});

Room.den = new Room({
  title: 'den',
  desc: 'Bookshelves line the room.  There is a door to the foyer in the east, and the kitchen in the north.<br>There is a locked door to the east',
});

Room.hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There are doors to the east and west and the hallway continues south.',
});

Room.hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  It continues to the north and south, with exits to the east and west.',
});

Room.hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There are doors to the south and west and the hallway continues north.',
});


Room.buildMap = () => {
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
  connect(Room.hallwayNorth, 'e',Room.master);
  connect(Room.master, 'n', Room.closet);

}

Room.buildMap();
