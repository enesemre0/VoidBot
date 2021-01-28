const ayarlar = require("../ayarlar.json");
const database = require('quick.db');
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (message.author.id !== '702905315674554389') {
      if (database.fetch(message.guild.owner.user.id) && !database.fetch(message.author.id)) return message.reply('Bu sunucunun sahibi botun karalistesinde. O yüzden sende komut kullanamazsın.');
      if (database.fetch(message.author.id)) return message.reply('Sen botun karalistesindesin. Komutları kullanamazsın.');
    };
  };
  if (cmd) {
    cmd.run(client, message, params, perms);
  }
};