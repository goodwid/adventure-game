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
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.dining = new Room({
  title: 'dining room',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.patio = new Room({
  title: 'patio',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.foyer = new Room({
  title: 'foyer',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.living = new Room({
  title: 'livingroom',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.office = new Room({
  title: 'office',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
});

Room.garage = new Room({
  title: 'garage',
  desc: 'There is a desk here.  There is a door to the north, and a closet.',
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
  connect(foyer, 'n', hallwaySouth);
  connect(hallwaySouth, 'n', hallwayMiddle);
  connect(hallwayMiddle, 'e', dining);
  connect(hallwayMiddle, 'w', kitchen);
  connect(kitchen, 'n', garage);
  connect(kitchen, 's', den);
  connect(den, 'e', foyer);
  connect(foyer, 'e', living);
  connect(living, 'n', dining);
  connect(living, 'e', patio);
  connect(hallwaySouth, 'w', smallBedroom);
  connect(hallwayMiddle, 'n', hallwayNorth);
  connect(hallwayNorth, 'w', largeBedroom);
  connect(hallwayNorth, 'e', master);
  connect(master, 'n', closet);

}

Room.buildMap();
