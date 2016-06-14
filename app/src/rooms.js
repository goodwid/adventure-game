class Room {
  constructor (obj) {
    Object.keys(obj).forEach(function(el){
      this[el] = obj[el];
    }, this);
  }
  travel (dir) {
    let response = {room: this[dir]};
    if (this[dir] === null) {
      response.msg = 'Sorry, you cannot go that way';
    } else {
      response.msg = `You travel ${dir} to ${this[dir].title}`;
      if (this[dir].obj.length > 0) response.obj = this[dir].obj;
    }
    return response;
  }
  look () {
    return {title: this.title, msg: this.desc, obj: this.obj}
  }
}

const room1 = new Room({
  title: 'Room 1',
  desc: 'large room',
  obj: ['bag'],
  n: null,
  e: null,
  w: null,
  s: null
});

const room2 = new Room({
  title: 'Room 2',
  desc: 'smaller room',
  obj: ['key'],
  n: null,
  e: null,
  w: null,
  s: null
});

const hallway = new Room({
  title: 'hallway',
  desc: 'a long hallway',
  obj: [],
  n: null,
  e: null,
  w: null,
  s: null
});

function buildMap() {
  room1.n = hallway;
  room2.s = hallway;
  hallway.s = room1;
  hallway.n = room2;
}


user = {
  location: room1,
  inventory: [],
  go (dir) {
    let result = this.location.travel(dir);
    if (result.room) this.location = result.room;
    console.log (result.msg);
    if (result.obj) result.obj.forEach(item => console.log (`There is a ${item} on the floor.`));
  }
}

function command(c) {
  cmd = c.toLowerCase().trim().split(' ');
  switch (cmd[0]) {
    case 'north':
    case 'south':
    case 'east':
    case 'west':
    case 'n':
    case 'e':
    case 's':
    case 'w': {
      user.go(cmd[0][0]);
      break;
    }
    case 'look':
    case 'l': {
      console.log(user.location.look());
      break;
    }
    case 'get': {
      let itemIndex = user.location.obj.indexOf(cmd[1]);
      if (itemIndex > -1) {
        item = user.location.obj[itemIndex];
        console.log(`You picked up a ${item}.`);
        user.inventory.push(item);
        user.location.obj.splice(itemIndex,1);
      } else console.log(`There is no ${cmd[1] || 'item'} here to get`);
      break;
    }
    case 'drop': {
      let itemIndex = user.inventory.indexOf(cmd[1])
      if ( itemIndex > -1) {
        item = user.inventory[itemIndex];
        console.log(`You have dropped a ${item}`);
        user.location.obj.push(item);
        user.inventory.splice(itemIndex,1);
      } else console.log('You do not have that item');
      break;
    }
    case 'i': {
      if (user.inventory !== []) {
        console.log('You have the following items:');
        user.inventory.forEach(item => console.log(`  ${item}`));
      } else console.log('You have nothing.');
      break;
    }
    case 'quit':
    case 'q': process.exit(0);
  }
}


function prompt() {
  process.stdout.write('> ');
}
process.stdin.on('data', text =>  {
  command(text.toString());
  prompt();
});

buildMap();
prompt();
