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
  desc: 'Kitchen',
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
  desc: 'There is a workbench here.  There is a door to the south.',
});

Room.master = new Room({
  title: 'master bedroom',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.smallBedroom = new Room({
  title: 'small bedroom',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.largeBedroom = new Room({
  title: 'large bedroom',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.den = new Room({
  title: 'den',
  desc: 'Bookshelves line the room.  There is a door to the south.',
});

Room.hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the north and the hallway continues south.',
});

Room.hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  It continues to the north and south.',
});

Room.hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the south and the hallway continues north.',
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
