const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('I am fully charged!');
});


client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('dont @ me like that');
  }
});

 
client.login(process.env.BOT_TOKEN);
