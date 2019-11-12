const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('I am fully charged!');
});


client.on('message', message => {
  if (message.content.substring(0, 1) == '>') {
    let args = message.content.substring(1).split(' ');
    let cmd = args[0];
    if (cmd == "status") {
      message.reply('I\'m online! Hello!');
    }
  };
});

 
client.login(process.env.BOT_TOKEN);
