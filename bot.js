const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('I am fully charged!');
});


client.on('message', message => {
  if (message.content.substring(0, 1) == '>') {
    let args = message.content.substring(1).split(' ');
    let cmd = args[0];
    let subcmd;
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
      
    };//closes if statement checking if cmd is 'roll'
  };//closes if statement checking for '>'
});//close client.on

 
client.login(process.env.BOT_TOKEN);
