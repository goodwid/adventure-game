export default class Room {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    this.obj = [];
  }
  travel (dir) {
    let response = {room: this[dir]};
    if (!this[dir]) {
      response.text = 'Sorry, you cannot go that way';
    } else {
      response.text = `You travel ${dir} to the ${this[dir].title}\n`;
      response.text += this[dir].desc;
      if (this[dir].obj.length > 0) response.obj = this[dir].obj;
    }
    return response;
  }
  look () {
    let response = ''
    response += `You are in the ${this.title}.  ${this.desc}\n`;
    if (this.obj.length > 0) this.obj.forEach(item => response += (`There is a ${item.name} on the floor.\n`));
    return response;
  }
}

Room.closet = new Room({
  title: 'closet',
  desc: 'It\'s dark and there are spiders.  There is nothing to see here.\n'
})

Room.study = new Room({
  title: 'study',
  desc: 'There is a desk here.  There is a door to the north, and a closet.\n',
});

Room.den = new Room({
  title: 'den',
  desc: 'Bookshelves line the room.  There is a door to the south.\n',
});

Room.hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the north and the hallway continues south.\n',
});

Room.hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  It continues to the north and south.\n',
});

Room.hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the south and the hallway continues north.\n',
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
  connect(Room.study, 'n', Room.hallwaySouth);
  connect(Room.hallwaySouth, 'n', Room.hallwayMiddle);
  connect(Room.hallwayMiddle, 'n', Room.hallwayNorth);
  connect(Room.den, 's', Room.hallwayNorth);
}

Room.buildMap();
