import {Room, Item, user} from './game';

export default (c) => {
  let response = {};
  let cmd = c ? c.split(' ') : '';
  let itemName = cmd[1];
  response.status = {};
  switch (cmd[0]) {
    case 'north':
    case 'south':
    case 'east':
    case 'west':
    case 'n':
    case 'e':
    case 's':
    case 'w': {
      response.text = user.go(cmd[0][0]);
      break;
    }
    case 'look':
    case 'l': {
      response.text = user.location.look();
      break;
    }
    case 'get': {
      if (user.location.obj.length === 0) {
        response.text = `There is no ${itemName || 'item'} here to get`;
        break;
      }
      let itemIndex = user.location.obj.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        let item = user.location.obj[itemIndex];
        response.text = `You picked up a ${item.name}.`;
        user.inventory.push(item);
        user.location.obj.splice(itemIndex,1);
      }
      break;
    }
    case 'drop': {
      if (cmd[1] === 'all' && user.inventory.length > 0) {
        user.inventory.forEach(item => user.location.obj.push(item));
        user.inventory = [];
        response.text = 'You have dropped all items.';
        break;
      }
      let itemIndex = user.inventory.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        let item = user.inventory[itemIndex];
        response.text = `You have dropped a ${item.name}`;
        user.location.obj.push(item);
        user.inventory.splice(itemIndex,1);
      } else response.text = 'You do not have that item';
      break;
    }
    case 'inv':
    case 'inventory':
    case 'i': {
      if (user.inventory.length > 0) {
        response.text = 'You have the following items:\n';
        user.inventory.forEach(item => response.text += `  ${item.name}\n`);
      } else response.text = 'You have nothing.';
      break;
    }
    case 'u':
    case 'use': {
      let itemIndex = user.inventory.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        let item = user.inventory[itemIndex];
        if (item.useRoom === user.location) {
          response.text = item.action();
        } else {
          response.text = 'You cannot use that here.';
        }
      } else response.text = 'You do not have that item.';
      break;
    }
    case 'diag': {
      console.log('user: ', user);
      break;
    }
    case 'credits': {
      response.text = 'Created by Johnny Luangphasy and David Goodwin, 2016.  MIT license.';
      break;
    }
    case 'help':
    case 'h': {
      response.help = true;
    }


    default: {
      // response.validCommand = true;
      response.text = '';
    }
  }
  response.status.location = user.location.title;
  response.status.inventory = user.inventory;
  return response;
}
