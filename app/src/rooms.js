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
      response.msg = `You travel ${dir} to the ${this[dir].title}\n`;
      response.msg += this[dir].desc;
      if (this[dir].obj.length > 0) response.obj = this[dir].obj;
    }
    return response;
  }
  look () {
    let response = ''
    response += `You are in the ${this.title}.  ${this.desc}\n`;
    if (this.obj.length > 0) this.obj.forEach(item => response += (`There is a ${item} on the floor.\n`));
    return response;
  }
}

const study = new Room({
  title: 'study',
  desc: 'There is a desk here.  There is a door to the north.\n',
  obj: ['bag'],
  n: null,
  e: null,
  w: null,
  s: null
});

const den = new Room({
  title: 'den',
  desc: 'Bookshelves line the room.  There is a door to the south.\n',
  obj: ['key'],
  n: null,
  e: null,
  w: null,
  s: null
});

const hallwayNorth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the north and the hallway continues south.\n',
  obj: [],
  n: null,
  e: null,
  w: null,
  s: null
});
const hallwayMiddle = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  It continues to the north and south.\n',
  obj: [],
  n: null,
  e: null,
  w: null,
  s: null
});
const hallwaySouth = new Room({
  title: 'hallway',
  desc: 'You are in a long hallway.  There is a door to the south and the hallway continues north.\n',
  obj: [],
  n: null,
  e: null,
  w: null,
  s: null
});

function buildMap() {
  study.n = hallwaySouth;
  den.s = hallwayNorth;
  hallwayNorth.s = hallwayMiddle;
  hallwayNorth.n = den;
  hallwayMiddle.n = hallwayNorth;
  hallwayMiddle.s = hallwaySouth;
  hallwaySouth.n = hallwayMiddle;
  hallwaySouth.s = study;
}


user = {
  location: study,
  inventory: [],
  go (dir) {
    let response = {};
    let result = this.location.travel(dir);
    if (result.room) this.location = result.room;
    response.msg = result.msg;
    if (result.obj) result.obj.forEach(item => response.msg += (`There is a ${item} on the floor.\n`));
    return response;
  }
}

function command(c) {
  let response = {};
  let cmd = c.toLowerCase().trim().split(' ');
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
      let itemIndex = user.location.obj.indexOf(cmd[1]);
      if (itemIndex > -1) {
        item = user.location.obj[itemIndex];
        response.msg = `You picked up a ${item}.`;
        user.inventory.push(item);
        user.location.obj.splice(itemIndex,1);
      } else response.msg = `There is no ${cmd[1] || 'item'} here to get`;
      break;
    }
    case 'drop': {
      if (cmd[1] === 'all' && user.inventory.length > 0) {
        user.inventory.forEach(item => user.location.obj.push(item));
        user.inventory = [];
        response.msg = 'You have dropped all items.';
        break;
      }
      let itemIndex = user.inventory.indexOf(cmd[1])
      if ( itemIndex > -1) {
        item = user.inventory[itemIndex];
        response.msg = `You have dropped a ${item}`;
        user.location.obj.push(item);
        user.inventory.splice(itemIndex,1);
      } else response.msg = 'You do not have that item';
      break;
    }
    case 'inv':
    case 'inventory':
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
  return response;
}


function prompt() {
  process.stdout.write('> ');
}
process.stdin.on('data', text =>  {
  result = command(text.toString());
  console.log(result.msg);
  prompt();
});

buildMap();
prompt();
