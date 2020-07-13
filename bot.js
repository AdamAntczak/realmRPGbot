const Discord = require('discord.js');
const Database = require('better-sqlite3');

const client = new Discord.Client();
const db = new Database("inventory.db");

let initDatabase = db.prepare("CREATE TABLE IF NOT EXISTS inventory(name text, items text)");
initDatabase.run();

let insertNewPlayer = db.prepare("INSERT INTO inventory(name, items) VALUES (?,?)");
let checkPlayerInventory = db.prepare("SELECT items FROM inventory WHERE name = ?");
let addPlayerInventory = db.prepare("UPDATE inventory SET items = (?) WHERE name = (?)")

var feedback = '';

var timer;

client.on('ready', () => {
  console.log('I am fully charged!');
});

const prefix = '>';
client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    let args = message.content.substring(1).split(' ');
    let cmd = args[0];
    let subcmd = '';
    if (args.length > 1) {
      subcmd = args[1];
    }
    if (cmd == "status") {
      message.reply('I\'m online! Hello!');
    }
    
    /**
      DICE ROLL FUNCTION
    **/
    else if (cmd == "roll") {
      let check = /^\d+$/;
      //
      if (subcmd != '') {
        if (subcmd.split('')[0] == 'd') {
          let sides = subcmd.split('d')[1]
          if ( check.test(sides) ) {
            if (sides > 1) {
              message.reply("You rolled: **" + String( Math.ceil(Math.random()*sides) ) + ".**" )
            }
            else {
              message.reply('The number of sides needs to be above 1!')
            }
          }
          else {
            message.reply('You need to give a correct value for the number of sides! (Must be above 1 and be a number)')
          }
        }
        //
        else if (check.test(subcmd.split('d')[0]) && check.test(subcmd.split('d')[1])) {
          if (subcmd.split('d')[0] < 1) {
            message.reply('The number of dice rolled must be 1 or above!')
         }
          else {
            let dice = subcmd.split('d')[0]
            let sides = subcmd.split('d')[1]
            if (sides > 1) {
              let results = 'Your rolls are: **';
              for (let n = 0; n < dice; n++) {
                results = results.concat( String( Math.ceil(Math.random()*sides)))
                if (n+1<dice) {
                  results = results.concat(", ")
                }
              }
              results = results.concat('.**')
              message.reply( results )
            }
            else {
              message.reply('The number of sides needs to be above 1!')
            }
          }
        }
        //
        else {
          message.reply('You need to use the correct format for this! (e.g. >roll 2d20 OR >roll d12)')
        }
      } 
      else {
        message.reply('You didn\'t give any arguments for this command!')
      }
       
    }//closes if statement checking if cmd is 'roll'
    
    /**
    
      INVENTORY MANAGEMENT COMMANDS
    
    **/
    
    else if (cmd == "addPlayer") {
      if (message.member.roles.some(role => role.name === 'Realm Master')) {
        if (subcmd != '') {
          feedback = insertNewPlayer.run(String(subcmd), '');
          message.channel.send('Player successfully added.');
        }
      };
    }//closes if statement for 'add'
    else if (cmd == "checkInventory") {
      if (subcmd != '') {
        feedback = '';
        feedback = checkPlayerInventory.get(String(subcmd));
        function waitUntilComplete() {
          if (feedback != '') {
            message.channel.send('Current inventory items: ' + String(feedback.items));
            clearInterval(timer);
          }
        }//endfunction
        timer = setInterval(waitUntilComplete, 100)
      }
    }//closes if statement for 'checkInventory'
    else if (cmd == "addItem") {
      if (subcmd != '') {
        feedback = '';
        feedback = checkPlayerInventory.get(String(subcmd));
        function waitUntilComplete() {
          if (feedback != '') {
            addPlayerInventory.run( (String(feedback.items) +", "+ String(args[2])), String(subcmd));
            clearInterval(timer);
          }
        }//endfunction
        timer = setInterval(waitUntilComplete, 100);
        
        message.channel.send('Added item to inventory.')
      }
    }//closes if statement for 'addItem'
  };//closes if statement checking for '>'
  if (message.content == 'meow') {
    message.channel.send('meow');
  };
});//close client.on

 
client.login(process.env.BOT_TOKEN);
