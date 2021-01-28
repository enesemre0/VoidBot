const Discord = require('discord.js');

module.exports = async (oldMessage, newMessage) => {
  
  let client = newMessage.client;
  if (newMessage.author.bot) return;
  if (newMessage.channel.type === 'dm') return;
  let prefix = '&';// prefixiniz
  if (newMessage.content.startsWith(prefix)) {
  let command = newMessage.content.split(' ')[0].slice(prefix.length);
  let params = newMessage.content.split(' ').slice(1);
  let perms = client.elevation(newMessage);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMessage, params, perms);
  }
  }

};
