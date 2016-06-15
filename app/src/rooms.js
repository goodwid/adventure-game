class Room {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    this.obj = [];
  }
  travel (dir) {
    let response = {room: this[dir]};
    if (!this[dir]) {
      response.msg = 'Sorry, you cannot go that way';
    } else {
      response.msg = `You travel ${dir} to the ${this[dir].title}\n`;
      response.msg += this[dir].desc;
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

class Item {
  constructor (obj) {
    Object.keys(obj).forEach(function(prop){
      this[prop] = obj[prop];
    }, this);
    this.startRoom.obj.push(this);
  }
  use () {
    let response = {};
    if (user.location === this.room) {
      response.msg = this.action();
    } else response.msg = 'You cannot use that item here.';
    return response;
  }
}


const closet = new Room({
  title: 'closet',
  desc: 'It\'s dark and there are spiders.  There is nothing to see here.\n'
})

const study = new Room({
  title: 'study',
  desc: 'There is a desk here.  There is a door to the north, and a closet.\n',
});

const den = new Room({
  title: 'den',
  desc: 'Bookshelves line the room.  There is a door to the south.\n',
});

const hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the north and the hallway continues south.\n',
});

const hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  It continues to the north and south.\n',
});

const hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the south and the hallway continues north.\n',
});

const key = new Item({
  name: 'key',
  startRoom: den,
  useRoom: study,
  action() {
    study.w = closet;
    closet.e = study;
    return 'You unlock the closet door to the west.'
  }
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
  connect(study, 'n', hallwaySouth);
  connect(hallwaySouth, 'n', hallwayMiddle);
  connect(hallwayMiddle, 'n', hallwayNorth);
  connect(den, 's', hallwayNorth);
}


user = {
  location: study,
  inventory: [],
  go (dir) {
    let response = {};
    let result = this.location.travel(dir);
    if (result.room) this.location = result.room;
    response.msg = result.msg;
    if (result.obj) result.obj.forEach(item => response.msg += (`There is a ${item.name} on the floor.\n`));
    return response;
  }
}

function command(c) {
  let response = {};
  let cmd = c.toLowerCase().trim().split(' ');
  let itemName = cmd[1];
  switch (cmd[0]) {
    case 'north':
    case 'south':
    case 'east':
    case 'west':
    case 'n':
    case 'e':
    case 's':
    case 'w': {
      return user.go(cmd[0][0]);
      break;
    }
    case 'look':
    case 'l': {
      response.msg = user.location.look();
      break;
    }
    case 'get': {
      if (user.location.obj.length === 0) {
        response.msg = `There is no ${itemName || 'item'} here to get`;
        break;
      }
      let itemIndex = user.location.obj.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        item = user.location.obj[itemIndex];
        response.msg = `You picked up a ${item.name}.`;
        user.inventory.push(item);
        user.location.obj.splice(itemIndex,1);
      }
      break;
    }
    case 'drop': {
      if (cmd[1] === 'all' && user.inventory.length > 0) {
        user.inventory.forEach(item => user.location.obj.push(item));
        user.inventory = [];
        response.msg = 'You have dropped all items.';
        break;
      }
      let itemIndex = user.inventory.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        item = user.inventory[itemIndex];
        response.msg = `You have dropped a ${item.name}`;
        user.location.obj.push(item);
        user.inventory.splice(itemIndex,1);
      } else response.msg = 'You do not have that item';
      break;
    }
    case 'inv':
    case 'inventory':
    case 'i': {
      if (user.inventory.length > 0) {
        response.msg = 'You have the following items:\n';
        user.inventory.forEach(item => response.msg += `  ${item.name}\n`);
      } else response.msg = 'You have nothing.';
      break;
    }
    case 'u':
    case 'use': {
      let itemIndex = user.inventory.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        let item = user.inventory[itemIndex];
        if (item.useRoom === user.location) {
          response.msg = item.action();
        } else {
          response.msg = 'You cannot use that here.';
        }
      } else response.msg = 'You do not have that item.';
      break;
    }
    case 'diag': {
      console.log('user: ', user);
      break;
    }
    case 'quit':
    case 'q': process.exit(0);
    default: {
      response.msg = '';
    }
  }
  return response;
}


function prompt() {
  process.stdout.write('> ');
}
process.stdin.on('data', text =>  {
  let result = command(text.toString());
  console.log(result.msg);
  prompt();
});

buildMap();
console.log(user.location.look());
prompt();
